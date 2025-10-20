import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function Home() {

      /* on crée une variable fact et une fonction pour mettre à jour sa valeur.
  useState qui sert à stocker la fact. */
    const [facts, setFacts] = useState([]);
    
      /* on crée une variable newFact et une fonction pour mettre à jour sa valeur.
  useState qui sert à stocker la fact. */
    const [newFact, setNewFact] = useState({
        fact: '',
        techno: ''
    });

    // chargement des facts au montage
    useEffect(() => {

        // declatration d'une fonction asynchrone pour pouvoir utiliser "await" a l'interieur.
        async function fetchFacts() {
            try {

                /* appel a l'api. On utilise fetch pour récuperer les facts .
                Utilisation de await pour pour attendre une réponse avant de continuer l'execution du code.*/
                const response = await fetch("http://localhost:8000/api/facts");

                /* utilisation de la methode json pour convertir la réponse json en objet JS.
                Await permet d'attendre que la conversion soit terminée. */
                const data = await response.json();

                // stock les facts dans la variable facts avec useState
                setFacts(data.member);

            } catch (error) {
                // gestion d'erreur
                alert("Erreur lors du chargement des facts : " + error.message);
            }
        }
        // exécution
        fetchFacts();
    }, []);

    /*********** ajout d'une fact à l'API **************/
    async function addFact() {
        // envoi d'une fact a l'api via requête post.
        const response = await fetch("http://localhost:8000/api/facts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', //informe le serveur du type de donnée envoyé.
            },
            body: JSON.stringify(newFact) // convertit editDate en json.
        });
        
        // rechargement de l'api
        const response2 = await fetch("http://localhost:8000/api/facts");
        const data = await response2.json();
        setFacts(data.member);
        
        // efface les champs des inputs.
        setNewFact({ fact: '', techno: '' });
    }


    return (
        <>
            <h2>Liste des Facts</h2>

            
            <div>
                <h3>Ajouter un nouveau fact</h3>
                <input
                    type="text"
                    placeholder="Contenu du fact"
                    // on assigne à l'attribut value la propriété "fact" de l'objet newFact.
                    value={newFact.fact}
                    /* met à jour newFact.fact à chaque saisie de l'utilisateur */
                /* détail: a chaque modification dans l'input modifie la propriété fact de l'objet newFact avec la nouvelle valeur
                de l'input. (e)etant un objet représentant l'action déclenchée par l'utilisateur contenant les infos et (e.target.value) une de ses propriété contenant la nouvelle valeur de l'input*/
                    onChange={(e) => setNewFact({...newFact, fact: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Techno"
                    // on assigne à l'attribut value la propriété "techno" de l'objet newFact.
                    value={newFact.techno}
                    /* met à jour newFact.techno à chaque saisie de l'utilisateur */
                /* détail: a chaque modification dans l'input modifie la propriété fact de l'objet newFact avec la nouvelle valeur
                de l'input. (e)etant un objet représentant l'action déclenchée par l'utilisateur contenant les infos et (e.target.value) une de ses propriété contenant la nouvelle valeur de l'input*/
                    onChange={(e) => setNewFact({...newFact, techno: e.target.value})}
                />
                <button onClick={addFact}>Ajouter</button>
            </div>

            {/* boucle liste des facts */}
            <ul>
                {facts.map((fact) => (
                    <li key={fact.id}>
                        <Link to={`/facts/${fact.id}`}>
                            {fact.fact} ({fact.techno})
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

// export
export default Home;
