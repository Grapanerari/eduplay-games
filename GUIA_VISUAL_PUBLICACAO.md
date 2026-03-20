# 📱 Guia Visual: Publicar EduPlay no Play Store

## 🎯 Resumo Executivo

Este guia mostra **passo-a-passo** como publicar sua app EduPlay no Google Play Store. O processo é simples e leva aproximadamente **30 minutos**.

---

## ✅ O Que Você Já Tem Pronto

| Item | Status | Localização |
|------|--------|------------|
| Arquivo AAB | ✅ Pronto | Será enviado pelo EAS Build |
| Screenshots | ✅ Pronto | `/assets/play-store-screenshots/` |
| Ícone da App | ✅ Pronto | `/assets/images/icon.png` |
| Metadados | ✅ Pronto | `PLAY_STORE_METADATA.md` |
| Descrições (PT/FR) | ✅ Pronto | `PLAY_STORE_METADATA.md` |
| Política de Privacidade | ✅ Pronto | `GUIA_PUBLICACAO_COMPLETO.md` |

---

## 🚀 10 Passos Simples

### **PASSO 1: Acessar Google Play Console**

**O que fazer:**
1. Abra seu navegador
2. Vá para: **https://play.google.com/console**
3. Faça login com: **grapanerari@hotmail.com**

**Você verá:**
```
┌──────────────────────────────────────┐
│ Google Play Console                  │
│                                      │
│ [Criar app]  [Meus apps]             │
└──────────────────────────────────────┘
```

---

### **PASSO 2: Criar Nova App**

**O que fazer:**
1. Clique em **"Criar app"** (ou **"Create app"**)
2. Preencha os campos:

| Campo | Valor |
|-------|-------|
| Nome da App | EduPlay: L'Aventure Multimodale |
| Idioma Padrão | Português |
| Tipo | App |
| Categoria | Educação |
| Classificação | 4+ |

3. Clique em **"Criar app"**

---

### **PASSO 3: Preencher Informações Básicas**

**O que fazer:**
1. Clique em **"Informações da app"**
2. Preencha:
   - **Descrição curta:** "Aprenda jogando! 4 jogos educativos divertidos e desafiadores."
   - **Descrição completa:** (Copie do arquivo `PLAY_STORE_METADATA.md`)
   - **Categoria:** Educação
   - **Classificação:** 4+

**Dica:** A descrição curta deve ter até 80 caracteres.

---

### **PASSO 4: Fazer Upload do Ícone**

**O que fazer:**
1. Clique em **"Ícone da app"**
2. Clique em **"Fazer upload"**
3. Selecione o arquivo: `assets/images/icon.png`
4. Clique em **"Salvar"**

**Requisitos:**
- Tamanho: 512x512 pixels
- Formato: PNG
- Sem fundo transparente (ou com fundo sólido)

---

### **PASSO 5: Fazer Upload dos Screenshots**

**O que fazer:**
1. Clique em **"Screenshots"**
2. Clique em **"Adicionar screenshot"**
3. Selecione os 5 arquivos na ordem:
   - `screenshot1-home.png` (Tela inicial)
   - `screenshot2-quiz.png` (Quiz)
   - `screenshot3-math.png` (Math)
   - `screenshot4-platform.png` (Plataforma)
   - `screenshot5-results.png` (Resultados)

**Dica:** Os screenshots devem estar em ordem e mostrar os principais recursos.

---

### **PASSO 6: Fazer Upload do Arquivo AAB**

**O que fazer:**
1. Clique em **"Releases"** (no menu esquerdo)
2. Clique em **"Production"**
3. Clique em **"Criar novo release"**
4. Clique em **"Fazer upload do AAB"**
5. Selecione o arquivo AAB

**Onde encontrar o arquivo AAB:**
- Você receberá um email do EAS Build com o link de download
- Ou acesse: https://expo.dev/accounts/graciani/projects/eduplay-games/builds

**Versão:** 1.0.0

---

### **PASSO 7: Adicionar Idioma Francês**

**O que fazer:**
1. Clique em **"Gerenciamento de Loja"** (menu esquerdo)
2. Clique em **"Listagem de app"**
3. Clique em **"Adicionar idioma"**
4. Selecione **"Francês"**
5. Preencha os campos em francês (copie do `PLAY_STORE_METADATA.md`)

---

### **PASSO 8: Adicionar Política de Privacidade**

**O que fazer:**
1. Clique em **"Configurações"** (menu esquerdo)
2. Clique em **"Política de Privacidade"**
3. Copie e cole o texto:

```
POLÍTICA DE PRIVACIDADE - EduPlay

EduPlay não coleta dados pessoais. Todos os dados são 
armazenados localmente no seu dispositivo.

Dados coletados localmente:
- Progresso do jogo
- Pontuação
- Nível do usuário
- Preferências de idioma

Dados NÃO coletados:
- Localização
- Contatos
- Câmera ou Microfone

Para dúvidas: grapanerari@hotmail.com
```

---

### **PASSO 9: Preencher Classificação de Conteúdo**

**O que fazer:**
1. Clique em **"Classificação de conteúdo"**
2. Responda o questionário:
   - Violência: **Nenhuma**
   - Conteúdo Sexual: **Nenhum**
   - Linguagem Ofensiva: **Nenhuma**
   - Publicidade: **Nenhuma**

---

### **PASSO 10: Submeter para Revisão**

**O que fazer:**
1. Verifique se tudo está preenchido ✅
2. Clique em **"Submeter para revisão"**
3. Confirme a submissão
4. **Aguarde 24-48 horas** para aprovação

**Você receberá um email quando:**
- ✅ A app for aprovada
- ❌ A app for rejeitada (com motivos)

---

## 📊 Checklist de Verificação

Antes de clicar em "Submeter", verifique:

```
INFORMAÇÕES BÁSICAS:
☐ Nome da app preenchido
☐ Descrição curta preenchida (máx 80 caracteres)
☐ Descrição completa preenchida
☐ Categoria selecionada (Educação)
☐ Classificação selecionada (4+)

ASSETS:
☐ Ícone enviado (512x512px)
☐ 5 Screenshots enviados
☐ Screenshots em ordem correta

ARQUIVO:
☐ Arquivo AAB enviado
☐ Versão correta (1.0.0)

IDIOMAS:
☐ Português preenchido
☐ Francês adicionado e preenchido

LEGAL:
☐ Política de Privacidade adicionada
☐ Classificação de conteúdo preenchida
☐ Informações de contato corretas

PRONTO PARA SUBMETER:
☐ Tudo acima verificado
☐ Clique em "Submeter para revisão"
```

---

## 🎉 Após a Aprovação

Quando sua app for aprovada:

1. ✅ Você receberá um email de confirmação
2. ✅ Clique em **"Publicar"** no Play Console
3. ✅ Sua app aparecerá na Play Store em alguns minutos
4. ✅ Compartilhe o link com seus amigos!

**Link da sua app:**
```
https://play.google.com/store/apps/details?id=com.eduplay.games
```

---

## ⚠️ Se Sua App For Rejeitada

Se receber uma rejeição:

1. Leia os motivos no email
2. Corrija os problemas
3. Resubmeta para revisão

**Motivos comuns de rejeição:**
- Screenshots com qualidade ruim
- Descrição incompleta ou inadequada
- Política de privacidade faltando
- Ícone com tamanho incorreto

---

## 📞 Suporte

Se tiver dúvidas durante o processo:

1. **Consulte:** https://support.google.com/googleplay/
2. **Email:** grapanerari@hotmail.com
3. **Chat:** Google Play Console tem suporte por chat

---

## 🎯 Próximos Passos (Após Publicação)

Depois que sua app estiver publicada:

1. **Monitorar Downloads:** Veja estatísticas no Play Console
2. **Coletar Reviews:** Incentive usuários a deixar avaliações
3. **Atualizar:** Corrija bugs e adicione novos recursos
4. **Monetizar:** Implemente anúncios ou compras in-app (opcional)

---

## 📝 Resumo Rápido

| Etapa | Tempo | Status |
|-------|-------|--------|
| Criar app | 2 min | ✅ Rápido |
| Preencher informações | 5 min | ✅ Fácil |
| Upload de assets | 5 min | ✅ Simples |
| Upload do AAB | 3 min | ✅ Automático |
| Adicionar idiomas | 5 min | ✅ Opcional |
| Submeter | 2 min | ✅ Final |
| **Total** | **~30 min** | ✅ **Pronto!** |

---

## 🚀 Você Está Pronto!

Tudo que você precisa está preparado. Agora é só seguir os 10 passos acima e sua app EduPlay estará no Google Play Store! 🎉

**Boa sorte!** 🍀

---

**Desenvolvido com ❤️ para EduPlay**
Versão 1.0.0 | 20 de Março de 2026
