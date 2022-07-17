const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency',
})


export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number)
}

export function discount_value(value: number, discount_index: number) {
  let discount = value * (discount_index/100)
  return value - discount
}