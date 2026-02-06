import { gql } from "@apollo/client";

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