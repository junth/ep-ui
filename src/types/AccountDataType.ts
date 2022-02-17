import { Connector } from 'wagmi'

export type AccountDataType =
  | {
      address: string
      connector: Connector<any, any> | undefined
      ens:
        | {
            avatar: string | null | undefined
            name: string
          }
        | undefined
    }
  | undefined
