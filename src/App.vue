<template>
  <v-app id="inspire">
    <v-app-bar flat color="background" height="90">
      <v-container
        class="mx-auto d-flex align-center justify-center pt-10 pb-4"
      >
        <router-link to="/" class="site-title bebas-neue-regular">
          FAR . CODES
        </router-link>

        <v-spacer></v-spacer>

        <v-responsive max-width="250">
          <v-text-field
            label="Search programs..."
            prepend-inner-icon="mdi-magnify"
            rounded="lg"
            variant="solo-filled"
            flat
            hide-details
            single-line
          ></v-text-field>
        </v-responsive>
        <template v-if="currentUser">
          <v-btn
            class="ml-3"
            color="red"
            size="x-large"
            variant="tonal"
            to="/new/referral"
          >
            <v-icon start>mdi-plus</v-icon>
            New Code
          </v-btn>
          <v-menu location="bottom">
            <template #activator="{ props }">
              <v-btn v-bind="props" icon class="ml-3">
                <v-avatar  size="50" >
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
                prepend-icon="mdi-chart-areaspline"
                title="Analytics"
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
          @click="login()"
          size="large"
          v-else
          color="#855dcd"
          variant="flat"
          class="ml-3"
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
import { useProfileStore, storeToRefs } from "./stores";
const profileStore = useProfileStore();
const { currentUser } = storeToRefs(profileStore);
const { login, logout } = profileStore;
</script>

<style>
.bebas-neue-regular {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.site-title {
  color: white;
  text-decoration: none;
  font-size: 40px;
}
</style>