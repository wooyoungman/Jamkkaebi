import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import styled from "styled-components";
import mascotImage from "@assets/character.png";
import Input from "@components/manager/Input";
import PurpleButton from "@components/manager/PurpleButton";
import { useLogin } from "@queries/index";
import { userAtom } from "@atoms/index";
import type { LoginRequest } from "@interfaces/manager";

// Input과 PurpleButton의 props 타입을 정의합니다
interface InputProps {
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  helpText: string;
  helpLink: string;
}

interface PurpleButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
}

const MainPage = () => {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);
  const [formData, setFormData] = useState<LoginRequest>({
    id: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const loginMutation = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      // _prev를 prev로 수정
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || !formData.password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const user = await loginMutation.mutateAsync(formData);
      setUser(user);
      navigate("/manager/dashboard");
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
              <Input
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="ID"
                helpText="아이디 찾기"
                helpLink="/forgot-id"
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                helpText="비밀번호 찾기"
                helpLink="/forgot-password"
              />
            </InputWrapper>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <PurpleButton type="submit" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? (
                "Loading..."
              ) : (
                <BoldText>LOGIN</BoldText>
              )}
            </PurpleButton>
            <SignupLink href="/signup">회원가입</SignupLink>
          </Form>
        </LoginSection>
      </ContentWrapper>
    </LoginContainer>
  );
};

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
  gap: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ErrorMessage = styled.p`
  color: #dc2626;
  font-size: 14px;
  margin-top: -8px;
  text-align: center;
`;

const SignupLink = styled.a`
  text-align: center;
  color: black;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  margin-top: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const BoldText = styled.span`
  font-weight: 700;
`;

export default MainPage;
