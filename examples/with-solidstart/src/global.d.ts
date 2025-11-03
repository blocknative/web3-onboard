/// <reference types="@solidjs/start/env" />

declare namespace NodeJS {
  interface ProcessEnv {
    SESSION_SECRET: string;
  }
}
