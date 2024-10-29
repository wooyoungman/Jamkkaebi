import styled from 'styled-components';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children}: LayoutProps) => {
  return (
    <LayoutWrapper>
       <Header />
      <main>{children}</main>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default Layout;