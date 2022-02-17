import { tokenDetails } from '@/data/WalletData'
import { BalanceType, ParamsType, ErrorType } from '@/types/WalletBalanceType'

export const fetchWalletBalance = async (
  getBalance: (config?: ParamsType) => Promise<BalanceType | ErrorType>,
  arrayOfAddresses: ParamsType[],
) => {
  const results: Promise<BalanceType | ErrorType>[] = []
  arrayOfAddresses.forEach(addr => {
    results.push(getBalance(addr))
  })
  return Promise.all(results)
}

const fetchRate = async (tokenName: string) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${tokenName}&vs_currencies=usd`,
  )
  return (await res.json())[tokenName].usd
}

export const fetchRateAndCalculateTotalBalance = async (
  walletDetails: (BalanceType | ErrorType)[],
) => {
  const prices = walletDetails.map(async wallet => {
    try {
      const tokenName =
        wallet.data?.symbol && tokenDetails[wallet.data?.symbol].name
      if (tokenName) {
        const rate = await fetchRate(tokenName)
        return rate * Number(wallet.data?.formatted)
      }
    } catch (err) {
      console.error(err)
    }
    return 0
  })
  const result = await Promise.all(prices)
  return result.reduce((a, b) => a && b && a + b)
}
