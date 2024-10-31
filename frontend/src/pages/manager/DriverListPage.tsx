import styled from "styled-components";
import { useAtom } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { atomWithQuery } from "jotai-tanstack-query";
import { DUMMY_USERS } from "@interfaces/driveruser";
import type { User } from "@interfaces/manager";

const queryClient = new QueryClient();

const usersAtom = atomWithQuery(() => ({
  queryKey: ["users"],
  queryFn: async () => DUMMY_USERS,
}));

const DriverListContent = () => {
  const [usersQuery] = useAtom(usersAtom);
  const users = usersQuery.data || [];

  if (usersQuery.isLoading) {
    return <Container>Loading...</Container>;
  }

  if (usersQuery.isError) {
    return <Container>Error loading users</Container>;
  }

  return (
    <Container>
      <Header>
        <TitleSection>
          <Title>전체 운전자</Title>
          <SubTitle>재직 중인 운전자</SubTitle>
        </TitleSection>

        <SearchSection>
          <SearchWrapper>
            <SearchIcon>
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                  stroke="#9CA3AF"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </SearchIcon>
            <SearchInput placeholder="검색" />
          </SearchWrapper>
          <SelectWrapper>
            <StyledSelect>
              <option>정렬 - 최신 등록순</option>
            </StyledSelect>
          </SelectWrapper>
        </SearchSection>
      </Header>

      <Table>
        <thead>
          <TR>
            <TH>운전자 이름</TH>
            <TH>회사</TH>
            <TH>전화 번호</TH>
            <TH>차량 번호</TH>
            <TH>지역</TH>
            <TH>운행 중</TH>
          </TR>
        </thead>
        <tbody>
          {users.map((user) => (
            <TR key={user.id}>
              <TD>{user.name}</TD>
              <TD>{user.company}</TD>
              <TD>{user.phone}</TD>
              <TD>{user.employeeId}</TD>
              <TD>{user.location}</TD>
              <TD>
                <StatusBadge status={user.status}>{user.status}</StatusBadge>
              </TD>
            </TR>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <PaginationButton>&lt;</PaginationButton>
        <PaginationButton active>1</PaginationButton>
        <PaginationButton>2</PaginationButton>
        <PaginationButton>3</PaginationButton>
        <PaginationButton>4</PaginationButton>
        <PaginationButton>...</PaginationButton>
        <PaginationButton>10</PaginationButton>
        <PaginationButton>&gt;</PaginationButton>
      </Pagination>
    </Container>
  );
};

const DriverList = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DriverListContent />
    </QueryClientProvider>
  );
};

const Container = styled.div`
  padding: 24px;
  background: white;
  border-radius: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

const TitleSection = styled.div`
  flex-shrink: 0;
`;

const SearchSection = styled.div`
  display: flex;
  gap: 8px;
  min-width: 0;
`;

const SearchWrapper = styled.div`
  width: 240px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  padding-left: 40px;
  border-radius: 8px;
  background: #f7f7fd;
  font-size: 14px;

  &:focus {
    border-color: #7c3aed;
    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const SubTitle = styled.h2`
  font-size: 14px;
  color: #22c55e;
`;

const SelectWrapper = styled.div`
  width: 200px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #f0efff;
  border-radius: 8px;
  background: #f0efff;
  font-size: 14px;
  appearance: none;
  cursor: pointer;

  &:focus {
    border-color: #7c3aed;
    outline: none;
  }

  background-image: url("data:image/svg+xml,%3Csvg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TR = styled.tr`
  border-bottom: 1px solid #e5e7eb;
`;

const TH = styled.th`
  text-align: left;
  padding: 12px 8px;
  color: #6b7280;
  font-weight: normal;
`;

const TD = styled.td`
  padding: 12px 8px;
`;

const StatusBadge = styled.span<{ status: "운행 중" | "휴일" }>`
  display: inline-block;
  width: 100px;
  text-align: center;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid
    ${(props) => (props.status === "운행 중" ? "#00B087" : "#DF0404")};
  background: ${(props) =>
    props.status === "운행 중" ? "#dcfce7" : "#fee2e2"};
  color: ${(props) => (props.status === "운행 중" ? "#008767" : "#DF0404")};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 24px;
`;

const PaginationButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: ${(props) => (props.active ? "#4f46e5" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#6b7280")};
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.active ? "#4f46e5" : "#f3f4f6")};
  }
`;

export default DriverList;
