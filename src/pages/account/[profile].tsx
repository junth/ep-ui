import { Image } from '@/components/Elements/Image/Image'
import { Collections } from '@/components/Profile/Collections'
import { useProfile } from '@/components/Profile/useProfile'
import UserInfo from '@/components/Profile/UserInfo'
import { ProfileProvider } from '@/components/Profile/utils'
import { UserProfileHeader } from '@/components/SEO/UserProfile'
import config from '@/config'
import { useUserProfileData } from '@/services/profile/utils'
import { Flex, Spinner, Box } from '@chakra-ui/react'
import { BaseProvider, StaticJsonRpcProvider } from '@ethersproject/providers'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export type PageWithoutFooter = NextPage & {
  noFooter?: boolean
}

const Profile: PageWithoutFooter = () => {
  const router = useRouter()
  const address = router.query.profile as string
  const { profileData, setAccount, loading } = useUserProfileData(address)

  useEffect(() => {
    if (address) {
      setAccount(address)
    }
  }, [address, setAccount])

  const profileContext = useProfile()

  return (
    <>
      <UserProfileHeader
        username={profileData?.username || address}
        bio={profileData?.bio}
        avatarIPFS={profileData?.avatar}
        links={profileData?.links[0]}
      />
      <ProfileProvider value={profileContext}>
        <Flex mt={-2} direction="column" align="center" pos="relative">
          <Image
            width="full"
            height="56"
            objectFit="cover"
            bgColor="profileBannerBg"
            backgroundImage="/images/homepage-bg-white.png"
            _dark={{
              backgroundImage: '/images/homepage-bg-dark.png',
            }}
            src={`${config.pinataBaseUrl}${profileData?.banner}`}
          />
          {!loading ? (
            <>
              <UserInfo />
              <Collections />
            </>
          ) : (
            <Box mt="20">
              <Spinner size="xl" />
            </Box>
          )}
        </Flex>
      </ProfileProvider>
    </>
  )
}
Profile.noFooter = true

export const getServerSideProps: GetServerSideProps = async context => {
  const userIdentifier = context.params?.profile as string

  // TODO: check if userIdentifier is from user profile and redirect to profile page

  if (userIdentifier.endsWith('.eth')) {
    const provider: BaseProvider = new StaticJsonRpcProvider(config.ensRPC)
    const resolvedAddress = (await provider.resolveName(
      userIdentifier,
    )) as string
    if (resolvedAddress) {
      return {
        redirect: {
          destination: `/account/${resolvedAddress}`,
          permanent: false,
        },
      }
    }
  }
  return {
    props: {},
  }
}

export default React.memo(Profile)
