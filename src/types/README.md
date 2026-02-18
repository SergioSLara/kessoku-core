# 📝 Diretório de Tipos

Este diretório contém todas as definições de tipo TypeScript e interfaces usadas em todo o projeto.

## Arquivos

### `index.ts`
Arquivo de definições de tipo principal com:
- **ExtendedClient**: Cliente Discord.js estendido com propriedades específicas do projeto
- **CommandData**: Interface para estrutura de comando
- **EventData**: Interface para estrutura de evento

## Exemplo de Uso

```typescript
import type { ExtendedClient } from '../types/index.js';

export default async (client: ExtendedClient) => {
    // client agora está adequadamente digitado com propriedades cooldowns e commands
};
```

## Por que Tipos Centralizados?

- Fonte única de verdade para todos os tipos
- Refatoração mais fácil em todo o projeto
- Melhor autocomplete da IDE
- Padrões de digitação consistentes
