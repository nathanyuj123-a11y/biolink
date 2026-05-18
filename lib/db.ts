import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let _sql: NeonQueryFunction<false, false> | null = null;
function getSql(): NeonQueryFunction<false, false> {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL não configurada");
    _sql = neon(url);
  }
  return _sql;
}

export type Store = {
  id: number;
  slug: string;
  nome: string;
  cidade: string;
  uf: string;
  marca: "sushi" | "poke" | "yaki";
  whatsapp: string;
  maps_url: string;
  link_sushi: string | null;
  link_poke: string | null;
  link_yaki: string | null;
  link_burguer: string | null;
  google_review_url: string | null;
  lista_espera_url: string | null;
  created_at: string;
  updated_at: string;
};

export type StoreInput = Omit<Store, "id" | "created_at" | "updated_at">;

let initPromise: Promise<void> | null = null;
async function ensureSchema(): Promise<void> {
  if (!initPromise) {
    initPromise = (async () => {
      await getSql()`
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
          link_burguer TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        )
      `;
      await getSql()`ALTER TABLE stores ADD COLUMN IF NOT EXISTS link_burguer TEXT`;
      await getSql()`ALTER TABLE stores ADD COLUMN IF NOT EXISTS google_review_url TEXT`;
      await getSql()`ALTER TABLE stores ADD COLUMN IF NOT EXISTS lista_espera_url TEXT`;
    })();
  }
  await initPromise;
}

function plainStore(r: Record<string, unknown>): Store {
  return {
    id: r.id as number,
    slug: r.slug as string,
    nome: r.nome as string,
    cidade: r.cidade as string,
    uf: r.uf as string,
    marca: r.marca as Store["marca"],
    whatsapp: r.whatsapp as string,
    maps_url: r.maps_url as string,
    link_sushi: (r.link_sushi as string) ?? null,
    link_poke: (r.link_poke as string) ?? null,
    link_yaki: (r.link_yaki as string) ?? null,
    link_burguer: (r.link_burguer as string) ?? null,
    google_review_url: (r.google_review_url as string) ?? null,
    lista_espera_url: (r.lista_espera_url as string) ?? null,
    created_at: String(r.created_at),
    updated_at: String(r.updated_at),
  };
}

export async function listStores(): Promise<Store[]> {
  await ensureSchema();
  const rows = (await getSql()`SELECT * FROM stores ORDER BY nome`) as Record<string, unknown>[];
  return rows.map(plainStore);
}

export async function getStoreBySlug(slug: string): Promise<Store | null> {
  await ensureSchema();
  const rows = (await getSql()`SELECT * FROM stores WHERE slug = ${slug} LIMIT 1`) as Record<string, unknown>[];
  return rows[0] ? plainStore(rows[0]) : null;
}

export async function getStoreById(id: number): Promise<Store | null> {
  await ensureSchema();
  const rows = (await getSql()`SELECT * FROM stores WHERE id = ${id} LIMIT 1`) as Record<string, unknown>[];
  return rows[0] ? plainStore(rows[0]) : null;
}

export async function createStore(s: StoreInput): Promise<Store> {
  await ensureSchema();
  const rows = (await getSql()`
    INSERT INTO stores (slug, nome, cidade, uf, marca, whatsapp, maps_url, link_sushi, link_poke, link_yaki, link_burguer, google_review_url, lista_espera_url)
    VALUES (${s.slug}, ${s.nome}, ${s.cidade}, ${s.uf}, ${s.marca}, ${s.whatsapp},
            ${s.maps_url}, ${s.link_sushi ?? null}, ${s.link_poke ?? null}, ${s.link_yaki ?? null}, ${s.link_burguer ?? null}, ${s.google_review_url ?? null}, ${s.lista_espera_url ?? null})
    RETURNING *
  `) as Record<string, unknown>[];
  return plainStore(rows[0]);
}

export async function updateStore(id: number, s: StoreInput): Promise<Store> {
  await ensureSchema();
  const rows = (await getSql()`
    UPDATE stores SET
      slug = ${s.slug},
      nome = ${s.nome},
      cidade = ${s.cidade},
      uf = ${s.uf},
      marca = ${s.marca},
      whatsapp = ${s.whatsapp},
      maps_url = ${s.maps_url},
      link_sushi = ${s.link_sushi ?? null},
      link_poke = ${s.link_poke ?? null},
      link_yaki = ${s.link_yaki ?? null},
      link_burguer = ${s.link_burguer ?? null},
      google_review_url = ${s.google_review_url ?? null},
      lista_espera_url = ${s.lista_espera_url ?? null},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `) as Record<string, unknown>[];
  return plainStore(rows[0]);
}

export async function deleteStore(id: number): Promise<void> {
  await ensureSchema();
  await getSql()`DELETE FROM stores WHERE id = ${id}`;
}

export function slugify(s: string): string {
  return s
    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
