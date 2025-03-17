const express = require('express')
const mysql = require('mysql2')

const router = express.Router();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

router.get('/users', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM users')
        res.send(result)
    } catch (error) {
        console.error('Error executing query:', error)
        res.status(500).send('Internal Server Error')
    }
})

router.post('/users', async (req, res) => {
    const { name, email } = req.body
    try {
        const [result] = await pool.query(
            'INSERT INTO users(name, email) VALUES(?, ?)',
            [name, email]
        )
        res.send(result)
    } catch (error) {
        console.error('Error executing query:', error)
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router