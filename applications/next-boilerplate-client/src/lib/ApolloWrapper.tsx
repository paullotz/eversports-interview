'use client'

import { HttpLink } from '@apollo/client'
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'

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
            },
          },
        },
      },
    }),
    link: httpLink,
    devtools: {
      enabled: true,
    },
    connectToDevTools: true,
  })
}

export default function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
