# Projet NestJS - Backend MVC avec MongoDB

## Description

Ce projet est une application backend réalisée avec **NestJS** pour apprendre les bases du développement backend, en utilisant l'architecture **MVC** (Modèle-Vue-Contrôleur).

L'application met en place une relation **ManyToOne** entre un **Utilisateur** et des **Publications (Posts)**, où :
- Un **Utilisateur** peut avoir plusieurs **Publications**.
- Un **Utilisateur** possède également plusieurs **Paramètres (Settings)**.
- Un **Utilisateur** peut recevoir des **notifications**, **SMS** et **emails**. Ces propriétés sont des booléens définis dans le schéma `UserSettings`.

Les **DTOs** sont utilisés pour la création et la mise à jour des utilisateurs, tandis qu'un **ValidationPipe** est utilisé pour valider les contraintes lors de la création d'un utilisateur.

### Fonctionnalités :
- Créer, lire, mettre à jour et supprimer des utilisateurs.
- Lire un utilisateur par son ID.
- Créer une publication pour un utilisateur.

### Base de données :
- **MongoDB** (NoSQL)


