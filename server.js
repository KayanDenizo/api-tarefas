const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors()) // ← libera todas as origens (ok para desenvolvimento)
app.use(express.json())



let tarefas = []
let proximoId = 1

// GET /tarefas - listar todas
app.get('/tarefas', (req, res) => {
    res.json(tarefas)
})

// POST /tarefas - criar nova
app.post('/tarefas', (req, res) => {
    const {titulo} = req.body

    if (!titulo) {
        return res.status(400).json({erro: 'Título é obrigatório'})
    }

    const novaTarefa = {
        id: proximoId++,
        titulo,
        concluida: false
    }

    tarefas.push(novaTarefa)
    res.status(201).json(novaTarefa)
})

// DELETE /tarefas/id: - deletar por id
app.delete('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id)
    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) {
        return res.status(404).json({erro: 'Tarefa não encontrada'})
    }

    tarefas.splice(index, 1)
    res.json({mensagem: 'Tarefa deletada com sucesso'})
})


// PUT - Atualizar EM SQLITE
// app.put('/tarefas/:id', (req, res) => {
//     const id = req.params.id
//     const tarefa = db.prepare('SELECT * FROM tarefas WHERE id = ?').get(id)
    
//     if(!tarefa) {
//         return res.status(404).json({erro: "Tarefa nao encontrada"})
//     }
    
//     db.prepare('UPDATE tarefas SET concluida = 1 WHERE id = ?').run(id)
    
//     const tarefaAtualizada = db.prepare('SELECT * FROM tarefas WHERE id = ?').get(id)
//     res.json(tarefaAtualizada)
// })


// PUT - EM FIND SEM SQLITE
app.put('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id)
  const tarefa = tarefas.find(t => t.id === id)

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' })
  }

  tarefa.concluida = true
  res.json(tarefa)
})


// SEMPRE A ULTIMA LINHA DO SERVER
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
})