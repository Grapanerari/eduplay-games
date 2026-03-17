# Guide Complet: Comment Publier EduPlay sur le Play Store

## 📋 Table des Matières

1. [Préparation Initiale](#préparation-initiale)
2. [Configuration Android](#configuration-android)
3. [Création du Build APK/AAB](#création-du-build-apkaab)
4. [Configuration Play Store](#configuration-play-store)
5. [Soumission de l'App](#soumission-de-lapp)
6. [Après la Publication](#après-la-publication)

---

## 1. Préparation Initiale

### Étape 1: Créer un Compte Google Play Developer

1. Allez sur [Google Play Console](https://play.google.com/console)
2. Cliquez sur **"Créer un compte"** ou connectez-vous avec votre compte Google
3. Acceptez les conditions d'utilisation
4. Payez les frais d'inscription (25 USD, une seule fois)
5. Complétez votre profil développeur

### Étape 2: Vérifier les Informations de Base

Assurez-vous que votre projet a:
- ✅ Un nom d'app unique
- ✅ Un package ID unique (ex: `space.manus.eduplay.games`)
- ✅ Une version (actuellement: 1.0.0)
- ✅ Un logo et des icônes
- ✅ Une description en français et portugais

---

## 2. Configuration Android

### Étape 1: Générer une Clé de Signature (Keystore)

La clé de signature est requise pour signer votre APK/AAB.

**Sur macOS/Linux:**

```bash
cd /home/ubuntu/eduplay-games
keytool -genkey -v -keystore eduplay.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias eduplay
```

**Lors de l'exécution, vous serez invité à entrer:**

```
Enter keystore password: [créez un mot de passe fort]
Re-enter new password: [confirmez]
First and last name: [Votre nom]
Organizational unit: [Votre entreprise]
Organization: [Votre entreprise]
City or Locality: [Votre ville]
State or Province: [Votre région]
Two-letter country code: [FR ou PT]
```

**⚠️ IMPORTANT:** Sauvegardez ce fichier `eduplay.keystore` dans un endroit sûr. Vous en aurez besoin pour les mises à jour futures!

### Étape 2: Configurer le Fichier de Signature

Créez un fichier `eas.json` à la racine du projet:

```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccount": "./service-account.json",
        "track": "internal"
      }
    }
  }
}
```

### Étape 3: Mettre à Jour app.config.ts

Vérifiez que votre `app.config.ts` contient:

```typescript
android: {
  adaptiveIcon: {
    backgroundColor: "#E6F4FE",
    foregroundImage: "./assets/images/android-icon-foreground.png",
    backgroundImage: "./assets/images/android-icon-background.png",
    monochromeImage: "./assets/images/android-icon-monochrome.png",
  },
  edgeToEdgeEnabled: true,
  package: "space.manus.eduplay.games",
  permissions: ["POST_NOTIFICATIONS"],
  versionCode: 1,
}
```

---

## 3. Création du Build APK/AAB

### Option A: Utiliser Expo Build (Recommandé)

**Étape 1: Installer EAS CLI**

```bash
npm install -g eas-cli
```

**Étape 2: Authentifier avec Expo**

```bash
eas login
```

**Étape 3: Configurer le Projet**

```bash
cd /home/ubuntu/eduplay-games
eas build:configure
```

**Étape 4: Créer le Build AAB (pour Play Store)**

```bash
eas build --platform android --type app-bundle
```

Cela créera un fichier `.aab` que vous pourrez télécharger depuis le dashboard Expo.

### Option B: Build Local (Avancé)

Si vous préférez construire localement:

```bash
cd /home/ubuntu/eduplay-games

# Installer les dépendances
npm install

# Créer le build APK
eas build --local --platform android --type apk
```

---

## 4. Configuration Play Store

### Étape 1: Créer une Nouvelle App

1. Allez sur [Google Play Console](https://play.google.com/console)
2. Cliquez sur **"Créer une application"**
3. Entrez le nom: **"EduPlay: L'Aventure Multimodale"**
4. Sélectionnez la catégorie: **"Jeux > Éducatifs"**
5. Acceptez les conditions

### Étape 2: Remplir les Informations de l'App

#### Écran "Présentation de l'app"

| Champ | Valeur |
|-------|--------|
| **Titre** | EduPlay: L'Aventure Multimodale |
| **Description courte** | Jouez, apprenez et gagnez des points! |
| **Description complète** | [Voir app-metadata.md] |
| **Langue** | Français (ajouter Portugais ensuite) |

#### Écran "Catégorie et contenu"

| Champ | Valeur |
|-------|--------|
| **Catégorie principale** | Jeux |
| **Catégorie secondaire** | Éducatifs |
| **Contenu pour enfants** | Non (app pour tous) |
| **Contenu violent** | Non |
| **Contenu sexuel** | Non |

#### Écran "Classement par âge"

Complétez le questionnaire:
- Violence: **Aucune**
- Contenu sexuel: **Aucun**
- Langage: **Aucun**
- Achats in-app: **Oui** (Premium + Power-ups)

### Étape 3: Ajouter les Screenshots

1. Allez à **"Présentation de l'app" > "Screenshots"**
2. Cliquez sur **"Télécharger des images"**
3. Téléchargez 2-8 screenshots par langue (1080 x 1920 px)
4. Ajoutez des descriptions courtes pour chaque screenshot

### Étape 4: Ajouter l'Icône et les Images

1. **Icône de l'app** (512 x 512 px): `assets/images/icon.png`
2. **Image de fonctionnalité** (1024 x 500 px): Créez une image attractive
3. **Image de couverture** (1200 x 500 px): Image de promotion

### Étape 5: Politique de Confidentialité et Conditions

1. Allez à **"Politiques et programmes"**
2. Ajoutez une **Politique de confidentialité**:

```
EduPlay collecte uniquement les données de jeu stockées localement. 
Aucune donnée personnelle n'est envoyée à des serveurs externes.
```

3. Acceptez les conditions Google Play

---

## 5. Soumission de l'App

### Étape 1: Télécharger le Build

1. Allez à **"Version" > "Production"**
2. Cliquez sur **"Créer une version"**
3. Téléchargez votre fichier `.aab` (ou `.apk`)
4. Vérifiez que le fichier est accepté

### Étape 2: Remplir les Détails de la Version

| Champ | Valeur |
|-------|--------|
| **Numéro de version** | 1.0.0 |
| **Notes de version** | Version initiale avec 4 jeux éducatifs |

### Étape 3: Vérifier les Permissions

Google Play affichera automatiquement les permissions requises:
- ✅ Internet
- ✅ Stockage
- ✅ Audio
- ✅ Notifications

Vérifiez que ces permissions sont appropriées.

### Étape 4: Soumettre pour Révision

1. Cliquez sur **"Soumettre"**
2. Acceptez les conditions finales
3. Cliquez sur **"Envoyer pour révision"**

### ⏱️ Temps d'Attente

- **Révision initiale**: 2-4 heures généralement
- **Approbation**: 24-48 heures
- **Publication**: Immédiate après approbation

---

## 6. Après la Publication

### Étape 1: Surveiller les Performances

1. Allez à **"Statistiques"** pour voir:
   - Nombre d'installations
   - Évaluations et avis
   - Crashes et erreurs
   - Rétention utilisateurs

### Étape 2: Répondre aux Avis

1. Allez à **"Avis"**
2. Répondez aux commentaires utilisateurs
3. Corrigez les bugs signalés

### Étape 3: Mettre à Jour l'App

Pour chaque mise à jour:

1. Augmentez le numéro de version dans `app.config.ts`:

```typescript
version: "1.0.1", // Changez de 1.0.0 à 1.0.1
```

2. Créez un nouveau build:

```bash
eas build --platform android --type app-bundle
```

3. Téléchargez la nouvelle version sur Play Store

---

## 📱 Checklist Finale Avant Soumission

- [ ] App testée sur Android 7.0 à 14
- [ ] Tous les jeux fonctionnent correctement
- [ ] Pas de crashes ou erreurs
- [ ] Icônes et screenshots téléchargés
- [ ] Description en français et portugais
- [ ] Politique de confidentialité ajoutée
- [ ] Permissions minimales requises
- [ ] Version numérotée correctement
- [ ] Build AAB créé et signé
- [ ] Contenu approprié pour tous les âges

---

## 🆘 Dépannage Courant

### Problème: "Impossible de télécharger le fichier AAB"

**Solution:** Vérifiez que:
- Le fichier `.aab` est valide
- Votre compte Google Play est actif
- Vous avez accepté les conditions

### Problème: "L'app a été rejetée"

**Raisons courantes:**
- Contenu offensant
- Permissions non justifiées
- Publicités trompeuses
- Crash lors du lancement

**Solution:** Lisez le message de rejet et corrigez le problème.

### Problème: "Impossible de mettre à jour l'app"

**Solution:** Assurez-vous que:
- Le numéro de version est plus élevé que la version précédente
- Vous utilisez le même keystore
- Le package ID est identique

---

## 📞 Support

Pour plus d'aide:
- [Documentation Google Play](https://developer.android.com/google-play)
- [Expo Build Documentation](https://docs.expo.dev/build/introduction/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)

---

## 💡 Conseils pour Augmenter les Téléchargements

1. **Optimisez la Description**: Utilisez des mots-clés pertinents
2. **Créez des Screenshots Attrayants**: Montrez les meilleures fonctionnalités
3. **Encouragez les Avis**: Demandez aux utilisateurs d'évaluer l'app
4. **Mettez à Jour Régulièrement**: Ajoutez de nouveaux jeux et fonctionnalités
5. **Utilisez les Annonces Google**: Promovez votre app via Google Ads

---

**Bonne chance pour la publication! 🚀**
