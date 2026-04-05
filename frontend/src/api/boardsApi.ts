import { api } from "./axios";
import type { Board, CreateBoardRequest } from "../types/board";

export async function getBoards(): Promise<Board[]> {
  const response = await api.get<Board[]>("/boards");
  return response.data;
}

export async function createBoard(data: CreateBoardRequest): Promise<Board> {
  const response = await api.post<Board>("/boards", data);
  return response.data;
}

export async function deleteBoard(boardId: number): Promise<void> {
  await api.delete(`/boards/${boardId}`);
}