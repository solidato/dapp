import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "");

export const fetcher = (query: string, variables: any) => client.request(query, variables);
