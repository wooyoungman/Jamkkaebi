import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <ContactInfo>CONATACT US c106ssafy@gmail.com</ContactInfo>
        <Copyright>JAMKKAEBI © Team MODO 2024. All right reserved</Copyright>
      </FooterContent>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 20px 0;
  background: #000;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ContactInfo = styled.p`
  color: #666;
  font-size: 14px;
`;

const Copyright = styled.p`
  color: #666;
  font-size: 14px;
`;

export default Footer;
