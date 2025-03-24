const API_URL = 'http://localhost:5000/api/students';

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
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });
            alert('Aluno cadastrado com sucesso!');
            studentForm.reset();
        });
    }

    const studentsList = document.getElementById('students-list');
    if (studentsList) {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                data.forEach(student => {
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
            });
    }
});

async function deleteStudent(id) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        alert('Aluno excluído com sucesso!');
        location.reload();
    }
}
