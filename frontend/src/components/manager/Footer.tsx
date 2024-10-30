import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <ContactInfo>
          CONTACT US <ContactEmail>c106ssafy@gmail.com</ContactEmail>
        </ContactInfo>
        <Copyright>JAMKKAEBI © Team MODO 2024. All rights reserved.</Copyright>
      </FooterContent>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 20px 0;
  background: black;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ContactInfo = styled.div`
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const ContactEmail = styled.span`
  margin-left: 20px;
  font-weight: 600;
`;

const Copyright = styled.p`
  color: white;
  font-size: 14px;
`;

export default Footer;
