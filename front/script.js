const API_URL = 'http://localhost:5000/students';

document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('student-form');
    if (studentForm) {
        studentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const studentData = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                curso: document.getElementById('curso').value,
                periodo: document.getElementById('periodo').value,
                turma: document.getElementById('turma').value,
                turno: document.getElementById('turno').value,
                endereco: document.getElementById('endereco').value,
                telefone: document.getElementById('telefone').value
            };
            
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(studentData)
                });
                
                if (response.ok) {
                    alert('Aluno cadastrado com sucesso!');
                    studentForm.reset();
                    loadStudents(); // Recarregar a lista de alunos
                } else {
                    alert('Erro ao cadastrar aluno.');
                }
            } catch (error) {
                console.error('Erro na requisição POST:', error);
                alert('Erro ao tentar cadastrar aluno. Tente novamente.');
            }
        });
    }

    const studentsList = document.getElementById('students-list');
    if (studentsList) {
        loadStudents(); // Carregar alunos na inicialização
    }
});

// Função para carregar a lista de alunos
async function loadStudents() {
    const studentsList = document.getElementById('students-list');
    studentsList.innerHTML = ''; // Limpar a lista atual

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erro ao carregar alunos');
        }
        const students = await response.json();
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.nome}</td>
                <td>${student.email}</td>
                <td>${student.curso}</td>
                <td>${student.periodo}</td>
                <td>${student.turma}</td>
                <td>${student.turno}</td>
                <td>${student.endereco}</td>
                <td>${student.telefone}</td>
                <td><button onclick="deleteStudent('${student._id}')">Excluir</button></td>
            `;
            studentsList.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar a lista de alunos:', error);
    }
}

// Função para excluir um aluno
async function deleteStudent(id) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Aluno excluído com sucesso!');
                loadStudents(); // Recarregar a lista de alunos após exclusão
            } else {
                alert('Erro ao excluir aluno.');
            }
        } catch (error) {
            console.error('Erro ao excluir aluno:', error);
            alert('Erro ao tentar excluir aluno. Tente novamente.');
        }
    }
}
