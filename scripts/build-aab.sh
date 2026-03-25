#!/bin/bash

# Script para gerar build AAB para Google Play Store
# Uso: bash scripts/build-aab.sh

set -e

echo "🚀 Iniciando build AAB para Google Play Store..."
echo ""

# Verificar se está no diretório correto
if [ ! -f "app.config.ts" ]; then
    echo "❌ Erro: Execute este script a partir da raiz do projeto"
    exit 1
fi

# Verificar se eas-cli está instalado
if ! command -v eas &> /dev/null; then
    echo "📦 Instalando eas-cli..."
    npm install -g eas-cli
fi

# Verificar se está logado no Expo
echo "🔐 Verificando login no Expo..."
eas whoami || {
    echo "❌ Você não está logado no Expo"
    echo "Execute: eas login"
    exit 1
}

# Gerar build AAB
echo ""
echo "🔨 Gerando build AAB..."
echo "Isso pode levar 10-15 minutos..."
echo ""

eas build --platform android --non-interactive

echo ""
echo "✅ Build gerado com sucesso!"
echo ""
echo "📥 Para baixar o build:"
echo "1. Acesse: https://expo.dev/builds"
echo "2. Faça login com sua conta Expo"
echo "3. Procure pelo build mais recente de 'eduplay-games'"
echo "4. Clique em 'Download' para baixar o arquivo .aab"
echo ""
echo "📤 Para publicar no Google Play:"
echo "1. Acesse: https://play.google.com/console"
echo "2. Selecione o app 'EduPlay'"
echo "3. Clique em 'Versões' → 'Produção'"
echo "4. Clique em 'Criar nova versão'"
echo "5. Upload do arquivo .aab"
echo "6. Preencha as informações e envie para análise"
echo ""
echo "Para mais detalhes, veja: GUIA_PUBLICACAO_FINAL.md"
