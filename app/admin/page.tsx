import Link from "next/link";
import { listStores } from "@/lib/db";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const stores = await listStores();
  const h = await headers();
  const host = h.get("host") || "localhost:3000";
  const proto = host.startsWith("localhost") ? "http" : "https";
  const baseUrl = `${proto}://${host}`;

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bebas text-4xl tracking-wider text-sared">PAINEL · LOJAS</h1>
          <div className="flex gap-3">
            <Link
              href="/admin/nova"
              className="bg-sared hover:bg-red-700 transition rounded-lg px-4 py-2 font-bebas tracking-widest"
            >
              + NOVA LOJA
            </Link>
            <form action="/api/auth/logout" method="POST">
              <button className="border border-neutral-800 hover:bg-neutral-900 rounded-lg px-4 py-2 font-bebas tracking-widest">
                SAIR
              </button>
            </form>
          </div>
        </div>

        {stores.length === 0 ? (
          <div className="border border-dashed border-neutral-800 rounded-xl p-10 text-center text-neutral-500">
            Nenhuma loja cadastrada ainda. Clique em <strong>+ Nova Loja</strong>.
          </div>
        ) : (
          <ul className="space-y-3">
            {stores.map((s) => (
              <li
                key={s.id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-bebas text-2xl tracking-wider">{s.nome}</p>
                  <p className="text-sm text-neutral-400">
                    {s.cidade} · {s.uf} · /{s.slug}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`/${s.slug}`}
                    target="_blank"
                    rel="noopener"
                    className="text-sm border border-neutral-700 hover:bg-neutral-800 rounded-lg px-3 py-2"
                  >
                    Ver
                  </a>
                  <button
                    type="button"
                    data-copy={`${baseUrl}/${s.slug}`}
                    className="copy-link text-sm border border-neutral-700 hover:bg-neutral-800 rounded-lg px-3 py-2"
                  >
                    Copiar link
                  </button>
                  <Link
                    href={`/admin/${s.id}`}
                    className="text-sm bg-neutral-800 hover:bg-neutral-700 rounded-lg px-3 py-2"
                  >
                    Editar
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.querySelectorAll('.copy-link').forEach(b => {
              b.addEventListener('click', async () => {
                const url = b.getAttribute('data-copy');
                await navigator.clipboard.writeText(url);
                const old = b.textContent;
                b.textContent = 'Copiado!';
                setTimeout(() => b.textContent = old, 1500);
              });
            });
          `,
        }}
      />
    </main>
  );
}
