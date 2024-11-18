import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
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
  // 토큰 존재 여부로 로그인 상태 체크
  const hasToken = !!localStorage.getItem('accessToken');
  
  return useQuery<User>({
    queryKey: queryKeys.auth.user(),
    queryFn: async () => {
      const res = await axiosInstance.get<User>("/member/info/simple");
      return res.data;
    },
    enabled: hasToken, // 토큰이 있을 때만 요청
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
