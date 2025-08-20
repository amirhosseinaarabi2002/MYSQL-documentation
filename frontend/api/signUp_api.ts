import axios from "axios";

const API_URL = "http://localhost:3001/api/users";

export interface SignUpData {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}

export const signUpApi = async (data: SignUpData) => {
  try {
    const response = await axios.post(`${API_URL}/new-user`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
