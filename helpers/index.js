export const formatearDinero = cantidad => {
  return cantidad.toLocaleString('en-US', {
    styke: 'currency',
    currency: 'USD',

  })
}