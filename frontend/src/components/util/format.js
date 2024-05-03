export const formatDate = (date) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);

  return formattedDate;
};

export const formatCurrency = (currency) => {
  const formattedCurrency = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(currency);

  return formattedCurrency;
};
