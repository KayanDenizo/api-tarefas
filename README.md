# 📝 API de Tarefas

API REST simples para gerenciar uma lista de tarefas, feita com **Node.js + Express**, com um front-end em HTML, CSS e JavaScript puro que consome a API.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Funcionalidades

- Listar, criar, concluir e deletar tarefas
- Validação de título obrigatório
- Front-end que consome a API com `fetch`

> As tarefas ficam em memória: ao reiniciar o servidor, a lista é zerada.

## Endpoints

| Método | Rota            | Descrição                    |
|--------|-----------------|------------------------------|
| GET    | `/tarefas`      | Lista todas as tarefas       |
| POST   | `/tarefas`      | Cria uma tarefa (`{ "titulo": "..." }`) |
| PUT    | `/tarefas/:id`  | Marca a tarefa como concluída |
| DELETE | `/tarefas/:id`  | Remove a tarefa              |

## Como rodar

```bash
npm install
npm start
```

A API sobe em `http://localhost:3000`. Depois, abra `frontend-tarefas/index.html` no navegador.

## Estrutura

```
├── server.js            # API Express
└── frontend-tarefas/    # Interface (HTML, CSS, JS)
```
