import { ref } from 'vue';
import { defineStore } from 'pinia';
import { ISimpleFarcasterUser, ISimpleCodeModel, IAuthenticatedUser, IHasProgram } from '../models';
import { tryLogin } from '../lib/neynar';
import { useSupabase, SupabaseConnection } from '../plugins/supabase';
import { getUserByFid, listCodesForUser } from '../supabase'

export const useProfileStore = defineStore('profile', () => {
    const currentUser = ref<ISimpleFarcasterUser | null>(null);
    const myCodes = ref<(ISimpleCodeModel & IHasProgram)[]>([]);

    const tryLoadUser = async (supabase: SupabaseConnection, user: IAuthenticatedUser | undefined | null) => {
        if (!user) {
            currentUser.value = null;
        } else {
            const [u, c] = await Promise.all([
                getUserByFid(supabase, user.fid),
                listCodesForUser(supabase, user.fid)
            ])
            currentUser.value = u;
            myCodes.value = c;
        }
    }

    const isLoadingCurrentUser = ref(false);
    const tryLoadCurrentUser = async () => {
        try {
            isLoadingCurrentUser.value = true;
            const supabase = await useSupabase();
            await tryLoadUser(supabase, supabase.currentUser);
        } finally {
            isLoadingCurrentUser.value = false;
        }
    }

    const isLoggingIn = ref(false);
    const login = async () => {
        try {
            isLoggingIn.value = true;
            const user = await tryLogin();
            const supabase = await useSupabase();
            await tryLoadUser(supabase, user);
        } finally {
            isLoggingIn.value = false;
        }
    }

    const isLoggingOut = ref(false);
    const logout = async () => {
        try {
            isLoggingIn.value = true;
            const supabase = await useSupabase();
            await supabase.clearState();
            await tryLoadUser(supabase, null);
        } finally {
            isLoggingOut.value = false;
        }
    }

    tryLoadCurrentUser();

    return { currentUser, myCodes, login, logout, isLoadingCurrentUser, isLoggingIn, isLoggingOut };
})