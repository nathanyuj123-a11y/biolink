import { notFound } from "next/navigation";
import { getStoreBySlug } from "@/lib/db";

export const dynamic = "force-dynamic";

const BRAND_LABEL: Record<string, string> = {
  sushi: "Casa do Sushi",
  poke: "Casa do Poke",
  yaki: "Casa do Yakisoba",
};

function whatsappUrl(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (raw.startsWith("http")) return raw;
  const withCountry = digits.startsWith("55") ? digits : `55${digits}`;
  return `https://wa.me/${withCountry}`;
}

export default async function BioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const store = await getStoreBySlug(slug);
  if (!store) notFound();

  const cards = [
    { key: "sushi", label: "Casa do Sushi", url: store.link_sushi },
    { key: "poke", label: "Casa do Poke", url: store.link_poke },
    { key: "yaki", label: "Casa do Yakisoba", url: store.link_yaki },
  ].filter((c) => c.url);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0d0d0d]">
      {/* Soft warm glow at top */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(200,16,46,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Very subtle grain */}
      <div className="grain pointer-events-none fixed inset-0 z-50 mix-blend-overlay" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[460px] flex-col items-center px-6 pb-14 pt-12">
        {/* Logo */}
        <div className="relative mb-7">
          <img
            src="/logos/logo-white.png"
            alt="S.A Franchising"
            className="w-full max-w-[380px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          />
        </div>

        {/* Identidade */}
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-600 mb-3">
          Unidade
        </p>
        <h1 className="font-bebas text-[2.6rem] leading-none tracking-[0.04em] text-neutral-100 text-center">
          {store.cidade}
        </h1>
        <div className="mt-2 mb-10 flex items-center gap-3 text-neutral-500">
          <span className="h-px w-6 bg-neutral-700" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-sared">{store.uf}</span>
          <span className="h-px w-6 bg-neutral-700" />
        </div>

        {/* Marcas */}
        {cards.length > 0 && (
          <>
            <div className="mb-5 flex w-full items-center gap-3">
              <span className="h-px flex-1 bg-neutral-800" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
                Nossos Deliverys
              </span>
              <span className="h-px flex-1 bg-neutral-800" />
            </div>

            <div className="w-full space-y-2.5">
              {cards.map((c) => (
                <a
                  key={c.key}
                  href={c.url!}
                  target="_blank"
                  rel="noopener"
                  className="group relative flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950/60 px-5 py-4 transition-all duration-300 hover:border-sared/60 hover:bg-neutral-900"
                >
                  <div className="flex items-center gap-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-sared/70 transition-all duration-300 group-hover:scale-150 group-hover:bg-sared" />
                    <span className="font-bebas text-xl tracking-[0.08em] text-neutral-100">
                      S.A {c.label.toUpperCase()}
                      <span className="text-sared/80"> · </span>
                      <span className="text-neutral-400">DELIVERY</span>
                    </span>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="text-neutral-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-sared"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </>
        )}

        {/* Main actions */}
        <div className="w-full space-y-3 mt-10">
          <a
            href={whatsappUrl(store.whatsapp)}
            target="_blank"
            rel="noopener"
            className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl bg-sared px-6 py-5 transition-all duration-300 hover:bg-[#a30d24] hover:shadow-[0_12px_30px_-10px_rgba(200,16,46,0.55)]"
          >
            <span className="absolute inset-y-0 left-0 w-px bg-white/20" />
            <div className="text-left">
              <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/70">
                Contato
              </p>
              <p className="font-bebas text-3xl tracking-[0.06em] text-white leading-none mt-1">
                WhatsApp
              </p>
            </div>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="text-white transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a
            href={store.maps_url}
            target="_blank"
            rel="noopener"
            className="group relative flex w-full items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-950 px-6 py-5 transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-900"
          >
            <div className="text-left">
              <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-neutral-500">
                Endereço
              </p>
              <p className="font-bebas text-3xl tracking-[0.06em] text-neutral-100 leading-none mt-1">
                Como chegar
              </p>
            </div>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="text-neutral-300 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Footer */}
        <div className="mt-14 flex items-center gap-3 text-neutral-700">
          <span className="h-px w-8 bg-neutral-800" />
          <span className="font-mono text-[9px] uppercase tracking-[0.5em]">
            S.A Franchising
          </span>
          <span className="h-px w-8 bg-neutral-800" />
        </div>
      </main>
    </div>
  );
}
