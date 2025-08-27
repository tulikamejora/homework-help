import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, ChevronRight, RefreshCw, GraduationCap, Copy, Download, Trash2, BookOpen, History } from "lucide-react";
import SubjectSelector from "./SubjectSelector";
import LengthSelector from "./LengthSelector";
import EducationLevelSelector from "./EducationLevelSelector";
import HomeworkResults from "./HomeworkResults";
import GuidePopup from "./GuidePopup";
import HistoryPanel from "./HistoryPanel";
interface HomeworkConfig {
  subject: string;
  length: string;
  educationLevel: string;
  customTopic?: string;
}
const HomeworkGenerator = () => {
  const [config, setConfig] = useState<HomeworkConfig>({
    subject: "",
    length: "",
    educationLevel: "",
    customTopic: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHomework, setGeneratedHomework] = useState<string>("");
  const [showGuide, setShowGuide] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const {
    toast
  } = useToast();
  const getCompletionPercentage = () => {
    let completed = 0;
    if (config.subject) completed++;
    if (config.length) completed++;
    if (config.educationLevel) completed++;
    return Math.round(completed / 3 * 100);
  };
  const handleGenerate = async () => {
    if (!config.subject || !config.length || !config.educationLevel) {
      toast({
        title: "🚨 Oops! Missing Mad Lib Words!",
        description: "Please fill in all the blanks to create your homework masterpiece! 🎨",
        variant: "destructive"
      });
      return;
    }
    setIsGenerating(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    const sampleHomework = generateSampleHomework(config);
    setGeneratedHomework(sampleHomework);

    // Save to history
    const historyItem = {
      id: Date.now().toString(),
      config,
      homework: sampleHomework,
      createdAt: new Date().toISOString()
    };
    const history = JSON.parse(localStorage.getItem('homeworkHistory') || '[]');
    history.unshift(historyItem);
    localStorage.setItem('homeworkHistory', JSON.stringify(history.slice(0, 10))); // Keep last 10

    setIsGenerating(false);
    toast({
      title: "🎉 Ta-da! Your Mad Lib is Ready!",
      description: "Your hilarious homework assignment has been created! 🎭✨"
    });
  };
  const generateSampleHomework = (config: HomeworkConfig) => {
    const subjects = {
      "Biology": "Cell Structure and Function Research Project",
      "Chemistry": "Chemical Reactions Laboratory Report",
      "Physics": "Newton's Laws of Motion Problem Set",
      "Mathematics": "Quadratic Equations Practice Problems",
      "History": "World War II Timeline Analysis",
      "English": "Literary Analysis Essay",
      "Computer Science": "Algorithm Design Challenge",
      "Art": "Color Theory Portfolio Project"
    };
    const levels = {
      "Elementary School": "elementary",
      "Middle School": "middle school",
      "High School": "high school",
      "College/University": "college"
    };
    const lengths = {
      "Very Short (150 - 300 words)": "brief",
      "Short (300 - 600 words)": "short",
      "Medium (600 - 900 words)": "medium-length",
      "Long (900 - 1200 words)": "comprehensive"
    };
    return `# ${subjects[config.subject as keyof typeof subjects] || "Custom Assignment"}

## Assignment Overview
This is a ${lengths[config.length as keyof typeof lengths]} ${levels[config.educationLevel as keyof typeof levels]} assignment focusing on ${config.subject}.

## Instructions
1. Research the topic thoroughly using credible sources
2. Organize your findings into a clear structure
3. Present your work in the specified format
4. Include proper citations and references

## Learning Objectives
- Understand key concepts in ${config.subject}
- Develop critical thinking skills
- Practice academic writing and research
- Apply knowledge to real-world scenarios

## Submission Guidelines
- Follow the ${config.length.toLowerCase()} format
- Use appropriate ${config.educationLevel.toLowerCase()} language level
- Submit by the specified deadline
- Include all required components

## Assessment Criteria
Your work will be evaluated based on:
- Content accuracy and depth
- Organization and clarity
- Use of evidence and sources
- Meeting length requirements
- Appropriate academic level

Good luck with your assignment!`;
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHomework);
    toast({
      title: "Copied!",
      description: "Homework has been copied to clipboard."
    });
  };
  const handleDownload = () => {
    const blob = new Blob([generatedHomework], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'homework-assignment.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: "Homework has been downloaded to your device."
    });
  };
  const handleClear = () => {
    setGeneratedHomework("");
    toast({
      title: "Cleared!",
      description: "Results have been cleared."
    });
  };
  return <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4 my-[45px]">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold my-0 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent py-[7px] md:text-5xl">AI Homework Generator</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xl mb-6">Create your perfect homework assignment! Just pick your favorite subject, choose how long you want it, and tell us your grade level - then watch the magic happen!</p>
        </div>

        {/* Configuration Progress */}
        <Card className="mb-6 animate-slide-up">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{getCompletionPercentage()}%</span>
            </div>
            <Progress value={getCompletionPercentage()} className="h-4" />
          </CardContent>
        </Card>

        {/* Configuration Form */}
        <Card className="mb-8 animate-slide-up">
          <CardContent className="p-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <SubjectSelector value={config.subject} onChange={value => setConfig(prev => ({
              ...prev,
              subject: value
            }))} />
              <LengthSelector value={config.length} onChange={value => setConfig(prev => ({
              ...prev,
              length: value
            }))} />
              <EducationLevelSelector value={config.educationLevel} onChange={value => setConfig(prev => ({
              ...prev,
              educationLevel: value
            }))} />
            </div>

            {/* Generate Button */}
            <div className="mt-8">
              <Button onClick={handleGenerate} disabled={!config.subject || !config.length || !config.educationLevel || isGenerating} className="btn-primary text-lg py-6 px-12 shadow-deep w-full" size="lg">
                {isGenerating ? <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Creating Your Mad Lib Magic...
                  </> : <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate My Mad Lib Homework!
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Area */}
        {generatedHomework && <HomeworkResults homework={generatedHomework} onCopy={handleCopy} onDownload={handleDownload} onClear={handleClear} />}

        {/* Guide and History Buttons */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Button onClick={() => setShowGuide(true)} variant="outline" size="lg" className="h-16 text-lg font-semibold text-white bg-rose-500 hover:bg-rose-400">
            <BookOpen className="w-6 h-6 mr-3" />
            How to Play Guide
          </Button>
          <Button onClick={() => setShowHistory(true)} variant="outline" size="lg" className="h-16 text-lg font-semibold text-white bg-rose-500 hover:bg-rose-400">
            <History className="w-6 h-6 mr-3" />
            My Mad Lib Collection
          </Button>
        </div>

        {/* Modals */}
        <GuidePopup open={showGuide} onOpenChange={setShowGuide} />
        <HistoryPanel open={showHistory} onOpenChange={setShowHistory} />

        {/* App Overview Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100 shadow-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">🚀 Why Use AI Homework Generator?</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">Generate comprehensive homework assignments in seconds, not hours. Perfect for busy educators and students alike.</p>
              </Card>
              
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-200">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-semibold text-lg mb-2">Perfectly Tailored</h3>
                <p className="text-muted-foreground">Customized content for every education level and subject, ensuring age-appropriate and engaging assignments.</p>
              </Card>
              
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-pink-200">
                <div className="text-4xl mb-3">📚</div>
                <h3 className="font-semibold text-lg mb-2">Comprehensive Coverage</h3>
                <p className="text-muted-foreground">From elementary science to college-level literature, our AI covers all subjects with expert-level accuracy.</p>
              </Card>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
              <h3 className="text-xl font-semibold mb-4 text-purple-700">🌟 Perfect for Everyone</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div>
                  <h4 className="font-medium mb-2">👩‍🏫 Educators & Teachers</h4>
                  <p className="text-sm text-muted-foreground mb-3">Save valuable time on assignment creation while maintaining high-quality, curriculum-aligned content. Generate diverse assignments for different learning styles and abilities.</p>
                  
                  <h4 className="font-medium mb-2">👨‍🎓 Students & Parents</h4>
                  <p className="text-sm text-muted-foreground">Get extra practice materials, study guides, and homework help. Perfect for homeschooling families who need structured, professional-quality assignments.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🏫 Schools & Institutions</h4>
                  <p className="text-sm text-muted-foreground mb-3">Standardize assignment quality across departments while giving teachers the flexibility to customize content for their specific needs and teaching styles.</p>
                  
                  <h4 className="font-medium mb-2">💡 Tutors & Coaches</h4>
                  <p className="text-sm text-muted-foreground">Create personalized practice materials for individual students, adapting difficulty levels and topics to match specific learning goals and challenges.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default HomeworkGenerator;