# Guia de Resubmissão no Google Play Store

## Resumo das Mudanças

A app EduPlay foi atualizada para resolver a rejeição anterior do Google Play. As seguintes mudanças foram implementadas:

| Mudança | Antes | Depois |
|---------|-------|--------|
| **Público-Alvo** | "Todas as idades" (conflitante) | "Todas as idades" (educativo) |
| **Coleta de Dados** | Email, nome, dados pessoais | Nenhum dado pessoal |
| **Conformidade** | Não documentada | COPPA/GDPR completo |
| **Descrição** | Focada em "diversão" | Focada em "educação" |

---

## Passo 1: Preparar o Build AAB

### 1.1 Gerar o Build AAB

```bash
# No diretório do projeto
cd /home/ubuntu/eduplay-games

# Gerar o build AAB
eas build --platform android --non-interactive
```

**Tempo esperado**: 10-15 minutos

### 1.2 Baixar o Build AAB

Após a conclusão:
1. Acesse [https://expo.dev/builds](https://expo.dev/builds)
2. Procure pelo build mais recente
3. Clique em "Download" para baixar o arquivo `.aab`

---

## Passo 2: Acessar o Google Play Console

### 2.1 Login

1. Acesse [https://play.google.com/console](https://play.google.com/console)
2. Faça login com sua conta Google
3. Selecione o projeto "EduPlay"

### 2.2 Navegar para a Página de Publicação

1. No menu esquerdo, clique em **"Versões"** → **"Produção"**
2. Você verá a versão anterior rejeitada

---

## Passo 3: Atualizar Metadados

### 3.1 Público-Alvo

1. No menu esquerdo, clique em **"Configuração"** → **"Público-alvo e conteúdo"**
2. Seção **"Público-alvo"**:
   - Selecione: **"Todas as idades"**
   - Descrição: "Aplicativo educativo apropriado para todas as idades (6+)"

### 3.2 Conteúdo

1. Seção **"Classificação de conteúdo"**:
   - Violência: **Nenhuma**
   - Conteúdo sexual: **Nenhum**
   - Linguagem: **Nenhuma**
   - Álcool/Tabaco: **Nenhum**

### 3.3 Privacidade

1. Seção **"Privacidade"**:
   - Coleta de dados pessoais: **Não**
   - Dados coletados: **Apenas dados anônimos de jogo**

---

## Passo 4: Atualizar Descrição da App

### 4.1 Descrição em Português

1. No menu esquerdo, clique em **"Loja"** → **"Página da loja"**
2. Selecione **Português (Brasil)**
3. Atualize os campos:

**Título:**
```
EduPlay - Jogos Educativos para Todos
```

**Descrição Curta:**
```
Plataforma educativa com 4 jogos interativos para aprender e se divertir.
```

**Descrição Completa:**
```
Bem-vindo ao EduPlay, a plataforma educativa para todas as idades!

Aprenda através de 4 módulos de jogo envolventes:

🧠 Quiz - Teste seus conhecimentos de cultura geral
🔢 Matemática - Resolva problemas matemáticos com desafios de tempo
🎮 Plataforma - Colete moedas em um mini-jogo de ação
🧩 Lógica - Resolva enigmas e desafios de raciocínio

Características:
✨ Educativo e apropriado para todas as idades
🌍 Multilingue (Português e Francês)
📊 Acompanhe seu progresso
🎵 Efeitos sonoros imersivos
🔒 Privacidade garantida - Nenhum dado pessoal coletado

IMPORTANTE: Esta app NÃO coleta nenhum dado pessoal. Todos os dados de jogo são armazenados localmente no seu dispositivo.

Grátis com opções Premium.
```

### 4.2 Descrição em Francês

1. Selecione **Français**
2. Atualize os campos:

**Titre:**
```
EduPlay - Jeux Éducatifs pour Tous
```

**Brève Description:**
```
Plateforme éducative avec 4 jeux interactifs pour apprendre et s'amuser.
```

**Description Complète:**
```
Bienvenue dans EduPlay, la plateforme éducative pour tous les âges!

Apprenez à travers 4 modules de jeu captivants:

🧠 Quiz - Testez vos connaissances générales
🔢 Mathématiques - Résolvez des problèmes mathématiques avec des défis de temps
🎮 Plateforme - Collectez des pièces dans un mini-jeu d'action
🧩 Logique - Résolvez des énigmes et des défis de réflexion

Caractéristiques:
✨ Éducatif et approprié pour tous les âges
🌍 Multilingue (Portugais et Français)
📊 Suivez votre progression
🎵 Effets sonores immersifs
🔒 Confidentialité garantie - Aucune donnée personnelle collectée

IMPORTANT: Cette application ne collecte AUCUNE donnée personnelle. Toutes les données de jeu sont stockées localement sur votre appareil.

Gratuit avec options Premium.
```

---

## Passo 5: Atualizar Screenshots

### 5.1 Verificar Screenshots Atuais

1. Clique em **"Loja"** → **"Gráficos"**
2. Verifique se os screenshots mostram a interface educativa
3. Certifique-se de que os screenshots não mostram coleta de dados pessoais

**Screenshots recomendados:**
1. Tela inicial com os 4 módulos
2. Quiz em ação
3. Matemática com cronômetro
4. Plataforma em ação
5. Lógica/Enigmas

---

## Passo 6: Atualizar Política de Privacidade

### 6.1 Verificar Política de Privacidade

1. Clique em **"Configuração"** → **"Informações do app"**
2. Seção **"Política de privacidade"**
3. Certifique-se de que a URL está correta: `https://contact@eduplay.app`

**Conteúdo esperado da política:**
- Nenhum dado pessoal é coletado
- Dados de jogo são armazenados localmente
- Conformidade com COPPA, GDPR e LGPD
- Direito do usuário de deletar dados

---

## Passo 7: Upload do Build AAB

### 7.1 Fazer Upload

1. Clique em **"Versões"** → **"Produção"**
2. Clique em **"Criar nova versão"**
3. Clique em **"Upload do bundle do app (AAB)"**
4. Selecione o arquivo `.aab` que você baixou
5. Aguarde o upload e a validação (2-5 minutos)

### 7.2 Verificar Informações da Versão

1. Versão: **1.0.1** (ou superior)
2. Notas de versão:
```
Atualizações:
- Removida coleta de dados pessoais para conformidade COPPA/GDPR
- Atualizada descrição para "educativo para todas as idades"
- Melhorias de privacidade e segurança
```

---

## Passo 8: Revisar e Enviar para Análise

### 8.1 Revisar Tudo

Antes de enviar, verifique:

- ✅ Público-alvo: "Todas as idades"
- ✅ Conteúdo: Apropriado para crianças
- ✅ Privacidade: Nenhum dado pessoal coletado
- ✅ Descrição: Focada em educação
- ✅ Screenshots: Mostram interface educativa
- ✅ Build AAB: Versão 1.0.1 ou superior
- ✅ Política de privacidade: Atualizada

### 8.2 Enviar para Análise

1. Clique em **"Enviar para análise"**
2. Confirme que você concorda com as políticas do Google Play
3. Clique em **"Enviar"**

**Tempo de análise**: 24-48 horas

---

## Passo 9: Acompanhar a Análise

### 9.1 Verificar Status

1. Acesse o Google Play Console
2. Vá para **"Versões"** → **"Produção"**
3. Verifique o status:
   - 🟡 **Em análise**: Aguarde 24-48 horas
   - 🟢 **Aprovado**: Parabéns! A app foi publicada
   - 🔴 **Rejeitado**: Verifique o motivo e corrija

### 9.2 Se Rejeitado Novamente

Se a app for rejeitada novamente:

1. Leia cuidadosamente o motivo da rejeição
2. Verifique a seção "Conformidade COPPA/GDPR" neste projeto
3. Corrija o problema identificado
4. Gere um novo build AAB
5. Resubmeta seguindo os passos acima

---

## Checklist Final

Antes de enviar para análise, confirme:

- [ ] Build AAB versão 1.0.1 gerado
- [ ] Público-alvo alterado para "Todas as idades"
- [ ] Descrição atualizada (PT e FR)
- [ ] Screenshots verificados
- [ ] Política de privacidade atualizada
- [ ] Nenhum dado pessoal sendo coletado
- [ ] COPPA/GDPR compliance verificado
- [ ] Todas as permissões necessárias configuradas

---

## Contato de Suporte

Se tiver dúvidas:
- **Email**: contact@eduplay.app
- **Google Play Console**: Clique em "Suporte" no canto superior direito
- **Documentação**: Verifique `COMPLIANCE_COPPA_GDPR.md`

---

**Boa sorte com a resubmissão! 🚀**
