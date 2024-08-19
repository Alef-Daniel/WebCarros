<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
=======
# 🚗 WebCarros - Plataforma de Cadastro e Busca de Carros à Venda

**Bem-vindo ao WebCarros!** 

WebCarros é uma plataforma web intuitiva para o cadastro e venda de veículos. Este projeto permite que os usuários anunciem seus carros e que potenciais compradores possam procurar e filtrar veículos com base em diferentes critérios.

## 🛠️ Funcionalidades

- **Cadastro de Carros:** Permite que os usuários cadastrem veículos com detalhes como marca, modelo, ano, preço e uma imagem.
- **Lista de Veículos:** Exibe todos os carros cadastrados em uma lista organizada, mostrando informações essenciais para os compradores.
- **Busca:** Ferramenta de busca na página principal que permite filtrar os carros por marca, modelo, ano e faixa de preço.
- **Design Responsivo:** Layout adaptável para garantir uma boa experiência de usuário em todos os dispositivos, seja desktop ou mobile.

## 🚀 Tecnologias Utilizadas

- **Frontend:** React.js com TypeScript
- **Backend:** Firebase (Auth, Firestore, Storage)
- **Gerenciamento de Estado:** Context API
- **Estilização:** Tailwind CSS

## 🔍 Estrutura do Projeto

- **/src**
  - **/assets:** Logo e imagens importantes do projeto; 
  - **/components:** Componentes reutilizáveis da aplicação;
  - **/pages:** Páginas principais do aplicativo;
  - **/services:** Integração com os serviços do Firebase;
  - **/routes:** Configuração de rotas privadas;
  
>>>>>>> 3251c7e45b337f13ea12fc91714a7d5af91b0e23
