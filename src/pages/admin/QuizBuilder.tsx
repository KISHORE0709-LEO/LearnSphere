import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  GripVertical,
  CheckCircle2,
  Save,
  Trophy
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  text: string;
  options: Array<{ id: string; text: string }>;
  correctAnswer: string;
}

interface Rewards {
  firstTry: number;
  secondTry: number;
  thirdTry: number;
  moreTries: number;
}

export default function QuizBuilder() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = quizId === "new";
  
  const [quizTitle, setQuizTitle] = useState(isNew ? "" : "Module 1 Quiz");
  const [questions, setQuestions] = useState<Question[]>(isNew ? [] : [
    {
      id: "q1",
      text: "What is the main purpose of the Compound Components pattern?",
      options: [
        { id: "a", text: "To reduce bundle size" },
        { id: "b", text: "To create flexible, declarative APIs for components" },
        { id: "c", text: "To improve performance" },
        { id: "d", text: "To enable server-side rendering" },
      ],
      correctAnswer: "b",
    },
  ]);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(
    questions[0]?.id || null
  );
  const [showRewards, setShowRewards] = useState(false);
  const [rewards, setRewards] = useState<Rewards>({
    firstTry: 20,
    secondTry: 15,
    thirdTry: 10,
    moreTries: 5,
  });

  const activeQuestion = questions.find(q => q.id === activeQuestionId);

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: `q${Date.now()}`,
      text: "",
      options: [
        { id: "a", text: "" },
        { id: "b", text: "" },
      ],
      correctAnswer: "",
    };
    setQuestions([...questions, newQuestion]);
    setActiveQuestionId(newQuestion.id);
  };

  const handleDeleteQuestion = (id: string) => {
    const filtered = questions.filter(q => q.id !== id);
    setQuestions(filtered);
    if (activeQuestionId === id) {
      setActiveQuestionId(filtered[0]?.id || null);
    }
  };

  const handleUpdateQuestion = (updates: Partial<Question>) => {
    if (!activeQuestionId) return;
    setQuestions(questions.map(q => 
      q.id === activeQuestionId ? { ...q, ...updates } : q
    ));
  };

  const handleAddOption = () => {
    if (!activeQuestion || activeQuestion.options.length >= 6) return;
    const nextLetter = String.fromCharCode(97 + activeQuestion.options.length);
    handleUpdateQuestion({
      options: [...activeQuestion.options, { id: nextLetter, text: "" }]
    });
  };

  const handleUpdateOption = (optionId: string, text: string) => {
    if (!activeQuestion) return;
    handleUpdateQuestion({
      options: activeQuestion.options.map(o =>
        o.id === optionId ? { ...o, text } : o
      )
    });
  };

  const handleDeleteOption = (optionId: string) => {
    if (!activeQuestion || activeQuestion.options.length <= 2) return;
    handleUpdateQuestion({
      options: activeQuestion.options.filter(o => o.id !== optionId),
      correctAnswer: activeQuestion.correctAnswer === optionId ? "" : activeQuestion.correctAnswer
    });
  };

  const handleSaveQuiz = () => {
    if (!quizTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a quiz title",
        variant: "destructive",
      });
      return;
    }

    if (questions.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one question",
        variant: "destructive",
      });
      return;
    }

    const quizData = {
      id: quizId === "new" ? Date.now().toString() : quizId,
      courseId,
      title: quizTitle,
      questions,
      rewards,
      createdAt: new Date().toISOString(),
    };

    const existingQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    const updatedQuizzes = quizId === "new"
      ? [...existingQuizzes, quizData]
      : existingQuizzes.map((q: any) => q.id === quizId ? quizData : q);
    
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));

    toast({
      title: "Success",
      description: "Quiz saved successfully",
    });

    navigate(`/admin/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold">{isNew ? "Create Quiz" : "Edit Quiz"}</h1>
              <p className="text-sm text-muted-foreground">
                {questions.length} questions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowRewards(!showRewards)}
            >
              <Trophy className="h-4 w-4 mr-2" />
              Rewards
            </Button>
            <Button variant="glow" onClick={handleSaveQuiz}>
              <Save className="h-4 w-4 mr-2" />
              Save Quiz
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Panel - Questions List */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-72 h-[calc(100vh-65px)] sticky top-[65px] border-r border-border bg-card p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Questions</h2>
            <Button size="sm" onClick={handleAddQuestion}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {questions.map((question, index) => (
              <button
                key={question.id}
                onClick={() => setActiveQuestionId(question.id)}
                className={cn(
                  "w-full p-3 rounded-lg text-left transition-all flex items-center gap-2 group",
                  activeQuestionId === question.id
                    ? "bg-primary/10 border border-primary/30"
                    : "hover:bg-muted"
                )}
              >
                <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 cursor-grab" />
                <span className="flex-1 truncate text-sm">
                  {question.text || `Question ${index + 1}`}
                </span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteQuestion(question.id);
                  }}
                >
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </button>
            ))}

            {questions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground mb-4">No questions yet</p>
                <Button size="sm" onClick={handleAddQuestion}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>
            )}
          </div>
        </motion.aside>

        {/* Main Editor */}
        <main className="flex-1 p-8">
          {/* Quiz Title */}
          <div className="max-w-2xl mb-8">
            <Label htmlFor="quizTitle">Quiz Title</Label>
            <Input
              id="quizTitle"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              placeholder="Enter quiz title..."
              className="mt-2"
            />
          </div>

          {/* Rewards Panel */}
          {showRewards && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="max-w-2xl mb-8 p-6 bg-card border border-border rounded-xl"
            >
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Points Rewards
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>First Try</Label>
                  <Input
                    type="number"
                    value={rewards.firstTry}
                    onChange={(e) => setRewards({ ...rewards, firstTry: parseInt(e.target.value) || 0 })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Second Try</Label>
                  <Input
                    type="number"
                    value={rewards.secondTry}
                    onChange={(e) => setRewards({ ...rewards, secondTry: parseInt(e.target.value) || 0 })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Third Try</Label>
                  <Input
                    type="number"
                    value={rewards.thirdTry}
                    onChange={(e) => setRewards({ ...rewards, thirdTry: parseInt(e.target.value) || 0 })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Fourth Try & More</Label>
                  <Input
                    type="number"
                    value={rewards.moreTries}
                    onChange={(e) => setRewards({ ...rewards, moreTries: parseInt(e.target.value) || 0 })}
                    className="mt-1"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Question Editor */}
          {activeQuestion ? (
            <motion.div
              key={activeQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <div className="space-y-6">
                {/* Question Text */}
                <div>
                  <Label>Question</Label>
                  <Textarea
                    value={activeQuestion.text}
                    onChange={(e) => handleUpdateQuestion({ text: e.target.value })}
                    placeholder="Enter your question..."
                    className="mt-2 min-h-[100px]"
                  />
                </div>

                {/* Options */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Answer Options</Label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleAddOption}
                      disabled={activeQuestion.options.length >= 6}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Option
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {activeQuestion.options.map((option) => (
                      <div key={option.id} className="flex items-center gap-3">
                        <button
                          onClick={() => handleUpdateQuestion({ correctAnswer: option.id })}
                          className={cn(
                            "h-8 w-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                            activeQuestion.correctAnswer === option.id
                              ? "border-success bg-success text-success-foreground"
                              : "border-muted-foreground hover:border-success"
                          )}
                          title="Mark as correct answer"
                        >
                          {activeQuestion.correctAnswer === option.id && (
                            <CheckCircle2 className="h-5 w-5" />
                          )}
                        </button>
                        <Input
                          value={option.text}
                          onChange={(e) => handleUpdateOption(option.id, e.target.value)}
                          placeholder={`Option ${option.id.toUpperCase()}`}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleDeleteOption(option.id)}
                          disabled={activeQuestion.options.length <= 2}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    Click the circle to mark the correct answer
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="max-w-2xl text-center py-16">
              <p className="text-muted-foreground mb-4">
                Select a question or create a new one
              </p>
              <Button onClick={handleAddQuestion}>
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
