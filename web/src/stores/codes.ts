import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { ISimpleCodeModel, ISimpleProgram, FeedType, IHasCreator, IHasProgram } from '../models';
import { useSupabase } from '../plugins/supabase';
import { listTrendingPrograms, listCodesForFeed } from '../supabase'

export const useCodesStore = defineStore('codes', () => {
    const currentFeedType = ref<FeedType>(FeedType.trending);
    const currentCodes = ref<(ISimpleCodeModel & IHasCreator & IHasProgram)[]>([]);
    const trendingPrograms = ref<ISimpleProgram[]>([]);

    const isLoadingFeedCodes = ref(false);
    const tryLoadCodesForCurrentFeed = async () => {
        try {
            isLoadingFeedCodes.value = true;
            const supabase = await useSupabase();
            const codes = await listCodesForFeed(supabase, currentFeedType.value);
            currentCodes.value = codes;
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
        currentCodes,
        currentFeedType,
        trendingPrograms,
        tryLoadCodesForCurrentFeed,
        tryLoadTrendingPrograms,
        isLoadingFeedCodes,
        isLoadingTrendingPrograms
    };
});