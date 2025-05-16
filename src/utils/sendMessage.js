export const sendMessage = (number, message) =>  {
    const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}