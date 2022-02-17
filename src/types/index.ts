export interface Category {
  id: string
  title: string
}

export interface Tag {
  id: string
}

export interface Image {
  id: string
  type: string
}

export interface MData {
  id: string
  value: string
}

export interface User {
  id: string
}

export interface Content {
  createdAt: Date
  title: string
  content: string
  categories: Category[]
  tags: Tag[]
  images: Image[]
  metadata: MData[]
  user: User
}

export interface Wiki {
  id: string
  content: Content
}
