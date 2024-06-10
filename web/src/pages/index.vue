<template>
  <v-container>
    <ProgramControls
      :items="trendingPrograms"
      :loading="isLoadingTrendingPrograms"
    />
    <FeedControls v-if="!mdAndUp" type="tabs" v-model="currentFeedType" />
    <v-row>
      <v-col md="3" lg="2" v-if="mdAndUp">
        <div style="position: sticky; top: 80px">
          <v-sheet rounded="lg">
            <FeedControls type="list" v-model="currentFeedType" />
          </v-sheet>
          <PromotionAd />
        </div>
      </v-col>

      <v-col>
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
            <template v-for="code in currentCodes" :key="code.i">
              <v-list-item
                :title="`${code.creator.name} posted referral for ${code.program.name}`"
                subtitle="2 hours ago • 5 codes"
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
                  <RewardChip>{{
                    code.rewardDescription || code.program.rewardDescription
                  }}</RewardChip>
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
      </v-col>
    </v-row>
  </v-container>
  <CodeDialog v-model="isViewingCode"></CodeDialog>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import PromotionAd from "../components/PromotionAd.vue";
import { useCodesStore, storeToRefs } from "../stores";
import { FeedType } from "../models";
import RewardChip from "../components/RewardChip.vue";
const { mdAndUp } = useDisplay();
const isViewingCode = ref(false);
const codesStore = useCodesStore();
const {
  currentFeedType,
  trendingPrograms,
  currentCodes,
  isLoadingTrendingPrograms,
  isLoadingFeedCodes,
} = storeToRefs(codesStore);

const cardTitle = computed(() => {
  switch (currentFeedType.value) {
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
