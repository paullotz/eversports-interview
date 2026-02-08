"use client";

import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";
import type { FC, PropsWithChildren } from "react";
import { makeClient } from "./make-client";

if (process.env.NODE_ENV !== "production") {
	loadDevMessages();
	loadErrorMessages();
}

export const ApolloWrapper: FC<PropsWithChildren> = ({ children }) => {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	);
};
