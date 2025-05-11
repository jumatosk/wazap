<script setup>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { maxLength } from "@vuelidate/validators";

const number = reactive({ value: "" });
const rules = {
  number: {
    maxLength: maxLength(14),
  }
};

const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return cleaned;
};

const handleInput = (e) => {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);
  number.value = formatPhoneNumber(value);
};

const handleOpenConversation = () => {
  const cleanedNumber = number.value.replace(/\D/g, "");
  const url = `https://api.whatsapp.com/send?phone=55${cleanedNumber}`;
  window.open(url, "_blank");
};

const v$ = useVuelidate(rules, { number });
</script>

<template>
  <div>
    {{ v$.number.$errors }}
    <div :class="{ error: v$.number.$errors.length }">
      <input
        v-model="number.value"
        @input="handleInput"
        placeholder="(xx) xxxxx-xxxx"
      >
      <div class="input-errors" v-for="error of v$.number.$errors" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
      <button @click="handleOpenConversation">Abrir no whatsapp</button>
    </div>
  </div>
</template>

<style scoped></style>
