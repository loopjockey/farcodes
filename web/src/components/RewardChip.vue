<template>
  <v-chip :color="color" class="reward-chip text-center" rounded="lg">
    <v-icon icon="mdi-wallet" start></v-icon>
    <slot></slot>
  </v-chip>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
defineProps({
  color: {
    type: String,
    default: "red"
  }
})
</script>

<style scoped>
.reward-chip {
  width:100%
}
.reward-chip >>> .v-chip__content {
  margin:auto
}
</style>