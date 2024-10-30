import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  CommonButton,
  IconSize,
  HomeSvg,
  LocationSvg,
  CarSvg,
  PhoneSvg,
  ReportSvg,
} from "./MenuButton";

const FooterDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 256px;
`;

// 아이콘 컴포넌트와 경로를 함께 관리하는 배열
const iconComponents = [
  { component: HomeSvg, path: "/driver" },
  { component: LocationSvg, path: "/driver/navigation" },
  { component: CarSvg, path: "/driver/car-control" },
  { component: PhoneSvg, path: null },
  { component: ReportSvg, path: "/driver/report" },
];

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState<boolean>(false);

  const handleIconClick = (path: string | null) => {
    if (path) {
      navigate(path);
    } else {
      setIsPhoneModalOpen(true);
    }
  };

  return (
    <>
      <FooterDiv>
        <Menu>
          {iconComponents.map(({ component: Icon, path }, index) => (
            <CommonButton key={index} onClick={() => handleIconClick(path)}>
              <IconSize>
                <Icon />
              </IconSize>
            </CommonButton>
          ))}
        </Menu>
      </FooterDiv>

      {isPhoneModalOpen && (
        <div>
          {/* 모달 콘텐츠를 여기 추가 */}
          <p>전화 모달</p>
          <button onClick={() => setIsPhoneModalOpen(false)}>닫기</button>
        </div>
      )}
    </>
  );
};

export default Footer;
