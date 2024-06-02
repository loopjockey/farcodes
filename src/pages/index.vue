<template>
  <v-container>
    <v-slide-group
      v-model="model"
      class="pa-4"
      selected-class="bg-primary"
      show-arrows
      multiple
    >
      <v-slide-group-item
        v-for="n in 15"
        :key="n"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <v-card
          subtitle="Up is a digital bank designed to help you organise your money and simplify your life. Join in minutes and pay no monthly fees."
          target="_blank"
          title="UpBank"
          width="280"
          :class="['mx-1', selectedClass]"
          @click="toggle"
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
      </v-slide-group-item>
    </v-slide-group>
    <v-row>
      <v-col cols="2">
        <v-sheet rounded="lg" style="position: sticky; top: 80px">
          <v-list rounded="lg">
            <v-list-subheader> Feeds </v-list-subheader>
            <v-list-item
              v-for="n in feedTypes"
              :key="n"
              :title="n.name"
              :prepend-icon="n.icon"
              link
            ></v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item
              color="grey-lighten-4"
              title="Refresh"
              link
              prepend-icon="mdi-refresh"
            ></v-list-item>
          </v-list>
        </v-sheet>
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
</template>

<script lang="ts" setup>
import { ref } from "vue";
const model = ref([]);
const feedTypes = ref([
  { name: "Trending", icon: "mdi-fire" },
  { name: "Recent", icon: "mdi-clock" },
  { name: "Mutuals", icon: "mdi-heart" },
  { name: "Following", icon: "mdi-account-multiple" },
  { name: "Mine", icon: "mdi-account" },
]);
</script>
