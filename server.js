const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// Usando a URL do MongoDB diretamente no código
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://Gabriel:1234567890@cluster0.34f1j.mongodb.net/crud_alunos?retryWrites=true&w=majority";

// Conexão com o MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.log("Erro na conexão com o MongoDB", err));

// Definir o schema do aluno
const alunoSchema = new mongoose.Schema({
    nome: String,
    email: String,
    curso: String,
    periodo: String,
    turma: String,
    turno: String,
    endereco: String,
    telefone: String
});

// Criar o modelo do aluno
const Aluno = mongoose.model('Aluno', alunoSchema);

// Middleware para usar JSON e CORS
app.use(express.json());
app.use(cors());

// Rotas da API

// Rota GET para listar todos os alunos
app.get('/students', async (req, res) => {
    try {
        const alunos = await Aluno.find();
        res.json(alunos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota POST para adicionar um novo aluno
app.post('/students', async (req, res) => {
    const aluno = new Aluno({
        nome: req.body.nome,
        email: req.body.email,
        curso: req.body.curso,
        periodo: req.body.periodo,
        turma: req.body.turma,
        turno: req.body.turno,
        endereco: req.body.endereco,
        telefone: req.body.telefone
    });

    try {
        const newAluno = await aluno.save();
        res.status(201).json(newAluno);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota PUT para atualizar um aluno
app.put('/students/:id', async (req, res) => {
    try {
        const aluno = await Aluno.findById(req.params.id);
        if (!aluno) {
            return res.status(404).json({ message: "Aluno não encontrado" });
        }

        aluno.nome = req.body.nome || aluno.nome;
        aluno.email = req.body.email || aluno.email;
        aluno.curso = req.body.curso || aluno.curso;
        aluno.periodo = req.body.periodo || aluno.periodo;
        aluno.turma = req.body.turma || aluno.turma;
        aluno.turno = req.body.turno || aluno.turno;
        aluno.endereco = req.body.endereco || aluno.endereco;
        aluno.telefone = req.body.telefone || aluno.telefone;

        const updatedAluno = await aluno.save();
        res.json(updatedAluno);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota DELETE para excluir um aluno
app.delete('/students/:id', async (req, res) => {
    try {
        const aluno = await Aluno.findById(req.params.id);
        if (!aluno) {
            return res.status(404).json({ message: "Aluno não encontrado" });
        }

        await aluno.remove();
        res.json({ message: "Aluno excluído com sucesso" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota principal da API
app.get('/', (req, res) => {
    res.send('API de Alunos');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
