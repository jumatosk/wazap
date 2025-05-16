import {cleanNumber} from "./cleanNumber"
export const formatPhoneNumber = (value) => {
  const cleaned = cleanNumber(value);
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return cleaned;
};