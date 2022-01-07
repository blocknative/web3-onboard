import * as ethUtil from 'ethereumjs-util'


export const isValidPath = (path: string) => {
  const parts = path.split('/')
  if (parts[0] !== 'm') {
    return false
  }

  if (parts[1] !== "44'") {
    return false
  }

  if (!["60'", "1'", "73799'", "246'"].includes(parts[2])) {
    return false
  }

  if (parts[3] === undefined || parts[3] === "0'") {
    return true
  }

  const accountFieldNumber = Number(parts[3].slice(0, -1))

  if (
    isNaN(accountFieldNumber) ||
    accountFieldNumber < 0 ||
    parts[3].slice(-1) !== "'"
  ) {
    return false
  }

  if (parts[4] === undefined) {
    return true
  }

  const changeFieldNumber = Number(parts[4])

  if (isNaN(changeFieldNumber) || changeFieldNumber < 0) {
    return false
  }

  if (parts[5] === undefined) {
    return true
  }

  const addressFieldNumber = Number(parts[5])

  if (isNaN(addressFieldNumber) || addressFieldNumber < 0) {
    return false
  }

  return true
}