import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// PDF 내보내기 함수
const exportToPDF = async (elementId: any, fileName = "driver-report.pdf") => {
  try {
    // 내보내기할 요소 가져오기
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Element not found");
    }

    // 현재 스크롤 위치 저장
    const originalScrollPos = window.scrollY;

    // 요소를 canvas로 변환
    const canvas = await html2canvas(element, {
      scale: 2, // 더 나은 품질을 위해 2배 스케일
      useCORS: true, // 외부 이미지 허용
      logging: false,
      scrollY: -window.scrollY, // 스크롤 위치 보정
    });

    // canvas 크기로부터 PDF 크기 계산
    const imgWidth = 210; // A4 가로 크기 (mm)
    const pageHeight = 297; // A4 세로 크기 (mm)
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // PDF 생성
    const pdf = new jsPDF("p", "mm", "a4");
    const pageData = canvas.toDataURL("image/jpeg", 1.0);

    // 첫 페이지 추가
    pdf.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // 필요한 경우 추가 페이지 생성
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // PDF 저장
    pdf.save(fileName);

    // 스크롤 위치 복원
    window.scrollTo(0, originalScrollPos);

    return true;
  } catch (error) {
    console.error("PDF 내보내기 실패:", error);
    return false;
  }
};

export default exportToPDF;
