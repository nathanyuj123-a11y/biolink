import Link from "next/link";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div data-admin-shell>
      <header className="sticky top-0 z-30 border-b border-hairline bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <Link href="/admin" className="flex items-center gap-3">
            <img src="/logo.png" alt="Casa do Sushi" className="h-10 w-auto object-contain" />
            <div className="hidden sm:block border-l border-hairline pl-3">
              <h1 className="text-[15px] font-semibold tracking-tight text-ink">Painel de Biolinks</h1>
              <p className="text-xs text-ash">S.A Casa do Sushi Franchising · sincronizado em nuvem</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Online
            </span>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="pressable rounded-lg border border-hairline bg-white px-3.5 py-1.5 text-sm font-medium text-ink-soft hover:bg-slate-50"
              >
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
