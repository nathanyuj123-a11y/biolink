import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="font-bebas text-5xl tracking-wide text-sared">S.A FRANCHISING</h1>
        <p className="text-neutral-400">Sistema de biolinks da rede.</p>
        <Link
          href="/admin"
          className="inline-block bg-sared hover:bg-red-700 transition px-6 py-3 rounded-lg font-bebas tracking-widest text-lg"
        >
          ENTRAR NO PAINEL
        </Link>
      </div>
    </main>
  );
}
