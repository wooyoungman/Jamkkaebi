import styled from "styled-components";
import LogoImg from "@assets/logo.png";
import { useLocation, Link } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { UserCircle, Bell, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { authAtom } from "@atoms/manager/user";

interface Notification {
  id: number;
  message: string;
  timestamp: string;
  isRead: boolean;
}

// notifications atom은 유지
const notificationsAtom = atom<Notification[]>([]);

const Header = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("undefined");
  const [auth] = useAtom(authAtom); // authAtom 사용
  const [notifications] = useAtom(notificationsAtom);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  const hasUnreadNotifications = notifications.some(
    (notification) => !notification.isRead
  );

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
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
              사건 기록
            </NavItem>
          </NavMenu>
        </LogoSection>

        {auth.isAuthenticated && (
          <UserSection>
            <UserInfo>
              <UserName>관리자님</UserName>
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
              <IconButton>
                <LogOut size={24} />
              </IconButton>
            </IconWrapper>
          </UserSection>
        )}
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

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserName = styled.span`
  color: white;
  font-size: 14px;
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(124, 58, 237, 0.1);
  }
`;

const NotificationButton = styled(IconButton)`
  position: relative;
`;

const NotificationDot = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  background-color: #ff4444;
  border-radius: 50%;
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 320px;
  background: white;
  border-radius: 8px;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  z-index: 1000;
`;

const DropdownHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eee;

  h4 {
    margin: 0;
    color: #111;
    font-size: 16px;
    font-weight: 600;
  }
`;

const DropdownContent = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

interface NotificationItemProps {
  isRead: boolean;
}

const NotificationItem = styled.div<NotificationItemProps>`
  padding: 16px;
  border-bottom: 1px solid #eee;
  background-color: ${(props) => (props.isRead ? "white" : "#f8f9ff")};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationMessage = styled.p`
  margin: 0;
  color: #333;
  font-size: 14px;
  line-height: 1.5;
`;

const NotificationTime = styled.span`
  display: block;
  margin-top: 4px;
  color: #666;
  font-size: 12px;
`;

const EmptyNotification = styled.div`
  padding: 32px 16px;
  text-align: center;
  color: #666;

  p {
    margin: 0;
    font-size: 14px;
  }
`;

export default Header;
