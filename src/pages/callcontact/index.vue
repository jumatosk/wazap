<script setup>
import { reactive, ref, onMounted } from "vue";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber.js";
import { cleanNumber } from "../../utils/cleanNumber.js";
import { sendMessage } from "../../utils/sendMessage.js";
import { fetchCountriesCode } from "./api.js";
import { formState, brazilDDI } from "./constants.js";
import "./styles.css";

const countries = ref([]);
const form = reactive({ ...formState });

onMounted(async () => {
  countries.value = await fetchCountriesCode();
});

const handleInput = (e) => {
  e.preventDefault();
  let value = cleanNumber(e.target.value);

  if (form.countryDDI != brazilDDI) {
    if (value.length > 12) value = value.slice(0, 12);
    form.number = value.replace(/\D/g, "");
    return;
  } else {
    if (value.length > 11) value = value.slice(0, 11);
    form.number = formatPhoneNumber(value);
  }
};

const handleOpenConversation = () => {
  const cleanedNumber = cleanNumber(form.number);
  sendMessage(form.countryDDI, cleanedNumber, form.message);
};

const handleCountryChange = () => {
  form.number = "";
};
</script>
<template>
  <section class="container">
    <section class="logo-container">
      <label>
        Wazap
        <i class="fa-brands fa-whatsapp"></i>
      </label>
      <p>Converse sem salvar o número na agenda.</p>
    </section>
    <section class="form-container">
      <select
        v-model="form.countryDDI"
        placeholder="Selecione o país"
        @change="handleCountryChange"
      >
        <option
          v-for="country in countries"
          :key="country.code"
          :value="country.ddi"
        >
          {{ country.pais }} (+{{ country.ddi }})
        </option>
      </select>
      <div class="input-wrapper">
        <i class="fa fa-phone"></i>
        <input
          v-model="form.number"
          @input="handleInput"
          placeholder="*********"
        />
      </div>
      <textarea
        v-model="form.message"
        placeholder="Digite uma mensagem..."
        class="message-input"
        rows="4"
      />
      <button @click="handleOpenConversation" :disabled="!form.number">
        Abrir <i class="fa-brands fa-whatsapp"></i>
      </button>
    </section>
  </section>
</template>
