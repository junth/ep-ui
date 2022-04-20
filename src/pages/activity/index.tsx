import React from 'react'
import {
  Box,
  Heading,
  VStack,
  TabPanel,
  TabPanels,
  Tab,
  Tabs,
  TabList,
  Center,
} from '@chakra-ui/react'
import ActivityCard from '@/components/Activity/ActivityCard'
import { ActivityData } from '@/data/ActivityData'
import {
  getLatestActivities,
  useGetLatestActivitiesQuery,
  getRunningOperationPromises,
  TempWikiActivity,
} from '@/services/activities'
import { store } from '@/store/store'
import { ActivityEmptyState } from '@/components/Activity/EmptyState'
import { getWikiSummary } from '@/utils/getWikiSummary'
import { FETCH_DELAY_TIME, ITEM_PER_PAGE } from '@/data/Constants'
import config from '@/config'

const Activity = ({ activities }: { activities: ActivityType[] }) => {
  const [LatestActivityData, setLatestActivityData] = useState<
    ActivityType[] | []
  >(activities)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(0)
  const fetchMoreActivities = () => {
    const updatedOffset = offset + ITEM_PER_PAGE
    setTimeout(() => {
      const fetchNewActivites = async () => {
        const result = await store.dispatch(
          getLatestActivities.initiate({
            limit: ITEM_PER_PAGE,
            offset: updatedOffset,
          }),
        )
        if (result.data && result.data?.length > 0) {
          const data = result.data || []
          const updatedActivities = [...LatestActivityData, ...data]
          setLatestActivityData(updatedActivities)
          setOffset(updatedOffset)
        } else {
          setHasMore(false)
          setLoading(false)
        }
      }
      fetchNewActivites()
    }, FETCH_DELAY_TIME)
  }

const Activity = () => {
  const { data: LatestActivityData, isLoading } = useGetLatestActivitiesQuery()

  const renderActivityCard = (activity: TempWikiActivity, i: number) => (
    <ActivityCard
      id={activity.id}
      key={activity.id}
      title={activity.title}
      brief={getWikiSummary(activity)}
      editor={activity?.user?.id}
      wordsChanged={ActivityData[i].wordsChanged}
      percentChanged={ActivityData[i].percentChanged}
      isFirstEdit={ActivityData[i].isFirstEdit}
      lastModTimeStamp={ActivityData[i].lastModTimeStamp}
      wiki={activity}
    />
  )

  return (
    <Box bgColor="pageBg" mt={-8} mb={-8} pt={8} pb={8}>
      <Box w="min(90%, 1100px)" mx="auto" my={{ base: '10', lg: '16' }}>
        <Heading mt={8} mb={4} as="h1" size="2xl" letterSpacing="wide">
          Recent Activity
        </Heading>
        <Tabs>
          <TabList>
            <Tab>New Wikis</Tab>
            <Tab>Updated Wikis</Tab>
          </TabList>

          <TabPanels>
            {/* Most Recent Activity Section */}
            <TabPanel px={0}>
              <VStack spacing={4}>
                {LatestActivityData?.map((activity, i) =>
                  renderActivityCard(activity, i),
                )}
              </VStack>
            </TabPanel>
            {/* Expiring Soon Activity Section */}
            <TabPanel px={0}>
              <VStack spacing={4}>
                {LatestActivityData?.slice()
                  .reverse()
                  .map((activity, i) =>
                    renderActivityCard(activity, LatestActivityData.length - i),
                  )}
              </VStack>
            </TabPanel>
            {isLoading && <LoadingSkeleton />}
            {!isLoading && !LatestActivityData?.length && (
              <Center>
                <ActivityEmptyState />
              </Center>
            )}
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
}

export const getServerSideProps = config.isDeployingOnVercel
  ? async () => {
      const activities = await store.dispatch(
        getLatestActivities.initiate({ offset: 0, limit: ITEM_PER_PAGE }),
      )
      await Promise.all(getRunningOperationPromises())
      return {
        props: { activities: activities.data },
      }
    }
  : null

export default Activity
