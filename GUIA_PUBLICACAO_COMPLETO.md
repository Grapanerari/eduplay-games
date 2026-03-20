# 📱 Guia Completo: Publicar EduPlay no Google Play Store

## ✅ Pré-requisitos (JÁ CONCLUÍDOS)

- ✅ Conta Expo criada (grapanerari@hotmail.com)
- ✅ Conta Google Play Console criada
- ✅ Arquivo AAB gerado (Android App Bundle)
- ✅ Screenshots preparados
- ✅ Metadados da app preparados
- ✅ Ícone e assets preparados

---

## 🚀 PASSO 1: Acessar Google Play Console

### O Que Fazer:

1. Abra seu navegador
2. Vá para: **https://play.google.com/console**
3. Faça login com sua conta Google (grapanerari@hotmail.com)
4. Clique em **"Criar app"** (ou **"Create app"**)

### Você Verá Uma Tela Como Esta:

```
┌─────────────────────────────────────┐
│ Google Play Console                 │
├─────────────────────────────────────┤
│ Criar nova app                      │
│ ┌─────────────────────────────────┐ │
│ │ Nome da app: [EduPlay]          │ │
│ │ Idioma padrão: [Português]      │ │
│ │ Tipo: [App]                     │ │
│ │ Categoria: [Educação]           │ │
│ │ Classificação: [4+]             │ │
│ └─────────────────────────────────┘ │
│ [Criar app]                         │
└─────────────────────────────────────┘
```

---

## 🎯 PASSO 2: Preencher Informações Básicas

### Informações para Preencher:

| Campo | Valor |
|-------|-------|
| **Nome da App** | EduPlay: L'Aventure Multimodale |
| **Idioma Padrão** | Português |
| **Tipo de App** | App |
| **Categoria** | Educação |
| **Classificação** | 4+ (ou PEGI 3+) |

### Clique em "Criar app"

---

## 📋 PASSO 3: Preencher Detalhes da App

Após criar a app, você verá um painel com várias seções:

### 3.1 - Informações da App

1. Clique em **"Informações da app"** (ou **"App information"**)
2. Preencha:
   - **Descrição curta:** "Aprenda jogando! 4 jogos educativos divertidos e desafiadores."
   - **Descrição completa:** (Use o texto do PLAY_STORE_METADATA.md)
   - **Categoria:** Educação
   - **Classificação:** 4+

### 3.2 - Ícone da App

1. Clique em **"Ícone da app"**
2. Faça upload do arquivo: `assets/images/icon.png` (512x512px)

### 3.3 - Screenshots

1. Clique em **"Screenshots"**
2. Faça upload dos 5 screenshots:
   - screenshot1-home.png
   - screenshot2-quiz.png
   - screenshot3-math.png
   - screenshot4-platform.png
   - screenshot5-results.png

**Dica:** Os screenshots devem estar em ordem e mostrar os principais recursos da app.

---

## 🔐 PASSO 4: Configurar Chaves de Assinatura

### 4.1 - Gerar Chave de Assinatura (Se Necessário)

Se você ainda não tem uma chave de assinatura:

1. Vá para **"Configurações"** → **"Chaves de assinatura do app"**
2. Clique em **"Gerar nova chave"**
3. Salve a chave em local seguro

**IMPORTANTE:** Você já tem uma chave gerada! Localização: `/home/ubuntu/eduplay-keys/eduplay-release-key.keystore`

---

## 📦 PASSO 5: Fazer Upload do AAB

### 5.1 - Acessar Seção de Releases

1. No menu esquerdo, clique em **"Releases"** → **"Production"**
2. Clique em **"Criar novo release"** (ou **"Create new release"**)

### 5.2 - Upload do Arquivo AAB

1. Clique em **"Fazer upload do AAB"** (ou **"Upload AAB"**)
2. Selecione o arquivo AAB gerado pelo EAS Build
   - **Localização:** Você receberá um link do EAS Build
   - **Arquivo:** `eduplay.aab` ou similar

### 5.3 - Informações do Release

1. **Versão:** 1.0.0
2. **Notas de Release:** 
   ```
   Versão inicial do EduPlay com 4 módulos de jogos educativos:
   - Quiz: Conhecimento Geral
   - Math: Desafios Numéricos
   - Plataforma: Aventura Saltada
   - Lógica: Casse-têtes Cérébraux
   ```

---

## 🌍 PASSO 6: Configurar Idiomas e Localizações

### 6.1 - Adicionar Idioma Francês

1. Vá para **"Gerenciamento de Loja"** → **"Listagem de app"**
2. Clique em **"Adicionar idioma"** (ou **"Add language"**)
3. Selecione **"Francês"**
4. Preencha os campos em francês:
   - **Título:** EduPlay: L'Aventure Multimodale
   - **Descrição curta:** Apprenez en jouant! 4 jeux éducatifs amusants et stimulants.
   - **Descrição completa:** (Use o texto em francês do PLAY_STORE_METADATA.md)

---

## 📋 PASSO 7: Política de Privacidade

### 7.1 - Adicionar Política de Privacidade

1. Vá para **"Configurações"** → **"Política de Privacidade"**
2. Adicione o seguinte texto:

```
POLÍTICA DE PRIVACIDADE - EduPlay

Última atualização: 20 de Março de 2026

1. INFORMAÇÕES QUE COLETAMOS
EduPlay não coleta dados pessoais dos usuários. Todos os dados 
de progresso, pontuação e preferências são armazenados localmente 
no seu dispositivo.

2. DADOS LOCAIS
- Progresso do jogo
- Pontuação
- Nível do usuário
- Preferências de idioma

3. DADOS NÃO COLETADOS
- Localização
- Contatos
- Calendário
- Câmera
- Microfone

4. SEGURANÇA
Seus dados são protegidos no seu dispositivo e nunca são 
enviados para servidores externos.

5. CONTATO
Para dúvidas sobre privacidade: grapanerari@hotmail.com

6. ALTERAÇÕES
Podemos atualizar esta política. Notificaremos através de 
atualizações da app.
```

---

## 🎯 PASSO 8: Classificação de Conteúdo

### 8.1 - Preencher Questionário de Classificação

1. Vá para **"Classificação de conteúdo"**
2. Responda o questionário:
   - **Violência:** Nenhuma
   - **Conteúdo Sexual:** Nenhum
   - **Linguagem Ofensiva:** Nenhuma
   - **Publicidade:** Nenhuma
   - **Compras in-app:** Nenhuma (ou marque se tiver)

---

## ✅ PASSO 9: Revisar e Submeter

### 9.1 - Verificar Tudo

Antes de submeter, verifique:

- ✅ Nome da app preenchido
- ✅ Descrição preenchida
- ✅ Ícone enviado
- ✅ Screenshots enviados (5 mínimo)
- ✅ AAB enviado
- ✅ Política de privacidade adicionada
- ✅ Classificação de conteúdo preenchida
- ✅ Informações de contato corretas

### 9.2 - Submeter para Revisão

1. Clique em **"Submeter para revisão"** (ou **"Submit for review"**)
2. Confirme a submissão
3. Aguarde a aprovação (normalmente 24-48 horas)

---

## 📊 PASSO 10: Monitorar Progresso

### 10.1 - Acompanhar Revisão

1. Vá para **"Releases"** → **"Production"**
2. Você verá o status:
   - 🟡 **Em revisão** - Aguardando análise do Google
   - 🟢 **Aprovado** - Pronto para publicar
   - 🔴 **Rejeitado** - Verifique os motivos

### 10.2 - Após Aprovação

Quando aprovado, clique em **"Publicar"** para tornar a app disponível na Play Store.

---

## 🎉 Parabéns!

Sua app EduPlay agora está disponível no Google Play Store! 🚀

---

## 📞 Suporte e Dúvidas

Se encontrar problemas durante o processo:

1. **Erro no Upload do AAB:** Verifique se o arquivo está correto
2. **Rejeição pela Google:** Leia os motivos e corrija
3. **Dúvidas Gerais:** Consulte a documentação do Play Console

---

## 📝 Checklist Final

```
ANTES DE SUBMETER:
☐ Conta Google Play Console criada
☐ Arquivo AAB pronto
☐ Screenshots preparados (5)
☐ Ícone preparado (512x512px)
☐ Descrição em Português preenchida
☐ Descrição em Francês preenchida
☐ Política de Privacidade adicionada
☐ Classificação de conteúdo preenchida
☐ Informações de contato verificadas

APÓS SUBMETER:
☐ Aguardar revisão (24-48 horas)
☐ Monitorar status no Play Console
☐ Verificar notificações de email
☐ Publicar quando aprovado
☐ Compartilhar link com amigos!
```

---

## 🔗 Links Úteis

- **Google Play Console:** https://play.google.com/console
- **Google Play Store:** https://play.google.com/store
- **Documentação Play Store:** https://developer.android.com/distribute/play

---

**Boa sorte! 🍀**

Desenvolvido com ❤️ para EduPlay
