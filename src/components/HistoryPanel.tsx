import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, Trash2, Calendar, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HistoryItem {
  id: string;
  config: {
    subject: string;
    length: string;
    educationLevel: string;
  };
  homework: string;
  createdAt: string;
}

interface HistoryPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HistoryPanel = ({ open, onOpenChange }: HistoryPanelProps) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      const stored = JSON.parse(localStorage.getItem('homeworkHistory') || '[]');
      setHistory(stored);
    }
  }, [open]);

  const handleCopy = (homework: string) => {
    navigator.clipboard.writeText(homework);
    toast({
      title: "Copied!",
      description: "Homework has been copied to clipboard."
    });
  };

  const handleDownload = (homework: string, id: string) => {
    const blob = new Blob([homework], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `homework-${id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Homework has been downloaded to your device."
    });
  };

  const handleDelete = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('homeworkHistory', JSON.stringify(updated));
    
    toast({
      title: "Deleted!",
      description: "Homework has been removed from history."
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <BookOpen className="w-6 h-6 text-purple-600" />
            Homework History
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No homework generated yet</h3>
              <p className="text-muted-foreground">Your generated assignments will appear here for easy access.</p>
            </div>
          ) : (
            history.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{item.config.subject} Assignment</CardTitle>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="secondary">{item.config.subject}</Badge>
                        <Badge variant="outline">{item.config.educationLevel}</Badge>
                        <Badge variant="outline">{item.config.length}</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {formatDate(item.createdAt)}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleCopy(item.homework)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDownload(item.homework, item.id)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 p-4 rounded-md max-h-32 overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground">
                      {item.homework.substring(0, 200)}...
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryPanel;