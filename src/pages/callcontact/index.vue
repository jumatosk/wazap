<script setup>
import { reactive } from "vue";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber.js";
import { cleanNumber } from "../../utils/cleanNumber.js";
import { sendMessage } from "../../utils/sendMessage.js";
import "./styles.css";

const number = reactive({ value: "" });
const message = reactive({ value: "" });

const handleInput = (e) => {
  e.preventDefault();
  let value = cleanNumber(e.target.value);
  if (value.length > 11) value = value.slice(0, 11);
  number.value = formatPhoneNumber(value);
};

const handleOpenConversation = () => {
  const cleanedNumber = cleanNumber(number.value);
  sendMessage(cleanedNumber, message.value);
};
</script>
<template>
  <div class="logo-container">
    <label>
      Wazap
      <i class="fa-brands fa-whatsapp"></i>
    </label>
    <p>Abra uma conversa sem precisar salvar o número na sua agenda.</p>
  </div>
  <div class="input-container">
    <div class="input-wrapper">
      <i class="fa fa-phone"></i>
      <input
        v-model="number.value"
        @input="handleInput"
        placeholder="Digite somente o número com DDD"
      />
    </div>
    <textarea
      v-model="message.value"
      placeholder="Digite algo..."
      class="message-input"
      rows="4"
    />
    <button @click="handleOpenConversation">Abrir no whatsapp</button>
  </div>
</template>
