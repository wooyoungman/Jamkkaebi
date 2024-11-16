import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import {
  CommonButton,
  IconSize,
  HomeSvg,
  LocationSvg,
  CarSvg,
  PhoneSvg,
  ReportSvg,
} from "../../styles/driver/MenuButton";
// import DrivingWarningModal from "./DrivingWarningModal";

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

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

const Footer: React.FC = () => {
  const navigate = useNavigate();
  // const [isPhoneModalOpen, setIsPhoneModalOpen] = useState<boolean>(false);

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
    }
    // else {
    //   setIsPhoneModalOpen(true);
    // }
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

      {/* {isPhoneModalOpen && (
        <ModalOverlay>
          <DrivingWarningModal onClose={() => setIsPhoneModalOpen(false)} />
        </ModalOverlay>
      )} */}
    </>
  );
};

export default Footer;
