#!/bin/bash

# Script de Build Automatizado para EduPlay
# Este script gera o arquivo AAB pronto para Google Play Store

echo "🚀 Iniciando Build AAB para EduPlay..."
echo ""

# Verificar se estamos no diretório correto
if [ ! -f "app.config.ts" ]; then
    echo "❌ Erro: app.config.ts não encontrado!"
    echo "Por favor, execute este script no diretório raiz do projeto."
    exit 1
fi

# Verificar se o keystore existe
if [ ! -f "eduplay-release-key.keystore" ]; then
    echo "❌ Erro: eduplay-release-key.keystore não encontrado!"
    echo "As chaves de assinatura não foram encontradas."
    exit 1
fi

echo "✅ Configuração verificada"
echo ""

# Criar arquivo eas.json se não existir
if [ ! -f "eas.json" ]; then
    echo "📝 Criando arquivo eas.json..."
    cat > eas.json << 'EOF'
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "",
        "track": "internal"
      }
    }
  }
}
EOF
    echo "✅ eas.json criado"
    echo ""
fi

# Incrementar versão
echo "📦 Preparando versão..."
CURRENT_VERSION=$(grep '"version"' app.config.ts | head -1 | sed 's/.*"\([^"]*\)".*/\1/')
echo "Versão atual: $CURRENT_VERSION"
echo ""

# Gerar o build
echo "🔨 Gerando Build AAB..."
echo "Isto pode levar 10-15 minutos..."
echo ""

eas build --platform android --type app-bundle

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build AAB Gerado com Sucesso!"
    echo ""
    echo "📋 Próximos Passos:"
    echo "1. Vá para Google Play Console"
    echo "2. Crie uma nova aplicação"
    echo "3. Faça upload do arquivo .aab"
    echo "4. Preencha as informações da app"
    echo "5. Clique em 'Enviar para Revisão'"
    echo ""
else
    echo ""
    echo "❌ Erro ao gerar Build AAB"
    echo "Por favor, verifique os logs acima"
    exit 1
fi
