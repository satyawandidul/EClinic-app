export default {
  required: (value) => !!value || 'Required',
  email: (value) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Invalid e-mail'
  },
  Number: (value) => {
    if (value === undefined) return true
    const pattern = /^[0-9]+$/
    return pattern.test(value) || 'Invalid input'
  },
  NonZero: (value) => {
    if (isNaN(value)) return 'Invalid Input'
    if (value > 0) return true
    return 'Non zero value required'
  },
}