# Geospatial Engineering Hub

## 🚀 Como rodar o projeto localmente

### Pré-requisitos

- Node.js instalado (versão 18 ou superior)
- npm ou yarn instalado

### Passos para executar

1. **Instalar as dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acessar a aplicação:**
   - O servidor estará rodando em `http://localhost:8080`
   - A página será recarregada automaticamente quando você fizer alterações no código

### Outros comandos úteis

- **Build para produção:**
  ```bash
  npm run build
  ```

- **Preview do build de produção:**
  ```bash
  npm run preview
  ```

- **Executar testes:**
  ```bash
  npm test
  ```

- **Verificar código (lint):**
  ```bash
  npm run lint
  ```

## 📦 Deploy na Vercel

### Opção 1: Deploy via CLI da Vercel (Recomendado)

1. **Instalar a CLI da Vercel:**
   ```bash
   npm i -g vercel
   ```

2. **Fazer login na Vercel:**
   ```bash
   vercel login
   ```

3. **Fazer o deploy:**
   ```bash
   vercel
   ```
   
   Na primeira vez, você será perguntado:
   - Se deseja vincular a um projeto existente ou criar um novo
   - O nome do projeto
   - O diretório de build (use `dist`)
   
4. **Deploy em produção:**
   ```bash
   vercel --prod
   ```

### Opção 2: Deploy via GitHub (Integração Contínua)

1. **Fazer push do código para o GitHub:**
   ```bash
   git add .
   git commit -m "Preparar para deploy"
   git push origin main
   ```

2. **Conectar o repositório na Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em "Add New Project"
   - Selecione o repositório `geospatial-engineering-hub`
   - A Vercel detectará automaticamente as configurações do `vercel.json`
   - Clique em "Deploy"

3. **Configurações automáticas:**
   - A Vercel detectará que é um projeto Vite
   - O build command será: `npm run build`
   - O output directory será: `dist`
   - Todas as rotas serão redirecionadas para `index.html` (SPA)

### Configuração do projeto

O arquivo `vercel.json` já está configurado com:
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ Rewrites para SPA (Single Page Application)
- ✅ Framework: Vite

### Domínio personalizado

Após o deploy, você pode adicionar um domínio personalizado:

1. Acesse o dashboard do projeto na Vercel
2. Vá em **Settings** > **Domains**
3. Adicione seu domínio personalizado
4. Siga as instruções para configurar o DNS

## 🛠️ Tecnologias utilizadas

- **Vite** - Build tool e dev server
- **TypeScript** - Tipagem estática
- **React** - Biblioteca UI
- **shadcn-ui** - Componentes UI
- **Tailwind CSS** - Framework CSS
- **React Router** - Roteamento
- **Framer Motion** - Animações

## 📝 Notas

- O projeto usa React Router para navegação (SPA)
- Todas as rotas são redirecionadas para `index.html` no deploy
- O servidor de desenvolvimento roda na porta 8080
