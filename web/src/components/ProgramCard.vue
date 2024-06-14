<template>
  <v-card :title="programName">
    <template #subtitle>
      {{ rewardDescription }}
    </template>
    <template #prepend>
      <v-avatar rounded="lg">
        <v-img :src="programAvatarUrl"></v-img>
      </v-avatar>
    </template>
    <template #append>
      <slot name="append"></slot>
    </template>
    <v-card-text v-if="programDescription">
      {{ programDescription }}
    </v-card-text>
    <v-card-text v-else-if="programTags && programTags.length">
      <v-chip rounded="lg" class="mr-1" v-for="(t, i) in programTags || []" :key="i">
        {{ t }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
defineProps({
  rewardDescription: String,
  programName: String,
  programAvatarUrl: String,
  programDescription: String,
  programTags: Array<String>
});
</script>