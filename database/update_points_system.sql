-- Update quiz_completions table to track points earned
ALTER TABLE quiz_completions ADD COLUMN IF NOT EXISTS points_earned INTEGER DEFAULT 0;
ALTER TABLE quiz_completions ADD COLUMN IF NOT EXISTS attempt_number INTEGER DEFAULT 1;

-- Function to calculate badge level based on points
CREATE OR REPLACE FUNCTION get_badge_level(points INTEGER) RETURNS VARCHAR AS $$
BEGIN
  IF points >= 500 THEN RETURN 'Master';
  ELSIF points >= 300 THEN RETURN 'Expert';
  ELSIF points >= 200 THEN RETURN 'Specialist';
  ELSIF points >= 100 THEN RETURN 'Achiever';
  ELSIF points >= 50 THEN RETURN 'Explorer';
  ELSE RETURN 'Newbie';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to get next badge info
CREATE OR REPLACE FUNCTION get_next_badge_info(current_points INTEGER, 
  OUT next_badge VARCHAR, 
  OUT points_needed INTEGER, 
  OUT progress_percentage INTEGER
) AS $$
DECLARE
  current_threshold INTEGER;
  next_threshold INTEGER;
BEGIN
  IF current_points >= 500 THEN
    next_badge := 'Master';
    points_needed := 0;
    progress_percentage := 100;
  ELSIF current_points >= 300 THEN
    current_threshold := 300;
    next_threshold := 500;
    next_badge := 'Master';
    points_needed := next_threshold - current_points;
    progress_percentage := ROUND(((current_points - current_threshold)::NUMERIC / (next_threshold - current_threshold)::NUMERIC) * 100)::INTEGER;
  ELSIF current_points >= 200 THEN
    current_threshold := 200;
    next_threshold := 300;
    next_badge := 'Expert';
    points_needed := next_threshold - current_points;
    progress_percentage := ROUND(((current_points - current_threshold)::NUMERIC / (next_threshold - current_threshold)::NUMERIC) * 100)::INTEGER;
  ELSIF current_points >= 100 THEN
    current_threshold := 100;
    next_threshold := 200;
    next_badge := 'Specialist';
    points_needed := next_threshold - current_points;
    progress_percentage := ROUND(((current_points - current_threshold)::NUMERIC / (next_threshold - current_threshold)::NUMERIC) * 100)::INTEGER;
  ELSIF current_points >= 50 THEN
    current_threshold := 50;
    next_threshold := 100;
    next_badge := 'Achiever';
    points_needed := next_threshold - current_points;
    progress_percentage := ROUND(((current_points - current_threshold)::NUMERIC / (next_threshold - current_threshold)::NUMERIC) * 100)::INTEGER;
  ELSE
    current_threshold := 0;
    next_threshold := 50;
    next_badge := 'Explorer';
    points_needed := next_threshold - current_points;
    progress_percentage := ROUND((current_points::NUMERIC / next_threshold::NUMERIC) * 100)::INTEGER;
  END IF;
END;
$$ LANGUAGE plpgsql;
