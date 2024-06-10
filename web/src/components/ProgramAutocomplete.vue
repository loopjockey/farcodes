<template>
  <v-autocomplete
    v-model="model"
    v-model:search="searchText"
    :items="programs"
    :label="label"
    :rounded="rounded"
    :variant="variant"
    :density="density"
    :flat="flat"
    :hide-details="hideDetails"
    :single-line="singleLine"
    :loading="isLoadingData"
    :class="{ 'ml-0': selectedProgram }"
    item-title="name"
    item-value="id"
  >
    <template #prepend-inner>
      <v-icon v-if="!selectedProgram">mdi-magnify</v-icon>
      <v-avatar :size="density === 'compact' ? 30 : undefined" v-else>
        <v-img :src="selectedProgram.avatarUrl"></v-img>
      </v-avatar>
    </template>
    <template v-slot:item="{ props, item }">
      <v-list-item
        v-bind="props"
        :prepend-avatar="item.raw.avatarUrl"
        :title="item.raw.name"
      ></v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import { ref, defineModel, watchEffect, defineProps, computed } from "vue";
import { useSupabase } from "../plugins/supabase";
import { searchPrograms } from "../supabase";
import { ISimpleProgram } from "../models";
const model = defineModel<string>();
defineProps({
  rounded: String,
  variant: String,
  density: String,
  flat: Boolean,
  hideDetails: Boolean,
  singleLine: Boolean,
  label: { type: String, default: "Search programs..." },
});

const searchText = ref("");
const programs = ref<ISimpleProgram[]>([]);

const selectedProgram = computed(() => {
  if (!model.value) return null;
  else return programs.value.find((p) => p.id === model.value);
});

const isLoadingData = ref(false);
const trySearchPrograms = async (text: string) => {
  try {
    isLoadingData.value = true;
    const supabase = await useSupabase();
    programs.value = await searchPrograms(supabase, text);
  } finally {
    isLoadingData.value = false;
  }
};

watchEffect(() => {
  trySearchPrograms(searchText.value);
});
</script>