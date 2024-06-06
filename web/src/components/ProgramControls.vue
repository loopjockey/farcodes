<template>
  {{ model }}
  <v-slide-group
    v-model="model"
    class="pa-4"
    selected-class="bg-primary"
    show-arrows
    multiple
  >
    <v-slide-group-item
      v-for="item in props.items || []"
      :key="item.id"
      v-slot="{ isSelected, toggle, selectedClass }"
      :value="item.id"
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
          <v-spacer></v-spacer>
          <v-btn variant="text"> Go To → </v-btn>
        </v-card-actions>
      </v-card>
    </v-slide-group-item>
  </v-slide-group>
</template>

<script lang="ts" setup>
import { ref, defineModel, defineProps } from "vue";
import { ISimpleProgram } from "../models";
const props = defineProps<{ items: ISimpleProgram[] }>();
const model = defineModel<string[]>();
</script>
