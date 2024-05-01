const text: RegExp = /^[a-zA-Z0-9а-яА-Я]+$/
const email: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-z]{2,4}/
const password: RegExp = /^(?=.*[a-zA-Z0-9])(?!.*[@_\\-^$#&`~"+=/?|]).+$/

export { text, email, password }
