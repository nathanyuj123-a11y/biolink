import Link from "next/link";
import { listStores } from "@/lib/db";
import { headers } from "next/headers";
import AdminShell from "./admin-shell";
import CopyLinkButton from "./copy-link-button";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const stores = await listStores();
  const h = await headers();
  const host = h.get("host") || "localhost:3100";
  const proto = host.startsWith("localhost") ? "http" : "https";
  const baseUrl = `${proto}://${host}`;

  const totalFilled = stores.filter((s) => s.whatsapp && s.maps_url).length;

  return (
    <AdminShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Lojas</h2>
          <p className="mt-1 text-sm text-ash">
            {stores.length} unidades · {totalFilled} completas · {stores.length - totalFilled} pendentes
          </p>
        </div>
        <Link
          href="/admin/nova"
          className="pressable inline-flex items-center gap-2 rounded-lg bg-ink px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          <span className="text-base leading-none">+</span> Nova loja
        </Link>
      </div>

      {stores.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-hairline bg-white p-10 text-center text-sm text-ash">
          Nenhuma loja cadastrada ainda.
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {stores.map((s) => {
            const isComplete = !!s.whatsapp && !!s.maps_url;
            return (
              <li
                key={s.id}
                className="group rounded-2xl border border-hairline bg-white p-4 transition hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{s.nome}</p>
                    <p className="mt-0.5 truncate text-xs text-ash">
                      {s.cidade} · {s.uf} · <span className="font-mono">/{s.slug}</span>
                    </p>
                  </div>
                  {isComplete ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Completa
                    </span>
                  ) : (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 ring-1 ring-amber-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      Pendente
                    </span>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <Link
                    href={`/admin/${s.id}`}
                    className="pressable rounded-md border border-hairline bg-white px-2.5 py-1.5 text-xs font-medium text-ink-soft hover:bg-slate-50"
                  >
                    Editar
                  </Link>
                  <a
                    href={`/${s.slug}`}
                    target="_blank"
                    rel="noopener"
                    className="pressable rounded-md border border-hairline bg-white px-2.5 py-1.5 text-xs font-medium text-ink-soft hover:bg-slate-50"
                  >
                    Abrir
                  </a>
                  <CopyLinkButton url={`${baseUrl}/${s.slug}`} />
                </div>
              </li>
            );
          })}
        </ul>
      )}

    </AdminShell>
  );
}
