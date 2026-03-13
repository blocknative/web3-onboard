const wordSeparators =
  // eslint-disable-next-line no-useless-escape
  /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/

export function toTitleCase(str: string): string {
  const words = str.split(wordSeparators)
  const len = words.length
  const mappedWords = new Array(len)
  for (let i = 0; i < len; i++) {
    const word = words[i]
    if (word === '') {
      continue
    }
    mappedWords[i] = word[0].toUpperCase() + word.slice(1)
  }
  return mappedWords.join(' ')
}

/**
 * Check if a value is a `string`.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function isString(value: any): value is string {
  return value?.constructor === String
}
