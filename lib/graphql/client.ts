import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "");
export const clientLegacyGraph = process.env.NEXT_PUBLIC_LEGACY_GRAPHQL_ENDPOINT
  ? new GraphQLClient(process.env.NEXT_PUBLIC_LEGACY_GRAPHQL_ENDPOINT || "")
  : null;

export const legacyFetcher = (query: string) => (clientLegacyGraph ? clientLegacyGraph.request(query) : null);
export const fetcher = (query: string) => client.request(query);
export const legacyFetcherWithParams = ([query, params]: [string, any]) =>
  clientLegacyGraph ? clientLegacyGraph.request(query, params) : null;
export const fetcherWithParams = ([query, params]: [string, any]) => client.request(query, params);
