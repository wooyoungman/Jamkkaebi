import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAtom } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { atomWithQuery } from "jotai-tanstack-query";
import { DUMMY_USERS } from "@interfaces/driveruser";
import type { User } from "@/interfaces/manager";

const queryClient = new QueryClient();

const usersAtom = atomWithQuery(() => ({
  queryKey: ["users"],
  queryFn: async () => DUMMY_USERS,
}));

const ITEMS_PER_PAGE = 8; // 한 페이지당 8명 표시

const DriverListContent = () => {
  const nav = useNavigate();
  const [usersQuery] = useAtom(usersAtom);
  const [currentPage, setCurrentPage] = useState(1);

  const users = usersQuery.data || [];

  // 페이지네이션 계산
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return users.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [users, currentPage]);

  if (usersQuery.isLoading) {
    return <Container>Loading...</Container>;
  }

  if (usersQuery.isError) {
    return <Container>Error loading users</Container>;
  }

  const handleRowClick = (userId: number) => {
    nav(`/manager/report/${userId}`);
  };

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

      <TableWrapper>
        <Table>
          <thead>
            <TR>
              <TH>프로필</TH>
              <TH>운전자 이름</TH>
              <TH>전화 번호</TH>
              <TH>차량 번호</TH>
              <TH>지역</TH>
              <TH>운행 중</TH>
            </TR>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <TR
                key={user.id}
                onClick={() => handleRowClick(user.id)}
                style={{ cursor: "pointer" }}
              >
                <TD>
                  <ProfileImage
                    src={user.profileImage}
                    alt={`${user.name} 프로필`}
                  />
                </TD>
                <TD>{user.name}</TD>
                <TD>{user.phone}</TD>
                <TD>{user.employeeId}</TD>
                <TD>{user.region}</TD>
                <TD>
                  <StatusBadge status={user.status}>{user.status}</StatusBadge>
                </TD>
              </TR>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      <Pagination>
        <PaginationButton
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </PaginationButton>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationButton
            key={page}
            active={currentPage === page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </PaginationButton>
        ))}

        <PaginationButton
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          &gt;
        </PaginationButton>
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

// Styled Components
const Container = styled.div`
  padding: 32px;
  background: white;
  border-radius: 16px;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
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
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const SubTitle = styled.h2`
  font-size: 16px;
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

const TableWrapper = styled.div`
  margin: 20px 0;
  overflow-x: auto;
  flex: 1;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TR = styled.tr`
  border-bottom: 1px solid #e5e7eb;
  height: 72px;

  &:hover {
    background-color: #f9fafb;
  }

  // 테이블 행에 호버 효과 추가
  &:not(:first-child) {
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #f3f4f6;
      transform: scale(1.001);
    }
  }
`;

const TH = styled.th`
  text-align: left;
  padding: 16px;
  color: #6b7280;
  font-weight: 500;
  font-size: 20px;
`;

const TD = styled.td`
  font-size: 18px;
  padding: 16px;
  vertical-align: middle;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
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

const PaginationButton = styled.button<{
  active?: boolean;
  disabled?: boolean;
}>`
  padding: 8px 12px;
  border: 1px solid ${(props) => (props.active ? "#4f46e5" : "#e5e7eb")};
  border-radius: 8px;
  background: ${(props) => (props.active ? "#4f46e5" : "white")};
  color: ${(props) => {
    if (props.disabled) return "#9ca3af";
    return props.active ? "white" : "#6b7280";
  }};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  min-width: 40px;
  margin: 0 4px;

  &:hover:not(:disabled) {
    background: ${(props) => (props.active ? "#4338ca" : "#f3f4f6")};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export default DriverList;
