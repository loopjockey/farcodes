<template>
  <v-dialog v-model="model">
    <v-card
      class="mx-auto"
      title="Guy Incognito x UpMoney"
      subtitle="2 hours ago • $5 Discount"
      max-width="600"
    >
      <template #prepend>
        <!-- TODO -->
        <v-btn icon to="/profile/123">
          <v-avatar>
            <v-img
              src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            ></v-img>
          </v-avatar>
        </v-btn>
        <v-btn icon to="/program/123">
          <v-avatar class="ml-1" rounded="lg">
            <v-img
              src="https://d2xqxjfvpb1oa6.cloudfront.net/eyJidWNrZXQiOiJpbnZpdGF0aW9udXBsb2FkcyIsImtleSI6Imludml0YXRpb24uYXBwLnVwLmNvbS5hdS1wcm9tby1jb2Rlc19lMmJiYWQuYXUiLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjI1NiwiaGVpZ2h0IjoyNTYsImZpdCI6ImNvbnRhaW4iLCJ3aXRob3V0RW5sYXJnZW1lbnQiOnRydWV9fX0="
            ></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <template #append>
        <v-btn flat icon @click="model = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <v-card-text class="pb-0">
        <v-list>
          <v-list-item v-for="i in 5" :key="i">
            <template #prepend> {{ i }}. &nbsp;&nbsp;&nbsp; </template>
            <v-list-item-title>
              <h1 class="bebas-neue-regular">D3H-342-243234-=24...</h1>
            </v-list-item-title>
            <template #append>
              <v-btn icon flat>
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
              <v-btn icon flat>
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <!-- TODO -->
        <v-btn block flat :to="`/program/123`">
          More Codes <v-icon end>mdi-open-in-new</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { defineModel } from "vue";
const model = defineModel<Boolean>();
</script>