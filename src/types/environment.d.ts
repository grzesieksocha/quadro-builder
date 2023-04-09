export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URL: string;
      HEADLESS: boolean;
    }
  }
}
