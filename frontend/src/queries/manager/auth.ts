import { useMutation } from "@tanstack/react-query";
import { LoginRequest, RegisterRequest } from "@interfaces/manager";
import axiosInstance from "../axiosInstance";

interface AuthResponse<T> {
  status: number;
  message: string;
  timestamp: string;
  data: T;
}

interface LoginResponseData {
  memberId: number;
  grantType: string;
  accessToken: string;
  refreshToken: string;
}

interface RegisterResponseData {
  name: string;
  username: string;
  registerDate: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await axiosInstance.post<
        AuthResponse<LoginResponseData>
      >("/member/login", credentials);
      return response.data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: RegisterRequest) => {
      const response = await axiosInstance.post<
        AuthResponse<RegisterResponseData>
      >("/member/register", userData);
      return response.data;
    },
  });
};
