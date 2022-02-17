import { IconType } from 'react-icons/lib'

export type CategoryDataType = Array<CategoryObjDataType>

class CategoryObjDataType {
  slug: string

  title: string

  description: string

  imageCard: string

  imageHero: string

  icon: IconType

  constructor(
    slug: string,
    title: string,
    description: string,
    imageCard: string,
    imageHero: string,
    icon: IconType,
  ) {
    this.slug = slug
    this.title = title
    this.description = description
    this.imageCard = imageCard
    this.imageHero = imageHero
    this.icon = icon
  }
}
