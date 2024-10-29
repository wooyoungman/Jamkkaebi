// src/pages/MainPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import Layout from '@/components/Layout';
import Input from '@/components/Input';
import PurpleButton from '@/components/PurpleButton';
import Footer from '@/components/Footer';
import { useLogin } from '@/queries';
import { userAtom } from '@/atoms/auth';
import type { LoginRequest } from '@/interfaces/manager';

const MainPage = () => {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);
  const [formData, setFormData] = useState<LoginRequest>({
    id: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  
  const loginMutation = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(_prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // 입력 시 에러 메시지 초기화
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || !formData.password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const user = await loginMutation.mutateAsync(formData);
      setUser(user);
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('로그인에 실패했습니다.');
      }
    }
  };

  return (
    <Layout>
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
            <MascotImage src="/mascot.png" alt="잠깨비 마스코트" />
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
                  helpText="아이디를 잊어버리셨나요?" 
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
                  helpText="비밀번호를 잊어버리셨나요?" 
                  helpLink="/forgot-password"
                />
              </InputWrapper>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <PurpleButton 
                type="submit" 
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? 'Loading...' : 'LOGIN'}
              </PurpleButton>
              <SignupLink href="/signup">회원가입</SignupLink>
            </Form>
          </LoginSection>
        </ContentWrapper>
        <Footer />
      </LoginContainer>
    </Layout>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
  background-color: #fff;
  padding: 0 20px;
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
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
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
  max-width: 300px;
`;

const LoginSection = styled.div`
  width: 400px;
  padding: 40px;
  background: #fbfbfe;
  border-radius: 16px;
`;

const LoginTitle = styled.h3`
  font-size: 24px;
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
  color: #666;
  text-decoration: none;
  font-size: 14px;
  margin-top: 12px;

  &:hover {
    text-decoration: underline;
  }
`;

export default MainPage;