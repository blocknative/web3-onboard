import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n'
import merge from 'lodash.merge'
import en from './en.json'
import type { i18nOptions } from '../types.js'

function initialize(options?: i18nOptions): void {
  if (options) {
    const { en: customizedEn } = options
    const merged = merge(en, customizedEn || {})
    addMessages('en', merged)

    const customLocales = Object.keys(options).filter(key => key !== 'en')

    // Sync register all customLocales
    customLocales.forEach(locale => {
      const dictionary = options[locale]
      dictionary && addMessages(locale, dictionary)
    })
  } else {
    addMessages('en', en)
  }

  init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator()
  })
}

export default initialize
