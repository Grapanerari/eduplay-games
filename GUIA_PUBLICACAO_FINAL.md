# Guia Completo de Publicação - EduPlay no Google Play Store

## Status da App

| Item | Status | Notas |
|------|--------|-------|
| **Versão** | 1.0.1 | Pronta para publicação |
| **Conformidade** | ✅ COPPA/GDPR | Sem coleta de dados pessoais |
| **Público-Alvo** | ✅ Todas as idades | Educativo para todos |
| **Sistema de Perguntas** | ✅ Dinâmico | Atualização automática |
| **Build AAB** | ⏳ Pronto para gerar | Siga as instruções abaixo |

---

## Passo 1: Gerar Build AAB

### Opção A: Usar Expo Build (Recomendado)

```bash
# No diretório do projeto
cd /home/ubuntu/eduplay-games

# Gerar build AAB
eas build --platform android --non-interactive
```

**Tempo esperado**: 10-15 minutos

**O que acontece**:
1. Expo compila o código React Native
2. Gera o bundle Android
3. Cria o arquivo `.aab` (Android App Bundle)
4. Faz upload para Expo Build

### Opção B: Build Local (Avançado)

Se preferir fazer build local:

```bash
# Instalar dependências
npm install -g eas-cli

# Login no Expo
eas login

# Gerar build
eas build --platform android --local
```

---

## Passo 2: Baixar o Build AAB

### Após o Build Completar

1. Acesse [https://expo.dev/builds](https://expo.dev/builds)
2. Faça login com sua conta Expo
3. Procure pelo build mais recente de `eduplay-games`
4. Clique em **"Download"** para baixar o arquivo `.aab`

**Arquivo esperado**: `eduplay-games-1.0.1.aab` (ou similar)

**Tamanho**: ~50-100 MB

---

## Passo 3: Acessar Google Play Console

### Login

1. Acesse [https://play.google.com/console](https://play.google.com/console)
2. Faça login com sua conta Google (mesma usada para criar a app)
3. Selecione o projeto **"EduPlay"**

### Navegação

```
Google Play Console
├── Seu App (EduPlay)
│   ├── Versões
│   │   └── Produção ← Você está aqui
│   ├── Configuração
│   │   ├── Público-alvo e conteúdo
│   │   └── Informações do app
│   └── Loja
│       ├── Página da loja
│       ├── Gráficos
│       └── Descrição
```

---

## Passo 4: Verificar Metadados

### 4.1 Público-Alvo

1. Clique em **"Configuração"** → **"Público-alvo e conteúdo"**
2. Verifique:
   - ✅ Público-alvo: **"Todas as idades"**
   - ✅ Classificação de conteúdo: **Apropriado para crianças**
   - ✅ Privacidade: **Nenhum dado pessoal coletado**

### 4.2 Descrição

1. Clique em **"Loja"** → **"Página da loja"**
2. Selecione **Português (Brasil)**
3. Verifique:
   - ✅ Título: "EduPlay - Jogos Educativos para Todos"
   - ✅ Descrição: Focada em educação
   - ✅ Screenshots: Mostram interface educativa

### 4.3 Política de Privacidade

1. Clique em **"Configuração"** → **"Informações do app"**
2. Verifique:
   - ✅ URL da política: Preenchida
   - ✅ Conteúdo: Menciona COPPA/GDPR

---

## Passo 5: Upload do Build AAB

### 5.1 Criar Nova Versão

1. Clique em **"Versões"** → **"Produção"**
2. Clique em **"Criar nova versão"**
3. Clique em **"Upload do bundle do app (AAB)"**

### 5.2 Selecionar Arquivo

1. Clique em **"Selecionar arquivo"**
2. Procure pelo arquivo `.aab` que você baixou
3. Clique em **"Abrir"**
4. Aguarde o upload (2-5 minutos)

### 5.3 Preencher Informações da Versão

Após o upload:

1. **Versão**: `1.0.1` (ou a versão que está usando)
2. **Notas de versão** (Português):
```
Atualizações:
- Removida coleta de dados pessoais para conformidade COPPA/GDPR
- Atualizada descrição para "educativo para todas as idades"
- Sistema de perguntas dinâmicas implementado
- Melhorias de privacidade e segurança
```

3. Clique em **"Salvar"**

---

## Passo 6: Revisar Antes de Enviar

### Checklist Final

- [ ] Versão: 1.0.1
- [ ] Build AAB: Uploaded com sucesso
- [ ] Público-alvo: "Todas as idades"
- [ ] Classificação: Apropriado para crianças
- [ ] Descrição: Focada em educação
- [ ] Screenshots: Mostram interface educativa
- [ ] Política de privacidade: Preenchida
- [ ] Notas de versão: Preenchidas
- [ ] Nenhum erro de validação

### Verificar Erros

Se houver erros vermelhos:

1. Leia a mensagem de erro
2. Corrija o problema
3. Salve novamente
4. Verifique se o erro desapareceu

---

## Passo 7: Enviar para Análise

### Enviar para Revisão

1. Clique em **"Enviar para análise"**
2. Leia os termos e condições
3. Confirme que você concorda
4. Clique em **"Enviar"**

**Mensagem esperada**: "Versão enviada para análise"

### Tempo de Análise

- ⏱️ **Tempo esperado**: 24-48 horas
- ⏱️ **Máximo**: Até 7 dias (raro)

---

## Passo 8: Acompanhar a Análise

### Verificar Status

1. Acesse Google Play Console
2. Clique em **"Versões"** → **"Produção"**
3. Verifique o status:

| Status | Significado | Ação |
|--------|-------------|------|
| 🟡 Em análise | Google está revisando | Aguarde 24-48h |
| 🟢 Aprovado | App foi aprovada! | Clique "Publicar" |
| 🔴 Rejeitado | Há problemas | Leia motivo e corrija |

### Se Aprovado

1. Clique em **"Publicar"**
2. Confirme a publicação
3. Aguarde 2-3 horas para app aparecer na Play Store

### Se Rejeitado

1. Leia o motivo da rejeição
2. Corrija o problema
3. Faça upload de novo build
4. Resubmeta

---

## Passo 9: Após Publicação

### Verificar Publicação

1. Acesse [https://play.google.com/store/apps/details?id=com.eduplay.games](https://play.google.com/store/apps/details?id=com.eduplay.games)
2. Verifique se a app aparece
3. Teste download e instalação

### Monitorar Performance

1. No Google Play Console, clique em **"Estatísticas"**
2. Verifique:
   - Número de downloads
   - Avaliações
   - Crashes
   - Feedback dos usuários

### Responder Avaliações

1. Clique em **"Avaliações"**
2. Leia comentários dos usuários
3. Responda com educação e profissionalismo

---

## Troubleshooting

### Problema: "Build AAB inválido"

**Solução**:
1. Verifique se o arquivo é realmente `.aab`
2. Tente fazer download novamente
3. Se persistir, gere novo build

### Problema: "Versão já existe"

**Solução**:
1. Aumente o número da versão (ex: 1.0.2)
2. Atualize em `app.config.ts`
3. Gere novo build

### Problema: "Erro de assinatura"

**Solução**:
1. Verifique se o certificado está correto
2. Regenere o build
3. Contate suporte Expo se persistir

### Problema: "Rejeitado por política"

**Solução**:
1. Leia cuidadosamente o motivo
2. Corrija o problema
3. Verifique `COMPLIANCE_COPPA_GDPR.md`
4. Resubmeta

---

## Próximas Atualizações

### Para Versão 1.0.2

- [ ] Adicionar mais perguntas ao banco de dados
- [ ] Melhorar UI/UX
- [ ] Adicionar mais idiomas
- [ ] Implementar painel de administração

### Para Versão 1.1.0

- [ ] Integração com Google Play Billing (compras in-app)
- [ ] Notificações push
- [ ] Leaderboard online
- [ ] Sincronização de progresso entre dispositivos

---

## Contato e Suporte

- **Email**: contact@eduplay.app
- **Google Play Console**: Clique em "Suporte" no canto superior direito
- **Documentação**: Verifique os arquivos `.md` no projeto

---

## Checklist de Publicação

```
ANTES DE PUBLICAR:
- [ ] Versão atualizada em app.config.ts
- [ ] Build AAB gerado e testado
- [ ] Metadados verificados em PT e FR
- [ ] Screenshots atualizados
- [ ] Política de privacidade preenchida
- [ ] Conformidade COPPA/GDPR confirmada
- [ ] Nenhum erro de validação no Play Console

DURANTE A PUBLICAÇÃO:
- [ ] Build AAB uploaded com sucesso
- [ ] Notas de versão preenchidas
- [ ] Enviado para análise
- [ ] Status monitorado

APÓS PUBLICAÇÃO:
- [ ] App aparece na Play Store
- [ ] Download testado
- [ ] Avaliações monitoradas
- [ ] Feedback dos usuários lido
```

---

**Boa sorte com a publicação! 🚀**

Se tiver dúvidas, consulte este guia ou entre em contato com o suporte.
