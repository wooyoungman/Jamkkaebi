import styled from "styled-components";
import Input from "@components/manager/Input";
import PurpleButton from "@components/manager/PurpleButton";

// 기존 컴포넌트의 Props 타입을 가져와서 확장
type ExtendedInputProps = {
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

type ExtendedPurpleButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

// 스타일이 적용된 Input 컴포넌트
const StyledInput = styled(Input)<ExtendedInputProps>``;

// 스타일이 적용된 PurpleButton 컴포넌트
const StyledPurpleButton = styled(PurpleButton)<ExtendedPurpleButtonProps>``;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 40px);
  padding: 15px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  gap: 60px;
`;

const LogoSection = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Subtitle = styled.h2`
  font-size: 32px;
  color: #666;
  margin-bottom: 24px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 40px;
`;

const MascotImage = styled.img`
  max-width: 350px;
`;

const LoginSection = styled.div`
  width: 400px;
  padding: 40px;
  border-radius: 16px;
`;

const LoginTitle = styled.h3`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 32px;
  text-align: left;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ErrorMessage = styled.p`
  color: #dc2626;
  font-size: 14px;
  margin-top: -8px;
  text-align: center;
`;

const SignupButton = styled.button`
  text-align: center;
  color: black;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  margin-top: 5px;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const BoldText = styled.span`
  font-weight: 700;
`;

export {
  StyledInput,
  StyledPurpleButton,
  LoginContainer,
  ContentWrapper,
  LogoSection,
  Title,
  Subtitle,
  Description,
  MascotImage,
  LoginSection,
  LoginTitle,
  Form,
  InputWrapper,
  ErrorMessage,
  SignupButton,
  BoldText,
};
