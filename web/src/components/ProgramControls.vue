<template>
  <v-slide-group
    v-model="model"
    class="pa-4"
    selected-class="bg-primary"
    show-arrows
    multiple
  >
    <template v-if="loading">
      <v-slide-group-item v-for="i in 10" :key="i">
        <v-skeleton-loader
          type="article"
          width="280"
          class="mx-1"
        ></v-skeleton-loader>
      </v-slide-group-item>
    </template>
    <template v-else>
      <v-slide-group-item
        v-for="item in props.items || []"
        :key="item.id"
        v-slot="{ isSelected, toggle }"
        :value="item.id"
        color="primary"
      >
        <ProgramCard
          @click="toggle"
          :reward-description="item.rewardDescription"
          :program-avatar-url="item.avatarUrl"
          :program-name="item.name"
          :class="['mx-1', isSelected ? 'selected-custom' : undefined]"
          :width="280"
        >
          <template #append>
            <v-checkbox :model-value="isSelected" hide-details></v-checkbox>
          </template>
        </ProgramCard>
      </v-slide-group-item>
    </template>
  </v-slide-group>
</template>

<script lang="ts" setup>
import { defineModel, defineProps } from "vue";
import { ISimpleProgram } from "../models";
const props = defineProps<{ items: ISimpleProgram[]; loading: Boolean }>();
const model = defineModel<string[]>();
</script>

<style scoped>
.selected-custom {
  border: rgb(122, 93, 122) 1px solid;
  box-shadow: 0 5px 5px -3px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0 8px 10px 1px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0 3px 14px 2px var(--v-shadow-key-ambient-opacity, rgb(150 83 83 / 39%)) !important;
}
</style>