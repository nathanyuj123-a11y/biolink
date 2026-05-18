import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isLoggedIn } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";

export async function GET() {
  if (!(await isLoggedIn())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const sql = neon(process.env.DATABASE_URL!);
  const rows = [
    { slug: "alto-da-xv", nome: "S.A Alto da XV", cidade: "Alto da XV", uf: "PR", marca: "sushi" },
    { slug: "americana", nome: "S.A Americana", cidade: "Americana", uf: "SP", marca: "sushi" },
  ];
  for (const r of rows) {
    await sql`
      INSERT INTO stores (slug, nome, cidade, uf, marca, whatsapp, maps_url)
      VALUES (${r.slug}, ${r.nome}, ${r.cidade}, ${r.uf}, ${r.marca}, '', '')
      ON CONFLICT (slug) DO NOTHING
    `;
    revalidatePath(`/${r.slug}`);
  }
  return NextResponse.json({ ok: true, created: rows.map(r => r.slug) });
}
