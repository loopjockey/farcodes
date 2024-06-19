CREATE TABLE user_profile (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    fid BIGINT UNIQUE NOT NULL,
    username VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    custody_address VARCHAR NOT NULL,
    avatar_url VARCHAR NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE social_graph (
    follower_fid BIGINT,
    followee_fid BIGINT,
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp,
    CONSTRAINT fk_follower_fid FOREIGN KEY(follower_fid) REFERENCES user_profile(fid),
    CONSTRAINT fk_followee_fid FOREIGN KEY(followee_fid) REFERENCES user_profile(fid),
    PRIMARY KEY(follower_fid, followee_fid)
);

CREATE TABLE programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    description VARCHAR,
    reward_description VARCHAR,
    logo_url VARCHAR,
    site_url VARCHAR,
    trend INT DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp,
    created_by UUID REFERENCES auth.users(id),
    tags TEXT[]
);

CREATE TABLE referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_id UUID REFERENCES programs(id),
    codes VARCHAR[] NOT NULL,
    reward_description VARCHAR,
    weight INT DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp,
    created_by UUID REFERENCES auth.users(id),
    created_by_fid BIGINT NOT NULL REFERENCES user_profile(fid)
);

CREATE TABLE daily_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referral_id UUID REFERENCES referrals(id),
    date DATE NOT NULL,
    copy INT DEFAULT 0,
    click INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp,
    UNIQUE (referral_id, date)
);

-- RLS

ALTER TABLE user_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_graph ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_profile_select" ON user_profile
    FOR SELECT 
    USING (true);

CREATE POLICY "user_profile_insert" ON user_profile
    FOR INSERT
    WITH CHECK (false);

CREATE POLICY "user_profile_update" ON user_profile
    FOR UPDATE
    USING (false) WITH CHECK (false);

CREATE POLICY "user_profile_delete" ON user_profile
    FOR DELETE
    USING (false);

-- Policies for social_graph table
CREATE POLICY "social_graph_select" ON social_graph
    FOR SELECT
    USING (auth.jwt() ->> 'fid'::text = follower_fid::text OR auth.jwt() ->> 'fid'::text = followee_fid::text);

CREATE POLICY "social_graph_insert" ON social_graph
    FOR INSERT 
    WITH CHECK (false);

CREATE POLICY "social_graph_update" ON social_graph
    FOR UPDATE 
    USING (false) WITH CHECK (false);

CREATE POLICY "social_graph_delete" ON social_graph
    FOR DELETE 
    USING (false);

-- Policies for programs table
CREATE POLICY "programs_select" ON programs
    FOR SELECT 
    USING (true);

CREATE POLICY "programs_insert" ON programs
    FOR INSERT
    WITH CHECK (false);

CREATE POLICY "programs_update" ON programs
    FOR UPDATE
    USING (false) WITH CHECK (false);

CREATE POLICY "programs_delete" ON programs
    FOR DELETE
    USING (false);

-- Policies for referrals table
CREATE POLICY "referrals_select" ON referrals
    FOR SELECT
    USING (true);

CREATE POLICY "referrals_insert" ON referrals
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "referrals_update" ON referrals
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = created_by)
    WITH CHECK (
        id IS NOT DISTINCT FROM referrals.id AND
        program_id IS NOT DISTINCT FROM referrals.program_id AND
        weight IS NOT DISTINCT FROM referrals.weight AND
        created_at IS NOT DISTINCT FROM referrals.created_at AND
        created_by IS NOT DISTINCT FROM referrals.created_by AND
        created_by_fid IS NOT DISTINCT FROM referrals.created_by_fid AND
        updated_at IS NOT DISTINCT FROM referrals.updated_at
    );

CREATE POLICY "referrals_delete" ON referrals
    FOR DELETE
    USING (false);

CREATE POLICY "daily_tracking_select" ON daily_tracking
    FOR ALL
    USING (false) WITH CHECK (false);

-- TRIGGERS

CREATE OR REPLACE FUNCTION check_programs_insert() RETURNS TRIGGER AS $$
BEGIN
    NEW.id := uuid_generate_v4();
    NEW.trend := 0;
    NEW.is_deleted := false;
    NEW.created_at := current_timestamp;
    NEW.updated_at := current_timestamp;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER programs_insert_trigger
BEFORE INSERT ON programs
FOR EACH ROW
EXECUTE FUNCTION check_programs_insert();

CREATE OR REPLACE FUNCTION check_referrals_insert() RETURNS TRIGGER AS $$
BEGIN
    NEW.id := uuid_generate_v4();
    NEW.weight := 0;
    NEW.is_deleted := false;
    NEW.created_at := current_timestamp;
    NEW.updated_at := current_timestamp;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER referrals_insert_trigger
BEFORE INSERT ON referrals
FOR EACH ROW
EXECUTE FUNCTION check_referrals_insert();

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_referrals_updated_at
AFTER INSERT ON referrals
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- FUNCTIONS

CREATE OR REPLACE FUNCTION recalc_referral_weight(referral_id UUID, copy_delta INT, click_delta INT) RETURNS VOID AS $$
BEGIN
    UPDATE referrals
    SET weight = weight - (copy_delta + click_delta),
        updated_at = current_timestamp
    WHERE id = referral_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE record_activity(referral_id UUID, activity_type VARCHAR) LANGUAGE plpgsql AS $$
DECLARE
    copy_delta INT := 0;
    click_delta INT := 0;
BEGIN
    IF activity_type = 'copy' THEN
        copy_delta := 1;
    ELSIF activity_type = 'click' THEN
        click_delta := 1;
    ELSE
        RAISE EXCEPTION 'Invalid activity type';
    END IF;

    INSERT INTO daily_tracking (referral_id, date, copy, click, created_at, updated_at)
    VALUES (referral_id, current_date, copy_delta, click_delta, current_timestamp, current_timestamp)
    ON CONFLICT (referral_id, date)
    DO UPDATE SET
        copy = daily_tracking.copy + EXCLUDED.copy,
        click = daily_tracking.click + EXCLUDED.click,
        updated_at = current_timestamp;

    PERFORM recalc_referral_weight(referral_id, copy_delta, click_delta);
END;
$$;

-- VIEWS

CREATE VIEW vw_referrals_with_programs AS
SELECT
    r.id AS referral_id,
    r.created_by_fid AS referral_created_by_fid,
    r.program_id,
    array_length(r.codes, 1) AS referral_code_count,
    r.reward_description AS referral_reward_description,
    p.name AS program_name,
    p.logo_url AS program_logo_url,
    p.reward_description AS program_reward_description,
    p.description AS program_description,
    p.tags AS program_tags
FROM
    referrals r
JOIN
    programs p ON r.program_id = p.id
WHERE
    r.is_deleted = FALSE
    AND p.is_deleted = FALSE;
