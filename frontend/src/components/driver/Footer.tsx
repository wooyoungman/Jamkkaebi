import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  CommonButton,
  IconSize,
  HomeSvg,
  LocationSvg,
  CarSvg,
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
  { component: ReportSvg, path: "/driver/report" },
];

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <FooterDiv>
      <Menu>
        {iconComponents.map(({ component: Icon, path }, index) => (
          <CommonButton key={index} onClick={() => navigate(path)}>
            <IconSize>
              <Icon />
            </IconSize>
          </CommonButton>
        ))}
      </Menu>
    </FooterDiv>
  );
};

export default Footer;
