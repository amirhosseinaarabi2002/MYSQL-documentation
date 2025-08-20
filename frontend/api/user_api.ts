import axios from "axios";

const API_URL = "http://localhost:3001/api/users";

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  date: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  const res = await axios.get(`${API_URL}/all-users`);
  return res.data;
};

export const deleteUser = async (id: number) => {
  const res = await axios.delete(`${API_URL}/remove/${id}`);
  return res.data;
};

export const updateUser = async (id: number, data: Omit<User, "id" | "date">) => {
  const res = await axios.put(`${API_URL}/edit/${id}`, data);
  return res.data;
};
