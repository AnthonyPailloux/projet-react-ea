import { useEffect, useState } from "react";

function Facts() {

    // facts = tableau vide qui contiendra les données de l’API symfony
    // setFacts = fonction pour le modifier
    const [facts, setFacts] = useState([]);

    // useEffect s’exécute au montage (l'affichage) du composant
    useEffect(() => {

        // Fonction asynchrone pour récupérer les données depuis l’API
        async function fetchFacts() {
            try {

                // "fetch" envoie une requête vers l'API pour récupérer les data
                // "await" dit à JavaScript d’attendre que la réponse arrive avant de continuer
                const response = await fetch("http://localhost:8000/api/facts");

                // on convertit la réponse en objet JavaScript (format JSON)
                const data = await response.json();

                // on récupère les éléments dans "member" et on les stocke dans facts
                setFacts(data.member);

            } catch (error) {
                // s’il y en a une erreur on l'affiche dans la console
                console.error("Erreur 404 :", error);
            }
        }
        // on lance la fonction au chargement du composant
        fetchFacts();
    }, []);

    return (
        <>
            <h2>My component Facts</h2>

            {/* on affiche la liste des facts */}
            <ul>
                {facts.map((fact) => (
                    <li key={fact.id}>
                        {fact.fact} ({fact.techno})
                    </li>
                ))}
            </ul>
        </>
    );
}

// on exporte le composant pour pouvoir l’utiliser ailleurs
export default Facts;
