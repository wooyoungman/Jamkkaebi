import styled from 'styled-components';

interface InputProps {
  type?: string;
  placeholder?: string;
  helpText?: string;
  helpLink?: string;
}

const Input = ({ type = "text", placeholder, helpText, helpLink }: InputProps) => {
  return (
    <InputContainer>
      <StyledInput type={type} placeholder={placeholder} />
      {helpText && helpLink && (
        <HelpText href={helpLink}>{helpText}</HelpText>
      )}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  font-size: 16px;

  &:focus {
    border-color: #7C3AED;
    outline: none;
  }

  &::placeholder {
    color: #999;
  }
`;

const HelpText = styled.a`
  display: block;
  text-align: right;
  font-size: 12px;
  color: #666;
  text-decoration: none;
  margin-top: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

export default Input;