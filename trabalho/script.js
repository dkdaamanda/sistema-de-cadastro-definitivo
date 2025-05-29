let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
let editIndex = -1;

const form = document.getElementById('form-aluno');
const tabela = document.getElementById('tabela-alunos').querySelector('tbody');
const buscar = document.getElementById('buscar');

function atualizarTabela(filtro = '') {
  tabela.innerHTML = '';
  alunos
    .filter(aluno => aluno.nome.toLowerCase().includes(filtro.toLowerCase()))
    .forEach((aluno, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.idade}</td>
        <td>${aluno.curso}</td>
        <td>
          <button class="action-btn edit-btn" onclick="editarAluno(${index})">Editar</button>
          <button class="action-btn remove-btn" onclick="removerAluno(${index})">Remover</button>
        </td>
      `;
      tabela.appendChild(tr);
    });
}

function salvarLocalStorage() {
  localStorage.setItem('alunos', JSON.stringify(alunos));
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const curso = document.getElementById('curso').value;

  if (editIndex >= 0) {
    alunos[editIndex] = { nome, idade, curso };
    editIndex = -1;
  } else {
    alunos.push({ nome, idade, curso });
  }

  salvarLocalStorage();
  atualizarTabela();
  form.reset();
});

function removerAluno(index) {
  if (confirm("Tem certeza que deseja remover este aluno?")) {
    alunos.splice(index, 1);
    salvarLocalStorage();
    atualizarTabela(buscar.value);
  }
}

function editarAluno(index) {
  const aluno = alunos[index];
  document.getElementById('nome').value = aluno.nome;
  document.getElementById('idade').value = aluno.idade;
  document.getElementById('curso').value = aluno.curso;
  editIndex = index;
}

buscar.addEventListener('input', () => {
  atualizarTabela(buscar.value);
});

atualizarTabela();
