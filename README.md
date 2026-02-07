# 🌐 Réseau Social - MERN Stack

Une application de réseau social complète construite avec la stack MERN (MongoDB, Express.js, React.js, Node.js). Partagez des posts, communiquez avec vos amis, recevez des notifications en temps réel et explorez les vidéos populaires.

## ✨ Fonctionnalités

### 👥 Gestion des Utilisateurs
- ✅ Authentification JWT (Login/Register)
- ✅ Profil utilisateur avec avatar
- ✅ Système Follow/Unfollow
- ✅ Gestion des amis (amis mutuels)
- ✅ Statut en ligne/hors ligne en temps réel (Socket.IO)

### 📝 Posts & Contenu
- ✅ Créer des posts avec texte, images ou vidéos
- ✅ Aimer/Disliker les posts
- ✅ Commenter les posts
- ✅ Supprimer/Modifier ses propres posts
- ✅ Feed personnalisé des posts
- ✅ Page Reels pour les vidéos (style TikTok)

### 💬 Messagerie
- ✅ Chat en temps réel avec Socket.IO
- ✅ Compteur de messages non lus
- ✅ Distinction visuelle des chats avec messages non lus
- ✅ Dernier message affiché dans la liste des chats
- ✅ Marquage automatique des messages comme lus

### 🔔 Notifications
- ✅ Système de notifications en temps réel
- ✅ Compteur de notifications non lues
- ✅ Types de notifs : like, comment, follow, etc.
- ✅ Marquer les notifications comme lues

### 🎨 Interface
- ✅ Design responsive avec Tailwind CSS
- ✅ Navigation intuitive
- ✅ Indicateurs visuels pour les non-lus
- ✅ Statut utilisateur (en ligne/hors ligne)

## 🛠️ Stack Technologique

### Backend
- **Node.js** : Environnement JavaScript côté serveur
- **Express.js** : Framework web
- **MongoDB** : Base de données NoSQL
- **Socket.IO** : Communication en temps réel
- **JWT** : Authentification sécurisée
- **Multer** : Gestion du téléchargement de fichiers

### Frontend
- **React.js** : Bibliothèque UI
- **Vite** : Build tool rapide
- **Tailwind CSS** : Framework CSS utilitaire
- **Axios** : Client HTTP
- **Socket.IO Client** : Communication temps réel
- **React Router** : Routing de l'application

## 📁 Structure du Projet

```
ReseauSocial/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── Components/     # Composants réutilisables
│   │   ├── Context/        # Context API (ReseauContext)
│   │   ├── Pages/          # Pages de l'application
│   │   ├── assets/         # Images et ressources
│   │   └── App.jsx
│   └── package.json
│
├── serveur/                # Backend Node.js/Express
│   ├── Controllers/        # Logique métier
│   ├── Models/             # Schémas MongoDB
│   ├── Routes/             # Endpoints API
│   ├── Middlewares/        # Authentification, upload
│   ├── Config/             # Configuration DB
│   ├── Utils/              # Utilitaires
│   ├── upload/             # Dossier de stockage
│   └── server.js           # Entrée du serveur
│
└── README.md
```

## 🚀 Installation

### Prérequis
- Node.js (v14+)
- MongoDB local ou Atlas
- npm ou yarn

### Cloner le projet
```bash
git clone https://github.com/Roberto05-cpu/reseau-social.git
cd ReseauSocial
```

### Backend Setup
```bash
cd serveur
npm install

# Créer un fichier .env 

### Frontend Setup
```bash
cd client
npm install
```

### Lancer l'application
```bash
# Terminal 1 - Backend
cd serveur
npm start

# Terminal 2 - Frontend
cd client
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📱 Pages Principales

- **Home/Feed** - Affiche tous les posts de vos amis
- **Messages** - Chat en temps réel avec vos contacts
- **Notifications** - Reçoit les notifications de votre réseau
- **Reels** - Vidéos populaires (style TikTok)
- **Friends** - Gestion de votre liste d'amis
- **My Posts** - Vos propres publications
- **Settings** - Paramètres du profil
- **Profile** - Profil utilisateur

## 🔐 Sécurité

- ✅ Authentification JWT
- ✅ Middleware d'authentification sur toutes les routes protégées
- ✅ Validation des données côté serveur
- ✅ Hachage sécurisé des mots de passe

## 🌟 Améliorations Futures

- [ ] Recherche avancée des utilisateurs
- [ ] Système d'hashtags et filtrage
- [ ] Partage de posts
- [ ] Statistiques des posts (vues, partages)
- [ ] Stories (disparition après 24h)
- [ ] Notifications push
- [ ] Blocage d'utilisateurs
- [ ] Mode sombre/clair

## 📄 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

Roberto05-cpu

---

**Créé avec ❤️ en 2026**
