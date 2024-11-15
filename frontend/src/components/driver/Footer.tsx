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
} from "../../styles/driver/MenuButton";

const FooterDiv = styled.div`
  display: flex;
  width: 100%;
  min-width: 1000px;
  justify-content: center;
  align-items: center;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 65%;
`;

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState<boolean>(false);

  // 아이콘과 실제 경로를 포함한 배열
  const iconComponents = [
    { component: HomeSvg, path: `/driver` },
    { component: LocationSvg, path: `/driver/navigation` },
    { component: CarSvg, path: `/driver/car-control` },
    { component: PhoneSvg, path: null },
    { component: ReportSvg, path: `/driver/report` },
  ];

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
