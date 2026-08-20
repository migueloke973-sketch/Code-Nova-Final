# CodeNova — plateforme d’apprentissage

CodeNova est une plateforme web d’apprentissage de la programmation.

## Nouveautés de cette version
- Catalogue de **60 parcours** répartis en Web, Programmation, Mobile, Bases de données, Outils & DevOps, Informatique, IA et Projets.
- Recherche, filtres par niveau et catégories.
- Pages de cours génériques avec progression par chapitres.
- Système de progression stocké localement dans le navigateur pour le prototype.
- **NovaCertificate** : attestation d’apprentissage générée après un parcours terminé à 100 %, avec identifiant unique.
- Page **Mes NovaCertificates** et page de vérification.
- Après connexion, les boutons **Se connecter** et **S’inscrire** disparaissent automatiquement du header et du menu mobile.
- Après déconnexion, ils réapparaissent.

## Important — sécurité
L’authentification actuelle est une démonstration locale : les données restent dans le navigateur. Pour une application publique, il faut un backend sécurisé, une vraie gestion des utilisateurs, des sessions et des certificats côté serveur.

## Déploiement
Le projet est compatible avec GitHub et Vercel comme site statique. Aucun build Node.js n’est requis dans cette version.
