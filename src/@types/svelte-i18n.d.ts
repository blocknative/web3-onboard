declare module 'svelte-i18n' {
  interface Options {
    fallback: string
    navigator: boolean
  }
  export function getClientLocale(options: Options): string

  export namespace _ {
    export function subscribe(dictionary: any): void
  }

  export namespace dictionary {
    export function set(dictionary: any): void
  }

  export namespace locale {
    export function set(locale: string): void
  }
}
