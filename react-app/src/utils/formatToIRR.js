export const formatToRial = (amount) => {
  return new Intl.NumberFormat('fa-IR', { style: 'currency', currency: 'IRR' }).format(Math.abs(amount)).split(' ').reverse().join(' ')
}
