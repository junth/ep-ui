const shortenBalance = (balance: number | null) =>
  typeof balance === 'number' ? balance.toFixed(3) : balance

export default shortenBalance
