import React, { useEffect, useState } from 'react'
import {
  HStack,
  VStack,
  Heading,
  Text,
  Box,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react'
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
  const editDetails = useBreakpointValue({
    base: (
      <Text fontSize="14px" opacity={0.6}>
        {timeModified} ago
      </Text>
    ),
    md: (
      <Text fontSize="14px" opacity={0.6}>
        {editor} edited <b>{timeModified} ago</b> |{' '}
        {isFirstEdit ? 'First Edit' : `${percentChanged * 100}% Changed `}
      </Text>
    ),
    lg: (
      <Text fontSize="14px" opacity={0.6}>
        {editor} edited <b>{timeModified} ago</b> |{' '}
        {isFirstEdit ? 'First Edit' : `${percentChanged * 100}% Changed `}(
        {wordsChanged} words)
      </Text>
    ),
  })
  const buttonSize = useBreakpointValue({
    base: 'sm',
    lg: 'md',
  })

  useEffect(() => {
    // set last modified time on first render
    setTimeModified(timeSince(lastModTimeStamp))

    // update last modified time every 5 seconds
    const intervalId = setInterval(() => {
      setTimeModified(timeSince(lastModTimeStamp))
    }, 5000)

    // clean up setInterval
    return () => clearInterval(intervalId)
  }, [lastModTimeStamp])

  return (
    <HStack
      bgColor="cardBg"
      justifyContent="space-between"
      borderWidth="1px"
      borderColor="cardBorder"
      borderRadius="lg"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.10)"
      p="5"
      w="100%"
    >
      <HStack maxW="70%">
        <Image
          flexShrink={0}
          src={wikiImg}
          alt="wikiImg"
          h={{ base: 65, lg: 100 }}
          w={{ base: 65, lg: 100 }}
          borderRadius="lg"
          overflow="hidden"
        />
        <VStack
          alignItems="start"
          px={4}
          spacing={{ base: 1, lg: 2 }}
          minW={0}
          mx="auto"
        >
          <Heading
            as="h2"
            fontSize={{ base: '18px', md: '20px' }}
            maxW="100%"
            letterSpacing="wide"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {title}
          </Heading>
          <Box maxH="50px" overflow="hidden">
            <Text display={{ base: 'none', lg: 'flex' }}>{brief}</Text>
          </Box>
          <HStack>{editDetails}</HStack>
        </VStack>
      </HStack>
      <HStack gap={10}>
        <VStack spacing={2} display={{ base: 'none', lg: 'flex' }}>
          <Button>Vote</Button>
          <Text fontSize="14px" opacity={0.6} whiteSpace="nowrap">
            11h 30m remaining
          </Text>
        </VStack>
        <HStack
          marginInlineStart="0 !important"
          flexDirection={{ base: 'column', lg: 'row' }}
          gap={3}
        >
          <Button
            aria-label="up-vote"
            leftIcon={<FaThumbsDown color="#e04c60" />}
            variant="outline"
            p={3}
            size={buttonSize}
            color="linkColor"
          >
            0 IQ
          </Button>
          <Button
            aria-label="up-vote"
            leftIcon={<FaThumbsUp color="#318c48" />}
            variant="outline"
            p={3}
            size={buttonSize}
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
