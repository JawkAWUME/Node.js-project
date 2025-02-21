Description

Ce dossier contient un projet NestJS dans lequel j'apprends les bases du développement Backend avec une architecture MVC.
Ce projet met en place une relation ManyToOne entre un Utilisateur et des Publications (Posts).

Un Utilisateur peut avoir plusieurs Publications.

Un Utilisateur possède également plusieurs paramètres (Settings).

La Base de données utilisée est NoSQL (MongoDB).

Un Utilisateur peut recevoir des notifications, SMS, emails (toutes ces propriétés sont des booléens définis dans le schéma UserSettings).

Une Publication (Post) est définie par un titre et un contenu (tous deux de type string).

Les DTOs sont utilisés pour la création et la mise à jour des utilisateurs.

Un ValidationPipe est utilisé pour valider les contraintes lors de la création d'un utilisateur.

En résumé, il s'agit d'une application CRUD permettant de :

Créer, lire, mettre à jour et supprimer des utilisateurs.

Lire un utilisateur par son ID.

Créer une publication pour un utilisateur.

Installation du projet

$ npm install

Exécution du projet

# Mode développement
$ npm run start

# Mode watch (redémarrage automatique)
$ npm run start:dev

# Mode production
$ npm run start:prod

Exécution des tests

# Tests unitaires
$ npm run test

# Tests end-to-end
$ npm run test:e2e

# Couverture des tests
$ npm run test:cov

Déploiement

Consultez la documentation officielle de NestJS pour les meilleures pratiques de déploiement.

Ressources utiles

Documentation NestJS

Discord NestJS

Cours vidéos officiels

NestJS Devtools pour visualiser et interagir avec l'application en temps réel.

Support et assistance entreprise