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

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
})