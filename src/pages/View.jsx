import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function View() {
  // récupération ID
  const { id } = useParams();
  const navigate = useNavigate();
  const [fact, setFact] = useState(null);
  
  // mode édition
  const [isEditing, setIsEditing] = useState(false);
  
  // données édition
  const [editData, setEditData] = useState({
    fact: '',
    techno: ''
  });

  useEffect(() => {
    // récupération du fact
    async function fetchFact() {
      try {
        // appel API
        const response = await fetch(`http://localhost:8000/api/facts/${id}`);
        
        // conversion JSON
        const data = await response.json();
        
        // stockage
        setFact(data);
        // init édition
        setEditData({
          fact: data.fact,
          techno: data.techno
        });
      } catch (error) {
        // gestion d'erreur
        alert("Erreur lors du chargement du fact : " + error.message);
      }
    }
    // exécution
    fetchFact();
  }, [id]); // refetch si ID change

  // sauvegarde
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
        // mise à jour
        setFact({...fact, ...editData});
        setIsEditing(false);
      }
    } catch (error) {
      alert("Erreur lors de la modification du fact : " + error.message);
    }
  }

  // suppression
  async function deleteFact() {
    try {
      const response = await fetch(`http://localhost:8000/api/facts/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        // redirection
        navigate('/');
      }
    } catch (error) {
      alert("Erreur lors de la suppression du fact : " + error.message);
    }
  }

  return (
    <>
      <h2>Détail du Fact</h2>
      
      {/* retour */}
      <Link to="/">← Retour à la liste</Link>
      
      {fact && (
        <div>
          <h3>Fact #{fact.id}</h3>
          
          {/* boutons */}
          <div>
            <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Annuler' : 'Modifier'}
            </button>
            <button onClick={deleteFact}>
              Supprimer
            </button>
          </div>
          
          {isEditing ? (
            /* édition */
            <div>
              <p><strong>Contenu :</strong></p>
              <input
                type="text"
                value={editData.fact}
                onChange={(e) => setEditData({...editData, fact: e.target.value})}
              />
              <p><strong>Technologie :</strong></p>
              <input
                type="text"
                value={editData.techno}
                onChange={(e) => setEditData({...editData, techno: e.target.value})}
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
          
          <p><strong>Date d'enregistrement :</strong> {new Date(fact.dateEnregistrement).toLocaleString('fr-FR')}</p>
        </div>
      )}
    </>
  );
}

export default View;


