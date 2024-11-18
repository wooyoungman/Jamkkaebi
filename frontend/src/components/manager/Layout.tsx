import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'SUIT', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const Layout = () => {
  return (
    <>
      <GlobalStyle />
      <LayoutWrapper>
        <Header />
        <MainContent>
          <Outlet />
        </MainContent>
        <Footer />
      </LayoutWrapper>
    </>
  );
};

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: black;
`;

const MainContent = styled.main`
  margin: 10px;
  border-radius: 16px;
  background-color: #f8fafb;
`;

export default Layout;
