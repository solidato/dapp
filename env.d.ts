namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_PROJECT_KEY: "solidato";
    NEXT_PUBLIC_GRAPHQL_ENDPOINT: string;
    NEXT_PUBLIC_LEGACY_GRAPHQL_ENDPOINT?: string;
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: string;
    NEXT_PUBLIC_IPFS_ENDPOINT: string;
    NEXT_PUBLIC_ENV: "development" | "production";
    COOKIE_NAME: string;
    COOKIE_PASSWORD: string;
    E2E_WALLET_ENDPOINT: string;
    NEXT_PUBLIC_HYPERTUNE_TOKEN: string;
    HYPERTUNE_OUTPUT_FILE_PATH: string;
    JWT_SECRET: string;
  }
}
