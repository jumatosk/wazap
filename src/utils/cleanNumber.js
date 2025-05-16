export const cleanNumber = (value) => {
    if(!value) return;
    return value.replace(/\D/g, "");
}