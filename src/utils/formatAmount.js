export const sanitizeAmountInput = (rawValue) => {
  return String(rawValue ?? "")
    .replace(/[^\d.,]/g, "")
    .replace(/(,.*),/g, "$1");
};

export const parseAmount = (rawValue) => {
  const sanitized = sanitizeAmountInput(rawValue).trim();

  if (!sanitized) {
    return null;
  }

  const lastComma = sanitized.lastIndexOf(",");
  const lastDot = sanitized.lastIndexOf(".");
  const decimalSeparator = lastComma > lastDot ? "," : ".";

  let normalized = sanitized;

  if (lastComma !== -1 || lastDot !== -1) {
    const thousandsSeparator = decimalSeparator === "," ? /\./g : /,/g;
    normalized = sanitized
      .replace(thousandsSeparator, "")
      .replace(decimalSeparator, ".");
  }

  const amount = Number.parseFloat(normalized);

  if (!Number.isFinite(amount) || amount <= 0) {
    return null;
  }

  return amount;
};

export const formatAmount = (value) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "US 0,00";
  }
  return formatter.format(value);
};
