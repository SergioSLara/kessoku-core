# 🎸 Kessoku Core

Um bot para Discord inspirado em **Bocchi the Rock!** desenvolvido com [Discord.js](https://discord.js.org/) v14 e TypeScript.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.17+-green.svg)](https://nodejs.org/)

## ✨ Features

- 🎤 Conexão automática ao canal de voz
- ⚡ Slash commands com cooldown
- 📊 Comando de status (uptime, memória, ping)
- 👋 Mensagens customizadas para entrada/saída de membros
- 🎲 Jogos interativos (/dado)
- 🎨 Terminal com cores ANSI

## 🚀 Quick Start

### Pré-requisitos
- Node.js v18.17+
- Discord Bot Token
- TypeScript

### Instalação
```bash
git clone https://github.com/SergioSLara/kessoku-core.git
cd kessoku-core
npm install
```

### Configuração

#### 1. Arquivo `.env` (apenas o token)

Crie um arquivo `.env` na raiz do projeto:
```env
DISCORD_TOKEN=seu_token_discord_aqui
```

#### 2. Arquivo `config.json` (configurações do bot)

Copie o arquivo de exemplo e edite com seus dados:
```bash
cp config.example.json config.json
```

Edite `config.json` com seus IDs reais:
```json
{
  "API_CLIENT": "seu_application_id",
  "SERVIDOR": "seu_guild_id",
  "CANAL_VOZ": "id_do_canal_de_voz",
  "CANAL_ENTRADA_SERVIDOR": "id_canal_welcome",
  "CANAL_SAIDA_SERVIDOR": "id_canal_goodbye"
}
```

**⚠️ IMPORTANTE:** 
- O token Discord DEVE estar apenas no `.env`
- Use `config.json` para IDs de canais, cliente e guild
- Nunca coloque o token no `config.json`
- Os arquivos `.env` e `config.json` não devem ser commitados

### Rodar
```bash
npm start          # Build + iniciar
npm run dev        # Desenvolvimento com auto-reload
npm run build      # Compilar TypeScript
```

## 🔒 Segurança

### ⚠️ CRÍTICO: Proteção de Dados Sensíveis

**NUNCA faça commit destes arquivos:**
```bash
# ❌ JAMAIS commitar:
.env                  # Token Discord
config.json           # IDs e configurações específicas
*.key, *.pem          # Chaves privadas
```

**O `.gitignore` protege automaticamente, mas SEMPRE verifique antes de fazer push:**
```bash
# Verifique o que será commitado
git status

# Se acidentalmente adicionou, remova:
git rm --cached .env config.json
git commit -m "Remove sensitive files"
```

### 🔑 Se seu Token foi Exposto

1. **Imediatamente**:
   - Acesse [Discord Developer Portal](https://discord.com/developers/applications)
   - Vá para sua aplicação → "Bot" → "TOKEN" → **"Reset Token"**
   - Copie o novo token e atualize seu `.env`

2. **No Git**:
   - **SEMPRE resete o token**, mesmo após remover do repositório
   - Tokens expostos podem ter sido copiados

3. **Limpar histórico (se necessário)**:
```bash
   # Remove arquivo do histórico Git
   git filter-branch --tree-filter 'rm -f .env config.json' HEAD
   git push origin -f --all
```

### 📋 Checklist de Segurança

Antes de cada commit/push:

- [ ] `.env` está no `.gitignore` ✅
- [ ] `config.json` está no `.gitignore` ✅
- [ ] Token Discord só existe no `.env` local
- [ ] Executou `git status` para verificar arquivos
- [ ] Não há credenciais em mensagens de commit
- [ ] Verificou que apenas `config.example.json` está versionado

### 🔍 Verificar Vulnerabilidades
```bash
# Verificar dependências
npm audit

# Corrigir automaticamente
npm audit fix

# Atualizar dependências
npm update
```

### 🛡️ Boas Práticas

| ❌ NÃO FAÇA | ✅ FAÇA |
|-------------|---------|
| Logar o token no console | Use apenas em debug local |
| Commitar `.env` ou `config.json` | Sempre no `.gitignore` |
| Compartilhar token | Trate como senha pessoal |
| Hardcode de credenciais | Use variáveis de ambiente |
| Push sem verificar `git status` | Sempre revise antes |

## 📁 Estrutura do Projeto
```
kessoku-core/
├── src/
│   ├── commands/          # Slash commands
│   │   ├── admin/         # Comandos administrativos
│   │   └── utility/       # Comandos utilitários
│   ├── events/            # Event listeners
│   │   ├── client/        # Eventos do cliente
│   │   └── guild/         # Eventos do servidor
│   ├── handlers/          # Carregadores de comandos/eventos
│   ├── utils/             # Funções auxiliares
│   ├── deploy.ts          # Deploy de slash commands
│   └── index.ts           # Entry point
├── dist/                  # Arquivos compilados
├── .env                   # Token Discord (NÃO VERSIONAR)
├── config.json            # Configurações (NÃO VERSIONAR)
├── config.example.json    # Template de configuração (VERSIONAR)
├── .gitignore            # Proteção de arquivos sensíveis
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Comandos Disponíveis

### Utilitários
- `/status` - Ver status do bot (uptime, memória, ping)
- `/dado` - Rolar um dado (1-6)

## 📦 Dependências Principais

- **discord.js** v14 - API Discord
- **@discordjs/voice** - Conexões de voz
- **dotenv** - Variáveis de ambiente
- **typescript** - Tipagem estática

## 🚀 Deploy em Produção

### Com PM2:
```bash
npm run build
pm2 start dist/index.js --name "kessoku-bot"
```

### Com Docker:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]
```

## 📄 Licença

MIT - Veja [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**SergioSLara** - [GitHub](https://github.com/SergioSLara)

---

<div align="center">

Desenvolvido com ❤️ e TypeScript 🎸

**BOCCHI THE ROOOOOCK!!!!!!**

</div>