module.exports = {
  sleep: (name) => {
    return `Be quite ! ${name} is sleeping... `
  },
  buy: (price, balance) => {
    if (balance < price) {
      return 'U dont have much money'
    } else {
      return balance-price
    }
  }
}