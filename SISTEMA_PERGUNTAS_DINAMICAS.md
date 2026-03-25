# Sistema de Perguntas Dinâmicas - EduPlay

## Visão Geral

O EduPlay agora possui um sistema completo de **atualização automática de perguntas**. Você pode adicionar, editar e remover perguntas diretamente no servidor sem precisar gerar uma nova versão do app.

---

## Como Funciona

### 1. Fluxo de Sincronização

```
┌─────────────────────────────────────────────────────────┐
│                    Servidor (Backend)                    │
│  - Banco de dados com perguntas                          │
│  - API endpoints para CRUD                              │
│  - Rastreamento de sincronização                         │
└────────────────┬────────────────────────────────────────┘
                 │ API tRPC
                 │ (GET /api/trpc/questions.quiz.getAll)
                 ↓
┌─────────────────────────────────────────────────────────┐
│                    App Mobile (Frontend)                 │
│  - Hook useQuestionsSync()                              │
│  - Cache local (AsyncStorage)                           │
│  - Sincronização automática ao iniciar                  │
└─────────────────────────────────────────────────────────┘
```

### 2. Fluxo de Dados

1. **Ao iniciar o app**:
   - App carrega perguntas do cache local
   - App faz requisição ao servidor para obter perguntas atualizadas
   - Se houver novas perguntas, atualiza o cache
   - Usuário vê as perguntas mais recentes

2. **Quando adiciona uma pergunta no servidor**:
   - Pergunta é salva no banco de dados
   - Timestamp de sincronização é atualizado
   - Na próxima vez que o app sincronizar, a nova pergunta aparece

3. **Quando edita uma pergunta**:
   - Pergunta é atualizada no banco de dados
   - App sincroniza e mostra a versão atualizada

4. **Quando deleta uma pergunta**:
   - Pergunta é marcada como inativa (soft delete)
   - App sincroniza e remove da lista

---

## Estrutura do Banco de Dados

### Tabelas Criadas

#### `quiz_questions`
```sql
- id (int) - Chave primária
- question (text) - Pergunta
- options (text) - JSON array com opções
- correctAnswer (int) - Índice da resposta correta
- category (varchar) - Categoria (Geografia, Ciência, etc)
- difficulty (enum) - easy, medium, hard
- isActive (boolean) - Se está ativa
- createdAt (timestamp) - Data de criação
- updatedAt (timestamp) - Data de atualização
```

#### `math_problems`
```sql
- id (int) - Chave primária
- problem (text) - Problema matemático
- options (text) - JSON array com opções
- correctAnswer (int) - Índice da resposta correta
- difficulty (enum) - easy, medium, hard
- timeLimit (int) - Tempo limite em segundos
- isActive (boolean) - Se está ativa
- createdAt (timestamp) - Data de criação
- updatedAt (timestamp) - Data de atualização
```

#### `logic_puzzles`
```sql
- id (int) - Chave primária
- puzzle (text) - Enigma/Puzzle
- options (text) - JSON array com opções
- correctAnswer (int) - Índice da resposta correta
- difficulty (enum) - easy, medium, hard
- isActive (boolean) - Se está ativa
- createdAt (timestamp) - Data de criação
- updatedAt (timestamp) - Data de atualização
```

#### `questions_sync_log`
```sql
- id (int) - Chave primária
- type (enum) - quiz, math, logic
- lastSyncTimestamp (timestamp) - Última sincronização
- totalCount (int) - Total de perguntas
- createdAt (timestamp) - Data de criação
- updatedAt (timestamp) - Data de atualização
```

---

## API Endpoints

### Quiz Questions

**Público - Buscar todas as perguntas de quiz**
```
GET /api/trpc/questions.quiz.getAll
Response: Question[]
```

**Público - Buscar perguntas por categoria**
```
GET /api/trpc/questions.quiz.getByCategory?category=Geography
Response: Question[]
```

**Protegido (Admin) - Criar pergunta de quiz**
```
POST /api/trpc/questions.quiz.create
Body: {
  question: string,
  options: string[],
  correctAnswer: number,
  category: string,
  difficulty: "easy" | "medium" | "hard"
}
Response: { id: number }
```

**Protegido (Admin) - Atualizar pergunta de quiz**
```
POST /api/trpc/questions.quiz.update
Body: {
  id: number,
  question?: string,
  options?: string[],
  correctAnswer?: number,
  category?: string,
  difficulty?: "easy" | "medium" | "hard"
}
Response: { success: boolean }
```

**Protegido (Admin) - Deletar pergunta de quiz**
```
POST /api/trpc/questions.quiz.delete
Body: { id: number }
Response: { success: boolean }
```

### Math Problems

Mesmos endpoints, mas com `/questions.math.*`:
- `getAll`
- `getByDifficulty`
- `create`
- `update`
- `delete`

### Logic Puzzles

Mesmos endpoints, mas com `/questions.logic.*`:
- `getAll`
- `getByDifficulty`
- `create`
- `update`
- `delete`

### Sync

**Público - Obter timestamp da última sincronização**
```
GET /api/trpc/questions.sync.getLastSync?type=quiz
Response: {
  lastSyncTimestamp: timestamp,
  totalCount: number
} | null
```

---

## Como Usar no App

### 1. Sincronizar Perguntas Automaticamente

```tsx
import { useQuestionsSync } from "@/hooks/use-questions-sync";

export function QuizScreen() {
  const { quizQuestions, loading, refresh } = useQuestionsSync();

  if (loading) return <ActivityIndicator />;

  return (
    <View>
      {quizQuestions.map((q) => (
        <QuestionCard key={q.id} question={q} />
      ))}
      <Button title="Atualizar" onPress={refresh} />
    </View>
  );
}
```

### 2. Acessar Diferentes Tipos de Perguntas

```tsx
const { quizQuestions, mathProblems, logicPuzzles } = useQuestionsSync();

// Usar em diferentes módulos
<QuizModule questions={quizQuestions} />
<MathModule problems={mathProblems} />
<LogicModule puzzles={logicPuzzles} />
```

### 3. Verificar Última Sincronização

```tsx
const { lastSyncTime } = useQuestionsSync();

<Text>
  Última atualização: {lastSyncTime?.toLocaleString()}
</Text>
```

---

## Como Gerenciar Perguntas

### Adicionar Nova Pergunta

1. Faça login como admin no app
2. Acesse o painel de administração (quando implementado)
3. Clique em "Adicionar Pergunta"
4. Preencha os campos:
   - Pergunta/Problema/Enigma
   - Opções (4-6 opções)
   - Resposta correta (índice)
   - Dificuldade
   - Categoria (apenas para Quiz)
5. Clique em "Salvar"
6. A pergunta aparecerá automaticamente no app na próxima sincronização

### Editar Pergunta Existente

1. Acesse o painel de administração
2. Procure a pergunta
3. Clique em "Editar"
4. Modifique os campos desejados
5. Clique em "Salvar"
6. O app sincroniza automaticamente

### Deletar Pergunta

1. Acesse o painel de administração
2. Procure a pergunta
3. Clique em "Deletar"
4. Confirme a exclusão
5. A pergunta desaparece do app na próxima sincronização

---

## Exemplo de Dados

### Quiz Question
```json
{
  "id": 1,
  "question": "Qual é a capital da França?",
  "options": ["Londres", "Paris", "Berlim", "Madri"],
  "correctAnswer": 1,
  "category": "Geografia",
  "difficulty": "easy"
}
```

### Math Problem
```json
{
  "id": 1,
  "problem": "Quanto é 25 + 17?",
  "options": ["32", "42", "52", "62"],
  "correctAnswer": 1,
  "difficulty": "easy",
  "timeLimit": 30
}
```

### Logic Puzzle
```json
{
  "id": 1,
  "puzzle": "Se A=1, B=2, C=3... Qual letra é 5?",
  "options": ["D", "E", "F", "G"],
  "correctAnswer": 1,
  "difficulty": "medium"
}
```

---

## Benefícios

✅ **Sem necessidade de atualizar o app** - Adicione perguntas sem gerar nova versão

✅ **Atualização automática** - Perguntas sincronizam automaticamente ao iniciar

✅ **Cache local** - Funciona offline com perguntas em cache

✅ **Controle total** - Gerencie perguntas em tempo real

✅ **Escalabilidade** - Suporte para centenas de perguntas

✅ **Analytics** - Rastreie quando as perguntas foram atualizadas

---

## Próximas Etapas

1. **Painel de Administração** - Interface web para gerenciar perguntas
2. **Importação em Massa** - CSV/Excel para adicionar muitas perguntas
3. **Versionamento** - Histórico de mudanças nas perguntas
4. **Análise de Dificuldade** - Ajuste automático de dificuldade baseado em performance
5. **Recomendações** - Sugerir perguntas baseado no histórico do usuário

---

## Suporte

Para dúvidas sobre o sistema de perguntas dinâmicas:
- Email: contact@eduplay.app
- Documentação: Veja `server/routers-questions.ts`
- Hook: Veja `hooks/use-questions-sync.ts`
