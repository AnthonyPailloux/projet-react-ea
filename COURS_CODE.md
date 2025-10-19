# 📚 Cours de Code - Pages et CRUD

## 🎯 Vue d'ensemble

Application React avec **2 pages principales** et **CRUD complet** :
- **Home** : Liste des facts + Ajout
- **View** : Détail + Modification + Suppression

---

## 📄 Page App.jsx - Point d'entrée

### Structure
```jsx
import './App.css'
import Home from './pages/home'
import View from './pages/View'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/facts/:id" element={<View />} />
      </Routes>
    </>
  )
}

export default App
```

### Fonctionnalités
- **Routing** : Gestion des URLs
- **Route "/"** : Page d'accueil (Home)
- **Route "/facts/:id"** : Page détail (View) avec paramètre ID
- **Pas de navbar** : Navigation via liens dans les pages

### Points clés
- **Simplicité** : Seulement les routes essentielles
- **Paramètre dynamique** : `:id` pour récupérer l'ID du fact
- **Import des pages** : Home et View importées

---

## 🏠 Page Home.jsx - Liste et Ajout

### Structure générale
```jsx
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function Home() {
  // États
  const [facts, setFacts] = useState([]);
  const [newFact, setNewFact] = useState({
    fact: '',
    techno: ''
  });

  // Fonctions
  // useEffect pour charger les facts
  // addFact pour ajouter un fact

  return (
    // JSX avec formulaire et liste
  );
}
```

### États (useState)

#### 1. Liste des facts
```jsx
const [facts, setFacts] = useState([]);
```
- **facts** : Tableau des facts récupérés de l'API
- **setFacts** : Fonction pour mettre à jour la liste

#### 2. Nouveau fact
```jsx
const [newFact, setNewFact] = useState({
  fact: '',
  techno: ''
});
```
- **newFact** : Objet avec les données du formulaire
- **setNewFact** : Fonction pour mettre à jour les champs

### useEffect - Chargement des facts

```jsx
useEffect(() => {
  async function fetchFacts() {
    try {
      const response = await fetch("http://localhost:8000/api/facts");
      const data = await response.json();
      setFacts(data.member);
    } catch (error) {
      alert("Erreur lors du chargement des facts : " + error.message);
    }
  }
  fetchFacts();
}, []);
```

#### Fonctionnement :
1. **Exécution** : Au montage du composant
2. **Appel API** : GET vers `/api/facts`
3. **Conversion** : JSON → objet JavaScript
4. **Stockage** : `data.member` dans `facts`
5. **Gestion d'erreur** : Alert si problème

### Fonction addFact - Ajout d'un fact

```jsx
async function addFact() {
  const response = await fetch("http://localhost:8000/api/facts", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newFact)
  });
  
  // rechargement
  const response2 = await fetch("http://localhost:8000/api/facts");
  const data = await response2.json();
  setFacts(data.member);
  
  // reset formulaire
  setNewFact({ fact: '', techno: '' });
}
```

#### Fonctionnement :
1. **POST** : Envoi des données vers l'API
2. **Rechargement** : Récupération de la liste mise à jour
3. **Reset** : Vider les champs du formulaire

### JSX - Interface utilisateur

#### Formulaire d'ajout
```jsx
<div>
  <h3>Ajouter un nouveau fact</h3>
  <input
    type="text"
    placeholder="Contenu du fact"
    value={newFact.fact}
    onChange={(e) => setNewFact({...newFact, fact: e.target.value})}
  />
  <input
    type="text"
    placeholder="Technologie"
    value={newFact.techno}
    onChange={(e) => setNewFact({...newFact, techno: e.target.value})}
  />
  <button onClick={addFact}>Ajouter</button>
</div>
```

#### Liste des facts
```jsx
<ul>
  {facts.map((fact) => (
    <li key={fact.id}>
      <Link to={`/facts/${fact.id}`}>
        {fact.fact} ({fact.techno})
      </Link>
    </li>
  ))}
</ul>
```

---

## 👁️ Page View.jsx - Détail et Modification

### Structure générale
```jsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function View() {
  // États
  const { id } = useParams();
  const navigate = useNavigate();
  const [fact, setFact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fact: '',
    techno: ''
  });

  // Fonctions
  // useEffect pour charger le fact
  // saveEdit pour sauvegarder
  // deleteFact pour supprimer

  return (
    // JSX avec détails et formulaire d'édition
  );
}
```

### Hooks React Router

#### 1. useParams - Récupération de l'ID
```jsx
const { id } = useParams();
```
- **id** : Paramètre de l'URL `/facts/:id`
- **Exemple** : URL `/facts/5` → `id = "5"`

#### 2. useNavigate - Navigation programmatique
```jsx
const navigate = useNavigate();
// Utilisation : navigate('/') pour rediriger
```

### États

#### 1. Fact actuel
```jsx
const [fact, setFact] = useState(null);
```
- **fact** : Données du fact récupéré
- **setFact** : Mise à jour des données

#### 2. Mode édition
```jsx
const [isEditing, setIsEditing] = useState(false);
```
- **isEditing** : Boolean pour afficher le formulaire d'édition
- **setIsEditing** : Basculer entre mode affichage/édition

#### 3. Données d'édition
```jsx
const [editData, setEditData] = useState({
  fact: '',
  techno: ''
});
```
- **editData** : Données en cours de modification
- **setEditData** : Mise à jour des champs d'édition

### useEffect - Chargement du fact

```jsx
useEffect(() => {
  async function fetchFact() {
    try {
      const response = await fetch(`http://localhost:8000/api/facts/${id}`);
      const data = await response.json();
      setFact(data);
      setEditData({
        fact: data.fact,
        techno: data.techno
      });
    } catch (error) {
      alert("Erreur lors du chargement du fact : " + error.message);
    }
  }
  fetchFact();
}, [id]);
```

#### Fonctionnement :
1. **Dépendance** : `[id]` - Se relance si l'ID change
2. **Appel API** : GET vers `/api/facts/${id}`
3. **Stockage** : Données dans `fact`
4. **Init édition** : Copie des données dans `editData`

### Fonction saveEdit - Sauvegarde

```jsx
async function saveEdit() {
  try {
    const response = await fetch(`http://localhost:8000/api/facts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editData)
    });
    
    if (response.ok) {
      setFact({...fact, ...editData});
      setIsEditing(false);
    }
  } catch (error) {
    alert("Erreur lors de la modification du fact : " + error.message);
  }
}
```

#### Fonctionnement :
1. **PUT** : Envoi des modifications vers l'API
2. **Mise à jour locale** : `setFact` avec les nouvelles données
3. **Sortie édition** : `setIsEditing(false)`

### Fonction deleteFact - Suppression

```jsx
async function deleteFact() {
  try {
    const response = await fetch(`http://localhost:8000/api/facts/${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      navigate('/');
    }
  } catch (error) {
    alert("Erreur lors de la suppression du fact : " + error.message);
  }
}
```

#### Fonctionnement :
1. **DELETE** : Suppression via l'API
2. **Redirection** : Retour à la page d'accueil

### JSX - Interface utilisateur

#### Boutons d'action
```jsx
<div>
  <button onClick={() => setIsEditing(!isEditing)}>
    {isEditing ? 'Annuler' : 'Modifier'}
  </button>
  <button onClick={deleteFact}>
    Supprimer
  </button>
</div>
```

#### Mode édition conditionnel
```jsx
{isEditing ? (
  /* édition */
  <div>
    <input
      type="text"
      value={editData.fact}
      onChange={(e) => setEditData({...editData, fact: e.target.value})}
    />
    <button onClick={saveEdit}>Sauvegarder</button>
  </div>
) : (
  /* affichage */
  <div>
    <p><strong>Contenu :</strong> {fact.fact}</p>
    <p><strong>Technologie :</strong> {fact.techno}</p>
  </div>
)}
```

---

## 🔄 CRUD - Create, Read, Update, Delete

### 1. CREATE (Créer) - Page Home
```jsx
// Ajout d'un fact
async function addFact() {
  const response = await fetch("http://localhost:8000/api/facts", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newFact)
  });
}
```

### 2. READ (Lire) - Pages Home et View
```jsx
// Liste des facts (Home)
const response = await fetch("http://localhost:8000/api/facts");

// Détail d'un fact (View)
const response = await fetch(`http://localhost:8000/api/facts/${id}`);
```

### 3. UPDATE (Modifier) - Page View
```jsx
// Modification d'un fact
async function saveEdit() {
  const response = await fetch(`http://localhost:8000/api/facts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editData)
  });
}
```

### 4. DELETE (Supprimer) - Page View
```jsx
// Suppression d'un fact
async function deleteFact() {
  const response = await fetch(`http://localhost:8000/api/facts/${id}`, {
    method: 'DELETE'
  });
}
```

---

## 🎯 Points clés du code

### 1. Gestion d'état
- **useState** : États locaux des composants
- **Pas de validation** : Envoi direct des données
- **Reset automatique** : Formulaire vidé après ajout

### 2. Navigation
- **React Router** : Gestion des URLs
- **useParams** : Récupération des paramètres
- **useNavigate** : Navigation programmatique

### 3. API
- **fetch** : Appels HTTP
- **JSON** : Format des données
- **Gestion d'erreur** : Alertes utilisateur

### 4. Interface
- **Conditionnel** : Affichage selon l'état
- **Formulaires** : Contrôlés par React
- **Liens** : Navigation entre pages

---

## 📝 Bonnes pratiques observées

### 1. Code simple
- **Pas de sur-ingénierie** : Code direct et fonctionnel
- **Commentaires courts** : Explications essentielles
- **Structure claire** : Organisation logique

### 2. Gestion d'erreur
- **Alertes** : Feedback utilisateur immédiat
- **Try/catch** : Protection contre les erreurs

### 3. Performance
- **Rechargement** : Liste mise à jour après modifications
- **États locaux** : Pas de state management complexe

---

**🎉 Votre application React avec CRUD est maintenant comprise !**
