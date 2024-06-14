import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { ISimpleFarcasterUser, ISimpleCodeModel, ISimpleProgram, IProgram, FeedType, IHasCreator, IHasProgram } from '../models';
import { useSupabase } from '../plugins/supabase';
import { listTrendingPrograms, listCodesForFeed } from '../supabase'

export const useCodesStore = defineStore('codes', () => {
    const currentFeedType = ref<FeedType>(FeedType.trending);
    const userLookup = ref<{ [fid: number]: ISimpleFarcasterUser }>({});
    const programLookup = ref<{ [pid: string]: ISimpleProgram }>({});
    const currentCodes = ref<(ISimpleCodeModel & IHasCreator & IHasProgram)[]>([]);
    const trendingPrograms = ref<ISimpleProgram[]>([]);

    const isLoadingFeedCodes = ref(false);
    const tryLoadCodesForCurrentFeed = async () => {
        try {
            isLoadingFeedCodes.value = true;
            const supabase = await useSupabase();
            const codes = await listCodesForFeed(supabase, currentFeedType.value);
            currentCodes.value = [];
            for (const c of codes) {
                if (!userLookup.value[c.postedByFid])
                    userLookup.value[c.postedByFid] = c.creator;
                if (!programLookup.value[c.programId])
                    programLookup.value[c.programId] = c.program;
                currentCodes.value.push(c)
            }
        } finally {
            isLoadingFeedCodes.value = false;
        }
    }

    const isLoadingTrendingPrograms = ref(false);
    const tryLoadTrendingPrograms = async () => {
        try {
            isLoadingTrendingPrograms.value = true;
            const supabase = await useSupabase();
            trendingPrograms.value = await listTrendingPrograms(supabase);
        } finally {
            isLoadingTrendingPrograms.value = false;
        }
    }

    tryLoadTrendingPrograms();
    watch(() => currentFeedType.value, () => {
        tryLoadCodesForCurrentFeed();
    }, { immediate: true })

    return {
        userLookup,
        programLookup,
        currentCodes,
        currentFeedType,
        trendingPrograms,
        tryLoadCodesForCurrentFeed,
        tryLoadTrendingPrograms,
        isLoadingFeedCodes,
        isLoadingTrendingPrograms
    };
});