<template>
    <v-container>
      <v-breadcrumbs :items="['Profiles', 'Some Guy']"></v-breadcrumbs>
      <v-card
        title="Some Guy"
        subtitle="Joined 2018 • 23 referral programs "
        color="background"
      >
        <template #prepend>
          <v-avatar class="mr-3" size="80" v-bind="props">
            <v-img
              src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
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
        <v-col v-for="n in 12" :key="n" cols="12" sm="6" lg="4" xl="3">
          <v-card
            @click="isViewingCode = true"
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
    <CodeDialog v-model="isViewingCode"></CodeDialog>
  </template>
    
    <script lang="ts" setup>
  import { ref } from "vue";
  const isViewingCode = ref(false);
  </script>