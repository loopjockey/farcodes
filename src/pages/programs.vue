<template>
  <v-container>
    <v-toolbar flat color="background">
      <v-toolbar-title>
        <v-icon start>mdi-fire</v-icon>
        Hot Programs
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs>
        <v-tab>Recent</v-tab>
        <v-tab>Hot</v-tab>
        <v-tab>Value</v-tab>
      </v-tabs>
    </v-toolbar>

    <v-row class="mt-3">
      <v-col v-for="n in 12" :key="n" cols="4">
        <v-card
          href="https://github.com/vuetifyjs/vuetify/"
          rel="noopener"
          subtitle="Up is a digital bank designed to help you organise your money and simplify your life. Join in minutes and pay no monthly fees."
          target="_blank"
          title="UpBank"
        >
          <template #prepend>
            <v-avatar rounded="lg">
              <v-img
                src="https://d2xqxjfvpb1oa6.cloudfront.net/eyJidWNrZXQiOiJpbnZpdGF0aW9udXBsb2FkcyIsImtleSI6Imludml0YXRpb24uYXBwLnVwLmNvbS5hdS1wcm9tby1jb2Rlc19lMmJiYWQuYXUiLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjI1NiwiaGVpZ2h0IjoyNTYsImZpdCI6ImNvbnRhaW4iLCJ3aXRob3V0RW5sYXJnZW1lbnQiOnRydWV9fX0="
              ></v-img>
            </v-avatar>
          </template>
          <v-card-actions>
            <v-chip color="red">
              <v-icon icon="mdi-wallet" start></v-icon>
              +$10 Reward
            </v-chip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const model = ref(null);
</script>