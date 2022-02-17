import shortenAccount from './shortenAccount'

export const getAccount = (account: any, shorten = false): string =>
  // eslint-disable-next-line no-nested-ternary
  account?.ens?.name
    ? `${account.ens?.name}`
    : shorten
    ? shortenAccount(account?.address)
    : account?.address
