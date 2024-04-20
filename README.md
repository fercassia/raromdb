# Automação Cypress API do curso Raro Academy

Projeto automação Básica para fins de conhecimento do curso Cypress Básico, Talking About Testing, by Walmyr Filho.

## Tecnologias utilizadas nos testes

- Node.js - [NVM Windows v20.11.0](https://github.com/coreybutler/nvm-windows)
- NPM - [Versão 10.5.2](https://www.npmjs.com/package/npm/v/10.4.0)
- IDE de desenvolvimento (Sugestão) - [Visual Studio Code](httpscode.visualstudio.com)
- Ferramenta de automação dos testes [Cypress v13.7.3](https://www.cypress.io/)

> Deve ter instalado na sua máquina `Node.js` e `npm` para rodar o projeto.

## Installation

1. Clone o projeto `https://github.com/fercassia/raromdb`.

2. Entre na pasta do projeto clonado `raromdb`

3. Rode `npm install` (ou `npm i`) para instalar as dependencias de desenvolvimento do package.json.

## Testes

Rode o comando `npm run cy:open` ou `npm run cy:start` para versão headless e gerar o report do mochawewesome

## Arquitetura e organização de pastas

- `cypress`: Diretorio das pastas cypress;

- `e2e`: Diretório responsável por armazenar cenários de testes automatizados (`nome-funcionalidade` > `nome-arquivo.cy.js`);

- `fixtures`: Diretório responsável por armazenar massas de dados (`nome-do-arquivo.json`);

- `support`: Diretório responsável por criar comandos customizados (steps) dos objetos criados. (`nome-funcionalidade` > `nome-arquivo.cy.js`);

    > `e2e.js`: Arquivo responsável por index de arquivos dos comandos customizados (importações desses arquivos);

- `cypress.config.js`: Arquivo responsável pela configuração base do cypress, urls dos ambientes;

- `package.json`: Arquivo responsável por baixar dependencias do projeto;

- `.gitignore`: Arquivos não necessários para versionamento devido ao peso, utilizadade ou sensibilidade;
___

This project was created with 💚 by [@fercassia](https://github.com/fercassia).
