import { Connector } from 'wagmi'
import {
  FetchEnsAvatarResult,
  FetchEnsNameResult,
} from 'wagmi/node_modules/@wagmi/core'

export type AccountDataType =
  | {
      address: string
      // eslint-disable-next-line
      connector: Connector<any, any> | undefined
      ens:
        | {
            avatar: FetchEnsAvatarResult | undefined
            name: FetchEnsNameResult | undefined
          }
        | undefined
    }
  | undefined
