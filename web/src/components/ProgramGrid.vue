<template>
  <v-row class="mt-3">
    <template v-if="loading">
      <v-col v-for="i in 9" :key="i" cols="12" sm="6" lg="4" xl="3">
        <v-skeleton-loader
          type="article"
          width="100%"
          class="mx-1"
        ></v-skeleton-loader>
      </v-col>
    </template>
    <template v-else>
      <v-col v-for="c in items" :key="c.id" cols="12" sm="6" lg="4" xl="3">
        <ProgramCard
          @click="isViewingCode = true"
          :reward-description="
            c.rewardDescription || c.program.rewardDescription
          "
          :program-avatar-url="c.program.avatarUrl"
          :program-description="c.program.description"
          :program-name="c.program.name"
        >
          <template #actions>
            <v-btn variant="tonal" color="success"
              >Visibility: {{ c.visibility }}
              <v-icon end>mdi-trending-up</v-icon></v-btn
            >
            <v-spacer></v-spacer>
            <v-btn>
              <v-icon start>mdi-eye</v-icon>
              {{ c.viewCount }} Views</v-btn
            >
          </template>
        </ProgramCard>
      </v-col>
    </template>
  </v-row>
  <CodeDialog v-model="isViewingCode"></CodeDialog>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";
import { ISimpleCodeModel, IHasProgram, IHasVisibilityStats } from "../models";

defineProps({
  items: Array<ISimpleCodeModel & IHasProgram & IHasVisibilityStats>,
  loading: Boolean,
});

const isViewingCode = ref(false);
</script>