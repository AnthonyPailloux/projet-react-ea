// useState: hook qui permet de créer une variable et une fonction pour mettre à jour sa valeur.
// useEffect: hook qui permet de faire des actions quand le composant s’affiche ou change (useEffect)
import { useEffect, useState } from "react";
// useParams: hook qui permet de récupérer les paramètres dynamiques de l’URL (ex: /facts/42 → { id: "42" }. Il le rend accessible en JS)
// useNavigate: hook qui permet des redirection a partir de l'execution du code au lieu d'un lien cliquable.
import { useParams, Link, useNavigate } from "react-router-dom";


  /***********************************************************************************/
 /*********************** Composant d'affichage d'un fact ***************************/
/***********************************************************************************/

 /***********************************************************************************/
/*********************** Logique de composant **************************************/

/**** Composant qui récupère une fact depuis l'API, gère son affichage, le mode édition, la sauvegarde, la suppression et la navigation ****/

function View() {

  /****** Mise en place des hooks pour récupérer l'ID de l'URL, gérer la navigation,********
  *******stocker les données du fact, le mode édition et les valeurs du formulaire ********/

  // récupération de l'id du fact dans l'url avec le hook useParams.
  const { id } = useParams();
  // permet une redirection via le code et non pas par un clic sur un lien.
  const navigate = useNavigate();
  // on crée une variable fact et une fonction pour mettre à jour sa valeur.
  // useState qui sert à stocker la fact.
  const [fact, setFact] = useState(null);
  
  // on crée une variable isEditing et une fonction pour mettre à jour sa valeur.
  // useState qui sert a savoir si le mode édition est activé ou non.
  const [isEditing, setIsEditing] = useState(false);
  
  // on crée une variable editData et une fonction pour mettre à jour sa valeur.
  // useState qui sert à stocker les données du formulaire d'édition.
  const [editData, setEditData] = useState({
    fact: "",
    techno: ""
  });
  // console.log(editData)


  /******** récupération du fact********************************************************/
  useEffect(() => {
    // declatration d'une fonction asynchrone pour pouvoir utiliser "await" a l'interieur.
    async function fetchFact() {
      try {
        /* appel a l'api. On utilise fetch pour récuperer le fact correspondant a l'id.
         Utilisation de await pour pour attendre une réponse avant de continuer l'execution du code.*/
        const response = await fetch("http://localhost:8000/api/facts/" + id);
        
        /* utilisation de la methode json pour convertir la réponse json en objet JS.
        Await permet d'attendre que la conversion soit terminée. */
        const data = await response.json();
        
        // stock la fact dans la variable fact avec useState
        setFact(data);
        // pré-remplit les champs du formulaire d'édition avec les données récupérées.
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
  }, [id]); /* Le tableau [id] passé à useEffect provoque un refetch uniquement si l'id change.
  evite des appels api inutiles et les boucles infinies.*/

  /**********  sauvegarde les modifications du fact dans l'API **********/
  async function saveEdit() {
    try {
      // envoi des nouvelles données à l'API via une requête put
      const response = await fetch("http://localhost:8000/api/facts/" + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', //informe le serveur du type de donnée envoyé.
        },
        body: JSON.stringify(editData) // convertit editDate en json.
      });
      
      if (response.ok) {
        // mise à jour de la variable fact avec les nouvelles données et désactivation du mode édition
        setFact({...fact, ...editData});
        setIsEditing(false);
      }
    } catch (error) {
      alert("Erreur lors de la modification du fact : " + error.message);
    }
  }

  // supprime le fact correspondant depuis l'API
  async function deleteFact() {
    try {
      // envoi d'une requête delete à l'API
      const response = await fetch("http://localhost:8000/api/facts/" + id, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        // redirige vers la liste des facts après suppression
        navigate('/');
      }
    } catch (error) {
      alert("Erreur lors de la suppression du fact : " + error.message);
    }
  }


  /***********************************************************************************/
 /*********************** (affichage) render ****************************************/
  return (
    <>
      <h2>Détail du Fact</h2>
      
      {/********** lien pour retourner a la liste des fact ****************/}
      <Link to="/" className="link-button"> Retour à la liste</Link>
      
      {fact && ( //si fact n'est pas null, false, 0 ou une chaine vide("") exécute le code qui suit (affiche la fact).
        <div>
          <h3>Fact :{fact.id}</h3>
          {/******** l'affichage si isEditing est = à true ****************/}
          {isEditing ? (
            /* édition */
            <div>
              <p><strong>Contenu :</strong></p>
              <input
                type="text"
                // on appel dans value la propriété fact de l'objet editData.
                value={editData.fact}
                /* met à jour editData.fact à chaque saisie de l'utilisateur */
                /* détail: a chaque modification dans l'input modifie la propriété fact de l'objet editData avec la nouvelle valeur
                de l'input. (e)etant un objet représentant l'action déclenchée par l'utilisateur contenant les infos et (e.target.value) une de ses propriété contenant la nouvelle valeur de l'input*/
                onChange={(e) => setEditData({...editData, fact: e.target.value})}
              />
              <p><strong>Techno :</strong></p>
              <input
                type="text"
                // on appel dans value la propriété techno de l'objet editData.
                value={editData.techno}
                /* met à jour editData.techno à chaque saisie de l'utilisateur */
                onChange={(e) => setEditData({...editData, techno: e.target.value})}
              />
              <button onClick={saveEdit}>Sauvegarder</button>
            </div>
          ) : (

            /********* affichage de la fact si isEditing est false**********/
            <div>
              <p><strong>Contenu :</strong> {fact.fact}</p>
              <p><strong>Techno :</strong> {fact.techno}</p>
            </div>
          )}

          {/************ boutons modif et supprimer ***********************/}
          <div>
            <button onClick={() => setIsEditing(!isEditing)}> {/* au clic sur le bouton, inverse l'état de isEditing avec true ou false */}
              {isEditing ? 'Annuler' : 'Modifier'} {/* change le texte du bouton en fonction de l'etat false ou true */}
            </button>
            <button onClick={deleteFact}> {/* bouton pour supprimer le fact et déclencher la fonction deleteFact */}
              Supprimer
            </button>
          </div>
          {/* formate la date pour l'affichage.
          Transforme en objet Date la value de dateEnregistrement récuperé dans fact puis la formate en date lisible par un user */}
          <p><strong>Crée le :</strong> {new Date(fact.dateEnregistrement).toLocaleString('fr-FR')}</p>
        </div>
      )}
    </>
  );
}

export default View;
