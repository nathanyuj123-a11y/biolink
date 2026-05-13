import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { isLoggedIn } from "@/lib/auth";

const cidades = [
  "Colombo", "Americana", "Alto da XV", "Mercês", "Araucária", "Novo Mundo",
  "São Braz", "São José dos Pinhais", "Santa Cândida", "Pinhais", "Sítio Cercado",
  "CWB", "Sinop", "São José", "Anália Franco", "Goiânia", "Erechim",
  "Itápolis", "Maringá", "Navegantes", "Rondonópolis", "São Bento",
  "São Francisco", "Tubarão", "Florianópolis", "Indaiatuba", "Palmeira",
  "Rio Preto", "Santos", "Fazenda", "Mogi", "Gaspar", "Camboriú", "Castro",
  "Itapema", "Jaraguá", "Paranaguá", "Ponta Grossa", "Ponta Grossa D",
];

function slugify(s: string): string {
  return s
    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST() {
  if (!(await isLoggedIn())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const url = process.env.DATABASE_URL;
  if (!url) return NextResponse.json({ error: "DATABASE_URL missing" }, { status: 500 });

  const sql = neon(url);

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

  const existingRows = (await sql`SELECT slug FROM stores`) as Array<{ slug: string }>;
  const existing = new Set(existingRows.map((r) => r.slug));

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

  return NextResponse.json({ added, skipped, total: existing.size });
}
