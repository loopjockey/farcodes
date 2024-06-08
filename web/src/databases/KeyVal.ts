
import { get, set, del } from 'idb-keyval';
import { IAuthenticatedUser } from '../models'

const CURRENT_USER = 'CURRENT_USER';
const SUPABASE_JWT = 'SUPABASE_JWT';

export default {
    async getCurrentUser(): Promise<IAuthenticatedUser | null | undefined> {
        return await get(CURRENT_USER)
    },
    async setCurrentUser(user: IAuthenticatedUser | null | undefined): Promise<void> {
        if (!user) {
            await del(CURRENT_USER);
        } else {
            await set(CURRENT_USER, user);
        }
    },
    async getSupabaseJwt(): Promise<string | null | undefined> {
        return await get(SUPABASE_JWT);
    },
    async setSupabaseJwt(jwt: string | null | undefined): Promise<void> {
        if (!jwt) {
            await del(SUPABASE_JWT);
        } else {
            await set(SUPABASE_JWT, jwt);
        }
    }

}