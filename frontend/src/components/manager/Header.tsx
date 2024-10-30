import { useState } from "react";
import styled from "styled-components";
import LogoImg from "@assets/logo.png";
// import { useLocation, Link } from 'react-router-dom';

const Header = () => {
  // 라우터의 현재 경로를 사용하거나 props로
  const [activeMenu, setActiveMenu] = useState("undefined");

  return (
    <HeaderWrapper>
      <HeaderContent>
        <LogoSection>
          <LogoImage src={LogoImg} alt="logo" />
          <NavMenu>
            <NavItem
              isActive={activeMenu === "dashboard"}
              onClick={() => setActiveMenu("dashboard")}
            >
              대시보드
            </NavItem>
            <NavItem
              isActive={activeMenu === "report"}
              onClick={() => setActiveMenu("report")}
            >
              레포트
            </NavItem>
            <NavItem
              isActive={activeMenu === "history"}
              onClick={() => setActiveMenu("history")}
            >
              사건 기록
            </NavItem>
          </NavMenu>
        </LogoSection>
      </HeaderContent>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  width: 100%;
  height: 64px;
  background: #000;
  color: white;
  display: flex;
  align-items: center;
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const LogoImage = styled.img`
  height: 50px;
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 32px;
  align-items: center;
`;

interface NavItemProps {
  isActive?: boolean;
}

const NavItem = styled.button<NavItemProps>`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: none;
  color: white;

  // 활성화된 상태일 때 PurpleButton과 동일한 스타일 적용
  ${(props) =>
    props.isActive &&
    `
    color: white;
    border-radius: 9px;
    background: linear-gradient(90deg, #4642FF 0%, #9361FF 100%);
  `}

  // 비활성화 상태일 때의 호버 효과
  ${(props) =>
    !props.isActive &&
    `
    &:hover {
      background: rgba(124, 58, 237, 0.1);
    }
  `}
`;

export default Header;
