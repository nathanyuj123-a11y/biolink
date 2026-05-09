import { NextResponse } from "next/server";
import { createStore, getStoreBySlug } from "@/lib/db";
import { isLoggedIn } from "@/lib/auth";

export async function POST(req: Request) {
  if (!(await isLoggedIn())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json();
  if (!body.slug || !body.nome) {
    return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
  }
  if (await getStoreBySlug(body.slug)) {
    return NextResponse.json({ error: "Slug já existe" }, { status: 409 });
  }
  const s = await createStore(body);
  return NextResponse.json(s);
}
