<template>
  <v-container>
    <v-card
      v-if="currentProgram"
      :title="currentProgram.name"
      :subtitle="`Joined 2018 • ${profileCodes.length} referral programs`"
      color="background"
    >
      <template #title>
        {{ currentProgram.name }}
      </template>
      <template #subtitle>
        {{ currentProgram.description }}
      </template>
      <template #prepend>
        <v-avatar class="mr-3" size="80">
          <v-img :src="currentProgram.avatarUrl"></v-img>
        </v-avatar>
      </template>
    </v-card>
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

      <v-col v-if="currentProgram">
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
                :title="`${code.creator.name} posted referral for ${currentProgram.name}`"
                subtitle="2 hours ago • 5 codes"
                @click="isViewingCode = true"
              >
                <template #prepend>
                  <v-avatar>
                    <v-img :src="code.creator.avatarUrl"></v-img>
                  </v-avatar>
                  <v-avatar class="ml-1" rounded="lg">
                    <v-img :src="currentProgram.avatarUrl"></v-img>
                  </v-avatar>
                </template>
                <template #append>
                  <RewardChip>{{
                    code.rewardDescription || currentProgram.rewardDescription
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
//TODO
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import PromotionAd from "../../components/PromotionAd.vue";
import { useProgramStore, storeToRefs } from "../../stores";
import { FeedType } from "../../models";
const { mdAndUp } = useDisplay();
const isViewingCode = ref(false);
const programStore = useProgramStore();
const { currentFeedType, currentCodes, currentProgram, isLoadingFeedCodes } =
  storeToRefs(programStore);

</script>
  