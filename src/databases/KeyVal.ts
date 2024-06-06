
import { get, set, del } from 'idb-keyval';
import { IAuthenticatedUser } from '../models'

const CURRENT_USER = 'CURRENT_USER';

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
    }
}