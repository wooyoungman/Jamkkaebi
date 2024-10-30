import styled from "styled-components";

const HeaderDiv = styled.div`
  width: 100%;
`;

const Logo = styled.p`
  color: #b7e9ff;
  font-size: 35px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  filter: blur(1px);
  margin: 0;
`;

export const Body = styled.div`
  width: 100%;
  height: 600px;
`;

const Header: React.FC = () => {
  return (
    <HeaderDiv>
      <Logo>Logo</Logo>
    </HeaderDiv>
  );
};

export default Header;
