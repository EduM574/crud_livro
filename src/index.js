//importa os módulos http e express
const http = require('http');
const express = require('express');
//constrói um objeto express
const app = express();
//importa o body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//configura a porta do servidor e o coloca em execução.
const porta = 3000;
app.set('port', porta);
const server = http.createServer(app);
server.listen(3000);

let id = 2;
let livros = [{
        id: 1,
        titulo: "Guia do Mochileiro",
        descricao: "Guia de um mochileiro",
        edicao: "Planeta",
        autor: "Douglas Adams",
        isbn: 1234567899
    },
    {
        id: 2,
        titulo: "Harry Potter",
        descricao: "Bruxo criança",
        edicao: "Esfera",
        autor: "J.K Howl",
        isbn: 1234567891
    }
];

let livros2 = [];

//tratamento de requisições POST
app.post("/livros", (req, res, next) => {
    const livro = {
        id: id += 1,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        edicao: req.body.edicao,
        autor: req.body.autor,
        isbn: req.body.isbn
    }
    livros.push(livro)
    res.status(201).json(livro);
});
//tratamento de requisições GET
app.get("/livros", (req, res, next) => {
    res.status(200).json(livros);
})
//tratamento de requisições PUT
app.put("/livros", (req, res, next) => {
    livros.forEach((livro) => {
        if (livro.id === req.body.id) {
            livro.titulo = req.body.titulo;
            livro.descricao = req.body.descricao;
            livro.edicao = req.body.edicao;
            livro.autor = req.body.autor;
            livro.isbn = req.body.isbn;
        }
    })
    res.status(204).end();
});
//tratamento de requisições DELETE
//tratamento de requisições DELETE
app.delete("/livros", (req, res, next) => {
    livros.forEach((livro) => {
        if (livro.id != req.body.id) {
            const livro2 = {
                id: livro.id,
                titulo: livro.titulo,
                descricao: livro.descricao,
                edicao: livro.edicao,
                autor: livro.autor,
                isbn: livro.isbn
            }
            livros2.push(livro2)
        }
    })
    livros = livros2;
    res.status(200).json(livros).end;
});

