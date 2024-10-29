import styled from 'styled-components';

interface PurpleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const PurpleButton = ({ children, onClick }: PurpleButtonProps) => {
  return (
    <StyledButton onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #7C3AED;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #6D28D9;
  }

  &:active {
    background: #5B21B6;
  }
`;

export default PurpleButton;