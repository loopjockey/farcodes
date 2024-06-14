<template>
  <v-container>
    <FeedTabs
      v-if="!mdAndUp"
      type="tabs"
      v-model="currentFeedType"
      direction="horizontal"
    />
    <ProgramControls
      :items="trendingPrograms"
      :loading="isLoadingTrendingPrograms"
    />

    <v-row>
      <v-col md="3" lg="2" v-if="mdAndUp">
        <div style="position: sticky; top: 80px">
          <v-sheet rounded="lg" class="px-3 py-1">
            <v-list-subheader>Feeds</v-list-subheader>
            <FeedTabs
              type="list"
              direction="vertical"
              v-model="currentFeedType"
            />
          </v-sheet>
          <PromotionAd />
        </div>
      </v-col>

      <v-col>
        <FeedCard
          :loading="isLoadingFeedCodes"
          :type="currentFeedType"
          :items="currentCodes"
        />
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
import { useCodesStore, storeToRefs } from "../stores";
const { mdAndUp } = useDisplay();
const codesStore = useCodesStore();
const {
  currentFeedType,
  trendingPrograms,
  currentCodes,
  isLoadingTrendingPrograms,
  isLoadingFeedCodes,
} = storeToRefs(codesStore);
</script>
