import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  const { guild_id } = req.query;

  if (!guild_id) {
    return res.status(400).json({ error: "guild_id manquant" });
  }

  try {
    const result = await pool.query(
      `SELECT 
         c.id,
         c.nom,
         c.rarete,
         c.rang,
         c.ascension,
         c.eveille,
         c.competence_eveil,
         c.image_url,
         g.username,
         g.groupe
       FROM champions c
       JOIN users g 
         ON c.user_id = g.user_id 
        AND c.guild_id = g.guild_id
       WHERE c.guild_id = $1
       ORDER BY g.username ASC, c.nom ASC`,
      [users_id]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur base de données" });
  }
}
