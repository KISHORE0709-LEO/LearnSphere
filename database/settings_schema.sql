-- Platform Settings Table
CREATE TABLE IF NOT EXISTS platform_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO platform_settings (setting_key, setting_value) VALUES
('siteName', 'LearnSphere'),
('siteDescription', 'An immersive learning platform'),
('contactEmail', 'support@learnsphere.com'),
('allowRegistration', 'true'),
('requireEmailVerification', 'false'),
('enableNotifications', 'true'),
('enableBadges', 'true'),
('enablePoints', 'true'),
('maintenanceMode', 'false')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

-- Support Tickets Table
CREATE TABLE IF NOT EXISTS support_tickets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('open', 'in-progress', 'resolved', 'closed') DEFAULT 'open',
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
