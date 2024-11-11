import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { atomWithQuery } from "jotai-tanstack-query";
import { DUMMY_USERS } from "@interfaces/driveruser";
import {
  Container,
  Header,
  TitleSection,
  SearchSection,
  SearchWrapper,
  SearchInput,
  SearchIcon,
  Title,
  SubTitle,
  SelectWrapper,
  StyledSelect,
  TableWrapper,
  Table,
  TR,
  TH,
  TD,
  ProfileImage,
  StatusBadge,
  Pagination,
  PaginationButton,
} from "@styles/manager/DriverListPageStyle";

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

export default DriverList;
