export interface User {
  id: number;
  wallets: string[];
  createdAt: Date;
  updatedAt: Date | null;
}
