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
        v-slot="{ toggle, selectedClass }"
        :value="item.id"
      >
        <v-card
          subtitle="Up is a digital bank designed to help you organise your money and simplify your life. Join in minutes and pay no monthly fees."
          target="_blank"
          :title="item.name"
          width="280"
          :class="['mx-1', selectedClass]"
          @click="toggle"
        >
          <template #prepend>
            <v-avatar rounded="lg">
              <v-img :src="item.avatarUrl"></v-img>
            </v-avatar>
          </template>
          <v-card-actions>
            <RewardChip>{{ item.rewardDescription }}</RewardChip>
          </v-card-actions>
        </v-card>
      </v-slide-group-item>
    </template>
  </v-slide-group>
</template>

<script lang="ts" setup>
import { ref, defineModel, defineProps } from "vue";
import { ISimpleProgram } from "../models";
const props = defineProps<{ items: ISimpleProgram[]; loading: Boolean }>();
const model = defineModel<string[]>();
</script>

