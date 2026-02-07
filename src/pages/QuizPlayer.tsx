import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Trophy,
  ChevronRight,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock quiz data
const mockQuiz = {
  id: "1",
  title: "Module 1 Quiz",
  questions: [
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
    {
      id: "q2",
      text: "Which hook is essential for implementing the Context pattern?",
      options: [
        { id: "a", text: "useState" },
        { id: "b", text: "useEffect" },
        { id: "c", text: "useContext" },
        { id: "d", text: "useReducer" },
      ],
      correctAnswer: "c",
    },
    {
      id: "q3",
      text: "What problem does the Render Props pattern solve?",
      options: [
        { id: "a", text: "State management" },
        { id: "b", text: "Code reuse and sharing behavior between components" },
        { id: "c", text: "Styling components" },
        { id: "d", text: "API calls" },
      ],
      correctAnswer: "b",
    },
  ],
  rewards: {
    firstTry: 20,
    secondTry: 15,
    thirdTry: 10,
    moreTries: 5,
  },
};

type QuizState = "intro" | "question" | "result";

export default function QuizPlayer() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  
  const [state, setState] = useState<QuizState>("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [attempt, setAttempt] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = mockQuiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockQuiz.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === mockQuiz.questions.length - 1;

  const handleStartQuiz = () => {
    setState("question");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedAnswer(null);
  };

  const handleSelectAnswer = (optionId: string) => {
    setSelectedAnswer(optionId);
  };

  const handleProceed = () => {
    if (!selectedAnswer) return;
    
    const newAnswers = { ...answers, [currentQuestion.id]: selectedAnswer };
    setAnswers(newAnswers);
    
    if (isLastQuestion) {
      // Calculate score
      setState("result");
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    mockQuiz.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getPoints = () => {
    const score = calculateScore();
    const percentage = (score / mockQuiz.questions.length) * 100;
    if (percentage < 70) return 0; // Must pass to earn points
    
    switch (attempt) {
      case 1: return mockQuiz.rewards.firstTry;
      case 2: return mockQuiz.rewards.secondTry;
      case 3: return mockQuiz.rewards.thirdTry;
      default: return mockQuiz.rewards.moreTries;
    }
  };

  const handleRetry = () => {
    setAttempt(prev => prev + 1);
    handleStartQuiz();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        
        {state === "question" && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {mockQuiz.questions.length}
            </span>
            <Progress value={progress} className="w-32 h-2" />
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {/* Intro Screen */}
          {state === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-md"
            >
              <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-4">{mockQuiz.title}</h1>
              <div className="text-muted-foreground mb-8 space-y-2">
                <p>{mockQuiz.questions.length} Questions</p>
                <p>Multiple attempts allowed</p>
                <p className="text-sm">
                  First try: {mockQuiz.rewards.firstTry} pts • 
                  Second: {mockQuiz.rewards.secondTry} pts • 
                  Third: {mockQuiz.rewards.thirdTry} pts
                </p>
              </div>
              <Button variant="glow" size="lg" onClick={handleStartQuiz}>
                Start Quiz
              </Button>
            </motion.div>
          )}

          {/* Question Screen */}
          {state === "question" && currentQuestion && (
            <motion.div
              key={`question-${currentQuestion.id}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-2xl"
            >
              <h2 className="text-xl font-semibold mb-8">{currentQuestion.text}</h2>
              
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelectAnswer(option.id)}
                    className={cn(
                      "w-full p-4 rounded-xl border text-left transition-all",
                      selectedAnswer === option.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0",
                        selectedAnswer === option.id
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      )}>
                        {selectedAnswer === option.id && (
                          <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                        )}
                      </div>
                      <span>{option.text}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <Button 
                  variant="glow" 
                  size="lg"
                  onClick={handleProceed}
                  disabled={!selectedAnswer}
                >
                  {isLastQuestion ? "Complete Quiz" : "Proceed"}
                  <ChevronRight className="h-5 w-5 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Result Screen */}
          {state === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-md"
            >
              {calculateScore() >= Math.ceil(mockQuiz.questions.length * 0.7) ? (
                <>
                  <div className="h-24 w-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-12 w-12 text-success" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
                  <p className="text-muted-foreground mb-4">
                    You scored {calculateScore()}/{mockQuiz.questions.length}
                  </p>
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-8">
                    <p className="text-lg font-semibold text-primary">
                      +{getPoints()} Points Earned!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Attempt #{attempt}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                    <XCircle className="h-12 w-12 text-destructive" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Keep Learning!</h2>
                  <p className="text-muted-foreground mb-4">
                    You scored {calculateScore()}/{mockQuiz.questions.length}
                  </p>
                  <p className="text-sm text-muted-foreground mb-8">
                    You need 70% to pass and earn points.
                  </p>
                </>
              )}
              
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Back to Course
                </Button>
                <Button variant="glow" onClick={handleRetry}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
