-- Create table to track quiz completions
CREATE TABLE IF NOT EXISTS quiz_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES module_quizzes(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, quiz_id)
);

CREATE INDEX idx_quiz_completions_user ON quiz_completions(user_id);
CREATE INDEX idx_quiz_completions_quiz ON quiz_completions(quiz_id);
CREATE INDEX idx_quiz_completions_course ON quiz_completions(user_id, course_id);
