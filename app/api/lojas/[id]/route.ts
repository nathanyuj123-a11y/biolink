import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { updateStore, deleteStore, getStoreById, getStoreBySlug } from "@/lib/db";
import { isLoggedIn } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isLoggedIn())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const idNum = Number(id);
  const existing = await getStoreById(idNum);
  if (!existing) return NextResponse.json({ error: "not found" }, { status: 404 });
  const body = await req.json();
  if (body.slug && body.slug !== existing.slug) {
    const dup = await getStoreBySlug(body.slug);
    if (dup) return NextResponse.json({ error: "Slug já existe" }, { status: 409 });
  }
  const s = await updateStore(idNum, body);
  revalidatePath(`/${existing.slug}`);
  if (s.slug !== existing.slug) revalidatePath(`/${s.slug}`);
  return NextResponse.json(s);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isLoggedIn())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const existing = await getStoreById(Number(id));
  await deleteStore(Number(id));
  if (existing) revalidatePath(`/${existing.slug}`);
  return NextResponse.json({ ok: true });
}
