import { NextResponse, NextRequest } from 'next/server'
import appConfig from '@/config'
import { BaseProvider, StaticJsonRpcProvider } from '@ethersproject/providers'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const userIdentifier = pathname.replace('/account/', '')
  const ethAddressReg = /^0x[a-fA-F0-9]{40}$/
  const isWalletAddress = ethAddressReg.test(userIdentifier)

  if (!isWalletAddress) {
    // TODO: check if userIdentifier is from user profile and redirect to profile page

    // check if userIdentifier is eth address
    if (userIdentifier.endsWith('.eth')) {
      const provider: BaseProvider = new StaticJsonRpcProvider(appConfig.ensRPC)
      const resolvedAddress = (await provider.resolveName(
        userIdentifier,
      )) as string
      if (resolvedAddress) {
        return NextResponse.redirect(
          `${appConfig.publicDomain}/account/${resolvedAddress}`,
        )
      }
    }
  }
  return NextResponse.next()
}
