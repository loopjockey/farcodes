import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { ISimpleFarcasterUser, ISimpleCodeModel, IHasProgram, IHasCreator } from '../models';
import { useSupabase } from '../plugins/supabase';
import { getUserByFid, listCodesForUser } from '../supabase'

export const useProfileStore = defineStore('profile', () => {
    const targetUserFid = ref<number | null>(null);
    const profileUser = ref<ISimpleFarcasterUser | null>(null);
    const profileCodes = ref<(ISimpleCodeModel & IHasCreator & IHasProgram)[]>([]);

    const isLoadingProfileData = ref(false);
    const tryLoadProfileData = async (fid: number | null) => {
        try {
            isLoadingProfileData.value = true;
            if (fid === null) {
                profileCodes.value = [];
                profileUser.value = null;
            } else {
                const supabase = await useSupabase();
                const [u, c] = await Promise.all([
                    getUserByFid(supabase.supabaseCli!, fid),
                    listCodesForUser(supabase.supabaseCli!, fid)
                ])
                profileUser.value = u;
                profileCodes.value = c.map(i => ({...i, creator: u }));
            }
        } finally {
            isLoadingProfileData.value = false;
        }
    }

    watch(() => targetUserFid.value, () => tryLoadProfileData(targetUserFid.value), { immediate: true });

    return { profileUser, profileCodes, targetUserFid, isLoadingProfileData };
})