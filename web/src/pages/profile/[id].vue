<template>
  <v-container>
    <v-card
      v-if="profileUser"
      :title="profileUser.name"
      :subtitle="`Joined 2018 • ${profileCodes.length} referral programs`"
      color="background"
    >
      <template #prepend>
        <v-avatar class="mr-3" size="80">
          <v-img
            :src="profileUser.avatarUrl"
          ></v-img>
        </v-avatar>
      </template>
      <v-card-actions>
        <v-btn>
          <v-avatar rounded="lg" start size="28">
            <v-img src="../assets/farcaster.svg"></v-img>
          </v-avatar>
          Farcaster profile
        </v-btn>
        •
        <v-btn>
          <v-icon start color="red">mdi-heart</v-icon>
          Tip Account
        </v-btn>
        •
        <v-btn>
          <v-icon start color="yellow">mdi-bank</v-icon>
          See Bags
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-row class="mt-3">
      <template v-if="isLoadingProfileData">
        <v-col v-for="i in 9" :key="i" cols="12" sm="6" lg="4" xl="3">
          <v-skeleton-loader
            type="article"
            width="100%"
            class="mx-1"
          ></v-skeleton-loader>
        </v-col>
      </template>
      <template v-else>
        <v-col
          v-for="c in profileCodes"
          :key="c.id"
          cols="12"
          sm="6"
          lg="4"
          xl="3"
        >
          <v-card
            @click="isViewingCode = true"
            subtitle="TODO BLAH BLAH BLAH"
            target="_blank"
            :title="c.program.name"
          >
            <template #prepend>
              <v-avatar rounded="lg">
                <v-img :src="c.program.avatarUrl"></v-img>
              </v-avatar>
            </template>
            <v-card-actions>
              <v-chip color="red">
                <v-icon icon="mdi-wallet" start></v-icon>
                {{ c.rewardDescription || c.program.rewardDescription }}
              </v-chip>
            </v-card-actions>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
  <CodeDialog v-model="isViewingCode"></CodeDialog>
</template>
    
<script lang="ts" setup>
import { ref, watch } from "vue";
import { useProfileStore, storeToRefs } from "../../stores";
import { useRoute } from "vue-router";
const currentRoute = useRoute();
const profileStore = useProfileStore();
const { targetUserFid, profileCodes, isLoadingProfileData, profileUser } =
  storeToRefs(profileStore);
const isViewingCode = ref(false);

watch(
  () => currentRoute,
  () => {
    targetUserFid.value = Number(currentRoute.params.id);
  },
  { immediate: true, deep: true }
);
</script>