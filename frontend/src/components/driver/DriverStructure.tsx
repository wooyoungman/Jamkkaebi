import styled from "styled-components";
import { DriverText } from "./driverMain/DriverMainCSS";
import { useEffect, useState } from "react";

const HeaderDiv = styled.div`
  width: 100%;
  padding: 8px 10px;
`;

const CustomDriverText = styled(DriverText)`
  text-align: start;
`;

const CustomHRLine = styled.hr`
  height: 10px;
  border-color: #696d6e; /* 원하는 색상으로 설정 */
  margin: 0;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Body = styled.div`
  display: flex;
  width: 100%;
  height: 580px;
  gap: 10px;
`;

const Header: React.FC = () => {
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    const updateDate = () => {
      const now = new Date();
      const dayOptions: Intl.DateTimeFormatOptions = { weekday: "long" };
      const dateOptions: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
      };

      setDay(now.toLocaleDateString("en-US", dayOptions));
      setDate(now.toLocaleDateString("en-US", dateOptions));
    };

    updateTime();
    updateDate();

    const timeoutId = setTimeout(
      () => {
        updateTime();
        setInterval(updateTime, 1000 * 60);
      },
      (60 - new Date().getSeconds()) * 1000
    );

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <HeaderDiv>
      <CustomDriverText
        fontSize="30px"
        fontWeight={600}
        style={{ marginBottom: "3px" }}
      >
        {time}
      </CustomDriverText>
      <DateContainer>
        <CustomDriverText color="#696D6E" fontSize="12px" fontWeight={400}>
          {day}
        </CustomDriverText>
        <CustomHRLine />
        <CustomDriverText color="#696D6E" fontSize="12px" fontWeight={400}>
          {date}
        </CustomDriverText>
      </DateContainer>
    </HeaderDiv>
  );
};

export default Header;
