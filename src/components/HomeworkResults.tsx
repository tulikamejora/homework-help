import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, Trash2, FileText } from "lucide-react";

interface HomeworkResultsProps {
  homework: string;
  onCopy: () => void;
  onDownload: () => void;
  onClear: () => void;
}

const HomeworkResults = ({ homework, onCopy, onDownload, onClear }: HomeworkResultsProps) => {
  return (
    <Card className="mb-8 animate-slide-up">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Generated Homework Assignment
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onCopy}>
            <Copy className="w-4 h-4 mr-1" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={onDownload}>
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={onClear}>
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-800">
            {homework}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeworkResults;