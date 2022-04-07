import { gql } from 'graphql-request'

export const GET_WIKI_BY_ID = gql`
  query GetWiki($id: String!) {
    wiki(id: $id) {
      id
      ipfs
      created
      title
      content
      categories {
        id
        title
      }
      tags {
        id
      }
      images {
        id
        type
      }
      metadata {
        id
        value
      }
      user {
        id
      }
    }
  }
`

export const GET_WIKIS = gql`
  query GetWikis {
    wikis {
      id
      ipfs
      content
      created
      title
      content
      categories {
        id
        title
      }
      tags {
        id
      }
      images {
        id
        type
      }
      metadata {
        id
      }
      user {
        id
      }
    }
  }
`

export const GET_PROMOTED_WIKIS = gql`
  query GetPromotedWikis {
    promotedWikis {
      id
      ipfs
      content
      created
      title
      content
      categories {
        id
        title
      }
      tags {
        id
      }
      images {
        id
        type
      }
      metadata {
        id
      }
      user {
        id
      }
    }
  }
`

export const GET_USER_WIKIS_BY_ID = gql`
  query GetUserWikis($id: String!, $limit: Int, $offset: Int) {
    userById(id: $id) {
      wikis(offset: $offset, limit: $limit) {
        id
        ipfs
        title
        created
        updated
        content
        categories {
          id
          title
        }
        tags {
          id
        }
        images {
          id
          type
        }
        metadata {
          id
          value
        }
        user {
          id
        }
      }
    }
  }
`

export const GET_WIKIS_BY_CATEGORY = gql`
  query GetUserWikisByCategory($category: String!, $offset: Int, $limit: Int) {
    wikisByCategory(category: $category, offset: $offset, limit: $limit) {
      id
      ipfs
      content
      created
      title
      content
      categories {
        id
        title
      }
      tags {
        id
      }
      images {
        id
        type
      }
      metadata {
        id
      }
      user {
        id
      }
    }
  }
`
