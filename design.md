# Design EduPlay: L'Aventure Multimodale

## Vue d'ensemble

EduPlay est une application mobile de jeux interactifs éducatifs et divertissants. L'app propose quatre modules de jeux distincts : Quiz, Mathématiques, Plateforme, et Réflexion & Logique. L'interface est conçue pour une utilisation **portrait (9:16)** et **une main**, avec un design moderne, coloré et engageant.

## Palette de Couleurs

- **Primaire** : #6366F1 (Indigo vibrant) - Boutons, accents principaux
- **Secondaire** : #EC4899 (Rose vif) - Éléments interactifs, highlights
- **Succès** : #10B981 (Vert émeraude) - Réponses correctes, victoires
- **Erreur** : #EF4444 (Rouge) - Réponses incorrectes, avertissements
- **Arrière-plan** : #F8FAFC (Gris très clair) - Fond principal
- **Surface** : #FFFFFF (Blanc) - Cartes et conteneurs
- **Texte** : #1E293B (Gris foncé) - Texte principal
- **Texte secondaire** : #64748B (Gris moyen) - Descriptions, labels

## Liste des Écrans

### 1. **Écran d'Accueil (Home Screen)**
- **Contenu** : Logo de l'app, message de bienvenue, grille des 4 modules de jeux
- **Fonctionnalités** :
  - Affichage des points totaux de l'utilisateur
  - Affichage du niveau actuel
  - Boutons pour accéder à chaque module (Quiz, Maths, Plateforme, Réflexion)
  - Bouton Paramètres (coin supérieur droit)
  - Bouton Profil (coin supérieur gauche)

### 2. **Écran Quiz**
- **Contenu** : Questions à choix multiples, 4 réponses possibles
- **Fonctionnalités** :
  - Affichage de la question
  - Affichage du numéro de question (ex: 1/10)
  - Barre de progression
  - 4 boutons de réponse (A, B, C, D)
  - Animation de sélection et validation
  - Affichage du résultat (correct/incorrect)
  - Bouton suivant

### 3. **Écran Mathématiques**
- **Contenu** : Défis mathématiques rapides (calculs, logique numérique)
- **Fonctionnalités** :
  - Affichage du problème mathématique
  - Champ de saisie pour la réponse
  - Clavier numérique personnalisé
  - Chronomètre (temps limité)
  - Bouton Valider
  - Feedback immédiat (correct/incorrect)

### 4. **Écran Plateforme (Mini-jeu)**
- **Contenu** : Petit jeu de plateforme avec personnage contrôlable
- **Fonctionnalités** :
  - Personnage animé
  - Obstacles et plateformes
  - Contrôles tactiles (gauche/droite/saut)
  - Affichage du score et du temps
  - Collectibles (pièces, bonus)
  - Fin de niveau avec résumé

### 5. **Écran Réflexion & Logique**
- **Contenu** : Énigmes, puzzles logiques, casse-têtes
- **Fonctionnalités** :
  - Affichage de l'énigme
  - Zone de réponse (texte ou sélection)
  - Indices (limités)
  - Validation de la réponse
  - Explication de la solution

### 6. **Écran Résultats**
- **Contenu** : Résumé des performances après chaque jeu
- **Fonctionnalités** :
  - Score obtenu
  - Points gagnés
  - Statistiques (temps, précision, etc.)
  - Bouton Rejouer
  - Bouton Retour à l'accueil

### 7. **Écran Profil**
- **Contenu** : Profil utilisateur et statistiques globales
- **Fonctionnalités** :
  - Avatar utilisateur
  - Nom d'utilisateur
  - Points totaux
  - Niveau actuel
  - Statistiques par module (meilleur score, temps joué)
  - Badges et réalisations
  - Bouton Éditer profil

### 8. **Écran Paramètres**
- **Contenu** : Options de l'application
- **Fonctionnalités** :
  - Toggle Musique (on/off)
  - Toggle Effets sonores (on/off)
  - Réglage du volume
  - Réinitialiser les données
  - À propos de l'app
  - Version de l'app

## Flux Utilisateur Principal

1. **Démarrage** → Écran d'accueil
2. **Sélection d'un module** → Écran du jeu correspondant
3. **Jeu** → Interaction avec le module
4. **Fin du jeu** → Écran Résultats
5. **Retour** → Écran d'accueil

## Typographie

- **Titre principal** : 32px, Bold (Poppins)
- **Titre secondaire** : 24px, SemiBold (Poppins)
- **Texte normal** : 16px, Regular (Poppins)
- **Petit texte** : 12px, Regular (Poppins)

## Composants Réutilisables

1. **GameCard** : Carte pour chaque module de jeu (Quiz, Maths, Plateforme, Réflexion)
2. **AnswerButton** : Bouton de réponse avec animation
3. **ProgressBar** : Barre de progression
4. **ScoreDisplay** : Affichage du score
5. **Modal** : Fenêtre modale pour les résultats et confirmations
6. **ToggleSwitch** : Interrupteur pour les paramètres

## Animations

- **Transition d'écran** : Fade in/out (200ms)
- **Validation de réponse** : Pulse + changement de couleur (300ms)
- **Erreur** : Shake animation (200ms)
- **Succès** : Bounce animation (400ms)

## Accessibilité

- Contraste de couleur suffisant (WCAG AA)
- Textes lisibles (minimum 16px)
- Zones tactiles de minimum 44x44px
- Support du mode sombre (optionnel)

## Monétisation

- **Système de points** : Chaque jeu génère des points
- **Niveaux** : Déblocage de contenu à chaque niveau
- **Publicités** (optionnel) : Entre les jeux
- **Achats in-app** (optionnel) : Débloquer des niveaux premium
