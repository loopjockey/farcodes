import { ref } from 'vue';
import { defineStore } from 'pinia';
import { ISimpleFarcasterUser, IAuthenticatedUser } from '../models';
import { tryLogin } from '../lib/neynar';
import { useSupabase, SupabaseConnection } from '../plugins/supabase';
import { getUserByFid } from '../supabase'

export const useAuthStore = defineStore('auth', () => {
    const currentUser = ref<ISimpleFarcasterUser | null>(null);

    const tryLoadUser = async (supabase: SupabaseConnection, user: IAuthenticatedUser | undefined | null) => {
        if (!user) {
            currentUser.value = null;
        } else {
            currentUser.value = await getUserByFid(supabase, user.fid);
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

    return { currentUser, login, logout, isLoadingCurrentUser, isLoggingIn, isLoggingOut };
})