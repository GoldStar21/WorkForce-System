import api from "./api";

interface LoginResponse {
  username: string;
  role: string;
}



// Login function
export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const serverResponse = await api.post<LoginResponse>("/login", {
    username,
   password,
  });
  return serverResponse.data; // vraća samo username i role
};

// Logout function
export const logout = async (): Promise<void> => {
  await api.post("/logout");
};
