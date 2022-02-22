import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAccount } from 'wagmi'

export const authenticatedRoute = (WrappedComponent: any) =>
  function (props: any) {
    const [{ data: accountData }] = useAccount({
      fetchEns: true,
    })
    const router = useRouter()
    const states = useSelector(state => state)
    useEffect(() => {
        console.log(states)
        console.log(states)
        console.log(states)
        console.log(states)
        console.log(states)
      if (!accountData) {
        router.push('/login')
      }
    }, [])
    if (accountData) {
      return <WrappedComponent {...props} />
    }
    return null
  }

export default authenticatedRoute
