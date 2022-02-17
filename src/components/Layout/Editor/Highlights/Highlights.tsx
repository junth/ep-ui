import React, { ChangeEvent, useState } from 'react'
import { Flex, Text, Divider, useDisclosure, Badge } from '@chakra-ui/react'
import {
  RiFolder3Fill,
  RiGobletLine,
  RiTranslate2,
  RiSurveyFill,
} from 'react-icons/ri'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/store/hook'
import Button from '@/components/Elements/Button/Button'
import ImageInput from '@/components/Elements/ImageInput/ImageInput'
import Input from '@/components/Elements/Input/Input'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { Category, Content } from '@/types'
import FlexRowContainer from './FlexRowContainer/FlexRowContainer'
import Dropzone from '../../../Elements/Dropzone/Dropzone'
import FlexRow from './FlexRow/FlexRow'
import HighlightsModal from './HighlightsModal/HighlightsModal'

const Highlights = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentWiki = useSelector((state: any) => state.wiki)
  const [hideDropzone, setHideDropzone] = useState(false)
  const [hideImageInput, setHideImageInput] = useState(false)
  const dispatch = useAppDispatch()

  const handleDispatch = (object: Partial<Content>) =>
    dispatch({
      type: 'wiki/setCurrentWiki',
      payload: { content: { ...object } },
    })

  return (
    <Flex
      direction="column"
      minW="360px"
      w={['full', 'full', 400]}
      border="1px"
      borderColor="gray.200"
      borderRadius="7px"
      padding="15px"
    >
      <Flex justifyContent="center" alignItems="center" h="50px">
        <Input
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleDispatch({
              title: event.target.value,
            })
          }}
          value={currentWiki.content.title}
          placeholder="Title goes here"
        />
      </Flex>
      <br />
      {!hideDropzone && (
        <>
          <Dropzone
            setImage={value => {
              handleDispatch({
                images: [{ id: '', type: value }],
              })
            }}
            setHideImageInput={setHideImageInput}
          />
          <br />
        </>
      )}
      {!hideImageInput && <ImageInput setHideDropzone={setHideDropzone} />}

      <Divider my="10px" />
      <Flex direction="column" justifyContent="center" alignItems="center">
        <FlexRowContainer>
          <FlexRow>
            <RiFolder3Fill /> <Text>Page Type</Text>
          </FlexRow>
          <Text>{getWikiMetadataById(currentWiki, 'page-type')?.value}</Text>
        </FlexRowContainer>
        <FlexRowContainer>
          <FlexRow>
            <RiGobletLine /> <Text>Adult Content</Text>
          </FlexRow>
          <Text>
            {getWikiMetadataById(currentWiki, 'adult-content')?.value === true
              ? 'Yes'
              : 'No'}
          </Text>
        </FlexRowContainer>
        <FlexRowContainer>
          <FlexRow>
            <RiTranslate2 /> <Text>Language</Text>
          </FlexRow>
          <Text>{getWikiMetadataById(currentWiki, 'language')?.value}</Text>
        </FlexRowContainer>
        <Flex
          justifyContent="center"
          wrap="wrap"
          alignItems="center"
          direction="row"
        >
          <RiSurveyFill /> <Text ml="2">Categories</Text>
          <br />
          <Flex
            mt="2"
            direction="row"
            wrap="wrap"
            justify="space-evenly"
            w="full"
          >
            {currentWiki.content.categories.map((c: Category) => (
              <Badge variant="outline" m="1">
                {c.title}
              </Badge>
            ))}
          </Flex>
        </Flex>
        <Divider my="5" />
        <Flex
          w="full"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button onClick={onOpen}>Edit</Button>
        </Flex>
      </Flex>
      <HighlightsModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}

export default Highlights
