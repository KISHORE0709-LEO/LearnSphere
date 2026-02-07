import { useState, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";

type QuizState = "intro" | "question" | "result";

export default function QuizPlayer() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<QuizState>("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [attempt, setAttempt] = useState(1);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        console.log('Fetching quiz with ID:', quizId);
        const res = await fetch(`http://localhost:3001/api/quiz/${quizId}`);
        
        if (!res.ok) {
          const errorText = await res.text();
          console.error('Quiz fetch failed:', res.status, errorText);
          throw new Error('Quiz not found');
        }
        
        const data = await res.json();
        console.log('Quiz loaded:', data);
        setQuiz(data);
      } catch (error: any) {
        console.error('Error fetching quiz:', error);
        toast({ 
          title: "Error", 
          description: error.message || "Failed to load quiz", 
          variant: "destructive" 
        });
        setQuiz(null);
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuiz();
    } else {
      setLoading(false);
      setQuiz(null);
    }
  }, [quizId, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <p className="text-muted-foreground">Quiz not found</p>
          <Button onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

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
      setState("result");
      
      // Calculate score with newAnswers (not state)
      const score = Object.keys(newAnswers).reduce((correct, qId) => {
        const q = quiz.questions.find((question: any) => question.id === qId);
        const selectedOpt = q?.options.find((opt: any) => opt.id === newAnswers[qId]);
        return correct + (selectedOpt?.is_correct ? 1 : 0);
      }, 0);
      
      const percentage = (score / quiz.questions.length) * 100;
      const passed = percentage >= quiz.passing_score;
      
      // Calculate points with score
      const points = passed ? (
        attempt === 1 ? quiz.rewards.firstTry :
        attempt === 2 ? quiz.rewards.secondTry :
        attempt === 3 ? quiz.rewards.thirdTry :
        quiz.rewards.moreTries
      ) : 0;
      
      console.log('Quiz completed:', { score, percentage, passed, points, attempt });
      
      if (passed && currentUser) {
        fetch(`http://localhost:3001/api/quiz/${quizId}/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            courseId, 
            passed: true, 
            userId: currentUser.id,
            points,
            attemptNumber: attempt
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log('Quiz completion response:', data);
          if (data.user) {
            const updatedUser = { ...currentUser, total_points: data.user.total_points, badge_level: data.user.badge_level };
            console.log('Updating localStorage with:', updatedUser);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            setCurrentUser(updatedUser);
          }
        })
        .catch(err => console.error('Failed to save quiz completion:', err));
      }
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q: any) => {
      const selectedOptionId = answers[q.id];
      const selectedOption = q.options.find((opt: any) => opt.id === selectedOptionId);
      if (selectedOption?.is_correct) {
        correct++;
      }
    });
    return correct;
  };

  const getPoints = () => {
    const score = calculateScore();
    const percentage = (score / quiz.questions.length) * 100;
    if (percentage < quiz.passing_score) return 0;
    
    switch (attempt) {
      case 1: return quiz.rewards.firstTry;
      case 2: return quiz.rewards.secondTry;
      case 3: return quiz.rewards.thirdTry;
      default: return quiz.rewards.moreTries;
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
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
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
              <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
              <div className="text-muted-foreground mb-8 space-y-2">
                <p>{quiz.questions.length} Questions</p>
                <p>Multiple attempts allowed</p>
                <p className="text-sm">
                  First try: {quiz.rewards.firstTry} pts • 
                  Second: {quiz.rewards.secondTry} pts • 
                  Third: {quiz.rewards.thirdTry} pts
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
                {currentQuestion.options.map((option: any) => (
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
              {calculateScore() >= Math.ceil(quiz.questions.length * (quiz.passing_score / 100)) ? (
                <>
                  <div className="h-24 w-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-12 w-12 text-success" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
                  <p className="text-muted-foreground mb-4">
                    You scored {calculateScore()}/{quiz.questions.length}
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
                    You scored {calculateScore()}/{quiz.questions.length}
                  </p>
                  <p className="text-sm text-muted-foreground mb-8">
                    You need {quiz.passing_score}% to pass and earn points.
                  </p>
                </>
              )}
              
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => navigate(`/courses/${courseId}`)}>
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
