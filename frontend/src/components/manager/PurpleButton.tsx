import styled from "styled-components";

interface PurpleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const PurpleButton = ({ children, onClick }: PurpleButtonProps) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  width: 100%;
  height: 50px;
  padding: 12px;
  border-radius: 9px;
  background: linear-gradient(90deg, #4642ff 0%, #9361ff 100%);
  box-shadow: 0px 4px 61px 0px rgba(77, 71, 195, 0.4);
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  // &:hover {
  //   background: #6D28D9;
  // }

  // &:active {
  //   background: #5B21B6;
  // }
`;

export default PurpleButton;
