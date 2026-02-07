-- Delete quiz completions with 0 points
DELETE FROM quiz_completions WHERE points_earned = 0;

-- Reset user points to 0
UPDATE users SET total_points = 0, badge_level = 'Newbie';
