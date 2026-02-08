import { HttpLink } from "@apollo/client";
import {
	ApolloClient,
	InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

export const makeClient = () => {
	const httpLink = new HttpLink({
		uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
		fetchOptions: { cache: "no-store" },
	});

	return new ApolloClient({
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						purchases: {
							keyArgs: ["productIds", "userIds"],
							merge(existing, incoming) {
								if (!existing) {
									return incoming;
								}

								if (!incoming) {
									return existing;
								}

								return {
									...incoming,
									nodes: [...(existing.nodes || []), ...(incoming.nodes || [])],
								};
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
	});
};
