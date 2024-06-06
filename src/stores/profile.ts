import { ref } from 'vue';
import { defineStore } from 'pinia';
import { get, set } from 'idb-keyval';
import { ISimpleFarcasterUser, ISimpleCodeModel, ISimpleProgram } from '../models';

export const useProfileStore = defineStore('profile', () => {
    const currentUser = ref<ISimpleFarcasterUser | null>(null);
    const myCodes = ref<(ISimpleCodeModel & { program: ISimpleProgram })[]>([]);
    return { currentUser, myCodes };
})