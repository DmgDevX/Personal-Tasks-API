import { api } from "./axios";
import type { User } from "../types/user";

export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>("/users/me");
  return response.data;
}