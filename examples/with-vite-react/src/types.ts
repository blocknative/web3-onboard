export interface Account {
  address: string
  ens: { name?: string; avatar?: string }
  balance: Record<string, string> | null
}
