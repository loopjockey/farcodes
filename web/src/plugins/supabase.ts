import KeyVal from '../databases/KeyVal';
import { IAuthenticatedUser } from '../models';
import { ICli, loginWithSigner, createCli } from '../supabase';

export class SupabaseConnection {
    currentUser!: IAuthenticatedUser | null;
    supabaseJwt!: string | null;
    supabaseCli!: ICli | null;
    constructor() {
        this.currentUser = null;
        this.supabaseJwt = null;
        this.supabaseCli = null;
    }
    async receiveNeynarUser(user: IAuthenticatedUser) {
        this.currentUser = user;
        await KeyVal.setCurrentUser(user);
    }
    async receiveJwt(jwt: string) {
        this.supabaseJwt = jwt;
        this.supabaseCli = createCli(jwt);
        await KeyVal.setSupabaseJwt(this.supabaseJwt);
    }
    async connectWithSupabase() {
        const jwt = await loginWithSigner(this.currentUser!.signer_uuid);
        await this.receiveJwt(jwt);
    }
    async clearState() {
        this.currentUser = null;
        this.supabaseCli = null;
        this.supabaseJwt = null;
        await Promise.all([
            KeyVal.setSupabaseJwt(null),
            KeyVal.setCurrentUser(null)
        ])
    }
    isJwtMatching() {
        // TODO: Check whether JWT fid === signer fid if both set.
        return false;
    }
}

let CURRENT_STATE: SupabaseConnection | null = null;
export const useSupabase = async ():Promise<SupabaseConnection> => {
    if (!CURRENT_STATE) {
        const [user, jwt] = await Promise.all([
            KeyVal.getCurrentUser(),
            KeyVal.getSupabaseJwt()
        ]);
        CURRENT_STATE = new SupabaseConnection();
        if (!user && !jwt) {
            // Nothing to do
        } else if (user && !jwt) {
            await CURRENT_STATE.connectWithSupabase();
        } else if (!user && jwt) {
            await CURRENT_STATE.clearState();
        } else if (user && jwt) {
            await Promise.all([
                CURRENT_STATE.receiveJwt(jwt),
                CURRENT_STATE.receiveNeynarUser(user)
            ]);
            if (!CURRENT_STATE.isJwtMatching()) {
                await CURRENT_STATE.connectWithSupabase();
            }
        }
    }
    return CURRENT_STATE;
};