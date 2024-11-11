import styled from "styled-components";

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

export {
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
};
