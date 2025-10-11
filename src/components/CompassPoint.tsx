import { useState, useRef, useEffect } from "react";
import { DirectionCard } from "./DirectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw, Download, Save, FileText, Check, Printer, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useAutoSave } from "@/hooks/useAutoSave";
import compassIllustration from "@/assets/compass-illustration.png";

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

export const CompassPoint = () => {
  const [userName, setUserName] = useState("");
  const [topic, setTopic] = useState("");
  const [directions, setDirections] = useState({
    east: "",
    west: "",
    south: "",
    north: "",
  });
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  // 초기 데이터 로드
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("compass-point-data");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setUserName(parsed.userName || "");
        setTopic(parsed.topic || "");
        setDirections(parsed.directions || {
          east: "",
          west: "",
          south: "",
          north: "",
        });
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error("Failed to load saved data:", error);
    }
  }, []);

  // 자동 저장 (2초 후)
  const dataToSave: CompassData = {
    userName,
    topic,
    directions,
  };

  useAutoSave(dataToSave, "compass-point-data", 2000);

  // 작성 진행률 계산
  const getProgress = () => {
    let filled = 0;
    if (userName.trim()) filled++;
    if (topic.trim()) filled++;
    if (directions.east.trim()) filled++;
    if (directions.west.trim()) filled++;
    if (directions.south.trim()) filled++;
    if (directions.north.trim()) filled++;
    return Math.round((filled / 6) * 100);
  };

  const progress = getProgress();

  // 내용 검증
  const hasContent = () => {
    return userName.trim() || topic.trim() || 
      directions.east.trim() || directions.west.trim() || 
      directions.south.trim() || directions.north.trim();
  };

  const updateDirection = (direction: keyof typeof directions, value: string) => {
    setDirections((prev) => ({ ...prev, [direction]: value }));
  };

  const handleReset = () => {
    if (!hasContent()) {
      toast.info("초기화할 내용이 없습니다");
      return;
    }

    if (window.confirm("모든 내용을 초기화하시겠습니까?")) {
      setUserName("");
      setTopic("");
      setDirections({
        east: "",
        west: "",
        south: "",
        north: "",
      });
      localStorage.removeItem("compass-point-data");
      toast.success("모든 내용이 초기화되었습니다");
    }
  };

  const handleSave = () => {
    if (!hasContent()) {
      toast.error("저장할 내용을 먼저 작성해주세요");
      return;
    }

    const data = {
      userName,
      topic,
      directions,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem("compass-point-data", JSON.stringify(data));
    setLastSaved(new Date());
    toast.success("작성 내용이 저장되었습니다");
  };

  const handleExportText = () => {
    if (!hasContent()) {
      toast.error("다운로드할 내용을 먼저 작성해주세요");
      return;
    }

    const content = `
Compass Point 사고 루틴 결과
===========================

작성자: ${userName || "(미입력)"}
주제: ${topic || "(작성되지 않음)"}

E (동쪽) - 설렘, 기대
${directions.east || "(작성되지 않음)"}

W (서쪽) - 걱정, 우려
${directions.west || "(작성되지 않음)"}

S (남쪽) - 필요, 제안
${directions.south || "(작성되지 않음)"}

N (북쪽) - 입장, 태도
${directions.north || "(작성되지 않음)"}

작성일: ${new Date().toLocaleDateString('ko-KR')}
    `.trim();

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    
    // 파일명에 사용자 이름 포함
    const sanitizedName = userName.trim().replace(/[^a-zA-Z0-9가-힣]/g, '_');
    const fileName = sanitizedName 
      ? `compass-point_${sanitizedName}_${Date.now()}.txt`
      : `compass-point_${Date.now()}.txt`;
    a.download = fileName;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("텍스트 파일이 다운로드되었습니다");
  };

  const handlePrint = () => {
    if (!hasContent()) {
      toast.error("인쇄할 내용을 먼저 작성해주세요");
      return;
    }

    // 원래 제목 저장
    const originalTitle = document.title;
    
    // PDF 파일명 설정
    const sanitizedName = userName.trim().replace(/[^a-zA-Z0-9가-힣]/g, '_');
    const fileName = sanitizedName 
      ? `Compass-Point_${sanitizedName}_${new Date().toLocaleDateString('ko-KR').replace(/\./g, '-')}`
      : `Compass-Point_${new Date().toLocaleDateString('ko-KR').replace(/\./g, '-')}`;
    
    document.title = fileName;

    // 인쇄 대화상자 열기 (Toast 없이)
    setTimeout(() => {
      window.print();
      
      // 인쇄 후 원래 제목으로 복원
      setTimeout(() => {
        document.title = originalTitle;
      }, 100);
    }, 100);
  };

  const handleExportImage = async () => {
    if (!captureRef.current) {
      toast.error("캡처할 영역을 찾을 수 없습니다");
      return;
    }

    if (!hasContent()) {
      toast.error("다운로드할 내용을 먼저 작성해주세요");
      return;
    }

    try {
      // html2canvas 동적 import
      const html2canvas = (await import('html2canvas')).default;
      
      toast.info("이미지를 생성하고 있습니다...", {
        duration: 3000,
      });

      // 페이지 맨 위로 스크롤
      window.scrollTo(0, 0);

      // 약간의 지연 후 캡처 (렌더링 완료 대기)
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // html2canvas로 캡처
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        windowWidth: captureRef.current.scrollWidth,
        windowHeight: captureRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          // 클론된 문서의 모든 textarea를 div로 변환
          const clonedTextareas = clonedDoc.querySelectorAll('textarea');
          clonedTextareas.forEach((textarea) => {
            const ta = textarea as HTMLTextAreaElement;
            const div = clonedDoc.createElement('div');
            
            // textarea의 모든 스타일 복사
            const computedStyle = window.getComputedStyle(ta);
            div.style.cssText = ta.style.cssText;
            div.style.whiteSpace = 'pre-wrap';
            div.style.wordWrap = 'break-word';
            div.style.overflow = 'hidden';
            div.style.padding = computedStyle.padding;
            div.style.border = computedStyle.border;
            div.style.borderRadius = computedStyle.borderRadius;
            div.style.backgroundColor = computedStyle.backgroundColor;
            div.style.color = computedStyle.color;
            div.style.fontSize = computedStyle.fontSize;
            div.style.fontFamily = computedStyle.fontFamily;
            div.style.lineHeight = computedStyle.lineHeight;
            div.style.width = computedStyle.width;
            div.style.minHeight = computedStyle.height;
            div.className = ta.className;
            
            // textarea의 내용을 div에 복사 (줄바꿈 유지)
            div.textContent = ta.value;
            
            // textarea를 div로 교체
            ta.parentNode?.replaceChild(div, ta);
          });

          // 클론된 문서의 모든 input도 div로 변환
          const clonedInputs = clonedDoc.querySelectorAll('input[type="text"]');
          clonedInputs.forEach((input) => {
            const inp = input as HTMLInputElement;
            const div = clonedDoc.createElement('div');
            
            // input의 모든 스타일 복사
            const computedStyle = window.getComputedStyle(inp);
            div.style.cssText = inp.style.cssText;
            div.style.padding = computedStyle.padding;
            div.style.border = computedStyle.border;
            div.style.borderRadius = computedStyle.borderRadius;
            div.style.backgroundColor = computedStyle.backgroundColor;
            div.style.color = computedStyle.color;
            div.style.fontSize = computedStyle.fontSize;
            div.style.fontFamily = computedStyle.fontFamily;
            div.style.lineHeight = computedStyle.lineHeight;
            div.style.width = computedStyle.width;
            div.style.height = computedStyle.height;
            div.style.textAlign = computedStyle.textAlign;
            div.className = inp.className;
            
            // input의 내용을 div에 복사
            div.textContent = inp.value;
            
            // input을 div로 교체
            inp.parentNode?.replaceChild(div, inp);
          });
        },
      });

      // Canvas를 Blob으로 변환
      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error("이미지 생성에 실패했습니다");
          return;
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        
        // 파일명에 사용자 이름 포함
        const sanitizedName = userName.trim().replace(/[^a-zA-Z0-9가-힣]/g, '_');
        const fileName = sanitizedName 
          ? `Compass-Point_${sanitizedName}_${Date.now()}.png`
          : `Compass-Point_${Date.now()}.png`;
        a.download = fileName;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast.success("이미지가 다운로드되었습니다!");
      }, "image/png");
      
    } catch (error) {
      console.error("Image export error:", error);
      toast.error("이미지 다운로드 중 오류가 발생했습니다");
    }
  };

  return (
    <div className="min-h-screen bg-background py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8 print:mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 print:text-2xl">
            Compass Point
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground print:text-sm">
            하버드 프로젝트 제로 사고 가시화 루틴
          </p>
        </header>

        {/* Progress Bar - 인쇄 시 숨김 */}
        {progress > 0 && (
          <div className="max-w-md mx-auto mb-6 sm:mb-8 print:hidden">
            <div className="bg-card border-2 border-border rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">작성 진행률</span>
                <span className="text-sm font-bold text-primary">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="작성 진행률"
                />
              </div>
              {progress === 100 && (
                <div className="flex items-center gap-2 mt-2 text-green-600 text-sm">
                  <Check className="w-4 h-4" />
                  <span className="font-medium">모든 항목을 작성했습니다!</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* User Name Input */}
        <div className="max-w-md mx-auto mb-6 sm:mb-8 print:hidden">
          <div className="bg-card border-2 border-border rounded-xl p-4 sm:p-6 shadow-sm">
            <Label htmlFor="userName" className="block text-center font-semibold text-base mb-3">
              👤 이름 또는 모둠명
            </Label>
            <Input
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="이름이나 모둠명을 입력하세요"
              className="text-center text-base sm:text-lg font-medium"
              maxLength={50}
              aria-required="false"
              aria-describedby="userName-desc"
            />
            <p id="userName-desc" className="text-xs text-muted-foreground text-center mt-2">
              입력한 이름이 다운로드 파일명에 포함됩니다
            </p>
          </div>
        </div>

        {/* Actions - 인쇄 시 숨김 */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6 sm:mb-8 print:hidden">
          <Button 
            onClick={handleSave} 
            variant="default" 
            className="gap-2 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
            aria-label="작성 내용 저장하기"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">저장하기</span>
            <span className="sm:hidden">저장</span>
          </Button>
          <Button 
            onClick={handlePrint} 
            variant="default" 
            className="gap-2 bg-red-600 hover:bg-red-700 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
            aria-label="PDF로 저장하기 (인쇄)"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">PDF 저장</span>
            <span className="sm:hidden">PDF</span>
          </Button>
          <Button 
            onClick={handleExportImage} 
            variant="default" 
            className="gap-2 bg-green-600 hover:bg-green-700 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
            aria-label="이미지로 다운로드"
          >
            <ImageIcon className="w-4 h-4" />
            <span className="hidden sm:inline">이미지 저장</span>
            <span className="sm:hidden">이미지</span>
          </Button>
          <Button 
            onClick={handleExportText} 
            variant="secondary" 
            className="gap-2 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
            aria-label="텍스트 파일로 다운로드"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">텍스트 저장</span>
            <span className="sm:hidden">텍스트</span>
          </Button>
          <Button 
            onClick={handleReset} 
            variant="outline" 
            className="gap-2 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
            aria-label="모든 내용 초기화"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">초기화</span>
            <span className="sm:hidden">초기화</span>
          </Button>
        </div>

        {/* Auto-save indicator - 인쇄 시 숨김 */}
        <div className="text-center mb-4 sm:mb-6 print:hidden">
          <p className="text-xs sm:text-sm text-muted-foreground">
            💾 작성 내용은 2초마다 자동으로 저장됩니다
          </p>
        </div>

        {/* Capture Area */}
        <div ref={captureRef} className="bg-background p-4 sm:p-8 rounded-lg print:p-0">
          {userName && (
            <div className="text-center mb-4 sm:mb-6 print:mb-3">
              <p className="text-base sm:text-lg font-semibold text-foreground print:text-base">
                작성자: <span className="text-primary">{userName}</span>
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 items-start print:gap-4">
            <div className="lg:col-start-2">
              <DirectionCard
                direction="east"
                title="설렘, 기대"
                subtitle="East / 동쪽"
                questions={[
                  "이 아이디어에서 흥미로운 점은?",
                  "무엇이 기대되나요?",
                  "어떤 가능성이 보이나요?",
                ]}
                value={directions.east}
                onChange={(value) => updateDirection("east", value)}
              />
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 print:gap-4">
              <DirectionCard
                direction="west"
                title="걱정, 우려"
                subtitle="West / 서쪽"
                questions={[
                  "어떤 점이 걱정되나요?",
                  "잠재적 문제는?",
                  "어려운 부분은?",
                ]}
                value={directions.west}
                onChange={(value) => updateDirection("west", value)}
              />

              <div className="flex flex-col items-center justify-center">
                <div className="relative w-full max-w-sm bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-300 rounded-2xl p-6 sm:p-8 shadow-lg print:p-4">
                  <div className="mb-4 sm:mb-6 flex justify-center print:mb-2">
                    <img 
                      src={compassIllustration} 
                      alt="Compass" 
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain opacity-60 print:w-16 print:h-16"
                    />
                  </div>
                  <Label htmlFor="topic" className="block text-center font-bold text-base sm:text-lg mb-3 print:text-sm print:mb-2">
                    주제 / 아이디어
                  </Label>
                  <Input
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="검토할 아이디어를 입력하세요"
                    className="text-center font-medium text-base bg-background border-2 focus-visible:ring-2 focus-visible:ring-primary print:text-sm print:bg-white"
                    maxLength={100}
                  />
                </div>
              </div>

              <DirectionCard
                direction="south"
                title="필요, 제안"
                subtitle="South / 남쪽"
                questions={[
                  "더 알아야 할 것은?",
                  "추가 정보가 필요한 부분은?",
                  "탐구해야 할 질문은?",
                ]}
                value={directions.south}
                onChange={(value) => updateDirection("south", value)}
              />
            </div>

            <div className="lg:col-start-2">
              <DirectionCard
                direction="north"
                title="입장, 태도"
                subtitle="North / 북쪽"
                questions={[
                  "이 아이디어에 대한 현재 입장은?",
                  "전반적인 의견은?",
                  "어떻게 평가하나요?",
                ]}
                value={directions.north}
                onChange={(value) => updateDirection("north", value)}
              />
            </div>
          </div>

          <div className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground print:mt-4">
            <p>작성일: {new Date().toLocaleDateString('ko-KR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </div>

        {/* Footer - 인쇄 시 숨김 */}
        <footer className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-muted-foreground print:hidden">
          <p className="mb-2">
            Harvard Project Zero의 Thinking Routine을 기반으로 제작되었습니다
          </p>
          <p className="text-xs">
            <a 
              href="https://pz.harvard.edu/thinking-routines" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              자세히 알아보기 →
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};