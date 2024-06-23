DO $$
DECLARE
    new_user_id UUID;
BEGIN
    new_user_id := uuid_generate_v4();

    INSERT INTO auth.users (id, email)
    VALUES ( new_user_id, 'user@test.com' );
    
    INSERT INTO user_profile (
        id, fid, username, name, custody_address, avatar_url, is_deleted, created_at, updated_at
    ) VALUES (
        new_user_id, 
        1234567890, 
        'user123', 
        'Test User', 
        '0x1234567890abcdef', 
        'https://example.com/avatar.png', 
        FALSE, 
        current_timestamp, 
        current_timestamp
    );
    
    INSERT INTO programs (
        name, description, reward_description, logo_url, site_url, created_by, tags
    ) VALUES (
        'Referral Program 1',
        'Description for Referral Program 1',
        'Reward for Referral Program 1',
        'https://example.com/logo.png',
        'https://example.com',
        new_user_id,
        ARRAY['tag1', 'tag2']
    );

    INSERT INTO referrals (
        program_id, codes, reward_description, created_by, created_by_fid
    ) VALUES (
        (SELECT id FROM programs WHERE name = 'Referral Program 1'),
        ARRAY['CODE123', 'CODE456'],
        'Reward for using referral codes',
        new_user_id,
        1234567890
    );
END $$;