import { RootState } from '@/store/store'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const authenticatedRoute = (WrappedComponent: any) =>
  function (props: any) {
    const router = useRouter()
    const {user} = useSelector((state: RootState) => state.user)
    useEffect(() => {
      if (!user) {
        router.push('/login')
      }
    }, [])
    if (user) {
      return <WrappedComponent {...props} />
    }
    return null
  }

export default authenticatedRoute
