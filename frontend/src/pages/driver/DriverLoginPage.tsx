import { DriverText } from "@/components/driver/driverMain/DriverMainCSS";
import { GlassDiv } from "@/styles/driver/GlassmorphismStyle";
import styled from "styled-components";
import { ButtonDiv } from "@/components/driver/driverReport/DriverReportCSS";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled(GlassDiv)`
  width: 40%;
  min-width: 450px;
  height: 80%;
  min-height: 400px;
  padding: 40px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const LoginFormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const InputField = styled(GlassDiv)`
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 16px;

  input {
    width: 100%;
    border: none;
    background: transparent;
    outline: none;
    font-size: 16px;
    color: #333;

    &::placeholder {
      color: #aaa;
    }
  }
`;

const DriverLoginPage = () => {
  const navigate = useNavigate();

  const [, setVehicleId] = useAtom(vehicleIdAtom);
  const [, setToken] = useAtom(tokenAtom);
  const [, setRefreshToken] = useAtom(refreshTokenAtom);
  const [, setMemberId] = useAtom(memberIdAtom);
  const [, setGrantType] = useAtom(grantTypeAtom);
  const [, setUserInfo] = useAtom(userInfoAtom);
  const [loading, setLoading] = useState(false); // 인증 진행 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    // 여기에 로그인 로직 추가 (API 호출 등)
    try {
      const loginResponse = await axios.post(
        "https://k11c106.p.ssafy.io/api/v1/member/login",
        { username, password }
      );
      const { accessToken, refreshToken, memberId, grantType } =
        loginResponse.data.data;

      // Jotai 상태 업데이트
      console.log("accessToken : ", accessToken);
      console.log("refreshToken : ", refreshToken);
      console.log("memberId : ", memberId);
      console.log("grantType : ", grantType);
      setToken(accessToken);
      setRefreshToken(refreshToken);
      setMemberId(memberId);
      setGrantType(grantType);

      // 사용자 정보 가져오기
      const userInfoResponse = await axios.get(
        "https://k11c106.p.ssafy.io/api/v1/member/info/simple",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { memberType, memberName, additionalInfo } =
        userInfoResponse.data.data;

      console.log("memberType : ", memberType);
      console.log("memberName : ", memberName);
      console.log("additionalInfo : ", additionalInfo);
      setUserInfo({
        memberType,
        memberName,
        additionalInfo,
      });

      // 차량 정보 가져오기
      const vehicleResponse = await axios.get(
        "https://k11c106.p.ssafy.io/api/v1/driver/vehicle/info",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { vehicleId } = vehicleResponse.data.data;
      console.log("vehicleId : ", vehicleId);
      setVehicleId(vehicleId);

      // 로그인 성공 시 /driver로 이동
      navigate("/driver");
    } catch (err) {
      console.error("Login error:", err);
      setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginBody>
      <LoginContainer>
        <DriverText fontSize="30px">로그인</DriverText>
        <LoginFormContainer>
          {/* 아이디 입력 필드 */}
          <InputField>
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputField>
          {/* 비밀번호 입력 필드 */}
          <InputField>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputField>
          {/* 에러 메시지 */}
          {error && (
            <DriverText fontSize="16px" color="red">
              {error}
            </DriverText>
          )}
          {/* 로딩 상태 */}
          {loading ? (
            <DriverText fontSize="16px">로그인 중...</DriverText>
          ) : (
            <ButtonDiv onClick={handleLogin}>
              <DriverText>로그인</DriverText>
            </ButtonDiv>
          )}
        </LoginFormContainer>
      </LoginContainer>
    </LoginBody>
  );
};

export default DriverLoginPage;
