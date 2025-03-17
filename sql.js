const express = require('express')
const { Pool } = require('pg')

const router = express.Router();

// Create a new Pool instance
const pool = new Pool({
    connectionString: process.env.POSTGRES_URI,
})

// Test the database connection
pool.query('SELECT 1', (err, result) => {
    if (err) {
        console.error('Error connecting to the database:', err)
    } else {
        console.log('Connected to the database')
    }
})
// PostgreSQL CRUD routes
router.post('/users', async (req, res) => {
    const { name, email } = req.body
    try {
        const result = await pool.query(
            'INSERT INTO users(name, email) VALUES($1,$2) RETURNING *',
            [name, email]
        )
        res.send(result.rows[0])
    } catch (error) {
        console.error('Error executing query:', error)
        res.status(500).send('Internal Server Error')
    }
})

router.get('/users', async (req, res) => {
    console.log('== postgresql', process.env.POSTGRES_URI)
    try {
        const result = await pool.query('SELECT * FROM users')
        res.send(result.rows)
    } catch (error) {
        console.error('Error executing query:', error)
        res.status(500).send('Internal Server Error')
    }
})

router.get('/users/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
        res.send(result.rows[0])
    } catch (error) {
        console.error('Error executing query:', error)
        res.status(500).send('Internal Server Error')
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [req.params.id])
        res.sendStatus(200)
    } catch (error) {
        console.error('Error executing query:', error)
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router