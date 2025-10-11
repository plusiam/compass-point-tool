import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface CompassData {
  userName: string;
  topic: string;
  directions: {
    east: string;
    west: string;
    south: string;
    north: string;
  };
}

export const generatePDF = async (captureElement: HTMLElement, fileName: string) => {
  try {
    // 1. 모든 textarea의 높이를 내용에 맞게 조절
    const textareas = captureElement.querySelectorAll('textarea');
    const originalStyles: Array<{ element: HTMLTextAreaElement; overflow: string; height: string }> = [];
    
    textareas.forEach((textarea) => {
      const ta = textarea as HTMLTextAreaElement;
      originalStyles.push({
        element: ta,
        overflow: ta.style.overflow,
        height: ta.style.height,
      });
      
      ta.style.overflow = 'hidden';
      ta.style.height = 'auto';
      ta.style.height = ta.scrollHeight + 'px';
    });

    // 2. 렌더링 대기
    await new Promise(resolve => setTimeout(resolve, 100));

    // 3. Canvas로 캡처
    const canvas = await html2canvas(captureElement, {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false,
      useCORS: true,
      windowWidth: captureElement.scrollWidth,
      windowHeight: captureElement.scrollHeight,
      onclone: (clonedDoc) => {
        const clonedTextareas = clonedDoc.querySelectorAll('textarea');
        clonedTextareas.forEach((ta) => {
          const textarea = ta as HTMLTextAreaElement;
          textarea.style.overflow = 'hidden';
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
        });
      },
    });

    // 4. 원래 스타일 복원
    originalStyles.forEach(({ element, overflow, height }) => {
      element.style.overflow = overflow;
      element.style.height = height;
    });

    // 5. Canvas를 이미지로 변환
    const imgData = canvas.toDataURL('image/png');
    
    // 6. PDF 생성
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // A4 크기 (mm)
    const pdfWidth = 210;
    const pdfHeight = 297;
    
    // 이미지 비율 계산
    const ratio = Math.min(
      (pdfWidth - 20) / (imgWidth / 2), // 좌우 여백 10mm
      (pdfHeight - 20) / (imgHeight / 2) // 상하 여백 10mm
    );
    
    const imgPdfWidth = (imgWidth / 2) * ratio;
    const imgPdfHeight = (imgHeight / 2) * ratio;
    
    // 중앙 정렬
    const x = (pdfWidth - imgPdfWidth) / 2;
    const y = 10; // 상단 여백
    
    const pdf = new jsPDF({
      orientation: imgPdfWidth > imgPdfHeight ? 'landscape' : 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // 이미지를 PDF에 추가
    pdf.addImage(imgData, 'PNG', x, y, imgPdfWidth, imgPdfHeight);
    
    // 페이지가 넘어가면 추가 페이지 생성
    if (imgPdfHeight > pdfHeight - 20) {
      let remainingHeight = imgPdfHeight - (pdfHeight - 20);
      let currentY = -(pdfHeight - 20);
      
      while (remainingHeight > 0) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', x, currentY, imgPdfWidth, imgPdfHeight);
        currentY -= (pdfHeight - 20);
        remainingHeight -= (pdfHeight - 20);
      }
    }

    // PDF 저장
    pdf.save(`${fileName}.pdf`);
    
    return true;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
};

export const downloadPDF = async (
  captureElement: HTMLElement,
  fileName: string = 'compass-point'
) => {
  return await generatePDF(captureElement, fileName);
};
