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
    color: "east",
    label: "E",
  },
  west: {
    icon: "←",
    color: "west",
    label: "W",
  },
  south: {
    icon: "↓",
    color: "south",
    label: "S",
  },
  north: {
    icon: "↑",
    color: "north",
    label: "N",
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
  
  return (
    <div className={`relative bg-${info.color}-light border-2 border-${info.color} rounded-xl p-6 shadow-[var(--shadow-card)] transition-[var(--transition-smooth)] hover:shadow-[var(--shadow-elevated)]`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-full bg-${info.color} text-${info.color}-foreground flex items-center justify-center text-2xl font-bold`}>
          {info.label}
        </div>
        <div>
          <h3 className="font-bold text-lg text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      
      <div className="mb-3 space-y-1">
        {questions.map((question, idx) => (
          <p key={idx} className="text-sm text-muted-foreground">• {question}</p>
        ))}
      </div>

      <Label htmlFor={`input-${direction}`} className="sr-only">
        {title}
      </Label>
      <Textarea
        id={`input-${direction}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="여기에 생각을 작성하세요..."
        className="min-h-[120px] resize-none border-border focus-visible:ring-2 focus-visible:ring-primary"
      />
    </div>
  );
};
