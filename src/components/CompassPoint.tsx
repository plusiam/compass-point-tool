import { useState } from "react";
import { DirectionCard } from "./DirectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw, Download, Save } from "lucide-react";
import { toast } from "sonner";
import compassIllustration from "@/assets/compass-illustration.png";

export const CompassPoint = () => {
  const [topic, setTopic] = useState("");
  const [directions, setDirections] = useState({
    east: "",
    west: "",
    south: "",
    north: "",
  });

  const updateDirection = (direction: keyof typeof directions, value: string) => {
    setDirections((prev) => ({ ...prev, [direction]: value }));
  };

  const handleReset = () => {
    setTopic("");
    setDirections({
      east: "",
      west: "",
      south: "",
      north: "",
    });
    toast.success("모든 내용이 초기화되었습니다");
  };

  const handleSave = () => {
    const data = {
      topic,
      directions,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem("compass-point-data", JSON.stringify(data));
    toast.success("작성 내용이 저장되었습니다");
  };

  const handleExport = () => {
    const content = `
Compass Point 사고 루틴 결과
===========================

주제: ${topic || "(작성되지 않음)"}

E (동쪽) - 설렘, 기대
${directions.east || "(작성되지 않음)"}

W (서쪽) - 걱정, 우려
${directions.west || "(작성되지 않음)"}

S (남쪽) - 필요, 제안
${directions.south || "(작성되지 않음)"}

N (북쪽) - 입장, 태도
${directions.north || "(작성되지 않음)"}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compass-point-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("파일이 다운로드되었습니다");
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Compass Point
          </h1>
          <p className="text-lg text-muted-foreground">
            하버드 프로젝트 제로 사고 가시화 루틴
          </p>
        </header>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Button onClick={handleSave} variant="default" className="gap-2">
            <Save className="w-4 h-4" />
            저장하기
          </Button>
          <Button onClick={handleExport} variant="secondary" className="gap-2">
            <Download className="w-4 h-4" />
            내보내기
          </Button>
          <Button onClick={handleReset} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            초기화
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* East */}
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

          {/* West - South - North row */}
          <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* West */}
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

            {/* Center Topic */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full max-w-sm bg-compass-center border-2 border-compass-border rounded-2xl p-8 shadow-[var(--shadow-elevated)]">
                <div className="mb-6 flex justify-center">
                  <img 
                    src={compassIllustration} 
                    alt="Compass" 
                    className="w-24 h-24 object-contain opacity-60"
                  />
                </div>
                <Label htmlFor="topic" className="block text-center font-bold text-lg mb-3">
                  주제 / 아이디어
                </Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="검토할 아이디어를 입력하세요"
                  className="text-center font-medium bg-background border-2 focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
            </div>

            {/* South */}
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

          {/* North */}
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

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            Harvard Project Zero의 Thinking Routine을 기반으로 제작되었습니다
          </p>
        </footer>
      </div>
    </div>
  );
};
