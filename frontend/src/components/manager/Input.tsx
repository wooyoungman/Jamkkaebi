import styled from "styled-components";
import { InputHTMLAttributes } from "react";

// HTML input 속성들을 확장하면서 필수 props 정의
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'value' | 'onChange'> {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helpText?: string;
  helpLink?: string;
}

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  helpText,
  helpLink,
  ...restProps  // 나머지 HTML input 속성들을 받음
}: InputProps) => {
  return (
    <InputContainer>
      <StyledInput
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...restProps}  // 나머지 props 전달
      />
      {helpText && helpLink && <HelpText href={helpLink}>{helpText}</HelpText>}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #f0efff;
  border-radius: 8px;
  background: #f0efff;
  font-size: 14px;

  &:focus {
    border-color: #7c3aed;
    outline: none;
  }

  &::placeholder {
    color: #999;
  }
`;

const HelpText = styled.a`
  display: block;
  text-align: right;
  font-size: 13px;
  font-weight: 600;
  color: black;
  text-decoration: none;
  margin-top: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

export default Input;