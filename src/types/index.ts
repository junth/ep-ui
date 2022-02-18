export interface Category {
  id: string
  title: string
}

export interface Tag {
  id: string
}

export interface Image {
  id: string
  type: string | ArrayBuffer | null
}

export interface MData {
  id: string
  value: string | boolean
}

export interface User {
  id: string
}

export interface Content {
  createdAt: number | string
  lastModified: number | string | null
  title: string
  content: string
  categories: Category[]
  tags: Tag[]
  images: Image[]
  metadata: MData[]
  user?: User
}

export enum Language {
  SPANISH = 'Español',
  ENGLISH = 'English',
  CHINESE = '中文',
  KOREAN = '한국어',
}

export interface Wiki {
  id: string
  version: number
  content: Content
  language: Language
}
