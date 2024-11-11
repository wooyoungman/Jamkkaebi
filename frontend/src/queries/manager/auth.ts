import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserInfo,
} from "@interfaces/manager";
import { queryKeys } from "@queries/index";

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

export const useGetUserInfo = () => {
  return useQuery<UserInfo>({
    queryKey: queryKeys.auth.user(),
    queryFn: async () => {
      const res = await axiosInstance.get<UserInfo>("/member/info/simple");
      return res.data;
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
