"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handle(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    });
    setBusy(false);
    if (!res.ok) {
      setErr("Senha incorreta");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/login-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "400px",
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 30px 80px -15px rgba(0,0,0,0.6)",
          padding: "28px",
          zIndex: 1,
        }}
      >
        <div
          style={{
            marginBottom: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <img
            src="/logo.png"
            alt="Casa do Sushi"
            style={{ height: "56px", width: "auto", objectFit: "contain" }}
          />
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", margin: 0 }}>
              Painel de Biolinks
            </h1>
            <p style={{ fontSize: "12px", color: "#64748b", margin: "4px 0 0 0" }}>
              Acesso restrito à equipe
            </p>
          </div>
        </div>

        <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#64748b",
              }}
            >
              Usuário ou email
            </label>
            <input
              type="text"
              autoFocus
              required
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                background: "#f8fafc",
                padding: "8px 12px",
                fontSize: "14px",
                color: "#0f172a",
                outline: "none",
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#64748b",
              }}
            >
              Senha
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                background: "#f8fafc",
                padding: "8px 12px",
                fontSize: "14px",
                color: "#0f172a",
                outline: "none",
              }}
            />
          </div>
          {err && (
            <div
              style={{
                borderRadius: "8px",
                border: "1px solid #fecdd3",
                background: "#fff1f2",
                padding: "8px 12px",
                fontSize: "12px",
                fontWeight: 500,
                color: "#be123c",
              }}
            >
              {err}
            </div>
          )}
          <button
            type="submit"
            disabled={busy}
            style={{
              width: "100%",
              borderRadius: "8px",
              background: "#0f172a",
              padding: "10px 16px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#ffffff",
              border: "none",
              cursor: busy ? "not-allowed" : "pointer",
              opacity: busy ? 0.5 : 1,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            {busy ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
