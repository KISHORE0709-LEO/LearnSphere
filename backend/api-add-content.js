// Backend API Endpoint for Adding Course Content
// Add this to your backend server (e.g., server.js or routes/courses.js)

// POST /api/courses/:courseId/topics
app.post('/api/courses/:courseId/topics', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, type, duration, video_url, description, responsible } = req.body;

    // First, get or create a default module for this course
    let moduleResult = await pool.query(
      'SELECT id FROM modules WHERE course_id = ? LIMIT 1',
      [courseId]
    );

    let moduleId;
    if (moduleResult.length === 0) {
      // Create a default module
      const newModule = await pool.query(
        'INSERT INTO modules (course_id, title, order_index) VALUES (?, ?, ?)',
        [courseId, 'Main Content', 1]
      );
      moduleId = newModule.insertId;
    } else {
      moduleId = moduleResult[0].id;
    }

    // Insert the topic
    const result = await pool.query(
      `INSERT INTO topics (module_id, title, type, duration, video_url, description, order_index, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [moduleId, title, type, duration || 0, video_url || null, description || null, 1]
    );

    res.json({
      id: result.insertId,
      title,
      type,
      duration,
      video_url,
      description,
    });
  } catch (error) {
    console.error('Error adding topic:', error);
    res.status(500).json({ error: 'Failed to add content' });
  }
});
