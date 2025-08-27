import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Settings, Sparkles, BookOpen } from "lucide-react";

interface GuidePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GuidePopup = ({ open, onOpenChange }: GuidePopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <BookOpen className="w-6 h-6 text-purple-600" />
            How to Use the Homework Generator
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Settings className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Step 1: Configure Your Assignment</h3>
              <p className="text-muted-foreground mb-3">
                Fill in the required fields to customize your homework assignment:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Subject/Topic</Badge>
                  <span className="text-sm">Choose from sciences, math, humanities, and more</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Length</Badge>
                  <span className="text-sm">Select word count from very short to long</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Education Level</Badge>
                  <span className="text-sm">Pick appropriate grade level</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Step 2: Generate Your Homework</h3>
              <p className="text-muted-foreground mb-3">
                Once all fields are completed, click the "Generate Homework" button. The AI will create a comprehensive assignment tailored to your specifications.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Step 3: Use Your Assignment</h3>
              <p className="text-muted-foreground mb-3">
                Your generated homework will include:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Clear assignment overview and instructions</li>
                <li>Learning objectives and goals</li>
                <li>Submission guidelines</li>
                <li>Assessment criteria</li>
              </ul>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border">
            <h4 className="font-semibold mb-2">💡 Pro Tips</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Use the Copy button to quickly share assignments</li>
              <li>• Download assignments as text files for easy distribution</li>
              <li>• Check your Homework History to reuse previous assignments</li>
              <li>• All generated assignments are automatically saved</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuidePopup;