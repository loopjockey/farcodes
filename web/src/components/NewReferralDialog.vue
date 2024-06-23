<template>
  <v-dialog v-model="model" scrollable max-width="600">
    <template #activator="{ props }">
      <v-btn class="ml-2" color="primary" variant="flat" v-bind="props">
        <v-icon start>mdi-plus</v-icon>
        New Code
      </v-btn>
    </template>
    <v-card color="background">
      <v-card-title class="text-center py-4"> 🎊 New Referral 🎊 </v-card-title>
      <v-card-text>
        <v-form>
          <ProgramAutocomplete v-model="searchedProgramId" variant="solo" :single-line="!!searchedProgramId"/>
          <v-text-field
            v-for="(t, i) in codes"
            :key="i"
            v-model="t.val"
            variant="solo"
            :label="`Code / URL #${i + 1}`"
          >
            <template #append>
              <v-btn icon variant="text" @click="addCode()" v-if="i === codes.length - 1">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn icon variant="text" @click="removeCode(i)" v-else>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn block variant="flat" color="success">
          <v-icon start>mdi-check</v-icon>
          Submit Referral</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, defineModel } from "vue";
import { ISimpleProgram } from "../models";
import { DUMMY_PROGRAM } from "../models/dummy";
const model = defineModel<Boolean>();
const searchedProgramId = ref<string | null>(null);
const codes = ref<{ val: string }[]>([]);
const addCode = () => codes.value.push({ val: "" });
const removeCode = (i: number) => codes.value.splice(i, 1);
const referralReward = ref("$5");

addCode();
</script>