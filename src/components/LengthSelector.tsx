import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LengthSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const LengthSelector = ({ value, onChange }: LengthSelectorProps) => {
  const lengths = [
    "🚀 Lightning Quick! (150 - 300 words)",
    "📝 Just Right Size (300 - 600 words)",
    "📚 Getting Serious (600 - 900 words)",
    "📖 Epic Novel Mode! (900 - 1200 words)"
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="length" className="text-base font-semibold">
        📏 How Long Should Your Epic Be? *
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-12">
          <SelectValue placeholder="🤏 Pick your perfect size!" />
        </SelectTrigger>
        <SelectContent>
          {lengths.map((length) => (
            <SelectItem key={length} value={length}>
              {length}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LengthSelector;