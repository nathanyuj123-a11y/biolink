import { notFound } from "next/navigation";
import { getStoreBySlug } from "@/lib/db";

export const dynamic = "force-dynamic";

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

  const deliverys = [
    { key: "sushi", label: "S.A Casa do Sushi", url: store.link_sushi },
    { key: "poke", label: "S.A Casa do Poke", url: store.link_poke },
    { key: "yaki", label: "S.A Casa do Yakisoba", url: store.link_yaki },
    { key: "burguer", label: "S.A Casa do Burguer", url: store.link_burguer },
  ].filter((c) => c.url);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0d0d0d]">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(200,16,46,0.07) 0%, transparent 70%)",
        }}
      />
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

        {/* Deliverys (destaque principal) */}
        {deliverys.length > 0 && (
          <>
            <div className="mb-4 flex w-full items-center gap-3">
              <span className="h-px flex-1 bg-neutral-800" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
                Peça agora
              </span>
              <span className="h-px flex-1 bg-neutral-800" />
            </div>

            <div className="w-full space-y-3">
              {deliverys.map((c) => (
                <a
                  key={c.key}
                  href={c.url!}
                  target="_blank"
                  rel="noopener"
                  className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl bg-sared px-6 py-5 transition-all duration-300 hover:bg-[#a30d24] hover:shadow-[0_12px_30px_-10px_rgba(200,16,46,0.55)]"
                >
                  <span className="absolute inset-y-0 left-0 w-px bg-white/20" />
                  <div className="text-left">
                    <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/70">
                      Quero pedir agora
                    </p>
                    <p className="font-bebas text-2xl tracking-[0.06em] text-white leading-none mt-1">
                      Delivery {c.label}
                    </p>
                  </div>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    className="shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </>
        )}

        {/* Google review */}
        {store.google_review_url && (
          <a
            href={store.google_review_url}
            target="_blank"
            rel="noopener"
            className="group mt-8 flex w-full items-center justify-between rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] px-6 py-4 transition-all duration-300 hover:border-amber-400/60 hover:bg-amber-500/[0.12]"
          >
            <div className="text-left flex items-center gap-3">
              <svg width="22" height="22" viewBox="0 0 24 24" className="text-amber-400" fill="currentColor">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
              </svg>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-amber-300/70">
                  Sua opinião conta
                </p>
                <p className="font-bebas text-xl tracking-[0.06em] text-amber-100 leading-none mt-1">
                  Avalie nossa loja no Google
                </p>
              </div>
            </div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              className="shrink-0 text-amber-300/70 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}

        {/* Secundários: WhatsApp + Como chegar */}
        <div className="mt-10 mb-5 flex w-full items-center gap-3">
          <span className="h-px flex-1 bg-neutral-800" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
            Fale com a unidade
          </span>
          <span className="h-px flex-1 bg-neutral-800" />
        </div>

        <div className="w-full grid grid-cols-2 gap-2.5">
          <a
            href={whatsappUrl(store.whatsapp)}
            target="_blank"
            rel="noopener"
            className="group flex flex-col items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-4 transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-900"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" className="text-emerald-400" fill="currentColor">
              <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1s-.8.9-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5s.2-.3.3-.5c.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5 4.5.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
            </svg>
            <span className="font-bebas text-lg tracking-[0.08em] text-neutral-200 leading-none">
              WhatsApp
            </span>
          </a>
          <a
            href={store.maps_url}
            target="_blank"
            rel="noopener"
            className="group flex flex-col items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-4 transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-900"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" className="text-sky-400" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 22s-7-7-7-13a7 7 0 0114 0c0 6-7 13-7 13z" strokeLinejoin="round" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span className="font-bebas text-lg tracking-[0.08em] text-neutral-200 leading-none">
              Como chegar
            </span>
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
