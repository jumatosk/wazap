<script setup>
import { reactive } from "vue";
import { formatPhoneNumber } from "../utils/formatPhoneNumber.js";
import { cleanNumber } from "../utils/cleanNumber.js";
import { sendMessage } from "../utils/sendMessage.js";

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
  </div>
  <br />
  <button @click="handleOpenConversation">Abrir no whatsapp</button>
</template>
<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  max-width: 400px;
}

.input-wrapper {
  position: relative;
  width: 500px;
}

.input-wrapper input {
  width: 100%;
  height: 50px;
  padding-left: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  color: #4a4a4a;
  box-sizing: border-box;
  background-color: white;
}

.input-wrapper i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 20px;
  pointer-events: none;
}

.message-input {
  width: 500px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  color: #4a4a4a;
  box-sizing: border-box;
  background-color: white;
}

button {
  width: 100%;
  height: 50px;
  background-color: #25d366;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1da851;
}

p {
  font-size: 14px;
  color: #888;
  text-align: center;
  margin-top: 10px;
}

input,
textarea {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif !important;
}

textarea {
  padding: 10px;
}
</style>
