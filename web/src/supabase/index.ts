import { FeedType, IHasCreator, IHasProgram, IProgram, ISimpleCodeModel, ISimpleFarcasterUser, ISimpleProgram, IHasVisibilityStats, IView, IViewReferralProgram } from '../models';
import { DUMMY_CODES, DUMMY_PROGRAM, DUMMY_TRENDING_PROGRAMS, DUMMY_USER } from '../models/dummy';
import { SupabaseClient, createClient } from '@supabase/supabase-js'
export const $ = <TType extends { [key: string]: any }>(inputs: (keyof TType)[] | keyof TType): string => typeof inputs === 'string' ? inputs : (inputs as string[]).join(', ');

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export type Jwt = string;

export interface ICli {
    client: SupabaseClient<Database>;
}

export interface IAccessKey {
    jwt: string;
    exp: number;
}

export const createCli = (jwt: Jwt): ICli => {
    const Authorization = `Bearer ${jwt}`
    return {
        client: createClient<Database>(supabaseUrl, supabaseAnonKey, {
            global: { headers: { Authorization } }
        })
    };
}

export const loginWithSigner = async (signerUuid: string): Promise<IAccessKey> => {
    const cli = createClient(supabaseUrl, supabaseAnonKey);
    const resp = await cli.functions.invoke(`api/auth/sign-in`, {
        body: JSON.stringify({
            signer_uuid: signerUuid
        }),
        method: 'POST'
    });
    if (resp.error) throw resp.error;
    return resp.data;
}

export const getUserByFid = async (cli: ICli, fid: number): Promise<IUserProfile['Row']> => {
    const resp = await cli.client.from('user_profile')
        .select()
        .eq($<IUserProfile['Row']>('fid'), fid)
        .single<IUserProfile['Row']>();
    if (resp.error) throw resp.error;
    return resp.data;
}

export const getProgramById = async (cli: ICli, id: string): Promise<IProgram['Row']> => {
    const resp = await cli.client.from('programs')
        .select()
        .eq($<IProgram['Row']>('id'), id)
        .single<IProgram['Row']>();
    if (resp.error) throw resp.error;
    return resp.data;
}

export const searchPrograms = async (cli: ICli, text: string): Promise<IProgram['Row'][]> => {
    const resp = await cli.client.from('programs')
        .select("*")
        .contains($<IProgram['Row']>('name'), text)
        .order($<IProgram['Row']>('trend'), { ascending: false })
        .range(0, 100);
    if (resp.error) throw resp.error;
    return resp.data;
};

export const listTrendingPrograms = async (cli: ICli): Promise<IProgram['Row'][]> => {
    const resp = await cli.client.from('programs')
        .select("*")
        .order($<IProgram['Row']>('trend'), { ascending: false })
        .range(0, 20);
    if (resp.error) throw resp.error;
    return resp.data;
};

/**
 * Loads the codes for a given feed type, with optional filters
 * @param cli The supabase cli.
 * @param feedType The type of feed to load on
 * @param filters The optional filters to apply to a feed request 
 * @returns 
 */
export const listCodesForFeed = async (cli: ICli, feedType: FeedType, filters?: { programIds?: string[] }) => {
    //TODO: eh?
    return await new Promise<(ISimpleCodeModel & IHasCreator & IHasProgram)[]>((resolve) => {
        setTimeout(() => {
            resolve(
                DUMMY_CODES.map(d => ({
                    ...d,
                    program: DUMMY_PROGRAM,
                    creator: DUMMY_USER
                }))
            )
        }, 1000);
    });
}

export const listCodesForUser = async (cli: ICli, fid: number) : Promise<IViewReferralProgram['Row'][]> => {
    const resp = await cli.client.from('vw_referrals_with_programs')
        .select("*")
        .eq($<IViewReferralProgram['Row']>('referral_created_by_fid'), fid)
        .range(0, 1000);
    if (resp.error) throw resp.error;
    return resp.data;
};
