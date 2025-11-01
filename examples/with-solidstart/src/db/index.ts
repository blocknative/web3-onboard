import { createStorage } from "unstorage";
import fsLiteDriver from "unstorage/drivers/fs-lite";
import type { User } from "./schema";

const storage = createStorage({ driver: fsLiteDriver({ base: "./.data" }) });

export async function createUserFromWallet(wallet: string) {
  try {
    const users = (await storage.getItem<User[]>("users:data")) ?? [];
    const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
    const user: User = {
      id: maxId + 1,
      wallets: [wallet],
      createdAt: new Date(),
      updatedAt: null
    };
    await storage.setItem("users:data", [...users, user]);
    return user;
  } catch {
    throw new Error("Failed to create user");
  }
}

export async function getUserFromWallet(wallet: string) {
  try {
    const users = (await storage.getItem<User[]>("users:data")) ?? [];
    return users.find((u) => u.wallets.includes(wallet));
  } catch {
    throw new Error("Failed to find user by address");
  }
}

export async function addNewWallet(id: number, wallet: string) {
  try {
    const users = (await storage.getItem<User[]>("users:data")) ?? [];
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) throw new Error(`User with id ${id} not found`);
    const user = users[userIndex];
    if (!user.wallets.includes(wallet)) {
      user.wallets.push(wallet);
    }
    user.updatedAt = new Date();
    await storage.setItem("users:data", users);
    return user;
  } catch {
    throw new Error("Failed to update user wallet");
  }
}

export type { User };
