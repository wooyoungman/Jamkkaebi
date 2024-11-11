import styled from "styled-components";
import { ReactNode } from "react";

interface PurpleButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const PurpleButton = ({
  children,
  onClick,
  type = "button",
  disabled,
}: PurpleButtonProps) => {
  return (
    <StyledButton onClick={onClick} type={type} disabled={disabled}>
      {children}
    </StyledButton>
  );
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

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export default PurpleButton;
export type { PurpleButtonProps }; // 타입을 export 해서 다른 곳에서 사용할 수 있게
