import { gql } from '@apollo/client'

export const PRODUCTS_QUERY = gql`
  query Products($first: Int) {
    products(first: $first) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        name
      }
    }
  }
`
export const USERS_QUERY = gql`
  query Users($first: Int) {
    users(first: $first) {
      nodes {
        id
        firstName
        lastName
      }
    }
  }
`

export const PURCHASES_QUERY = gql`
  query Purchases($first: Int, $productIds: [ID], $userIds: [ID]) {
    purchases(first: $first, productIds: $productIds, userIds: $userIds) {
      nodes {
        id
        product {
          id
          name
          imageUrl
        }
        user {
          id
          firstName
          lastName
          name @client
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`
