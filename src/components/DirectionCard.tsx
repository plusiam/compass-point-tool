import { useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface DirectionCardProps {
  direction: "east" | "west" | "south" | "north";
  title: string;
  subtitle: string;
  questions: string[];
  value: string;
  onChange: (value: string) => void;
}

const directionInfo = {
  east: {
    icon: "→",
    label: "E",
    card: "bg-pink-50 border-pink-500 hover:shadow-pink-100",
    badge: "bg-pink-500 text-white",
    ring: "focus-visible:ring-pink-500",
  },
  west: {
    icon: "←",
    label: "W",
    card: "bg-green-50 border-green-500 hover:shadow-green-100",
    badge: "bg-green-500 text-white",
    ring: "focus-visible:ring-green-500",
  },
  south: {
    icon: "↓",
    label: "S",
    card: "bg-blue-50 border-blue-500 hover:shadow-blue-100",
    badge: "bg-blue-500 text-white",
    ring: "focus-visible:ring-blue-500",
  },
  north: {
    icon: "↑",
    label: "N",
    card: "bg-purple-50 border-purple-500 hover:shadow-purple-100",
    badge: "bg-purple-500 text-white",
    ring: "focus-visible:ring-purple-500",
  },
};

export const DirectionCard = ({
  direction,
  title,
  subtitle,
  questions,
  value,
  onChange,
}: DirectionCardProps) => {
  const info = directionInfo[direction];
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // 자동 높이 조절 - value가 변경될 때마다
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // 높이 리셋
      textarea.style.height = 'auto';
      // 내용에 맞게 높이 조절 (최소 150px)
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = Math.max(150, scrollHeight) + 'px';
    }
  }, [value]);
  
  return (
    <div 
      className={`relative ${info.card} border-2 rounded-xl p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-lg print:break-inside-avoid print:shadow-none print:p-3`}
      role="region"
      aria-labelledby={`${direction}-title`}
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 print:mb-2">
        <div 
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${info.badge} flex items-center justify-center text-xl sm:text-2xl font-bold shadow-md flex-shrink-0 print:w-8 print:h-8 print:text-lg print:shadow-sm`}
          aria-hidden="true"
        >
          {info.label}
        </div>
        <div className="min-w-0 flex-1">
          <h3 id={`${direction}-title`} className="font-bold text-base sm:text-lg text-foreground print:text-sm">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground print:text-xs">{subtitle}</p>
        </div>
      </div>
      
      <div className="mb-3 space-y-1 print:mb-2" role="list">
        {questions.map((question, idx) => (
          <p 
            key={idx} 
            className="text-xs sm:text-sm text-muted-foreground leading-relaxed print:text-xs"
            role="listitem"
          >
            • {question}
          </p>
        ))}
      </div>

      <Label htmlFor={`input-${direction}`} className="sr-only">
        {title} - {questions[0]}
      </Label>
      
      <Textarea
        ref={textareaRef}
        id={`input-${direction}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="여기에 생각을 작성하세요..."
        className={`w-full resize-none overflow-hidden text-sm sm:text-base border-2 ${info.ring} focus-visible:ring-2 leading-relaxed p-3 print:border-none print:text-sm print:p-2`}
        aria-describedby={`${direction}-questions`}
        rows={1}
        style={{
          minHeight: '150px',
          fieldSizing: 'content',
        }}
      />
      <div id={`${direction}-questions`} className="sr-only">
        {questions.join('. ')}
      </div>
    </div>
  );
};
