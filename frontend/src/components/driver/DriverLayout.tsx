import React from "react";
import { Outlet } from "react-router-dom";
import {
  DriverBackground,
  DriverContainer,
} from "../../styles/driver/DriverBackground";
import Header, { Body } from "./DriverStructure";
import Footer from "./Footer";

const DriverLayout: React.FC = () => {
  return (
    <DriverContainer>
      <DriverBackground>
        <Header />
        <Body>
          <Outlet />
        </Body>
        <Footer />
      </DriverBackground>
    </DriverContainer>
  );
};

export default DriverLayout;
