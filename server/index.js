const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT || 8081);

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '$Onward1072$',
    database: process.env.DB_NAME || 'mydb',
    port: Number(process.env.DB_PORT || 3306),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function verifyDatabaseConnection() {
    try {
        const connection = await pool.getConnection();
        await connection.ping();
        connection.release();
        console.log('Database connection successful.');
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
}

app.get('/', (_req, res) => {
    return res.json({ message: 'Backend is running' });
});

app.get('/health', async (_req, res) => {
    try {
        await pool.query('SELECT 1');
        return res.status(200).json({ status: 'ok', database: 'connected' });
    } catch (error) {
        return res.status(500).json({ status: 'error', database: 'disconnected', error: error.message });
    }
});

app.get('/faculty', async (_req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM faculty');
        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: 'Unable to fetch faculty.', error: error.message });
    }
});

app.get('/programs', async (_req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM programs');
        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: 'Unable to fetch programs.', error: error.message });
    }
});

app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
    await verifyDatabaseConnection();
});