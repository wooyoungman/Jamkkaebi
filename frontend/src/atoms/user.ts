import { atom } from "jotai";

// 타입 정의
interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

// auth 상태를 관리하는 atom
export const authAtom = atom<AuthState>({
  isAuthenticated: !!localStorage.getItem("accessToken"),
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
});

// login mutation용 atom
export const loginAtom = atom(
  null, // read - 사용하지 않으므로 null
  (get, set, accessToken: string, refreshToken: string) => {
    // localStorage에 저장
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    // atom 상태 업데이트
    set(authAtom, {
      isAuthenticated: true,
      accessToken,
      refreshToken,
    });
  }
);

// logout용 atom
export const logoutAtom = atom(null, (get, set) => {
  // localStorage에서 제거
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  // atom 상태 초기화
  set(authAtom, {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
  });
});
