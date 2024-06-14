import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { IProgram, ISimpleCodeModel, IHasCreator, FeedType, IHasProgram } from '../models';
import { useSupabase } from '../plugins/supabase';
import { getProgramById, listCodesForFeed } from '../supabase'

export const useProgramStore = defineStore('program', () => {
    const currentProgramId = ref<string | null>(null);
    const currentProgram = ref<IProgram | null>(null);
    const currentCodes = ref<(ISimpleCodeModel & IHasCreator & IHasProgram)[]>([]);
    const currentFeedType = ref<FeedType>(FeedType.recent);

    const isLoadingProgram = ref(false);
    const tryLoadProgram = async (id: string | null) => {
        try {
            isLoadingProgram.value = true;
            if (id) {
                const supabase = await useSupabase();
                currentProgram.value = await getProgramById(supabase, id);
            } else {
                currentProgram.value = null;
            }
        } finally {
            isLoadingProgram.value = false;
        }
    }

    const isLoadingFeedCodes = ref(false);
    const tryLoadCodesForCurrentFeed = async (id: string | null) => {
        try {
            isLoadingFeedCodes.value = true;
            if (id) {
                const supabase = await useSupabase();
                const codes = await listCodesForFeed(supabase, currentFeedType.value);
                currentCodes.value = codes;
            } else {
                currentCodes.value = []
            }
        } finally {
            isLoadingFeedCodes.value = false;
        }
    }

    watch(() => currentProgramId.value, (id) => {
        tryLoadProgram(id);
    });

    watch(() => [currentProgramId.value, currentFeedType.value], ([id]) => {
        tryLoadCodesForCurrentFeed(id);
    }, { immediate: true });

    const finalCodes = computed(() => {
        if (!currentCodes.value?.length) return [];
        if (!currentProgram.value) return [];
        return currentCodes.value.map(c => ({ ...c, program: currentProgram.value }));
    });

    return {
        currentProgram,
        currentProgramId,
        currentCodes: finalCodes,
        currentFeedType,
        isLoadingFeedCodes,
    }
});