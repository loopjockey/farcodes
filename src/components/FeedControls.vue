<template>
  <v-tabs class="mb-3" v-if="type === 'tabs'">
    <v-tab v-for="n in feedTypes" :key="n.id" @click="model = n.id">
      <v-icon start>{{ n.icon }}</v-icon>
      {{ n.name }}
    </v-tab>
  </v-tabs>
  <v-list rounded="lg" v-else>
    <v-list-subheader> Feeds </v-list-subheader>
    <v-list-item
      v-for="n in feedTypes"
      :key="n.id"
      :title="n.name"
      :prepend-icon="n.icon"
      @click="model = n.id"
      link
    ></v-list-item>

    <v-divider class="my-2"></v-divider>

    <v-list-item
      color="grey-lighten-4"
      title="Refresh"
      link
      prepend-icon="mdi-refresh"
    ></v-list-item>
  </v-list>
</template>

<script lang="ts" setup>
import { defineProps, defineModel, ref } from "vue";
import { FeedType } from "../models/index";

defineProps<{ type: "tabs" | "list" }>();
const model = defineModel<FeedType>();

const feedTypes = ref([
  { id: FeedType.trending, name: "Trending", icon: "mdi-fire" },
  { id: FeedType.recent, name: "Recent", icon: "mdi-clock" },
  { id: FeedType.mutuals, name: "Mutuals", icon: "mdi-heart" },
  { id: FeedType.following, name: "Following", icon: "mdi-account-multiple" },
  { id: FeedType.mine, name: "Mine", icon: "mdi-account" },
]);
</script>