import React, { useState } from 'react'
import {
  Badge,
  CloseButton,
  Divider,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import {
  RiFolder3Fill,
  RiGobletLine,
  RiTimerLine,
  RiTimer2Line,
  RiTranslate2,
  RiSurveyFill,
} from 'react-icons/ri'
import { useSelector } from 'react-redux'
import slugify from 'slugify'

import { useAppDispatch } from '@/store/hook'
import Modal from '@/components/Elements/Modal/Modal'
import Button from '@/components/Elements/Button/Button'
import Select from '@/components/Elements/Select/Select'
import Checkbox from '@/components/Elements/Checkbox/Checkbox'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { Category, Languages, LanguagesISOEnum, MData, Wiki } from '@/types'
import FlexRow from '../FlexRow/FlexRow'

const pageTypeOptions: Array<string> = [
  'Person',
  'Place / Location',
  'Organization / Company / Institution',
  'Event',
  'List / Ranking',
  'Product / Merchandise',
  'Electronics / Software',
  'Medical / Biology',
  'Creative Work / Art',
  'Science / Academia / Humanities',
  'Other',
  'None',
]

const categoryOptions: Array<string> = [
  'NFTs',
  'Person',
  'Athlete',
  'Politics',
  'Miscellaneous',
]

// const languageOptions = [
//   Language.ENGLISH,
//   Language.SPANISH,
//   Language.CHINESE,
//   Language.KOREAN,
// ]

const HighlightsModal = ({ onClose, ...rest }: any) => {
  const dispatch = useAppDispatch()
  const currentWiki = useSelector((state: any) => state.wiki)
  const [wiki, setWiki] = useState<Wiki>({ ...currentWiki })

  const SecondaryButton = (
    <Button
      onClick={() => {
        dispatch({
          type: 'wiki/setCurrentWiki',
          payload: wiki,
        })
        onClose()
      }}
    >
      Submit
    </Button>
  )

  const handleSetWikiMetadata = (ob: MData) => {
    setWiki((prev: Wiki) => ({
      ...prev,
      content: {
        ...prev.content,
        lastModified: new Date().toUTCString(),
        metadata: prev.content.metadata.map((m: MData) =>
          m.id === ob.id ? { ...m, value: ob.value } : m,
        ),
      },
    }))
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  const CustomDivider = () => (
    <GridItem colSpan={2}>
      <Divider />
    </GridItem>
  )

  const handleAddCategory = (category: string) => {
    if (!category) return

    if (!wiki.content.categories.find((c: Category) => c.title === category))
      setWiki((prev: Wiki) => ({
        ...currentWiki,
        content: {
          ...currentWiki.content,
          categories: [
            ...prev.content.categories,
            { id: slugify(category.toLowerCase()), title: category },
          ],
        },
      }))
  }

  const handleDeleteCategory = (category: string) => {
    setWiki({
      ...wiki,
      content: {
        ...wiki.content,
        categories: wiki.content.categories.filter(
          (c: Category) => c.title !== category,
        ),
      },
    })
  }

  return (
    <Modal
      title="Edit metadata"
      enableBottomCloseButton
      SecondaryButton={SecondaryButton}
      onClose={onClose}
      isCentered
      {...rest}
    >
      <SimpleGrid columns={2} spacing={2}>
        <Text>Type</Text>
        <Text>Value</Text>

        <CustomDivider />

        <FlexRow>
          <RiFolder3Fill /> <Text>Page Type</Text>
        </FlexRow>

        <Select
          onChange={event =>
            handleSetWikiMetadata({
              id: 'page-type',
              value: event.target.value,
            })
          }
          value={String(
            wiki.content.metadata.find((m: MData) => m.id === 'page-type')
              ?.value,
          )}
          placeholder="Choose a page type"
        >
          {pageTypeOptions.map(o => (
            <option key={o}>{o}</option>
          ))}
        </Select>

        <CustomDivider />

        <FlexRow>
          <RiSurveyFill /> <Text>Category</Text>
        </FlexRow>

        <Select
          onChange={event => handleAddCategory(event.target.value)}
          placeholder="Choose categories"
        >
          {categoryOptions.map(o => (
            <option key={o}>{o}</option>
          ))}
        </Select>

        <Flex
          flexDirection="row"
          wrap="wrap"
          justify="space-evenly"
          alignItems="center"
          gridColumn="1/3"
        >
          {wiki.content.categories.map((c: Category) => (
            <Badge
              variant="outline"
              display="flex"
              flexDirection="row"
              alignItems="center"
              m="1"
              justifyContent="space-between"
            >
              {c.title}
              <CloseButton
                size="sm"
                outline="none"
                onClick={() => handleDeleteCategory(c.title)}
              />
            </Badge>
          ))}
        </Flex>
        <CustomDivider />

        <FlexRow>
          <RiGobletLine /> <Text>Adult Content</Text>
        </FlexRow>
        <Checkbox
          defaultChecked={
            getWikiMetadataById(currentWiki, 'adult-content')?.value === true
          }
          onChange={event =>
            handleSetWikiMetadata({
              id: 'adult-content',
              value: event.target.checked,
            })
          }
        />

        <CustomDivider />

        <FlexRow>
          <RiTranslate2 /> <Text>Language</Text>
        </FlexRow>
        <Select
          onChange={event =>
            setWiki({
              ...wiki,
              language: event.target.value as LanguagesISOEnum,
            })
          }
          placeholder="Language"
        >
          {Object.keys(Languages).map((o, idx) => (
            <option key={o} value={o}>
              {Object.values(Languages)[idx]}
            </option>
          ))}
        </Select>

        <CustomDivider />

        <FlexRow>
          <RiTimerLine /> <Text>Creation</Text>
        </FlexRow>
        <Text>{wiki.content.createdAt}</Text>

        <CustomDivider />

        <FlexRow>
          <RiTimer2Line /> <Text>Last Modified</Text>
        </FlexRow>
        <Text>
          {currentWiki.content.lastModified !== null
            ? currentWiki.content.lastModified
            : 'No modified date'}
        </Text>
      </SimpleGrid>
    </Modal>
  )
}

export default HighlightsModal
