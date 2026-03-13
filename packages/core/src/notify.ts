export function typeToDismissTimeout(type: string): number {
  switch (type) {
    case 'success':
    case 'hint':
      return 4000
    default:
      return 0
  }
}
