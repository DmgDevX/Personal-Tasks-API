export interface Board {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export interface CreateBoardRequest {
  name: string;
  description: string;
}