export function numberFormatter(price: number, noOfDecimals: number) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: noOfDecimals,
    maximumFractionDigits: noOfDecimals,
  }).format(price);
  return formattedPrice;
}
