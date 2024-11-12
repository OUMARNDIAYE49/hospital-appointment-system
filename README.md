# Gestion de Rendez-vous 

## Introduction

Bienvenue dans le projet de Gestion de Rendez-vous ! Cette application permet de gérer les rendez-vous des patients dans un ls hopitaux de manière simple et intuitive. L'application est construite avec Vue.js 3 utilisant la Composition API, Pinia pour la gestion de l'état global, et Bootstrap pour la mise en page de l'interface utilisateur.

## Fonctionnalités Principales


### 1. Gestion des Spécialités

- **Ajouter une spécialité** :
   - L'utilisateur peut ajouter de nouvelles spécialités médicales, telles que "Cardiologie", "Pédiatrie", "Dermatologie", etc.
   
- **Modifier une spécialité** :
   - L'utilisateur peut modifier les détails d'une spécialité existante, comme son nom ou sa description.

- **Supprimer une spécialité** :
   - L'utilisateur peut supprimer une spécialité de la liste. Une confirmation est requise avant la suppression.

- **Afficher les spécialités** :
   - L'utilisateur peut afficher la liste complète des spécialités disponibles dans le système.

### 2. Gestion des Utilisateurs

- **Ajouter un utilisateur** :
   - L'utilisateur peut créer un nouvel utilisateur (par exemple, un médecin ou un secrétaire médical) avec des informations telles que le nom, le rôle, l'adresse email et le mot de passe.

- **Modifier un utilisateur** :
   - L'utilisateur peut modifier les informations d'un utilisateur existant (par exemple, changer son rôle, son adresse email, ou réinitialiser son mot de passe).

- **Supprimer un utilisateur** :
   - L'utilisateur peut supprimer un utilisateur de la liste. Une confirmation est demandée avant la suppression pour éviter les erreurs.

- **Afficher la liste des utilisateurs** :
   - L'utilisateur peut afficher la liste des utilisateurs inscrits, avec leurs rôles et informations de contact.

### 3. Gestion des Patients

- **Ajouter un patient** :
   - Les utilisateurs peuvent ajouter un nouveau patient avec des informations telles que son nom, prénom, date de naissance, numéro de téléphone et adresse.

- **Modifier un patient** :
   - Les utilisateurs peuvent mettre à jour les informations d'un patient existant, telles que ses coordonnées ou ses antécédents médicaux.

- **Supprimer un patient** :
   - Les utilisateurs peuvent supprimer un patient de la base de données. Une alerte de confirmation est affichée avant la suppression.

- **Afficher les patients** :
   - Les utilisateurs peuvent afficher la liste complète des patients enregistrés, avec des options de recherche et de filtrage.

### 4. Gestion des Rendez-vous

- **Planification de rendez-vous** :
   - Les utilisateurs (secrétaires, par exemple) peuvent planifier de nouveaux rendez-vous, en spécifiant la date, l'heure, le patient, le médecin, ainsi que le statut du rendez-vous (confirmé, en attente, annulé, etc.).

- **Modifier un rendez-vous** :
   - Les utilisateurs peuvent modifier un rendez-vous existant, en ajustant la date, l'heure, ou le statut du rendez-vous.

- **Annulation de rendez-vous** :
   - Les utilisateurs peuvent annuler un rendez-vous programmé, avec une confirmation avant l'annulation.

- **Afficher les rendez-vous** :
   - Les utilisateurs peuvent afficher la liste des rendez-vous programmés, filtrer par date, patient ou médecin, et consulter les détails d'un rendez-vous spécifique.


## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- [Node.js](https://nodejs.org/) (v16 ou supérieure)



## Technologies utilisées

- Vue.js 3: Framework JavaScript pour la création d'interfaces utilisateur.
- Composition API: Nouveau système de composition de composants dans Vue 3.
- Pinia: Store d'état global pour Vue.js.
- Bootstrap: Framework CSS pour le style.

## Installation

1. Clonez le dépôt :

   ````git clone https://github.com/OUMARNDIAYE49/hospital-appointment-system.git````

2. Accédez au répertoire du projet :
````hospital-appointment-system````

Installez les dépendances :

````npm install````

Utilisation

Pour démarrer l'application en mode développement, utilisez la commande suivante :

````npm run dev````



## Authers
[Oumar Djiby Ndiaye](https://github.com/OUMARNDIAYE49/hospital-appointment-system.gi)
  