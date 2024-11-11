import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { RegisterRequest } from "@/interfaces/manager";
import Input from "@components/manager/Input";
import PurpleButton from "@components/manager/PurpleButton";
import { useRegister } from "@queries/index";

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState<string>("");

  const registerMutation = useRegister();

  console.log("Current formData:", formData); // 현재 formData 상태 확인

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("Input change - name:", name, "value:", value); // 입력 값 변경 확인

    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };
      console.log("Updated formData:", newData); // 업데이트된 formData 확인
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting formData:", formData);

    if (!formData.username || !formData.password || !formData.name) {
      setError("아이디, 비밀번호, 이름을 모두 입력해주세요.");
      return;
    }
    try {
      await registerMutation.mutateAsync(formData);
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
