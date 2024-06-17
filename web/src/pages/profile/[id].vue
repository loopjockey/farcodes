<template>
  <v-container>
    <v-card
      v-if="profileUser"
      :title="profileUser.name"
      :subtitle="`Joined 2018 • ${profileCodes.length} referral programs`"
      color="background"
    >
      <template #title>
        {{ profileUser.name }} • @{{ profileUser.username }}
      </template>
      <template #subtitle>
        <a :href="`https://farcaster.id/${profileUser.username}`"
          >View Farcaster</a
        >
        • Joined 2018
      </template>
      <template #prepend>
        <v-avatar class="mr-3" size="80">
          <v-img :src="profileUser.avatarUrl"></v-img>
        </v-avatar>
      </template>
    </v-card>

    <v-tabs>
      <v-tab>
        <v-icon start>mdi-tag</v-icon>
        {{ profileCodes.length }} Programs</v-tab
      >
    </v-tabs>

    <ProgramGrid :loading="isLoadingProfileData" :items="profileCodes" />
  </v-container>
</template>
    
<script lang="ts" setup>
import { ref, watch } from "vue";
import { useProfileStore, storeToRefs } from "../../stores";
import { useRoute } from "vue-router";
const currentRoute = useRoute();
const profileStore = useProfileStore();
const { targetUserFid, profileCodes, isLoadingProfileData, profileUser } =
  storeToRefs(profileStore);

watch(
  () => currentRoute,
  () => {
    targetUserFid.value = Number(currentRoute.params.id);
  },
  { immediate: true, deep: true }
);
</script>