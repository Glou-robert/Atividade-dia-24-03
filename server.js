const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./Back/config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();

app.get('/', (req, res) => {
    res.send('API de Alunos');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
