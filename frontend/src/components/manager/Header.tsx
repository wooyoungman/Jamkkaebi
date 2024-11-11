import LogoImg from "@assets/logo.png";
import styled from "styled-components";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { UserCircle, Bell, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { authAtom, logoutAtom } from "@atoms/manager/user";
import { useGetUserInfo } from "@queries/index";
import {
  HeaderWrapper,
  HeaderContent,
  LogoSection,
  LogoImage,
  NavMenu,
  UserSection,
  UserInfo,
  UserName,
  IconWrapper,
  IconButton,
  NotificationButton,
  NotificationDot,
  NotificationDropdown,
  DropdownHeader,
  DropdownContent,
  NotificationItem,
  NotificationMessage,
  NotificationTime,
  EmptyNotification,
} from "@styles/manager/HeaderStyle";

interface Notification {
  id: number;
  message: string;
  timestamp: string;
  isRead: boolean;
}

// notifications용 atom
const notificationsAtom = atom<Notification[]>([]);

const Header = () => {
  const location = useLocation();
  const { data: userInfo } = useGetUserInfo();
  const nav = useNavigate();
  const [activeMenu, setActiveMenu] = useState("undefined");
  const [auth] = useAtom(authAtom);
  const [notifications] = useAtom(notificationsAtom);
  const [showNotifications, setShowNotifications] = useState(false);
  const [, logout] = useAtom(logoutAtom);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  const hasUnreadNotifications = notifications.some(
    (notification) => !notification.isRead
  );

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
  };
  const handleLogout = () => {
    logout();
    nav("/manager");
  };

  return (
    <HeaderWrapper>
      <HeaderContent>
        <LogoSection>
          <LogoImage src={LogoImg} alt="logo" />
          <NavMenu>
            <NavItem
              as={Link}
              to="/manager/dashboard"
              $isActive={activeMenu === "/manager/dashboard"}
            >
              대시보드
            </NavItem>
            <NavItem
              as={Link}
              to="/manager/report"
              $isActive={activeMenu === "/manager/report"}
            >
              레포트
            </NavItem>
            <NavItem
              as={Link}
              to="/manager/history"
              $isActive={activeMenu === "/manager/history"}
            >
              히스토리
            </NavItem>
          </NavMenu>
        </LogoSection>

        {auth.isAuthenticated && (
          <UserSection>
            <UserInfo>
              <UserName>{userInfo?.memberName ?? ""} 관리자님</UserName>
              <IconButton>
                <UserCircle size={32} />
              </IconButton>
            </UserInfo>
            <IconWrapper>
              <NotificationButton onClick={handleNotificationClick}>
                <Bell size={24} />
                {hasUnreadNotifications && <NotificationDot />}
                {showNotifications && (
                  <NotificationDropdown>
                    <DropdownHeader>
                      <h4>알림</h4>
                    </DropdownHeader>
                    <DropdownContent>
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <NotificationItem
                            key={notification.id}
                            isRead={notification.isRead}
                          >
                            <NotificationMessage>
                              {notification.message}
                            </NotificationMessage>
                            <NotificationTime>
                              {notification.timestamp}
                            </NotificationTime>
                          </NotificationItem>
                        ))
                      ) : (
                        <EmptyNotification>
                          <p>새로운 알림이 없습니다</p>
                        </EmptyNotification>
                      )}
                    </DropdownContent>
                  </NotificationDropdown>
                )}
              </NotificationButton>
              <IconButton onClick={handleLogout}>
                <LogOut size={24} />
              </IconButton>
            </IconWrapper>
          </UserSection>
        )}
      </HeaderContent>
    </HeaderWrapper>
  );
};

const NavItem = styled(Link)<{ $isActive?: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: none;
  color: white;
  text-decoration: none;

  ${(props) =>
    props.$isActive &&
    `
    color: white;
    border-radius: 9px;
    background: linear-gradient(90deg, #4642FF 0%, #9361FF 100%);
  `}
`;

export default Header;
