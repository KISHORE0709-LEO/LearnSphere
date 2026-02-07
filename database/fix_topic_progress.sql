-- Create user-specific topic progress table
CREATE TABLE IF NOT EXISTS user_topic_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES module_topics(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, topic_id)
);

CREATE INDEX idx_user_topic_progress_user ON user_topic_progress(user_id);
CREATE INDEX idx_user_topic_progress_topic ON user_topic_progress(topic_id);
CREATE INDEX idx_user_topic_progress_course ON user_topic_progress(user_id, course_id);

-- Remove is_completed from module_topics since it should be user-specific
ALTER TABLE module_topics DROP COLUMN IF EXISTS is_completed;
ALTER TABLE module_topics DROP COLUMN IF EXISTS completed_at;
