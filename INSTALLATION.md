# 📚 Cours d'Installation - Projet React VeilleAPI

## 🎯 Vue d'ensemble du projet

**Projet React** avec CRUD complet pour gérer des facts via une API Symfony.

### Structure du projet :
```
projet-react-ea/
├── src/
│   ├── App.jsx          # Composant principal avec routes
│   ├── pages/
│   │   ├── home.jsx     # Page d'accueil (liste + ajout)
│   │   └── View.jsx     # Page détail (modification + suppression)
│   ├── main.jsx         # Point d'entrée React
│   └── App.css          # Styles CSS
├── package.json         # Dépendances et scripts
└── vite.config.js       # Configuration Vite
```

---

## 🛠️ Installation du projet

### 1. Prérequis
- **Node.js** (version 18+)
- **npm** ou **yarn**
- **Cmder** (terminal Windows)
- **API Symfony** (port 8000)

### 2. Installation des dépendances

```bash
# Dans Cmder, naviguer vers le dossier du projet
cd C:\Users\antho\Desktop\Coder\coder\laragon\www\projet-react-ea

# Installer les dépendances
npm install
```

### 3. Dépendances installées

#### Dependencies (production) :
- **react** (^19.1.1) - Framework React
- **react-dom** (^19.1.1) - Rendu DOM
- **react-router-dom** (^7.9.4) - Navigation

#### DevDependencies (développement) :
- **vite** (^7.1.7) - Build tool
- **@vitejs/plugin-react** - Plugin React pour Vite
- **eslint** - Linter JavaScript

---

## 🚀 Démarrage du serveur local

### 1. Lancer le serveur de développement

```bash
# Dans Cmder
npm run dev
```

### 2. Accès à l'application
- **URL** : http://localhost:5173
- **Hot reload** : Modifications en temps réel

### 3. Scripts disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run preview  # Prévisualisation du build
npm run lint     # Vérification du code
```

---

## 🗄️ Configuration de l'API et Base de données

### 1. API Symfony (Backend)

#### URL de l'API :
```
http://localhost:8000/api/facts
```

#### Endpoints disponibles :
- **GET** `/api/facts` - Liste tous les facts
- **GET** `/api/facts/{id}` - Détail d'un fact
- **POST** `/api/facts` - Créer un fact
- **PUT** `/api/facts/{id}` - Modifier un fact
- **DELETE** `/api/facts/{id}` - Supprimer un fact

#### Structure des données :
```json
{
  "id": 1,
  "fact": "Le premier programme informatique...",
  "techno": "Histoire",
  "dateEnregistrement": "2025-10-16T11:04:45+00:00"
}
```

### 2. Base de données

#### Configuration requise :
- **MySQL/PostgreSQL** via Laragon
- **Port** : 3306 (MySQL) ou 5432 (PostgreSQL)
- **Base** : `veilleapi` (ou nom de votre choix)

#### Tables nécessaires :
```sql
CREATE TABLE fact (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fact TEXT NOT NULL,
    techno VARCHAR(100) NOT NULL,
    date_enregistrement DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔧 Configuration Cmder

### 1. Commandes essentielles

```bash
# Navigation
cd C:\Users\antho\Desktop\Coder\coder\laragon\www\projet-react-ea

# Vérifier Node.js
node --version

# Vérifier npm
npm --version

# Installer les dépendances
npm install

# Lancer le serveur
npm run dev
```

### 2. Workflow de développement

```bash
# 1. Démarrer l'API Symfony (dans un terminal)
cd /path/to/symfony/project
symfony server:start

# 2. Démarrer React (dans un autre terminal Cmder)
cd C:\Users\antho\Desktop\Coder\coder\laragon\www\projet-react-ea
npm run dev

# 3. Ouvrir le navigateur
# http://localhost:5173
```

---

## 🐛 Résolution de problèmes

### 1. Erreurs courantes

#### Port déjà utilisé :
```bash
# Changer le port dans vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})
```

#### API non accessible :
- Vérifier que l'API Symfony tourne sur le port 8000
- Vérifier les CORS dans Symfony
- Vérifier la base de données

#### Dépendances manquantes :
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install
```

### 2. Vérifications

```bash
# Vérifier les processus
netstat -ano | findstr :5173
netstat -ano | findstr :8000

# Vérifier les logs
npm run dev --verbose
```

---

## 📝 Notes importantes

### 1. Structure des URLs
- **Accueil** : `/` → Page Home
- **Détail** : `/facts/1` → Page View avec fact ID 1

### 2. Gestion des erreurs
- **Alertes** : Affichage des erreurs via `alert()`
- **Pas de validation** : Envoi direct des données

### 3. Hot Reload
- **Modifications** : Sauvegarde automatique
- **Rechargement** : Page mise à jour automatiquement

---

## ✅ Checklist d'installation

- [ ] Node.js installé
- [ ] Cmder configuré
- [ ] Projet cloné/téléchargé
- [ ] `npm install` exécuté
- [ ] API Symfony démarrée (port 8000)
- [ ] Base de données configurée
- [ ] `npm run dev` lancé
- [ ] Application accessible sur http://localhost:5173

---

**🎉 Votre environnement de développement est prêt !**
