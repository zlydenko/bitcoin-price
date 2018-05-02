const formatPrice = n => {
  const options = {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };
  return n.toLocaleString("en-US", options);
};

export default formatPrice;
