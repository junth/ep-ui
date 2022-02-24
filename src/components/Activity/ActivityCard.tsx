import React, { useEffect, useState } from 'react'
import { HStack, VStack, Heading, Text, Button } from '@chakra-ui/react'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import { Image } from '../Elements/Image/Image'

interface ActivityCardProps {
  wikiImg: string
  title: string
  brief: string
  editor: string
  wordsChanged: number
  isFirstEdit: boolean
  percentChanged: number
  lastModTimeStamp: string
}

function timeSince(timeStamp: string) {
  const seconds = Math.floor(
    (new Date().valueOf() - new Date(timeStamp).valueOf()) / 1000,
  )

  let interval = seconds / 31536000

  if (interval > 1) {
    return `${Math.floor(interval)} years`
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return `${Math.floor(interval)} months`
  }
  interval = seconds / 86400
  if (interval > 1) {
    return `${Math.floor(interval)} days`
  }
  interval = seconds / 3600
  if (interval > 1) {
    return `${Math.floor(interval)} hours`
  }
  interval = seconds / 60
  if (interval > 1) {
    return `${Math.floor(interval)} minutes`
  }
  return `${Math.floor(seconds)} seconds`
}

const ActivityCard = ({
  wikiImg,
  title,
  brief,
  editor,
  wordsChanged,
  percentChanged,
  isFirstEdit,
  lastModTimeStamp,
}: ActivityCardProps) => {
  const [timeModified, setTimeModified] = useState<string | null>()

  useEffect(() => {
    // set last modified time on first render
    setTimeModified(timeSince(lastModTimeStamp))

    // update last modified time every 5 seconds
    const intervalId = setInterval(() => {
      setTimeModified(timeSince(lastModTimeStamp))
    }, 5000)

    // clean up setInterval
    return () => clearInterval(intervalId)
  })

  return (
    <HStack
      bgColor="cardBg"
      justifyContent="space-between"
      borderWidth="1px"
      borderColor="cardBorder"
      borderRadius="lg"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.10)"
      p={4}
      w="100%"
    >
      <HStack>
        <Image
          src={wikiImg}
          alt="wikiImg"
          h={100}
          w={100}
          borderRadius="lg"
          overflow="hidden"
        />
        <VStack
          alignItems="start"
          p={4}
          maxW="xl"
          mx="auto"
          my={{ base: '10', lg: '16' }}
        >
          <Heading as="h2" size="md" letterSpacing="wide">
            {title}
          </Heading>
          <Text>{brief}</Text>
          <HStack>
            <Text fontSize="14px" opacity={0.6}>
              {/* God's General edited 2 hours ago | First Edit (547 words) | Comment */}
              {editor} edited <b>{timeModified} ago</b> |{' '}
              {isFirstEdit ? 'First Edit' : `${percentChanged * 100}% Changed `}
              ({wordsChanged} words)
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <HStack spacing={10}>
        <VStack spacing={2}>
          <Button>Vote</Button>
          <Text fontSize="14px" opacity={0.6}>
            11h 30m remaining
          </Text>
        </VStack>
        <HStack spacing={3}>
          <Button
            aria-label="up-vote"
            leftIcon={<FaThumbsDown color="#e04c60" />}
            variant="outline"
            p={3}
            size="md"
            color="linkColor"
          >
            0 IQ
          </Button>
          <Button
            aria-label="up-vote"
            leftIcon={<FaThumbsUp color="#318c48" />}
            variant="outline"
            p={3}
            size="md"
            color="linkColor"
          >
            50 IQ
          </Button>
        </HStack>
      </HStack>
    </HStack>
  )
}

export default ActivityCard
