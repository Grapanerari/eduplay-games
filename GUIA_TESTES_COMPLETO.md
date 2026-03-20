# 🧪 Guia Completo de Testes - EduPlay

**Data:** 20 de Março de 2026
**Versão:** 1.0.0

---

## 📱 3 Formas de Testar a App

### **Opção 1: Testar no Expo Go (RÁPIDO - 2 min)**

#### O Que é Expo Go?
App gratuito que permite testar apps React Native em tempo real, sem compilação.

#### Como Fazer:

**Passo 1: Instalar Expo Go**
1. Abra a Play Store no seu telefone Android
2. Procure por: "Expo Go"
3. Instale o app (gratuito)

**Passo 2: Escanear QR Code**
1. Abra o Expo Go
2. Clique em "Scan QR Code"
3. Aponte para este QR code:

```
[QR CODE - arquivo: expo-qr-code.png]
```

**Passo 3: Testar a App**
1. A app abrirá no seu telefone
2. Teste todos os 4 módulos
3. Teste compartilhamento social
4. Teste mudança de idioma

#### Vantagens:
✅ Rápido (2 minutos)
✅ Sem compilação
✅ Testa recursos nativos (som, haptics)
✅ Testa em tempo real

#### Desvantagens:
❌ Requer Expo Go instalado
❌ Não é a versão final
❌ Requer WiFi

---

### **Opção 2: Testar no Navegador (INSTANTÂNEO - 1 min)**

#### Como Fazer:

**Passo 1: Abrir no Navegador**
1. Abra seu navegador (Chrome, Firefox, Safari)
2. Vá para: https://8081-i31av2fwl7tai3b3ma7lv-8bc8141f.us1.manus.computer
3. A app abrirá no navegador

**Passo 2: Testar a Interface**
1. Clique nos 4 módulos
2. Teste a navegação
3. Teste mudança de idioma
4. Teste responsividade

#### Vantagens:
✅ Instantâneo (1 minuto)
✅ Sem instalação
✅ Acesso rápido
✅ Funciona em qualquer navegador

#### Desvantagens:
❌ Não testa recursos nativos (som, haptics)
❌ Menos realista que mobile
❌ Interface web, não mobile

---

### **Opção 3: Testar com APK (REALISTA - 20 min)**

#### O Que é APK?
Arquivo de instalação Android. É como a versão final que será publicada no Play Store.

#### Como Fazer:

**Passo 1: Receber o APK**
1. Você receberá um email do EAS Build
2. Clique no link para baixar o APK
3. Ou acesse: https://expo.dev/accounts/graciani/projects/eduplay-games/builds

**Passo 2: Transferir para o Telefone**
1. Salve o APK no seu computador
2. Conecte o telefone ao computador (USB)
3. Copie o arquivo APK para o telefone
4. Ou: Envie por email e abra no telefone

**Passo 3: Instalar o APK**
1. Abra o arquivo APK no telefone
2. Clique em "Instalar"
3. Aguarde a instalação
4. Clique em "Abrir"

**Passo 4: Testar a App**
1. Teste todos os 4 módulos
2. Teste sons e vibração
3. Teste compartilhamento social
4. Teste offline
5. Teste mudança de idioma

#### Vantagens:
✅ Muito realista
✅ Funciona como app final
✅ Testa todos os recursos
✅ Sem dependência de Expo Go

#### Desvantagens:
❌ Leva 20 minutos para gerar
❌ Requer transferência de arquivo
❌ Requer telefone Android

---

## ✅ Checklist de Testes

### **Módulo Quiz**

```
☐ Abrir módulo Quiz
☐ Ler primeira pergunta
☐ Selecionar uma resposta
☐ Ir para próxima pergunta
☐ Completar 10 perguntas
☐ Ver resultado final
☐ Verificar pontuação
☐ Compartilhar resultado
☐ Testar em Português
☐ Testar em Francês
```

### **Módulo Math**

```
☐ Abrir módulo Math
☐ Ver primeira equação
☐ Digitar resposta
☐ Enviar resposta
☐ Ver feedback (correto/incorreto)
☐ Ir para próxima equação
☐ Completar 5 equações
☐ Ver resultado final
☐ Verificar pontuação
☐ Testar timer
```

### **Módulo Plataforma**

```
☐ Abrir módulo Plataforma
☐ Ver personagem
☐ Controlar personagem
☐ Pular plataformas
☐ Coletar moedas
☐ Evitar obstáculos
☐ Ganhar vidas
☐ Perder vidas
☐ Ver game over
☐ Ver score final
```

### **Módulo Lógica**

```
☐ Abrir módulo Lógica
☐ Ver primeiro desafio
☐ Resolver o desafio
☐ Enviar resposta
☐ Ver feedback
☐ Ir para próximo desafio
☐ Completar 5 desafios
☐ Ver resultado final
☐ Verificar pontuação
☐ Testar dicas
```

### **Sistema de Pontos**

```
☐ Jogar um jogo
☐ Ganhar pontos
☐ Ver pontos no perfil
☐ Jogar outro jogo
☐ Pontos acumulam
☐ Subir de nível
☐ Fechar app
☐ Abrir app novamente
☐ Pontos persistem
☐ Nível persistem
```

### **Idiomas**

```
☐ Abrir app
☐ Verificar idioma padrão (Português)
☐ Ir para Configurações
☐ Mudar para Francês
☐ Verificar todos os textos em Francês
☐ Mudar para Português
☐ Verificar todos os textos em Português
☐ Fechar app
☐ Abrir app
☐ Idioma persistiu
```

### **Recursos Nativos**

```
☐ Jogar um jogo
☐ Ouvir som de fundo
☐ Ouvir efeitos sonoros
☐ Sentir vibração nos toques
☐ Compartilhar no WhatsApp
☐ Compartilhar no Facebook
☐ Compartilhar no Twitter
☐ Testar offline
☐ Testar com WiFi
☐ Testar com dados móveis
```

### **Interface**

```
☐ Verificar cores (gradientes)
☐ Verificar animações (suaves)
☐ Verificar botões (responsivos)
☐ Verificar textos (legíveis)
☐ Verificar ícones (claros)
☐ Testar em diferentes orientações
☐ Testar em diferentes tamanhos de tela
☐ Verificar modo escuro
☐ Verificar modo claro
☐ Verificar sem travamentos
```

---

## 🎯 Fluxos de Teste Recomendados

### **Teste 1: Novo Usuário (15 min)**

```
1. Abrir app
2. Ver tela inicial
3. Selecionar idioma (Português)
4. Jogar Quiz (5 min)
5. Ver resultado
6. Compartilhar no WhatsApp
7. Voltar para home
8. Jogar Math (5 min)
9. Ver resultado
10. Voltar para home
11. Ver perfil
12. Verificar pontos
13. Mudar idioma para Francês
14. Verificar que tudo está em Francês
15. Fechar app
```

### **Teste 2: Progressão (20 min)**

```
1. Abrir app
2. Jogar Quiz (ganhar 100 pontos)
3. Jogar Math (ganhar 150 pontos)
4. Jogar Plataforma (ganhar 200 pontos)
5. Jogar Lógica (ganhar 100 pontos)
6. Ver perfil (total 550 pontos)
7. Verificar nível aumentou
8. Fechar app
9. Abrir app novamente
10. Verificar pontos persistiram
11. Verificar nível persistiu
```

### **Teste 3: Compartilhamento (10 min)**

```
1. Jogar Quiz
2. Ver resultado
3. Clicar "Compartilhar no WhatsApp"
4. Verificar mensagem pré-preenchida
5. Cancelar
6. Clicar "Compartilhar no Facebook"
7. Verificar mensagem
8. Cancelar
9. Clicar "Compartilhar no Twitter"
10. Verificar mensagem
11. Cancelar
```

---

## 🐛 O Que Procurar

### **Bugs Críticos** (Impedem uso)
- ❌ App não abre
- ❌ Botões não funcionam
- ❌ Crashes/travamentos
- ❌ Dados não salvam

### **Bugs Importantes** (Afetam experiência)
- ⚠️ Textos cortados
- ⚠️ Animações lentas
- ⚠️ Sons não funcionam
- ⚠️ Compartilhamento não funciona

### **Bugs Menores** (Não afetam muito)
- ℹ️ Tipografia
- ℹ️ Cores ligeiramente diferentes
- ℹ️ Espaçamento pequeno

---

## 📊 Relatório de Teste

Após testar, preencha este relatório:

```
DATA: _______________
DISPOSITIVO: _______________
VERSÃO ANDROID: _______________
MÉTODO DE TESTE: [ ] Expo Go [ ] Navegador [ ] APK

MÓDULOS TESTADOS:
☐ Quiz - Status: _______________
☐ Math - Status: _______________
☐ Plataforma - Status: _______________
☐ Lógica - Status: _______________

RECURSOS TESTADOS:
☐ Pontos - Status: _______________
☐ Níveis - Status: _______________
☐ Idiomas - Status: _______________
☐ Sons - Status: _______________
☐ Vibração - Status: _______________
☐ Compartilhamento - Status: _______________

BUGS ENCONTRADOS:
1. _______________
2. _______________
3. _______________

OBSERVAÇÕES:
_______________

RECOMENDAÇÃO:
[ ] Publicar no Play Store
[ ] Corrigir bugs antes de publicar
```

---

## ✅ Teste Bem-Sucedido

Você passou no teste se:

✅ Todos os 4 módulos funcionam
✅ Pontos são calculados corretamente
✅ Dados são salvos
✅ Idiomas funcionam
✅ Compartilhamento funciona
✅ Sem travamentos
✅ Interface responsiva
✅ Sons funcionam

---

## 🚀 Próximos Passos

Se tudo funcionar bem:

1. ✅ Receber arquivo AAB do EAS Build
2. ✅ Fazer login no Google Play Console
3. ✅ Seguir guia de publicação
4. ✅ Submeter para revisão
5. ✅ Aguardar aprovação (24-48 horas)
6. ✅ Publicar na Play Store

---

## 📞 Precisa de Ajuda?

Se encontrar problemas:

1. Consulte este guia novamente
2. Tente em outro dispositivo
3. Tente em outro método de teste
4. Verifique a conexão WiFi
5. Reinicie o app

---

**Bom Teste!** 🎉

Desenvolvido com ❤️ para EduPlay
