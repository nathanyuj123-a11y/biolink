"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import type { Store } from "@/lib/db";

type Props = { mode: "create" | "edit"; store?: Store };

export default function StoreForm({ mode, store }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: store?.slug ?? "",
    nome: store?.nome ?? "",
    cidade: store?.cidade ?? "",
    uf: store?.uf ?? "",
    marca: store?.marca ?? "sushi",
    whatsapp: store?.whatsapp ?? "",
    maps_url: store?.maps_url ?? "",
    link_sushi: store?.link_sushi ?? "",
    link_poke: store?.link_poke ?? "",
    link_yaki: store?.link_yaki ?? "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const url = mode === "create" ? "/api/lojas" : `/api/lojas/${store!.id}`;
    const method = mode === "create" ? "POST" : "PATCH";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error || "Erro ao salvar");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  async function onDelete() {
    if (!confirm("Apagar esta loja?")) return;
    setLoading(true);
    await fetch(`/api/lojas/${store!.id}`, { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bebas text-4xl tracking-wider text-sared">
            {mode === "create" ? "NOVA LOJA" : "EDITAR LOJA"}
          </h1>
          <Link href="/admin" className="text-neutral-400 hover:text-white">
            ← Voltar
          </Link>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <Field label="Nome da loja" required>
            <input
              required
              value={form.nome}
              onChange={(e) => set("nome", e.target.value)}
              placeholder="Casa do Sushi Florianópolis"
              className={inputCls}
            />
          </Field>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Field label="Cidade" required>
                <input
                  required
                  value={form.cidade}
                  onChange={(e) => set("cidade", e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>
            <Field label="UF" required>
              <input
                required
                maxLength={2}
                value={form.uf}
                onChange={(e) => set("uf", e.target.value.toUpperCase())}
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Marca principal (header)" required>
            <select
              value={form.marca}
              onChange={(e) => set("marca", e.target.value as typeof form.marca)}
              className={inputCls}
            >
              <option value="sushi">S.A Casa do Sushi</option>
              <option value="poke">S.A Casa do Poke</option>
              <option value="yaki">S.A Casa do Yakisoba</option>
            </select>
          </Field>

          <Field
            label="Slug (URL pública)"
            hint="Sem espaços. Ex: 'florianopolis' vira /florianopolis"
            required
          >
            <input
              required
              pattern="[a-z0-9\-]+"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
              placeholder="florianopolis"
              className={inputCls}
            />
          </Field>

          <Field label="WhatsApp" hint="Ex: 48999999999 (com DDD)" required>
            <input
              required
              value={form.whatsapp}
              onChange={(e) => set("whatsapp", e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="Google Maps URL" required>
            <input
              required
              type="url"
              value={form.maps_url}
              onChange={(e) => set("maps_url", e.target.value)}
              placeholder="https://maps.google.com/..."
              className={inputCls}
            />
          </Field>

          <fieldset className="space-y-4 border-t border-neutral-800 pt-5">
            <legend className="font-bebas tracking-widest text-neutral-400 text-sm">
              CARDS "CONHEÇA TAMBÉM" (opcional)
            </legend>
            <Field label="Link S.A Casa do Sushi">
              <input
                type="url"
                value={form.link_sushi}
                onChange={(e) => set("link_sushi", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Link S.A Casa do Poke">
              <input
                type="url"
                value={form.link_poke}
                onChange={(e) => set("link_poke", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Link S.A Casa do Yakisoba">
              <input
                type="url"
                value={form.link_yaki}
                onChange={(e) => set("link_yaki", e.target.value)}
                className={inputCls}
              />
            </Field>
          </fieldset>

          {error && <p className="text-sared">{error}</p>}

          <div className="flex gap-3 justify-between pt-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-sared hover:bg-red-700 disabled:opacity-50 px-6 py-3 rounded-lg font-bebas tracking-widest"
            >
              {loading ? "SALVANDO..." : "SALVAR"}
            </button>
            {mode === "edit" && (
              <button
                type="button"
                onClick={onDelete}
                className="border border-red-900 text-sared hover:bg-red-950 px-6 py-3 rounded-lg font-bebas tracking-widest"
              >
                APAGAR
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

const inputCls =
  "w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 outline-none focus:border-sared";

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm text-neutral-300 mb-1">
        {label} {required && <span className="text-sared">*</span>}
      </span>
      {children}
      {hint && <span className="block text-xs text-neutral-500 mt-1">{hint}</span>}
    </label>
  );
}
