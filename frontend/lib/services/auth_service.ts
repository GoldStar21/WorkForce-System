import api_config from "../api_config";

interface LoginResponse {
  username: string;
  role: string;
}
interface setPasswordRequest {
  token: string | null;
  password: string;
}

// Login function
export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const serverResponse = await api_config.post<LoginResponse>("/auth/login", {
    username,
   password,
  });
  return serverResponse.data; // vraća samo username i role
};

// Logout function
export const logout = async (): Promise<void> => {
  await api_config.post("/auth/logout");
};

// Register
export const setPasswordService = async (data: setPasswordRequest): Promise<void> => {
  await api_config.post("/employees/set-password", data);
};