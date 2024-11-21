export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | number | boolean;
      SUMMARY_PATH: boolean;
      NO_SETUP: boolean;
    }
  }
}
