import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import { makeClient } from "./make-client";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
	return makeClient();
});
