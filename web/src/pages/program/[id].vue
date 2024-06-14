<template>
  <v-container>
    <v-card
      v-if="currentProgram"
      :title="currentProgram.name"
      :subtitle="currentProgram.description"
      color="background"
      class="mb-3"
    >
      <template #prepend>
        <v-avatar class="mr-3" size="80">
          <v-img :src="currentProgram.avatarUrl"></v-img>
        </v-avatar>
      </template>
    </v-card>
    <FeedTabs
      v-if="!mdAndUp"
      type="tabs"
      v-model="currentFeedType"
      direction="horizontal"
      :except="[ 'trending' ]"
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
              :except="[ 'trending' ]"
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
import { ref, watch } from "vue";
import { useDisplay } from "vuetify";
import { useRoute } from "vue-router";
import { useProgramStore, storeToRefs } from "../../stores";
const { mdAndUp } = useDisplay();
const programStore = useProgramStore();
const currentRoute = useRoute();

const {
  currentFeedType,
  currentCodes,
  currentProgram,
  currentProgramId,
  isLoadingFeedCodes,
} = storeToRefs(programStore);

watch(
  () => currentRoute,
  () => {
    currentProgramId.value = currentRoute.params.id as string;
  },
  { immediate: true, deep: true }
);
</script>
  