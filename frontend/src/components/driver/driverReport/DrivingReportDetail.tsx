import styled from "styled-components";

interface DrivingReportDetailProps {
  onClose: () => void;
}

const ReportDetailDiv = styled.div`
  width: 420px;
  height: 900px;
  position: relative;
  background: rgba(255, 255, 255, 0.1); /* 필요에 따라 배경 스타일 설정 */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
`;

const DrivingReportDetail: React.FC<DrivingReportDetailProps> = ({
  onClose,
}) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ReportDetailDiv onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>
        {/* 모달 내용 추가 가능 */}
      </ReportDetailDiv>
    </ModalOverlay>
  );
};

export default DrivingReportDetail;
