# 💫 Diretório de Constantes

Este diretório contém constantes globais usadas em todo o projeto.

## Arquivos

### `colors.ts`
Definições de estilos de terminal e cores:
- **styles**: Utilitários de formatação de texto (negrito, itálico, reset, sublinhado, etc)
- **basic**: 16 cores básicas do terminal (vermelho, verde, azul, amarelo, etc)
- **palette**: Paleta estendida de 256 cores (rosa, azul claro, roxo, laranja, etc)
- **utils**: Utilitários de terminal (limpar tela)

## Exemplos de Uso

```typescript
// Importações nomeadas
import { pink, bold, reset } from '../constants/colors.js';
console.log(`${pink}${bold}Texto${reset}`);

// Importação de namespace
import * as colors from '../constants/colors.js';
console.log(`${colors.pink}Texto${colors.reset}`);

// Exportação combinada
import { colors } from '../constants/colors.js';
console.log(`${colors.pink}Texto${colors.reset}`);
```

## Referência de Cores

### Cores Básicas
- black, red, green, yellow, blue, magenta, cyan, white

### Paleta Estendida (256 cores)
- pink, blueSoft, yellowSoft, purple, orange, teal, lime

### Estilos
- reset, bold, dim, italic, underline, blink, inverse, hidden, strikethrough

### Utilitários
- clear (limpa a tela do terminal)

## Dica
Não adicione constantes de configuração do Discord aqui! Use `config.json` na raiz do projeto.

