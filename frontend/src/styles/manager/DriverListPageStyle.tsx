import styled from "styled-components";

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

export {
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
};
