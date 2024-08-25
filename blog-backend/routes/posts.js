const express = require('express');
const db = require('../database');
const router = express.Router();

// GET /posts - Fetch all posts
router.get('/', (req, res) => {
    db.all('SELECT * FROM posts', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ posts: rows });
    });
});

// GET /posts/:id - Fetch a specific post by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ post: row });
    });
});

// POST /posts - Create a new post
router.post('/', (req, res) => {
    const { title, content } = req.body;
    db.run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ post: { id: this.lastID, title, content } });
    });
});

// PUT /posts/:id - Update a post by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    db.run('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post updated successfully' });
    });
});

// DELETE /posts/:id - Delete a post by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM posts WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    });
});

module.exports = router;
