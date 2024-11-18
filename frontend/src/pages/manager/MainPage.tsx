import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import mascotImage from "@assets/character.png";
import RegisterModal from "@components/manager/RegisterModal";
import { useLogin } from "@queries/index";
import { loginAtom } from "@atoms/index";
import type { LoginRequest } from "@/interfaces/manager";
import {
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
} from "@styles/manager/MainPageStyle";

const MainPage = () => {
  const nav = useNavigate();
  const [, login] = useAtom(loginAtom);
  const loginMutation = useLogin();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [formData, setFormData] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await loginMutation.mutateAsync(formData);
      login(response);
      nav("/manager/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("로그인에 실패했습니다.");
      }
    }
  };

  return (
    <LoginContainer>
      <ContentWrapper>
        <LogoSection>
          <Title>잠깨비</Title>
          <Subtitle>잠을 깨워주는 비밀병기</Subtitle>
          <Description>
            누구나 졸릴 수 있습니다.
            <br />
            하지만 졸지 않게는 할 수 있습니다.
          </Description>
          <MascotImage src={mascotImage} alt="잠깨비 마스코트" />
        </LogoSection>

        <LoginSection>
          <LoginTitle>로그인</LoginTitle>
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <StyledInput
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="ID"
              />
            </InputWrapper>
            <InputWrapper>
              <StyledInput
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </InputWrapper>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <StyledPurpleButton
              type="submit"
              disabled={loginMutation.isPending}
              onClick={() => {}}
            >
              {loginMutation.isPending ? (
                "로딩중..."
              ) : (
                <BoldText>LOGIN</BoldText>
              )}
            </StyledPurpleButton>
            <SignupButton onClick={() => setIsRegisterModalOpen(true)}>
              회원가입
            </SignupButton>
          </Form>
        </LoginSection>
      </ContentWrapper>

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </LoginContainer>
  );
};

export default MainPage;
