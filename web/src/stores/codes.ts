import { ref } from 'vue';
import { defineStore } from 'pinia';
import { ISimpleFarcasterUser, ISimpleCodeModel, ISimpleProgram, IProgram, FeedType } from '../models';
import { DUMMY_PROGRAM, DUMMY_TRENDING_PROGRAMS, DUMMY_USER, DUMMY_CODES } from '../models/dummy';

export const useCodesStore = defineStore('codes', () => {
    const currentFeedType = ref<FeedType>(FeedType.trending);
    const userLookup = ref<{ [fid: number]: ISimpleFarcasterUser }>({
        [DUMMY_USER.fid]: DUMMY_USER
    });
    const programLookup = ref<{ [pid: string]: ISimpleProgram }>({
        [DUMMY_PROGRAM.id]: DUMMY_PROGRAM
    });
    const currentCodes = ref<ISimpleCodeModel[]>(DUMMY_CODES);
    const trendingPrograms = ref<IProgram[]>(DUMMY_TRENDING_PROGRAMS);
    return { userLookup, programLookup, currentCodes, currentFeedType, trendingPrograms };
});