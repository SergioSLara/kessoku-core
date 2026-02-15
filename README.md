# 🎸 Kessoku Core

Um bot para Discord inspirado em **Bocchi the Rock!** desenvolvido com [Discord.js](https://discord.js.org/) v14 e TypeScript.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.17+-green.svg)](https://nodejs.org/)

## ✨ Features

-  Conexão automática ao canal de voz
-  Slash commands com cooldown
-  Comando de status (uptime, memória, ping)
-  Mensagens customizadas para entrada/saída de membros
-  Jogos interativos (/dado)
-  Terminal com cores ANSI

## 🚀 Quick Start

### Pré-requisitos
- Node.js v18.17+
- Discord Bot Token

### Instalação

```bash
git clone https://github.com/SergioSLara/kessoku-core.git
cd kessoku-core
npm install
```

### Configuração

Copie `.env.example` para `.env`:
```bash
cp .env.example .env
```

Edite `.env` com suas credenciais:
```env
DISCORD_TOKEN=seu_token_aqui
API_CLIENT=seu_client_id
SERVIDOR=seu_guild_id
CANAL_VOZ=seu_voice_channel_id
CANAL_ENTRADA_SERVIDOR=seu_join_channel_id
CANAL_SAIDA_SERVIDOR=seu_leave_channel_id
```

### Rodar

```bash
npm start          # Build + iniciar
npm run dev        # Desenvolvimento com auto-reload
npm run build      # Compilar TypeScript
```

## 🔒 Segurança

### ⚠️ IMPORTANTE: Proteção de Dados Sensíveis

**NUNCA faça commit de arquivos com dados reais:**

```bash
# ❌ JAMAIS commitar estes arquivos:
.env                  # Variáveis de ambiente
config.json           # Configurações sensíveis
*.key, *.pem          # Chaves privadas
```

**O `.gitignore` já protege automaticamente, mas VERIFIQUE ANTES DE FAZER PUSH:**

```bash
# Verifique antes de fazer commit
git status

# Se acidentalmente adicionou, remova:
git rm --cached .env config.json
git commit -m "Remove sensitive files"
```

### 🔑 Se seu Token foi Exposto

1. **Imediatamente**:
   - Vá para [Discord Developer Portal](https://discord.com/developers/applications)
   - Copie seu Application ID
   - Vá para "Bot" → "TOKEN" → "Reset Token"
   - Use o novo token

2. **No Git**:
   - Se você fez push com o token exposto, RESETE mesmo assim
   - O token antigo pode ter sido copiado

3. **Revise**:
   - Verifique histórico do git: `git log -p -- .env`
   - Se encontrou, limpe do histórico:
     ```bash
     git filter-branch --tree-filter 'rm -f .env' HEAD
     git push origin -f
     ```

### 📋 Checklist de Segurança

- [ ] `.env` está no `.gitignore`
- [ ] `config.json` está no `.gitignore`
- [ ] Arquivo `.env` local com credenciais reais ✅
- [ ] Arquivo `.env.example` template SEM valores reais ✅
- [ ] Token Discord não aparece no código
- [ ] Ran `git status` antes do push (verifica arquivos a commitar)
- [ ] Verificou histórico git: `git log --all --source --remotes`

### 💻 Em Desenvolvimento

- Use `.env.example` como template
- Crie seu `.env` local (não é versionado)
- Nunca use credenciais reais em branches públicas

### 🚀 Em Produção

- Use variáveis de ambiente real do servidor
- Exemplo com PM2:
  ```bash
  pm2 start dist/index.js --name "kessoku" --env-file .env
  ```
- Ou Docker com secrets:
  ```dockerfile
  RUN echo ${DISCORD_TOKEN} > /run/secrets/discord_token
  ```

### 🔍 Verificar Vulnerabilidades

Regularmente verifique se há vulnerabilidades nas dependências:

```bash
# Verificar vulnerabilidades
npm audit

# Corrigir vulnerabilidades automaticamente
npm audit fix
```

### 🛡️ Outras Práticas de Segurança

| ❌ NÃO FAÇA | ✅ FAÇA |
|----------|--------|
| Logar o token no console | Use `console.log(DISCORD_TOKEN)` apenas em debug local |
| Compartilhar token com outros | Guarde token como segredo pessoal |
| Usar token em variáveis globais | Use de `.env` apenas |
| Incluir dados em mensagens de erro | Mensagens genéricas ao usuário: "Erro desconhecido" |
| Push com credenciais no código | Sempre use `.env` e `.gitignore` |
| Usar senha=token no Discord | Limpe cache/histórico após testes |

## 📁 Estrutura

```
src/
├── commands/      # Slash commands
├── events/        # Event listeners
├── handlers/      # Carregadores
├── utils/         # Utilitários
├── deploy.ts      # Deploy de comandos
└── index.ts       # Entry point
```

## 🔧 Comandos Disponíveis

- `/status` - Ver status da bot
- `/dado` - Rolar um dado (1-6)

## 📦 Dependências

- **discord.js** - API Discord
- **@discordjs/voice** - Conexões de voz
- **dotenv** - Variáveis de ambiente
- **typescript** - Tipagem estática

## 📄 Licença

MIT - Veja [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**SergioSLara** - [GitHub](https://github.com/SergioSLara)

---
<div align="center">
Desenvolvido com ❤️ e TypeScript 🎸
</div>
<br>

<div align="center">
  <a>BOCCHI THE ROOOOOCK!!!!!!</a>
</div>
