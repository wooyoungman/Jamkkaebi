import { useAtom } from "jotai";
import {
  vehicleIdAtom,
  tokenAtom,
  refreshTokenAtom,
  memberIdAtom,
  grantTypeAtom,
  userInfoAtom,
} from "@/atoms/driver/carInfo";
import axios from "axios";
import { useEffect, useState } from "react";

const DriverLogin: React.FC = () => {
  const [, setVehicleId] = useAtom(vehicleIdAtom);
  const [, setToken] = useAtom(tokenAtom);
  const [, setRefreshToken] = useAtom(refreshTokenAtom);
  const [, setMemberId] = useAtom(memberIdAtom);
  const [, setGrantType] = useAtom(grantTypeAtom);
  const [, setUserInfo] = useAtom(userInfoAtom);
  const [loading, setLoading] = useState(true); // 인증 진행 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  const login = async (): Promise<string | null> => {
    try {
      const response = await axios.post(
        "https://k11c106.p.ssafy.io/api/v1/member/login",
        {
          username: "***REMOVED***",
          password: "***REMOVED***",
        }
      );
      console.log("Login API Response:", response);

      const { accessToken, refreshToken, memberId, grantType } =
        response.data.data;

      // Jotai 상태에 API 응답 데이터 저장
      setToken(accessToken);
      setRefreshToken(refreshToken);
      setMemberId(memberId);
      setGrantType(grantType);

      return accessToken;
    } catch (err) {
      console.error("Login API Failed:", err);
      setError("로그인 실패: 아이디와 비밀번호를 확인하세요."); // 에러 상태 설정
      return null;
    }
  };

  // 사용자 정보 조회 함수
  const fetchUserInfo = async (accessToken: string) => {
    try {
      const response = await axios.get(
        "https://k11c106.p.ssafy.io/api/v1/member/info/simple",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("User Info API Response:", response);

      const { memberType, memberName, additionalInfo } = response.data.data;

      // 사용자 정보 상태 업데이트
      setUserInfo({
        memberType,
        memberName,
        additionalInfo,
      });
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      setError("사용자 정보를 가져오는 데 실패했습니다.");
    }
  };

  const fetchVehicleId = async (accessToken: string) => {
    try {
      const response = await axios.get(
        "https://k11c106.p.ssafy.io/api/v1/driver/vehicle/info",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Vehicle ID API Response:", response);

      const { vehicleId } = response.data.data;

      setVehicleId(vehicleId);
    } catch (err) {
      console.error("Failed to fetch vehicle ID:", err);
      setError("차량 정보를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 로그인 및 차량 ID 가져오는 useEffect
  useEffect(() => {
    const authenticate = async () => {
      const accessToken = await login(); // 로그인 시도

      if (accessToken) {
        await Promise.all([
          fetchUserInfo(accessToken), // 사용자 정보 가져오기
          fetchVehicleId(accessToken), // 차량 정보 가져오기
        ]);
      }
      setLoading(false); // 모든 작업 완료 후 로딩 종료
    };

    authenticate();
  }, []); // 컴포넌트 마운트 시 실행

  if (loading) {
    return (
      <div>
        <p>인증 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  return null;
};

export default DriverLogin;
