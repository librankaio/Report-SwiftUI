export function numberFormat(number, decimals = 2, decPoint = '.', thousandsSep = ',') {
  number = parseFloat(number);

  if (!isFinite(number)) {
    return '';
  }

  const fixed = number.toFixed(decimals);
  const parts = fixed.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);
  return parts.join(decPoint);
}
