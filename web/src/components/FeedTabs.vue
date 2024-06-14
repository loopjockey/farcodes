<template>
  <v-tabs
    class="mb-3"
    :direction="direction"
    :align-tabs="direction === 'horizontal' ? 'center' : undefined"
  >
    <v-tab v-for="n in feedTypes" :key="n.id" @click="model = n.id">
      <v-icon start>{{ n.icon }}</v-icon>
      {{ n.name }}
    </v-tab>
  </v-tabs>
</template>

<script lang="ts" setup>
import { defineProps, defineModel } from "vue";
import { FeedType } from "../models/index";
import { computed } from "vue";

const props = defineProps<{
  direction: "vertical" | "horizontal";
  except: Array<String>;
}>();
const model = defineModel<FeedType>();

const feedTypes = computed(() =>
  [
    { id: FeedType.trending, name: "Trending", icon: "mdi-fire" },
    { id: FeedType.recent, name: "Recent", icon: "mdi-clock" },
    { id: FeedType.mutuals, name: "Mutuals", icon: "mdi-heart" },
    { id: FeedType.following, name: "Following", icon: "mdi-account-multiple" },
    { id: FeedType.mine, name: "Mine", icon: "mdi-account" },
  ].filter((t) => !(props.except || []).includes(t.id))
);
</script>