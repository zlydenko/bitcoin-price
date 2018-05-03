const formatPrice = n => {
  const options = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };
  return n.toLocaleString("en-US", options);
};

export default formatPrice;
