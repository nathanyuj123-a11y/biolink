import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isLoggedIn } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";

export async function GET() {
  if (!(await isLoggedIn())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const sql = neon(process.env.DATABASE_URL!);
  const slugs = ["alto-da-xv", "americana"];
  await sql`
    UPDATE stores
    SET whatsapp = '', maps_url = '', google_review_url = NULL, updated_at = NOW()
    WHERE slug = ANY(${slugs})
  `;
  for (const slug of slugs) revalidatePath(`/${slug}`);
  return NextResponse.json({ ok: true, cleared: slugs });
}
