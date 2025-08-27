import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EducationLevelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const EducationLevelSelector = ({ value, onChange }: EducationLevelSelectorProps) => {
  const levels = [
    "🐣 Elementary Explorer",
    "🌟 Middle School Master",
    "🔥 High School Hero",
    "🎓 College Champion"
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="education-level" className="text-base font-semibold">
        🎓 What's Your Learning Level? *
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-12">
          <SelectValue placeholder="🏫 Tell us your grade adventure!" />
        </SelectTrigger>
        <SelectContent>
          {levels.map((level) => (
            <SelectItem key={level} value={level}>
              {level}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EducationLevelSelector;