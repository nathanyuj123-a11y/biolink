// Roda seed das 39 lojas no Postgres (Neon).
// Uso:  node scripts/seed-lojas.mjs
// Requer DATABASE_URL no env (ex: rode `vercel env pull` antes).

import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import path from "node:path";

const envFile = process.env.DATABASE_URL ? null : ".env.local";
if (envFile) {
  try {
    const txt = readFileSync(path.resolve(envFile), "utf8");
    for (const line of txt.split(/\r?\n/)) {
      const m = line.match(/^([A-Z_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
    }
  } catch {}
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL não definida. Rode `vercel env pull` primeiro.");
  process.exit(1);
}

const cidades = [
  "Colombo", "Americana", "Alto da XV", "Mercês", "Araucária", "Novo Mundo",
  "São Braz", "São José dos Pinhais", "Santa Cândida", "Pinhais", "Sítio Cercado",
  "CWB", "Sinop", "São José", "Anália Franco", "Goiânia", "Erechim",
  "Itápolis", "Maringá", "Navegantes", "Rondonópolis", "São Bento",
  "São Francisco", "Tubarão", "Florianópolis", "Indaiatuba", "Palmeira",
  "Rio Preto", "Santos", "Fazenda", "Mogi", "Gaspar", "Camboriú", "Castro",
  "Itapema", "Jaraguá", "Paranaguá", "Ponta Grossa", "Ponta Grossa D",
];

function slugify(s) {
  return s
    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS stores (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    nome TEXT NOT NULL,
    cidade TEXT NOT NULL,
    uf TEXT NOT NULL,
    marca TEXT NOT NULL,
    whatsapp TEXT NOT NULL DEFAULT '',
    maps_url TEXT NOT NULL DEFAULT '',
    link_sushi TEXT,
    link_poke TEXT,
    link_yaki TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )
`;

const existing = new Set(
  (await sql`SELECT slug FROM stores`).map((r) => r.slug)
);

let added = 0, skipped = 0;
for (const cidade of cidades) {
  const slug = slugify(cidade);
  if (existing.has(slug)) { skipped++; continue; }
  await sql`
    INSERT INTO stores (slug, nome, cidade, uf, marca, whatsapp, maps_url)
    VALUES (${slug}, ${"S.A " + cidade}, ${cidade}, '--', 'sushi', '', '')
  `;
  existing.add(slug);
  added++;
}

console.log(`Adicionadas: ${added} · Já existiam: ${skipped}`);
const all = await sql`SELECT id, slug, nome FROM stores ORDER BY id`;
console.log(`Total no banco: ${all.length}`);
