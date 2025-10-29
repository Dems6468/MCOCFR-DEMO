import { useEffect, useState } from "react";

export default function ChampionsList({ guildId }) {
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/champions?guild_id=${guildId}`)
      .then(res => res.json())
      .then(data => {
        setChampions(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [guildId]);

  if (loading) return <div className="text-gray-400 p-4">Chargement...</div>;

  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {champions.map((c) => (
        <div key={c.id} className="bg-gray-900 rounded-xl shadow-lg p-3 text-center hover:scale-105 transition-transform">
          <img
            src={c.image_url}
            alt={c.nom}
            className="rounded-lg mx-auto h-28 object-contain"
          />
          <div className="mt-2 text-orange-400 font-bold">{c.nom}</div>
          <div className="text-sm text-gray-400">⭐ {c.rarete} — Rang {c.rang}</div>
          {c.ascension > 0 && <div className="text-xs text-gray-500">Ascension {c.ascension}</div>}
          {c.eveille && (
            <div className="text-xs text-blue-400">
              Éveillé (niv. {c.competence_eveil})
            </div>
          )}
          <div className="mt-3 text-gray-300 text-sm">
            <span className="font-semibold">{c.username}</span>
            {c.groupe && <span className="text-gray-500"> — {c.groupe}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
