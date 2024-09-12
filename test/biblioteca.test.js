const Biblioteca = require("../src/biblioteca");

describe('Testes da classe Biblioteca', () => {
    let biblioteca;

    beforeEach(() => {
        biblioteca = new Biblioteca();
    });

    test('Deve adicionar um livro', () => {
        const livro = { id: 1, titulo: 'Horus Rising', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false }

        biblioteca.adicionarLivro(livro);

        expect(biblioteca.livros).toContain(livro);
    });

    test('Deve remover um livro', () => {
        const livro = { id: 1, titulo: 'Horus Rising', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false }

        biblioteca.adicionarLivro(livro);
        biblioteca.removerLivro(1);

        expect(biblioteca.livros).not.toContain(livro);
    });

    test('Deve buscar um livro por ID', () => {
        const livro = { id: 1, titulo: 'Horus Rising', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false };

        biblioteca.adicionarLivro(livro);

        const resultado = biblioteca.buscarLivroPorId(1);
        expect(resultado).toBe(livro);
    });
    
    test('Deve atualizar as informações de um livro', () => {
        const livro = { id: 1, titulo: 'Horus Rising', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false };

        biblioteca.adicionarLivro(livro);
        biblioteca.atualizarInformacaoLivro(1, { titulo: 'False Gods', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false });

        expect(biblioteca.buscarLivroPorId(1).titulo).toBe('False Gods');
    });

    test('Deve buscar um livro por Titulo', () => {
        const livro = { id: 1, titulo: 'Horus Rising', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false };
        biblioteca.adicionarLivro(livro);

        const resultado = biblioteca.buscarLivroPorTitulo('Horus Rising');
        expect(resultado).toContain(livro);
    });

    test('Deve listar um conjunto de livros', () => {
        const livros = [
            { id: 1, titulo: 'Horus Rising', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false },
            { id: 2, titulo: 'False Gods', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false }
        ];

        for (let i = 0; i < livros.length; i++) {
            biblioteca.adicionarLivro(livros[i]);
        }

        const resultado = biblioteca.listarLivros();
        expect(resultado).toContain(livros[0]);
        expect(resultado).toContain(livros[1]);
    });

    test('Deve adicionar um membro', () => {
        const membro = { id: 1, nome: 'Eduardo' }

        biblioteca.adicionarMembro(membro);

        expect(biblioteca.membros).toContain(membro);
    });

    test('Deve remover um membro', () => {
        const membro = { id: 1, nome: 'Eduardo' }

        biblioteca.adicionarMembro(membro);
        biblioteca.removerMembro(1);

        expect(biblioteca.membros).not.toContain(membro);
    });

    test('Deve buscar um membro por ID', () => {
        const membro = { id: 1, nome: 'Eduardo' };
        biblioteca.adicionarMembro(membro);

        const resultado = biblioteca.buscarMembroPorId(1);
        expect(resultado).toBe(membro);
    });

    test('Deve listar um conjunto de membros', () => {
        const membros = [
            { id: 1, nome: 'Eduardo' },
            { id: 2, nome: 'Sofia' }
        ];

        for (let i = 0; i < membros.length; i++) {
            biblioteca.adicionarMembro(membros[i]);
        }

        const resultado = biblioteca.listarMembros();
        expect(resultado).toContain(membros[0]);
        expect(resultado).toContain(membros[1]);
    });

    test('Deve ser possível um membro emprestar um livro', () => {
        const livro = { id: 1, titulo: 'Horus Rising', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false }
        const membro = { id: 1, nome: 'Eduardo' }

        biblioteca.adicionarLivro(livro)
        biblioteca.adicionarMembro(membro)

        biblioteca.emprestarLivro(1, 1)

        const livroEmprestado = biblioteca.buscarLivroPorId(1)

        expect(biblioteca.livros).toContain(livro)
        expect(livroEmprestado.emprestado).toBe(true)
        expect(livroEmprestado.idMembro).toBe(membro.id)
    })

    test('Deve ser possível um membro devolver um livro', () => {
        const livro = { id: 1, titulo: 'Horus Rising', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false }
        const membro = { id: 1, nome: 'Eduardo' }

        biblioteca.adicionarLivro(livro)
        biblioteca.adicionarMembro(membro)

        biblioteca.emprestarLivro(1, 1)

        const livroEmprestado = biblioteca.buscarLivroPorId(1)

        biblioteca.devolverLivro(livroEmprestado.id)

        expect(biblioteca.livros).toContain(livro)
        expect(livroEmprestado.emprestado).toBe(false)
    })

    test('Deve ser possível listar livros emprestados', () => {
        const livros = [
            { id: 1, titulo: 'Horus Rising', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false },
            { id: 2, titulo: 'False Gods', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false }
        ];

        for (let i = 0; i < livros.length; i++) {
            biblioteca.adicionarLivro(livros[i]);
        }

        const membro = { id: 1, nome: 'Eduardo' }

        biblioteca.adicionarMembro(membro)

        biblioteca.emprestarLivro(1, 1)

        const resultado = biblioteca.listarLivrosEmprestados()

        expect(resultado).not.toContain(livros[1])
        expect(resultado.length).toBe(1)
    })

    test('Deve ser possível listar livros disponiveis', () => {
        const livros = [
            { id: 1, titulo: 'Horus Rising', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false },
            { id: 2, titulo: 'False Gods', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false }
        ];

        for (let i = 0; i < livros.length; i++) {
            biblioteca.adicionarLivro(livros[i]);
        }

        const membro = { id: 1, nome: 'Eduardo' }

        biblioteca.adicionarMembro(membro)

        biblioteca.emprestarLivro(1, 1)

        const resultado = biblioteca.listarLivrosDisponiveis()

        expect(resultado).not.toContain(livros[0])
        expect(resultado.length).toBe(1)
    })

    test('Deve ser possível contar o número de livros', () => {
        const livros = [
            { id: 1, titulo: 'Horus Rising', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false },
            { id: 2, titulo: 'False Gods', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false }
        ];

        for (let i = 0; i < livros.length; i++) {
            biblioteca.adicionarLivro(livros[i]);
        }

        const resultado = biblioteca.contarLivros()

        expect(resultado).toBe(2)
    })

    test('Deve ser possível contar o número de membros', () => {
        const membros = [
            { id: 1, nome: 'Eduardo' },
            { id: 2, nome: 'Sofia' }
        ];

        for (let i = 0; i < membros.length; i++) {
            biblioteca.adicionarMembro(membros[i]);
        }

        const resultado = biblioteca.contarMembros()

        expect(resultado).toBe(2)
    })

    test('Deve ser possível listar livros por autor', () => {
        const livros = [
            { id: 1, titulo: 'Horus Rising', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false },
            { id: 2, titulo: 'Lord of The Rings', autor: 'Tolkien', genero: 'Fantasia', ano: '1980', emprestado: false }
        ];

        for (let i = 0; i < livros.length; i++) {
            biblioteca.adicionarLivro(livros[i]);
        }

        const resultado = biblioteca.listarLivrosPorAutor('Dan Abnett');

        expect(resultado).toContain(livros[0])
    })

    test('Deve ser possível listar livros por genero', () => {
        const livros = [
            { id: 1, titulo: 'Horus Rising', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false },
            { id: 2, titulo: 'Lord of The Rings', autor: 'Tolkien', genero: 'Fantasia', ano: '1980', emprestado: false }
        ];

        for (let i = 0; i < livros.length; i++) {
            biblioteca.adicionarLivro(livros[i]);
        }

        const resultado = biblioteca.listarLivrosPorGenero('Fantasia');

        expect(resultado).toContain(livros[1])
    })

    test('Deve ser possível listar livros por ano', () => {
        const livros = [
            { id: 1, titulo: 'Horus Rising', autor: 'Dan Abnett', genero: 'Ficção Científica', ano: '2006', emprestado: false },
            { id: 2, titulo: 'Lord of The Rings', autor: 'Tolkien', genero: 'Fantasia', ano: '1980', emprestado: false }
        ];

        for (let i = 0; i < livros.length; i++) {
            biblioteca.adicionarLivro(livros[i]);
        }

        const resultado = biblioteca.listarLivrosPorAno('2006');

        expect(resultado).toContain(livros[0])
    })
});
