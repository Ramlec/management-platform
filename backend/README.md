# Bar Commun - Backend

> Le service backend pour la gestion des adhésions de l'association Le Bar Commun.

Ce projet est construit avec [NestJS](https://nestjs.com/), un framework Node.js pour la création d'applications côté serveur efficientes et scalables.

## 📌 Table des Matières
- [À propos du projet](#-à-propos-du-projet)
- [Fonctionnalités](#-fonctionnalités)
- [Prérequis](#-prérequis)
- [Installation et Lancement](#-installation-et-lancement)
  - [Méthode 1 : Avec Docker (Recommandé)](#méthode-1--avec-docker-recommandé)
  - [Méthode 2 : Lancement local](#méthode-2--lancement-local)
- [Structure de l'API (Aperçu)](#-structure-de-lapi-aperçu)
- [Contributions](#-contributions)
- [Licence](#-licence)
- [Contact](#-contact)

## 🚀 À propos du projet

L'objectif est de fournir une API robuste pour le site de gestion de l'association Le Bar Commun. L'application permet de gérer les adhésions des membres, de leur inscription initiale à la validation de leur statut.

Le flux principal pour un nouvel adhérent est le suivant :
1. Un utilisateur remplit un formulaire avec son nom, prénom, et email.
2. Il peut consentir à recevoir la newsletter et/ou à proposer son aide pour des services au bar.
3. Si la personne souhaite aider, son numéro de téléphone est également demandé.
4. À la soumission, une nouvelle adhésion est créée avec un statut "en attente de validation".
5. Une fois l'adhésion validée par un administrateur, le statut est mis à jour.

## ✨ Fonctionnalités

- API RESTful pour la gestion des utilisateurs et des adhésions.
- Système de rôles et permissions pour sécuriser les points d'accès.
- Validation des données entrantes.
- Gestion du cycle de vie d'une adhésion (création, attente, validation).

## 🛠️ Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- [Node.js](https://nodejs.org/) (version LTS recommandée, ex: 20.x)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://www.docker.com/products/docker-desktop/) et Docker Compose

## ⚙️ Installation et Lancement

Deux méthodes sont disponibles pour lancer le projet : avec Docker (recommandé pour la simplicité) ou localement.

### Méthode 1 : Avec Docker (Recommandé)

Cette méthode lance l'application ainsi qu'une base de données PostgreSQL et PgAdmin dans des conteneurs Docker.

1. **Cloner le dépôt** (si ce n'est pas déjà fait) :
   ```bash
   git clone <votre-url-de-depot>
   cd BarCommun
   ```

2. **Configurer l'environnement** :
   Copiez le fichier d'exemple `.env.example` qui se trouve dans le dossier `backend` et renommez la copie en `.env`. Vous pouvez laisser les valeurs par défaut pour un démarrage rapide.
   ```bash
   cp backend/.env.example backend/.env
   ```

3. **Lancer les services** :
   À la racine du projet, exécutez la commande suivante :
   ```bash
   docker-compose up -d --build
   ```
   Les services suivants seront démarrés :
   - `database`: Le serveur de base de données PostgreSQL, accessible sur le port `5432`.
   - `pgadmin`: Une interface web pour gérer la base de données, accessible sur http://localhost:8001.

4. **Lancer le backend** :
   Une fois que les services docker sont lancés, vous pouvez lancer le backend en local avec la méthode 2, il se connectera à la base de données docker.

### Méthode 2 : Lancement local

Cette méthode nécessite que vous ayez une instance de PostgreSQL accessible localement. Vous pouvez utiliser celle fournie par Docker (voir méthode 1) ou une autre.

1. **Accéder au dossier du backend** :
   ```bash
   cd backend
   ```

2. **Configurer l'environnement** (si non fait) :
   Assurez-vous d'avoir un fichier `.env` configuré avec les bonnes informations de connexion à votre base de données.
   ```bash
   cp .env.example .env
   # Modifiez .env si votre base de données n'utilise pas les identifiants par défaut
   ```

3. **Installer les dépendances** :
   ```bash
   pnpm install
   ```

4. **Lancer l'application en mode développement** :
   ```bash
   pnpm run start:dev
   ```
   Le serveur se lancera et écoutera les modifications de fichiers. Par défaut, l'API est accessible sur **http://localhost:3000**.

## 📚 Structure de l'API (Aperçu)

L'API est versionnée. Pour accéder aux endpoints, vous devez préfixer l'URL par `/v1`.

- `/users`: Gère les informations des utilisateurs.
- `/memberships`: Gère les différents types d'adhésions disponibles.
- `/user-memberships`: Gère la liaison entre un utilisateur et son adhésion (statut, dates, etc.).
- `/auth`: Gère l'authentification.

## 🤝 Contributions

Les contributions sont les bienvenues ! Pour contribuer, veuillez suivre ces étapes :

1. Fork le projet.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`).
3. Commitez vos modifications (`git commit -m 'Add some AmazingFeature'`).
4. Poussez vers la branche (`git push origin feature/AmazingFeature`).
5. Ouvrez une Pull Request.

## 📜 Licence

Distribué sous la licence MIT. Voir `LICENCE` pour plus d'informations.

## 📧 Contact

Pour toute question ou suggestion, veuillez nous contacter à l'adresse suivante : contact@barcommun.fr