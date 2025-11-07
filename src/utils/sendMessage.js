export const sendMessage = (ddi, number, message) => {
  const url = `https://api.whatsapp.com/send?phone=${ddi}${number}&text=${encodeURIComponent(
    message
  )}`;
  window.open(url, "_blank");
};
