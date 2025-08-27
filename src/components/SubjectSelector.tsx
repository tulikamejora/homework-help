import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SubjectSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const SubjectSelector = ({ value, onChange }: SubjectSelectorProps) => {
  const subjects = [
    { category: "🔬 Sciences", items: ["🧬 Biology", "⚗️ Chemistry", "🚀 Physics", "🌍 Earth Science", "⭐ Astronomy"] },
    { category: "🔢 Mathematics", items: ["📊 Algebra", "📐 Geometry", "📈 Calculus", "📉 Statistics", "📏 Trigonometry"] },
    { category: "📖 Humanities", items: ["🏛️ History", "📝 English", "🤔 Philosophy", "👥 Sociology", "🗿 Anthropology"] },
    { category: "🗣️ Languages", items: ["🇪🇸 Spanish", "🇫🇷 French", "🇩🇪 German", "🇨🇳 Chinese", "🇯🇵 Japanese"] },
    { category: "💻 Computer Science", items: ["👨‍💻 Programming", "📊 Data Science", "🌐 Web Development", "🤖 Artificial Intelligence", "🔗 Networking"] },
    { category: "🎨 Arts", items: ["🎵 Music", "🖼️ Visual Arts", "🎭 Theater", "💃 Dance", "🎬 Film Studies"] }
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="subject" className="text-base font-semibold">
        🎯 Pick Your Adventure Subject! *
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-12">
          <SelectValue placeholder="🤔 What should we explore today?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">🎲 Surprise Me!</SelectItem>
          {subjects.map((category) => (
            <div key={category.category}>
              <div className="px-2 py-1 text-sm font-semibold text-muted-foreground bg-muted/50">
                {category.category}
              </div>
              {category.items.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubjectSelector;