import { NextResponse } from "next/server";
import { login } from "@/lib/auth";

export async function POST(req: Request) {
  const { username, password } = await req.json().catch(() => ({}));
  const ok = await login(username ?? "", password ?? "");
  if (!ok) return NextResponse.json({ error: "invalid" }, { status: 401 });
  return NextResponse.json({ ok: true });
}
