export const formatAmountInput = (event) => {
  value.value = event.target.value
    .replace(/[^\d.,]/g, "")
    .replace(/(,.*),/g, "$1");
};
