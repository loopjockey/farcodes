<template>
  <v-container>
    <v-breadcrumbs
      :items="['Profiles', 'Some Guy', 'New Referral Code']"
    ></v-breadcrumbs>
    <v-form class="pt-6">
      <h2 class="mb-3 text-center">🎊 New Referral 🎊</h2>
      <v-autocomplete
        variant="solo"
        prepend-inner-icon="mdi-magnify"
        label="Program Name"
      ></v-autocomplete>
      <v-text-field
        v-for="(t, i) in codes"
        :key="i"
        v-model="t.val"
        variant="solo"
        :label="`Code / URL #${i + 1}`"
      >
        <template #append>
          <v-btn icon variant="text" @click="removeCode(i)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-text-field>

      <v-btn variant="text" block @click="addCode()" class="mb-4">
        <v-icon start>mdi-plus</v-icon>
        Add extra code
      </v-btn>
      <v-text-field
        variant="solo"
        label="Referral Reward"
        v-model="referralReward"
      >
      </v-text-field>
      <v-textarea
        variant="solo"
        label="Program Description"
        v-model="referralReward"
      >
      </v-textarea>
      <v-btn block>
        <v-icon start>
            mdi-check
        </v-icon>
        Submit
      </v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const codes = ref<{ val: string }[]>([]);
const addCode = () => codes.value.push({ val: "" });
const removeCode = (i: number) => codes.value.splice(i, 1);
const referralReward = ref("$5");

addCode();
</script>

<style scoped>
.v-form {
  max-width: 500px;
  margin: auto;
}
</style>