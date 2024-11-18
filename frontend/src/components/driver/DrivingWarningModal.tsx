import { useRef } from "react";
import styled from "styled-components";
import {
  Card,
  GrayLine,
  RedLine,
  EclipseDiv,
  GrayEclipseSVG,
  BlueEclipseSVG,
  ModalGlassDiv,
  RightRedEclipse,
  LeftRedEclipse,
  RightRedEclipseDiv,
  LeftRedEclipseDiv,
} from "@/styles/driver/GlassmorphismStyle";
import { WarningSVG } from "@/styles/driver/WarningModal";
import { DriverText } from "./driverMain/DriverMainCSS";
import { ButtonDiv } from "./driverReport/DriverReportCSS";
import { useAtom } from "jotai";
import {
  driverStateDataAtom,
  isFastAPISuccessAtom,
  serverDriverStateDataAtom,
} from "@/atoms/driver/socket";
import { vehicleIdAtom, tokenAtom } from "@/atoms/driver/carInfo";
import { useEffect, useState } from "react";
import axios from "axios";
import wakeUp from "@/assets/wakeUp.wav";

// 화면 중앙 정렬을 위한 스타일 적용
const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%; /* 필요시 조정 */
  height: 100%; /* 필요시 조정 */
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달이 다른 요소 위에 표시되도록 설정 */
`;

const CustomModalGlassDiv = styled(ModalGlassDiv)`
  padding-top: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomButtonDiv = styled(ButtonDiv)`
  margin-top: auto; /* 상단의 다른 내용과 간격을 자동으로 확보하여 하단으로 이동 */
  align-self: center; /* 버튼을 가운데 정렬 (필요시) */
`;

// interface DrivingWarningModalProps {
//   onClose: () => void;
// }

const DrivingWarningModal: React.FC = () => {
  const [driverStateData] = useAtom(driverStateDataAtom);
  const [serverDriverStateData] = useAtom(serverDriverStateDataAtom);
  const [isFastAPISuccess] = useAtom(isFastAPISuccessAtom);

  const [vehicleId] = useAtom(vehicleIdAtom);
  const [token] = useAtom(tokenAtom);

  const [isVisible, setIsVisible] = useState(false);
  const wakeRoutineTriggered = useRef(false); // `executeWakeRoutine` 실행 여부 추적
  const audioInterval = useRef<NodeJS.Timeout | null>(null);

  // 현재 사용할 데이터 결정
  const activeData = isFastAPISuccess ? driverStateData : serverDriverStateData;

  // // 경고 음성 재생 함수
  // const playWarningVoice = (message: string) => {
  //   const utterance = new SpeechSynthesisUtterance(message);
  //   utterance.lang = "ko-KR"; // 한국어 설정
  //   utterance.rate = 1; // 기본 속도
  //   utterance.pitch = 1; // 기본 톤
  //   utterance.volume = 1; // 최대 음량
  //   window.speechSynthesis.speak(utterance);
  // };

  // 경고 음성 재생 함수
  const playWarningSound = () => {
    const audio = new Audio(wakeUp);
    audio.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });
  };

  useEffect(() => {
    if (
      activeData?.predictions.classification === "ASLEEP" &&
      vehicleId &&
      token &&
      !wakeRoutineTriggered.current && // `executeWakeRoutine`이 실행되지 않은 경우만 실행
      activeData !== driverStateData
    ) {
      console.log("졸음이 감지되었습니다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      setIsVisible(true);
      wakeRoutineTriggered.current = true; // `executeWakeRoutine` 실행 상태로 설정

      // playWarningVoice("졸음이 감지되었습니다. 휴식을 취하세요.");

      // 음성 반복 재생 설정
      audioInterval.current = setInterval(() => {
        playWarningSound();
      }, 2000); // 2초 간격으로 재생

      executeWakeRoutine(vehicleId, token); // API 호출
    }
  }, [activeData?.predictions.classification, vehicleId, token]);

  const executeWakeRoutine = async (vehicleId: string, token: string) => {
    try {
      const API_URL = `https://k11c106.p.ssafy.io/api/v1/vehicle/control/wake/${vehicleId}`;
      const response = await axios.post(API_URL, null, {
        headers: {
          Authorization: `Bearer ${token}`, // 토큰 추가
        },
      });
      console.log("졸음 깨우기 루틴 실행 성공:", response.data);
    } catch (error) {
      console.error("졸음 깨우기 루틴 실행 실패:", error);
    }
  };

  // 졸음 루틴 종료 API 호출 함수
  const endWakeRoutine = async () => {
    if (!vehicleId || !token) {
      console.error("차량 ID 또는 인증 토큰이 없습니다.");
      return;
    }

    try {
      const API_URL = `https://k11c106.p.ssafy.io/api/v1/vehicle/control/awake/${vehicleId}`;
      const response = await axios.post(API_URL, null, {
        headers: {
          Authorization: `Bearer ${token}`, // 토큰 추가
        },
      });
      console.log("졸음 깨우기 루틴 종료 성공:", response.data);
    } catch (error) {
      console.error("졸음 깨우기 루틴 종료 실패:", error);
    } finally {
      setIsVisible(false); // 모달 닫기
      wakeRoutineTriggered.current = false; // 다음 감지를 위해 초기화

      // 음성 반복 재생 중단
      if (audioInterval.current) {
        clearInterval(audioInterval.current);
        audioInterval.current = null;
      }
    }
  };

  // 모달이 표시되지 않을 경우 null 반환
  if (!isVisible) return null;

  return (
    <ModalWrapper>
      <Card cardwidth="400px" cardheight="550px">
        <GrayLine
          cardwidth="56%"
          opacity={0.8}
          position="top"
          offsetleft="7%"
        />
        <RedLine opacity={0.6} position="left" />
        <RedLine opacity={0.6} position="right" />
        <LeftRedEclipseDiv top="20%">
          <LeftRedEclipse />
        </LeftRedEclipseDiv>
        <RightRedEclipseDiv top="20%">
          <RightRedEclipse />
        </RightRedEclipseDiv>
        <EclipseDiv cardwidth="66%" cardheight="14%" top="1%">
          <GrayEclipseSVG cardwidth="100%" cardheight="100%" />
        </EclipseDiv>
        <EclipseDiv cardwidth="66%" cardheight="14%" bottom="1%">
          <BlueEclipseSVG cardwidth="100%" cardheight="100%" />
        </EclipseDiv>
        <GrayLine
          cardwidth="289px"
          opacity={0.6}
          position="bottom"
          centered={true}
        />
        <CustomModalGlassDiv
          onClick={(e) => e.stopPropagation()}
          cardwidth="100%"
          cardheight="100%"
        >
          <WarningSVG />
          <DriverText fontSize="30px" fontWeight={700}>
            경고!
          </DriverText>
          <DriverText
            color="#e0e0e0"
            fontSize="15px"
            fontWeight={400}
            lineHeight={1.4}
          >
            졸음 수치가 위험 수준까지 도달하였습니다.
            <br />
            안전한 운행을 위해 휴식을 취해주세요.
          </DriverText>
          <CustomButtonDiv onClick={endWakeRoutine}>
            <DriverText fontSize="20px" fontWeight={600}>
              확인
            </DriverText>
          </CustomButtonDiv>
        </CustomModalGlassDiv>
      </Card>
    </ModalWrapper>
  );
};

export default DrivingWarningModal;
