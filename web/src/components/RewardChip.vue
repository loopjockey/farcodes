<template>
  <v-chip color="red" class="reward-chip text-center" rounded="lg">
    <v-icon icon="mdi-wallet" start></v-icon>
    <slot></slot>
  </v-chip>
</template>

<style scoped>
.reward-chip {
  width:100%
}
.reward-chip >>> .v-chip__content {
  margin:auto
}
</style>