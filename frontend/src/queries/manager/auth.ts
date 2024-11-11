import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@interfaces/manager";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (loginData: LoginRequest) => {
      const response = await axiosInstance.post<LoginResponse>(
        "/member/login",
        loginData
      );

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return response.data;
    },
  });
};

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: async (userData: RegisterRequest) => {
      const response = await axiosInstance.post<RegisterResponse>(
        "/member/register",
        userData
      );
      return response.data;
    },
  });
};
