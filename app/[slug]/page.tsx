import { notFound } from "next/navigation";
import { getStoreBySlug } from "@/lib/db";

export const dynamic = "force-dynamic";

function whatsappUrl(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (raw.startsWith("http")) return raw;
  const withCountry = digits.startsWith("55") ? digits : `55${digits}`;
  return `https://wa.me/${withCountry}`;
}

const BRAND_META: Record<string, { name: string; tag: string }> = {
  sushi: { name: "Casa do Sushi", tag: "Tradição japonesa" },
  poke: { name: "Casa do Poke", tag: "Bowls frescos" },
  yaki: { name: "Casa do Yakisoba", tag: "Yakisoba autoral" },
  burguer: { name: "Casa do Burguer", tag: "Smash burguer" },
};

export default async function BioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const store = await getStoreBySlug(slug);
  if (!store) notFound();

  const deliverys = [
    { key: "sushi", url: store.link_sushi },
    { key: "poke", url: store.link_poke },
    { key: "yaki", url: store.link_yaki },
    { key: "burguer", url: store.link_burguer },
  ].filter((c) => c.url);

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-black font-montserrat text-neutral-100">
      {/* Vignette + glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(211,3,3,0.18) 0%, transparent 65%), radial-gradient(ellipse 90% 60% at 50% 110%, rgba(211,3,3,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="grain pointer-events-none fixed inset-0 z-50 mix-blend-overlay opacity-60" />

      <main className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[440px] flex-col justify-center px-5 py-8">
        {/* Header — kamon + logo + cidade */}
        <header className="relative flex flex-col items-center">
          {/* Kamon seigaiha disc */}
          <div
            aria-hidden
            className="seigaiha pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.09]"
            style={{
              width: 360,
              height: 360,
              borderRadius: "9999px",
              maskImage: "radial-gradient(circle, black 35%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(circle, black 35%, transparent 70%)",
            }}
          />
          {/* Gold ring */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sagold/15"
            style={{ width: 300, height: 300 }}
          />

          <img
            src="/logos/logo-white.png"
            alt="S.A Franchising"
            className="relative w-full max-w-[260px] h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          />

          {/* Eyebrow */}
          <div className="relative mt-5 flex items-center gap-2.5">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-sagold/60" />
            <p className="font-montserrat text-[9px] font-bold uppercase tracking-[0.55em] text-sagold">
              Unidade
            </p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-sagold/60" />
          </div>

          {/* Cidade — bem grande */}
          <h1 className="relative font-impact text-[3rem] sm:text-[3.4rem] font-bold uppercase leading-[0.95] tracking-[0.02em] text-white mt-2 text-center">
            {store.cidade}
          </h1>

          {/* UF */}
          <div className="relative mt-2 flex items-center gap-2">
            <span className="text-sared text-xs">◆</span>
            <p className="font-montserrat text-[10px] font-bold tracking-[0.55em] text-sared">
              {store.uf}
            </p>
            <span className="text-sared text-xs">◆</span>
          </div>
        </header>

        {/* Deliverys — destaque */}
        {deliverys.length > 0 && (
          <section className="mt-8">
            <div className="mb-3.5 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-sared" />
              <span className="font-impact text-xl font-bold uppercase tracking-[0.32em] text-sared">
                Peça agora
              </span>
              <span className="h-px w-12 bg-sared" />
            </div>

            <div className="space-y-2.5">
              {deliverys.map((c, i) => {
                const meta = BRAND_META[c.key]!;
                return (
                  <a
                    key={c.key}
                    href={c.url!}
                    target="_blank"
                    rel="noopener"
                    className="group relative flex w-full items-stretch overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-neutral-900 to-neutral-950 transition-all duration-300 hover:border-sared/40 hover:from-neutral-800 hover:shadow-[0_10px_30px_-12px_rgba(211,3,3,0.6)]"
                  >
                    {/* Red bar */}
                    <span className="w-1.5 shrink-0 bg-sared transition-all duration-300 group-hover:w-2 group-hover:bg-gradient-to-b group-hover:from-sared group-hover:to-sared_deep" />

                    {/* Index */}
                    <div className="flex shrink-0 items-center justify-center pl-4 pr-2">
                      <span className="font-impact text-[11px] font-bold tracking-[0.2em] text-sagold/70">
                        0{i + 1}
                      </span>
                    </div>

                    {/* Conteúdo */}
                    <div className="flex flex-1 items-center justify-between px-2 py-3.5 pr-4 min-w-0">
                      <div className="min-w-0">
                        <p className="font-montserrat text-[9px] font-bold uppercase tracking-[0.4em] text-neutral-400">
                          Quero pedir agora
                        </p>
                        <p className="font-impact text-[20px] font-bold uppercase tracking-[0.02em] text-white leading-tight mt-0.5 truncate">
                          Delivery {meta.name}
                        </p>
                        <p className="font-montserrat text-[10px] font-medium text-neutral-500 mt-0.5 truncate">
                          {meta.tag}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sared transition-all duration-300 group-hover:bg-sared_deep group-hover:scale-110">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-white transition-transform duration-300 group-hover:translate-x-0.5">
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        {/* Google review */}
        {store.google_review_url && (
          <a
            href={store.google_review_url}
            target="_blank"
            rel="noopener"
            className="group relative mt-3 flex w-full items-center overflow-hidden rounded-xl border border-sagold/25 bg-gradient-to-br from-sagold/[0.04] to-sagold/[0.10] transition-all duration-300 hover:border-sagold/55 hover:from-sagold/[0.08] hover:to-sagold/[0.16]"
          >
            <span className="w-1.5 shrink-0 bg-sagold" />
            <div className="flex flex-1 items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3 min-w-0">
                <svg width="22" height="22" viewBox="0 0 24 24" className="shrink-0 text-sagold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" fill="currentColor">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
                </svg>
                <div className="min-w-0">
                  <p className="font-montserrat text-[9px] font-bold uppercase tracking-[0.4em] text-sagold/85">
                    Sua opinião conta
                  </p>
                  <p className="font-impact text-[15px] font-bold uppercase tracking-wide text-amber-50 leading-tight mt-0.5 truncate">
                    Avalie nossa loja no Google
                  </p>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" className="shrink-0 text-sagold/70 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </a>
        )}

        {/* Secundários */}
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <a
            href={whatsappUrl(store.whatsapp)}
            target="_blank"
            rel="noopener"
            className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-3.5 transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/[0.06]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" className="text-emerald-400" fill="currentColor">
              <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1s-.8.9-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5s.2-.3.3-.5c.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5 4.5.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
            </svg>
            <span className="font-montserrat text-[12px] font-semibold tracking-wider text-neutral-200 uppercase leading-none">
              WhatsApp
            </span>
          </a>
          <a
            href={store.maps_url}
            target="_blank"
            rel="noopener"
            className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-3.5 transition-all duration-300 hover:border-sky-500/40 hover:bg-sky-500/[0.06]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" className="text-sky-400" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s-7-7-7-13a7 7 0 0114 0c0 6-7 13-7 13z" strokeLinejoin="round" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span className="font-montserrat text-[12px] font-semibold tracking-wider text-neutral-200 uppercase leading-none">
              Como chegar
            </span>
          </a>
        </div>

        {/* Footer slogan */}
        <footer className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-sagold/50" />
            <svg width="14" height="14" viewBox="0 0 24 24" className="text-sagold" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="9" strokeDasharray="2 3" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-sagold/50" />
          </div>
          <p className="font-impact text-[12px] font-bold uppercase tracking-[0.45em] text-sagold">
            O sushi que faz história
          </p>
          <p className="font-montserrat text-[8px] font-semibold uppercase tracking-[0.55em] text-neutral-600">
            S.A Franchising · {new Date().getFullYear()}
          </p>
        </footer>
      </main>
    </div>
  );
}
