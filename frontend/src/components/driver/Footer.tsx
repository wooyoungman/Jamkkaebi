import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

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
  };

  // 현재 경로가 로그인 페이지인지 확인
  const isOnLoginPage = location.pathname === "/driver/login";

  return (
    <>
      <FooterDiv>
        <Menu>
          {iconComponents.map(({ component: Icon, path }, index) => (
            <CommonButton
              key={index}
              onClick={isOnLoginPage ? undefined : () => handleIconClick(path)} // 클릭 비활성화
              style={{
                cursor: isOnLoginPage ? "not-allowed" : "pointer", // 클릭 불가 커서
                opacity: isOnLoginPage ? 0.5 : 1, // 비활성화 시 투명도 조정
                pointerEvents: isOnLoginPage ? "none" : "auto", // 클릭 이벤트 차단
              }}
            >
              <IconSize>
                <Icon />
              </IconSize>
            </CommonButton>
          ))}
        </Menu>
      </FooterDiv>
    </>
  );
};

export default Footer;
