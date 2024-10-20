import { useState, useEffect } from "react";

export default function Home() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        setStats(data.stats); // Die RCON-Antwort speichern
      } catch (error) {
        setError("Fehler beim Abrufen der RCON-Daten");
      } finally {
        setLoading(false);
        console.log(stats);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Lädt...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>DayZ Server RCON Statistiken</h1>
    </div>
  );
}
