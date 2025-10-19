import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function Home() {

    // tableau des facts
    const [facts, setFacts] = useState([]);
    
    // données du nouveau fact
    const [newFact, setNewFact] = useState({
        fact: '',
        techno: ''
    });

    // chargement des facts au montage
    useEffect(() => {

        // récupération des facts
        async function fetchFacts() {
            try {

                // appel API
                const response = await fetch("http://localhost:8000/api/facts");

                // conversion en JSON
                const data = await response.json();

                // stockage des facts
                setFacts(data.member);

            } catch (error) {
                // gestion d'erreur
                alert("Erreur lors du chargement des facts : " + error.message);
            }
        }
        // exécution
        fetchFacts();
    }, []);

    // ajout d'un fact
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


    return (
        <>
            <h2>Liste des Facts</h2>

            
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
                    placeholder="Techno"
                    value={newFact.techno}
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
