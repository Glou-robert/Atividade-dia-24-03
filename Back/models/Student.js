const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    nome: String,
    email: String,
    curso: String,
    periodo: String,
    turma: String,
    turno: String,
    endereco: String,
    telefone: String
});

module.exports = mongoose.model('Student', StudentSchema);
