import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { RegisterRequest } from "@/interfaces/manager";
import Input from "@components/manager/Input";
import PurpleButton from "@components/manager/PurpleButton";
import { useRegister, useLogin } from "@queries/index";
import { loginAtom } from "@atoms/index";


type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const [, handleLogin] = useAtom(loginAtom); // loginAtom 사용
  
  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    password: "",
    name: "",
    region: "",
    phoneNumber: "",
    profileImage: "", 
  });
  const [error, setError] = useState<string>("");

  const registerMutation = useRegister();
  const loginMutation = useLogin();

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phoneNumber" ? formatPhoneNumber(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password || !formData.name) {
      setError("아이디, 비밀번호, 이름을 모두 입력해주세요.");
      return;
    }

    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      setError("전화번호 형식이 올바르지 않습니다. (000-0000-0000)");
      return;
    }

    try {
      // 1. 회원가입 진행
      await registerMutation.mutateAsync(formData);
      
      // 2. 회원가입 성공 후 자동 로그인 진행
      const loginResponse = await loginMutation.mutateAsync({
        username: formData.username,
        password: formData.password
      });

      // 3. loginAtom을 통해 로그인 상태 관리
      handleLogin(loginResponse);

      // 4. 캐시 무효화 및 네비게이션
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onClose();
      nav("/manager/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("회원가입에 실패했습니다.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <RegisterSection>
          <RegisterTitle>회원가입</RegisterTitle>
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="ID"
                type="text"
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                type="password"
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름"
                type="text"
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="지역"
                type="text"
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="전화번호 (000-0000-0000)"
                type="tel"
                maxLength={13}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                placeholder="프로필 이미지 URL (선택사항)"
                type="text"
              />
            </InputWrapper>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <PurpleButton type="submit" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? (
                "로딩중..."
              ) : (
                <BoldText>회원가입</BoldText>
              )}
            </PurpleButton>
          </Form>
        </RegisterSection>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const RegisterSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const RegisterTitle = styled.h3`
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

const BoldText = styled.span`
  font-weight: 700;
`;

export default RegisterModal;