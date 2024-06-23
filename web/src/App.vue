<template>
  <v-app id="inspire">
    <v-app-bar flat color="background" height="90">
      <v-container
        class="mx-auto d-flex align-center justify-center pt-10 pb-4"
      >
        <router-link to="/" class="site-title bebas-neue-regular">
          FAR . CODES
        </router-link>

        <router-link to="/" class="ml-8 text-primary"> Home </router-link>
        <router-link to="/about" class="ml-8 text-primary"> About </router-link>

        <v-spacer></v-spacer>

        <v-responsive max-width="250">
          <ProgramAutocomplete v-model="selectedProgram" rounded density="compact" hide-details variant="solo-filled" single-line/>
        </v-responsive>
        <template v-if="currentUser">
          <NewReferralDialog v-model="isCreatingReferral" />
          <v-menu location="bottom">
            <template #activator="{ props }">
              <v-btn v-bind="props" icon class="ml-3">
                <v-avatar size="50" start>
                  <v-img
                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                  ></v-img>
                </v-avatar> </v-btn
            ></template>
            <v-list>
              <v-list-item
                prepend-icon="mdi-account-multiple"
                title="My Profile"
                :to="`/profile/${currentUser.fid}`"
              >
              </v-list-item>
              <v-list-item
                prepend-icon="mdi-logout"
                title="Logout"
                @click="logout()"
              >
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <v-btn
          v-else
          @click="login()"
          size="large"
          color="#855dcd"
          variant="flat"
          rounded="lg"
        >
          <v-avatar tile>
            <v-img src="./assets/farcaster.svg"></v-img>
          </v-avatar>
          Login
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore, storeToRefs } from "./stores";
const isCreatingReferral = ref(false);
const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);
const { login, logout } = authStore;
const selectedProgram = ref<{ title:string, value:string } | null>(null);

</script>

<style>
.bebas-neue-regular {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.site-title {
  color: white;
  font-size: 40px;
}
a {
  text-decoration: none;
}
</style>