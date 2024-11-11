import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 에러 처리
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          throw new Error("아이디/비밀번호를 확인해주세요.");
        case 409:
          throw new Error("이미 사용중인 아이디입니다.");
        default:
          throw new Error("알 수 없는 오류가 발생했습니다.");
      }
    }
    throw error;
  }
);

export default axiosInstance;
