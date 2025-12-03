export const formatRupiah = (num: number) => {
  // Format number with thousands separator and no fraction digits,
  // then prefix with 'Rp' without any separating space.
  const formatter = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currency: 'IDR'
  })

  return `Rp${formatter.format(num)}`
}