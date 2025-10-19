import { useEffect, useState } from "react";

function View({ id }) {
  const [fact, setFact] = useState(null);

  useEffect(() => {
    async function fetchFact() {
      try {
        const response = await fetch(`http://localhost:8000/api/facts/${id}`);
        const data = await response.json();
        setFact(data);
      } catch (error) {
        console.error("Erreur pendant le chargement :", error);
      }
    }
    fetchFact();
  }, [id]);

  return (
    <>
      <h2>My component View</h2>
      {fact && (
        <p>
          {fact.fact} ({fact.techno})
        </p>
      )}
    </>
  );
}

export default View;


