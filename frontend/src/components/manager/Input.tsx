import styled from "styled-components";

interface InputProps {
  type?: string;
  name: string; // 필수 prop으로 추가
  value: string; // 필수 prop으로 추가
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 필수 prop으로 추가
  placeholder?: string;
  helpText?: string;
  helpLink?: string;
}

const Input = ({
  type = "text",
  name, // props 추가
  value, // props 추가
  onChange, // props 추가
  placeholder,
  helpText,
  helpLink,
}: InputProps) => {
  return (
    <InputContainer>
      <StyledInput
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
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
