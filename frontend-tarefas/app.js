const API = 'http://localhost:3000/tarefas'

// Busca e renderiza todas as tarefas
async function carregarTarefas() {
  const resposta = await fetch(API)
  const tarefas = await resposta.json()

  const lista = document.getElementById('lista-tarefas')
  lista.innerHTML = ''

  tarefas.forEach(tarefa => {
    const li = document.createElement('li')
    li.innerHTML = `
      <span>${tarefa.titulo}</span>
      <button class="btn-deletar" onclick="deletarTarefa(${tarefa.id})">Deletar</button>
    `
    lista.appendChild(li)
  })
}

// Cria nova tarefa
async function criarTarefa() {
  const input = document.getElementById('input-tarefa')
  const titulo = input.value.trim()

  if (!titulo) return

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo })
  })

  input.value = ''
  carregarTarefas()
}

// Deleta tarefa pelo id
async function deletarTarefa(id) {
  await fetch(`${API}/${id}`, {
    method: 'DELETE'
  })

  carregarTarefas()
}

// Evento do botão
document.getElementById('btn-adicionar').addEventListener('click', criarTarefa)

// Carrega as tarefas ao abrir a página
carregarTarefas()