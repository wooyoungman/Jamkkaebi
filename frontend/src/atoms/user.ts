// atoms/auth.ts
import { atom } from "jotai";

// 타입 정의
interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
}

// auth 상태를 관리하는 atom
export const authAtom = atom<AuthState>({
  isAuthenticated: !!sessionStorage.getItem("accessToken"),
  accessToken: sessionStorage.getItem("accessToken"),
});

// login mutation용 atom
export const loginAtom = atom(
  null, // read - 사용하지 않으므로 null
  (get, set, accessToken: string) => {
    // sessionStorage에 저장
    sessionStorage.setItem("accessToken", accessToken);
    // atom 상태 업데이트
    set(authAtom, {
      isAuthenticated: true,
      accessToken,
    });
  }
);

// logout용 atom
export const logoutAtom = atom(null, (get, set) => {
  // sessionStorage에서 제거
  sessionStorage.removeItem("accessToken");
  // atom 상태 초기화
  set(authAtom, {
    isAuthenticated: false,
    accessToken: null,
  });
});
