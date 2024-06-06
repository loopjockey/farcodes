<template>
  <v-container>
    <ProgramControls :items="trendingPrograms" />
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
          rounded="lg"
          title="Trending Codes"
          prepend-icon="mdi-fire"
          subtitle="Recent codes from the hottest referral programs currently"
        >
          <template #append>
            <v-btn variant="text">
              <v-icon start>mdi-refresh</v-icon>
              Refresh
            </v-btn>
          </template>
          <v-list lines="two">
            <template v-for="i in 20" :key="i">
              <v-list-item
                title="Guy Incognito posted referral for UpMoney"
                subtitle="2 hours ago • 5 codes"
                @click="isViewingCode = true"
              >
                <template #prepend>
                  <v-avatar>
                    <v-img
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                    ></v-img>
                  </v-avatar>
                  <v-avatar class="ml-1" rounded="lg">
                    <v-img
                      src="https://d2xqxjfvpb1oa6.cloudfront.net/eyJidWNrZXQiOiJpbnZpdGF0aW9udXBsb2FkcyIsImtleSI6Imludml0YXRpb24uYXBwLnVwLmNvbS5hdS1wcm9tby1jb2Rlc19lMmJiYWQuYXUiLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjI1NiwiaGVpZ2h0IjoyNTYsImZpdCI6ImNvbnRhaW4iLCJ3aXRob3V0RW5sYXJnZW1lbnQiOnRydWV9fX0="
                    ></v-img>
                  </v-avatar>
                </template>
                <template #append>
                  <v-chip class="ma-2" color="red">
                    <v-icon icon="mdi-wallet" start></v-icon>
                    +$10 Reward
                  </v-chip>
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
import { ref } from "vue";
import { useDisplay } from "vuetify";
import PromotionAd from "../components/PromotionAd.vue";
import { useCodesStore, useProfileStore, storeToRefs } from '../stores'
const { mdAndUp } = useDisplay();
const isViewingCode = ref(false);
const codesStore = useCodesStore();
const { currentFeedType, trendingPrograms } = storeToRefs(codesStore);
</script>
