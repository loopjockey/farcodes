import { ref } from 'vue';
import { defineStore } from 'pinia';
import KeyVal from '../databases/KeyVal';
import { ISimpleFarcasterUser, ISimpleCodeModel, ISimpleProgram, IAuthenticatedUser } from '../models';
import { tryLogin } from '../lib/neynar';
import { DUMMY_USER } from '../models/dummy';

export const useProfileStore = defineStore('profile', () => {
    const currentUser = ref<ISimpleFarcasterUser | null>(null);
    const myCodes = ref<(ISimpleCodeModel & { program: ISimpleProgram })[]>([]);

    const tryLoadUser = (user: IAuthenticatedUser | undefined | null) => {
        if (!user) {
            currentUser.value = null;
        } else {
            currentUser.value = {
                ...DUMMY_USER,
                fid: user.fid,
            }
        }
    }

    const tryLoadCurrentUser = async () => {
        const user = await KeyVal.getCurrentUser();
        tryLoadUser(user);
    }

    const login = async () => {
        const user = await tryLogin();
        await KeyVal.setCurrentUser(user);
        tryLoadUser(user);
    }

    const logout = async () => {
        await KeyVal.setCurrentUser(null);
        tryLoadUser(null);
    }

    tryLoadCurrentUser();

    return { currentUser, myCodes, login, logout };
})