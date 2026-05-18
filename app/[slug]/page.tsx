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
    <div className="relative min-h-[100svh] overflow-hidden bg-black font-montserrat">
      {/* Seigaiha — faixa superior sutil */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-48 seigaiha opacity-[0.07]"
        style={{ maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)" }}
      />
      {/* Seigaiha — faixa inferior sutil */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 seigaiha opacity-[0.05]"
        style={{ maskImage: "linear-gradient(to top, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)" }}
      />
      {/* Glow vermelho no topo */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(211,3,3,0.10) 0%, transparent 70%)",
        }}
      />
      <div className="grain pointer-events-none fixed inset-0 z-50 mix-blend-overlay" />

      <main className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[420px] flex-col justify-center px-5 py-6">
        {/* Logo + cidade */}
        <div className="flex flex-col items-center">
          <img
            src="/logos/logo-white.png"
            alt="S.A Franchising"
            className="w-full max-w-[280px] h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
          />
          <div className="mt-4 flex items-center gap-2.5">
            <span className="h-px w-6 bg-sared/70" />
            <p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.45em] text-neutral-400">
              Unidade
            </p>
            <span className="h-px w-6 bg-sared/70" />
          </div>
          <h1 className="font-impact text-[2.6rem] font-bold uppercase leading-none tracking-[0.04em] text-white mt-2">
            {store.cidade}
          </h1>
          <p className="font-montserrat text-[10px] font-semibold tracking-[0.5em] text-sared mt-1.5">
            {store.uf}
          </p>
        </div>

        {/* Deliverys — destaque */}
        {deliverys.length > 0 && (
          <>
            <div className="mt-7 mb-3 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-sared" />
              <span className="font-impact text-lg font-bold uppercase tracking-[0.35em] text-sared">
                Peça agora
              </span>
              <span className="h-px w-10 bg-sared" />
            </div>
            <div className="space-y-2.5">
              {deliverys.map((c) => (
                <a
                  key={c.key}
                  href={c.url!}
                  target="_blank"
                  rel="noopener"
                  className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl bg-sared px-5 py-3.5 ring-1 ring-inset ring-white/10 transition-all duration-300 hover:bg-sared_deep hover:shadow-[0_8px_22px_-8px_rgba(211,3,3,0.7)]"
                >
                  <span className="absolute inset-y-0 left-0 w-px bg-white/25" />
                  <div className="text-left min-w-0">
                    <p className="font-impact text-[11px] font-bold uppercase tracking-[0.4em] text-white/90">
                      Quero pedir agora
                    </p>
                    <p className="font-montserrat text-[15px] font-bold tracking-tight text-white leading-tight mt-1 truncate">
                      Delivery {c.label}
                    </p>
                  </div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    className="shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
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
            className="group mt-4 flex w-full items-center justify-between rounded-2xl border border-sagold/30 bg-sagold/[0.06] px-5 py-3.5 transition-all duration-300 hover:border-sagold/60 hover:bg-sagold/[0.12]"
          >
            <div className="text-left flex items-center gap-3 min-w-0">
              <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0 text-sagold" fill="currentColor">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
              </svg>
              <div className="min-w-0">
                <p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.4em] text-sagold/80">
                  Sua opinião conta
                </p>
                <p className="font-montserrat text-[14px] font-bold tracking-tight text-amber-50 leading-tight mt-1 truncate">
                  Avalie nossa loja no Google
                </p>
              </div>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              className="shrink-0 text-sagold/80 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}

        {/* Secundários: WhatsApp + Como chegar */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <a
            href={whatsappUrl(store.whatsapp)}
            target="_blank"
            rel="noopener"
            className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3.5 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" className="text-emerald-400" fill="currentColor">
              <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1s-.8.9-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5s.2-.3.3-.5c.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5 4.5.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
            </svg>
            <span className="font-montserrat text-[12px] font-semibold tracking-wide text-neutral-200 leading-none">
              WhatsApp
            </span>
          </a>
          <a
            href={store.maps_url}
            target="_blank"
            rel="noopener"
            className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3.5 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" className="text-sky-400" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 22s-7-7-7-13a7 7 0 0114 0c0 6-7 13-7 13z" strokeLinejoin="round" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span className="font-montserrat text-[12px] font-semibold tracking-wide text-neutral-200 leading-none">
              Como chegar
            </span>
          </a>
        </div>

        {/* Slogan + assinatura */}
        <div className="mt-7 flex flex-col items-center gap-2">
          <p className="font-impact text-[11px] font-bold uppercase tracking-[0.45em] text-sagold">
            O sushi que faz história
          </p>
          <div className="flex items-center gap-3 text-neutral-600">
            <span className="h-px w-6 bg-neutral-800" />
            <span className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.5em]">
              S.A Franchising
            </span>
            <span className="h-px w-6 bg-neutral-800" />
          </div>
        </div>
      </main>
    </div>
  );
}
