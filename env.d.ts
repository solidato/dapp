namespace NodeJS {
  interface ProcessEnv {
    ODOO_ENDPOINT: string;
    ODOO_DB_NAME: string;
    NEXT_PUBLIC_PROJECT_KEY: "neokingdom" | "teledisko";
    NEXT_PUBLIC_GRAPHQL_ENDPOINT: string;
    COOKIE_NAME: string;
    COOKIE_PASSWORD: string;
  }
}
