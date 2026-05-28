const API = 'http://localhost:3000/tarefas'

async function carregarTarefas() {
  try {
    const resposta = await fetch(API)

    if (!resposta.ok) {
      throw new Error(`Erro ao buscar tarefas: ${resposta.status}`)
    }

    const tarefas = await resposta.json()
    const lista = document.getElementById('lista-tarefas')
    lista.innerHTML = ''

    tarefas.forEach(tarefa => {
      const li = document.createElement('li')

      // Se concluída, risca o texto
      li.style.opacity = tarefa.concluida ? '0.5' : '1'

      li.innerHTML = `
        <span style="text-decoration: ${tarefa.concluida ? 'line-through' : 'none'}">
          ${tarefa.titulo}
        </span>
        <div style="display:flex; gap:8px">
          <button class="btn-concluir" onclick="concluirTarefa(${tarefa.id})" 
            ${tarefa.concluida ? 'disabled' : ''}>
            ✅
          </button>
          <button class="btn-deletar" onclick="deletarTarefa(${tarefa.id})">
            Deletar
          </button>
        </div>
      `
      lista.appendChild(li)
    })

  } catch (erro) {
    console.error('Erro ao carregar tarefas:', erro.message)
    alert('Não foi possível carregar as tarefas. Servidor está rodando?')
  }
}

async function criarTarefa() {
  try {
    const input = document.getElementById('input-tarefa')
    const titulo = input.value.trim()

    if (!titulo) return

    const resposta = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo })
    })

    if (!resposta.ok) {
      throw new Error(`Erro ao criar tarefa: ${resposta.status}`)
    }

    input.value = ''
    carregarTarefas()

  } catch (erro) {
    console.error('Erro ao criar tarefa:', erro.message)
    alert('Não foi possível criar a tarefa.')
  }
}

async function concluirTarefa(id) {
  try {
    const resposta = await fetch(`${API}/${id}`, {
      method: 'PUT'
    })

    if (!resposta.ok) {
      throw new Error(`Erro ao concluir tarefa: ${resposta.status}`)
    }

    carregarTarefas()

  } catch (erro) {
    console.error('Erro ao concluir tarefa:', erro.message)
    alert('Não foi possível concluir a tarefa.')
  }
}

async function deletarTarefa(id) {
  try {
    const resposta = await fetch(`${API}/${id}`, {
      method: 'DELETE'
    })

    if (!resposta.ok) {
      throw new Error(`Erro ao deletar tarefa: ${resposta.status}`)
    }

    carregarTarefas()

  } catch (erro) {
    console.error('Erro ao deletar tarefa:', erro.message)
    alert('Não foi possível deletar a tarefa.')
  }
}

document.getElementById('btn-adicionar').addEventListener('click', criarTarefa)

carregarTarefas()