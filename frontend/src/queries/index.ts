// Role따라 로그인 시키려고
import { useMutation } from "@tanstack/react-query";
import { LoginRequest, User } from "@/interfaces/manager";
import axios from "axios";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const { data } = await axios.post<User>("/api/auth/login", credentials);

      // role이 manager가 아니면 에러 처리
      if (data.role !== "manager") {
        throw new Error("관리자만 접근할 수 있습니다.");
      }

      return data;
    },
  });
};
