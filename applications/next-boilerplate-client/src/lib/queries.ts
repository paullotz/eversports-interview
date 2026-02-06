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

export const PRODUCTS = gql`
  query Products($first: Int) {
    Products(first: $first) {
      nodes {
        id
        firstName
        lastName
      }
    }
  }
`
