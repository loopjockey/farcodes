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
            density="compact"
            label="Search programs..."
            prepend-inner-icon="mdi-magnify"
            rounded="lg"
            variant="solo-filled"
            flat
            hide-details
            single-line
          ></v-text-field>
        </v-responsive>
        <v-btn class="ml-3" color="red" variant="tonal" to="/new/referral">
          <v-icon start>mdi-plus</v-icon>
          New Code
        </v-btn>

        <v-menu bottom left>
          <template #activator="{ props }">
            <v-avatar class="ml-3" v-bind="props">
              <v-img
                src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
              ></v-img> </v-avatar
          ></template>
          <v-list>
            <v-list-item
              prepend-icon="mdi-account-multiple"
              title="My Profile"
              to="/profile/123"
            >
            </v-list-item>
            <v-list-item prepend-icon="mdi-chart-areaspline" title="Analytics">
            </v-list-item>

            <v-list-item prepend-icon="mdi-logout" title="Logout">
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const links = ref(["Feed", "Dashboard", "Programs"]);
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