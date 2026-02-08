import { HttpLink } from "@apollo/client";
import {
	ApolloClient,
	InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { paginationMerge } from "./utils";

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
							merge: paginationMerge,
						},
						products: {
							keyArgs: [],
							merge: paginationMerge,
						},
						users: {
							keyArgs: [],
							merge: paginationMerge,
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
