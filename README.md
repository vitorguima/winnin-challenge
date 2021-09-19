# Desafio realizado para a vaga de front-end na empresa Winnin

## Proposta

"O desafio consiste em ler dados da api do Reddit, do subreddit [reactjs](https://www.reddit.com/r/reactjs/) e criar uma aplicação React contendo as informações que podem ser vistas no [Figma](https://www.figma.com/file/PPvIPPITdlgZo9CeGDVezk/DesafioWinnin?node-id=0%3A1) com três botões para navegar entre hot, new e rising." 

[Respositório do desafio](https://github.com/winnin/desafio/blob/master/FRONTEND.md).

## Deploy da aplicação no Vercel

* [Winnin Challenge](https://winnin-challenge-seven.vercel.app/hot)

## Tecnologias utilizadas

* [React JS](https://pt-br.reactjs.org/)
* [Eslint](https://github.com/betrybe/eslint-config-trybe)
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
* [Coverage](https://github.com/shinnn/coverage#readme)

## Comentários sobre o código

* Foram utilizados componentes funcionais para o gerenciamento de estados da aplicação. 
* Para o desenvolvimento, foi utilizada a [API do Reddit](https://www.reddit.com/dev/api/).
* Não foram utilizadas ferramentas como Context API ou Redux para gerenciamente de estados globais da aplicação. Essa decisão foi motivada pelo fato de que a estrutura definida para a aplicação não resultaria em **[prop-drilling](https://www.geeksforgeeks.org/what-is-prop-drilling-and-how-to-avoid-it/)** entre os componentes existentes. Ou seja, as props passadas de um componente pai para um filho só ocorreu em situações nas quais o segundo, de fato, utilizaria tal prop. Em nenhuma situação, algum componente recebeu uma prop para que um sub componente dessa fosse utilizá-la. Essa opção evitou a adição de mais uma camada de abstração na aplicação construída ou de uma biblioteca terceira.
* Foram criadas diferentes rotas para a navegação entre os diferentes tipos de tópicos: "/hot", "/new", "/rising". Essa decisão foi motivada pelo fato disso possibilitar que um usuário consiga acessar ou compartilhar com um terceiro, a url do caminho desejado. Além disso, através do **hook useLocation**, as rotas também foram utilizadas como um estado global da aplicação. Ou seja, serviram como input para a regra de negócio da aplicação.

## Como instalar e executar a aplicação localmente

* [Clonar o repositório](https://docs.github.com/pt/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository)
* ```npm install / yarn install```
* ```npm start / yarn  start```

## Para executar os testes
A execução dos testes só será possível após o processo de instalação local da aplicação.

* ```npm run test```

Esse comando retornará a seguinte tela em seu terminal:

```$
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```

Ao ao aparecer a tela acima, aperte a tecla "a" para que todos os testes sejam executados.

## Para verificar a cobertura de testes

* **npm run test-coverage**

Esse comando retornará a seguinte tela dentro do seu terminal:

```
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------|---------|----------|---------|---------|-------------------
All files             |   95.41 |    85.29 |     100 |   95.28 |                   
 src                  |   66.67 |      100 |     100 |   66.67 |                   
  App.jsx             |     100 |      100 |     100 |     100 |                   
  Routes.jsx          |     100 |      100 |     100 |     100 |                   
  index.jsx           |       0 |      100 |     100 |       0 | 6                 
 src/components       |   96.84 |    85.29 |     100 |   96.74 |                   
  FilterButton.jsx    |     100 |      100 |     100 |     100 |                   
  FindMoreButton.jsx  |     100 |      100 |     100 |     100 |                   
  Header.jsx          |     100 |      100 |     100 |     100 |                   
  NavigationBar.jsx   |     100 |      100 |     100 |     100 |                   
  PageLoader.jsx      |     100 |      100 |     100 |     100 |                   
  PostCard.jsx        |   94.29 |    83.33 |     100 |   94.12 | 85,98             
  PostsFeed.jsx       |    97.5 |    83.33 |     100 |   97.44 | 72                
 src/pages            |     100 |      100 |     100 |     100 |                   
  PostsDiscovery.jsx  |     100 |      100 |     100 |     100 |                   
 src/services         |   85.71 |      100 |     100 |   85.71 |                   
  getPostsList.js     |   85.71 |      100 |     100 |   85.71 | 9                 
 src/tests            |     100 |      100 |     100 |     100 |                   
  RenderWithRouter.js |     100 |      100 |     100 |     100 |                   
----------------------|---------|----------|---------|---------|-------------------
```
### Resumo do relatório:
* **% Stmts**: 95%;
* **% Branch**: 85%;
* **% Funcs**: 100%;
* **% Lines**: 95%;

### Glossário do Relatório

* Coluna **"File"**: apresenta o nome dos arquivos que estão sendo testados.
* Coluna **"% Stmts"**: percentual de estados da aplicação que foram testados.
* Coluna  **"% Branch"**: percentual de possíveis decisões, definidas na lógica de negócio da aplicação, que foram testadas. Ex: dado um "if state" existente em um componente, verifica se os possíveis retornos foram validados.
* Coluna **"% Funcs"**: % de funções ou subrotinas da  aplicação que foram testadas.
* Coluna **"% Lines"**: % de linhas do código que foram testadas em cada arquivo.
* Coluna **Uncovered Line #s"**: Informa as linhas do código que não foram testadas.
