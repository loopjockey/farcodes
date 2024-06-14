<template>
  <v-card
    :title="cardTitle.t"
    :subtitle="cardTitle.c"
    rounded="lg"
    :prepend-icon="cardTitle.i"
  >
    <template #append>
      <v-btn variant="text">
        <v-icon start>mdi-refresh</v-icon>
        Refresh
      </v-btn>
    </template>
    <v-skeleton-loader
      type="list-item-avatar-two-line@10"
      v-if="isLoadingFeedCodes"
    ></v-skeleton-loader>
    <v-list lines="two" v-else>
      <template v-for="code in items" :key="code.i">
        <v-list-item
          :title="`${code.creator.name} posted referral for ${code.program.name}`"
          :subtitle="`2 hours ago • 5 codes • ${
            code.rewardDescription || code.program.rewardDescription
          }`"
          @click="isViewingCode = true"
        >
          <template #prepend>
            <v-avatar>
              <v-img :src="code.creator.avatarUrl"></v-img>
            </v-avatar>
            <v-avatar class="ml-1" rounded="lg">
              <v-img :src="code.program.avatarUrl"></v-img>
            </v-avatar>
          </template>
          <template #append>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-list-item>
        <v-divider inset></v-divider>
      </template>
    </v-list>
    <v-card-actions>
      <v-btn variant="tonal" block>
        <v-icon start>mdi-redo</v-icon>
        Load More</v-btn
      >
    </v-card-actions>
    <!--  -->
  </v-card>
  <CodeDialog v-model="isViewingCode"></CodeDialog>
</template>

<script lang="ts" setup>
import { defineProps, computed, ref } from 'vue';
import { ISimpleCodeModel, FeedType } from '../models';

const props = defineProps({
    items: Array<ISimpleCodeModel>,
    loading: Boolean,
    type: String
});

const isViewingCode = ref(false);

const cardTitle = computed(() => {
  switch (props.type || null) {
    case FeedType.trending:
      return {
        t: "Trending",
        c: "The highest ranking posts from trending programs across the platform.",
        i: "mdi-fire",
      };
    case FeedType.recent:
      return {
        t: "Recent",
        c: "The most recent referral codes that have been posted.",
        i: "mdi-clock",
      };
    case FeedType.mutuals:
      return {
        t: "Mutuals",
        c: "Recent codes from all your mutual follows across farcaster.",
        i: "mdi-heart",
      };
    case FeedType.following:
      return {
        t: "Following",
        c: "Recent codes from all farcaster accounts you follow.",
        i: "mdi-account-multiple",
      };
    case FeedType.mine:
      return {
        t: "Mine",
        c: "All of your most recent posts.",
        i: "mdi-account",
      };
    default:
      return {
        t: "Codes",
        c: "The latest codes for this feed type",
        i: "mdi-rss",
      };
  }
});

</script>
