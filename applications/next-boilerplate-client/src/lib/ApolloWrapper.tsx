'use client'

import { HttpLink } from '@apollo/client'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support'

if (process.env.NODE_ENV !== 'production') {
  loadDevMessages()
  loadErrorMessages()
}

function makeClient() {
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/',
    fetchOptions: { cache: 'no-store' },
  })

  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            purchases: {
              keyArgs: ['productIds', 'userIds'],
              merge(existing, incoming) {
                if (!existing) {
                  return incoming
                }

                if (!incoming) {
                  return existing
                }

                return {
                  ...incoming,
                  nodes: [...(existing.nodes || []), ...(incoming.nodes || [])],
                }
              },
            },
          },
        },
      },
    }),
    link: httpLink,
    devtools: {
      enabled: true,
    },
  })
}

export default function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
