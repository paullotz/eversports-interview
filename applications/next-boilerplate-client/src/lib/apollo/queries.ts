import { gql } from "@apollo/client";

export const PRODUCTS_QUERY = gql`
  query Products($first: Int, $after: String) {
    products(first: $first, after: $after) {
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
`;
export const USERS_QUERY = gql`
  query Users($first: Int, $after: String) {
    users(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        firstName
        lastName
      }
    }
  }
`;

export const PURCHASES_QUERY = gql`
  query Purchases(
    $first: Int
    $after: String
    $productIds: [ID]
    $userIds: [ID]
  ) {
    purchases(
      first: $first
      after: $after
      productIds: $productIds
      userIds: $userIds
    ) {
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
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
