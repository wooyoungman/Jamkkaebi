import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  useDriverListWithFilters,
  searchQueryAtom,
  sortByAtom,
  driverTypeAtom,
} from "@atoms/index";
import { Driver } from "@interfaces/manager";
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

const ITEMS_PER_PAGE = 8;

const DriverList = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [driverType, setDriverType] = useAtom(driverTypeAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const nav = useNavigate();
  const STATUS_DISPLAY = {
    ON_ROUTE: "운행 중",
    REST: "휴식 중",
    IDLE: "휴일", // 운행 중 아님
  } as const;

  const { drivers, isLoading, isError } = useDriverListWithFilters();

  const paginatedDrivers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return drivers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [drivers, currentPage]);

  const totalPages = Math.ceil(drivers.length / ITEMS_PER_PAGE);

  const handleRowClick = (driverId: number) => {
    nav(`/manager/report/${driverId}`);
  };

  if (isLoading) return <Container>로딩중...</Container>;
  if (isError)
    return <Container>관리자 외에는 운전자를 조회할 수 없습니다.</Container>;

  return (
    <Container>
      <Header>
        <TitleSection>
          <Title>전체 운전자</Title>
          <SubTitle>
            {driverType === "managed" ? "관리 중인 운전자" : "미관리 운전자"}
          </SubTitle>
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
            <SearchInput
              placeholder="검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchWrapper>
          <SelectWrapper>
            <StyledSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "latest" | "name")}
            >
              <option value="latest">최신 등록순</option>
              <option value="name">이름순</option>
            </StyledSelect>

            <StyledSelect
              value={driverType}
              onChange={(e) =>
                setDriverType(e.target.value as "managed" | "unmanaged")
              }
            >
              <option value="managed">관리 중</option>
              <option value="unmanaged">미관리</option>
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
            {paginatedDrivers.map((driver: Driver) => (
              <TR
                key={driver.memberId}
                onClick={() => handleRowClick(driver.memberId)}
                style={{ cursor: "pointer" }}
              >
                <TD>
                  <TD>
                    <ProfileImage
                      src={
                        driver.profileImage ||
                        `https://randomuser.me/api/portraits/men/${driver.memberId % 100}.jpg` // 0-99 범위의 이미지
                      }
                      alt={`${driver.memberName} 프로필`}
                    />
                  </TD>
                </TD>
                <TD>{driver.memberName}</TD>
                <TD>{driver.phoneNumber}</TD>
                <TD>{driver.vehicleNumber}</TD>
                <TD>{driver.region}</TD>
                <TD>
                  <StatusBadge status={driver.status}>
                    {
                      STATUS_DISPLAY[
                        driver.status as keyof typeof STATUS_DISPLAY
                      ]
                    }
                  </StatusBadge>
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

export default DriverList;
