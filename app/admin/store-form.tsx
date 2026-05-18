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
    link_burguer: store?.link_burguer ?? "",
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
    <>
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            {mode === "create" ? "Nova loja" : "Editar loja"}
          </h2>
          <p className="mt-1 text-sm text-ash">
            {mode === "create"
              ? "Cadastre uma nova unidade da rede"
              : `Editando ${store?.nome}`}
          </p>
        </div>
        <Link
          href="/admin"
          className="pressable rounded-lg border border-hairline bg-white px-3.5 py-1.5 text-sm font-medium text-ink-soft hover:bg-slate-50"
        >
          ← Voltar
        </Link>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <Card title="Identificação">
          <Field label="Nome da loja" required>
            <input
              required
              value={form.nome}
              onChange={(e) => set("nome", e.target.value)}
              placeholder="S.A Florianópolis"
              className={inputCls}
            />
          </Field>
          <div className="grid grid-cols-3 gap-3">
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
          <Field label="Marca principal" required>
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
          <Field label="Slug (URL pública)" hint="Ex: 'florianopolis' → /florianopolis" required>
            <input
              required
              pattern="[a-z0-9\-]+"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
              placeholder="florianopolis"
              className={`${inputCls} font-mono`}
            />
          </Field>
        </Card>

        <Card title="Contato e localização">
          <Field label="WhatsApp" hint="Com DDD. Ex: 48999990000" required>
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
        </Card>

        <Card title="Deliverys (opcional)" subtitle="Cards que aparecem em 'Nossos Deliverys'">
          <Field label="Link Casa do Sushi">
            <input
              type="url"
              value={form.link_sushi}
              onChange={(e) => set("link_sushi", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Link Casa do Poke">
            <input
              type="url"
              value={form.link_poke}
              onChange={(e) => set("link_poke", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Link Casa do Yakisoba">
            <input
              type="url"
              value={form.link_yaki}
              onChange={(e) => set("link_yaki", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Link Casa do Burguer">
            <input
              type="url"
              value={form.link_burguer}
              onChange={(e) => set("link_burguer", e.target.value)}
              className={inputCls}
            />
          </Field>
        </Card>

        {error && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between gap-3 pt-2">
          {mode === "edit" ? (
            <button
              type="button"
              onClick={onDelete}
              className="pressable rounded-lg border border-rose-200 bg-white px-3.5 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50"
            >
              Apagar loja
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={loading}
            className="pressable rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </>
  );
}

const inputCls =
  "w-full rounded-lg border border-hairline bg-white px-3 py-2 text-sm text-ink outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200";

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-hairline bg-white p-5 sm:p-6">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-ash">{subtitle}</p>}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

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
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-ash">
        {label} {required && <span className="text-rose-500">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ash">{hint}</span>}
    </label>
  );
}
