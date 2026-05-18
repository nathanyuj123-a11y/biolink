import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "S.A Franchising — Biolink",
  description: "Páginas oficiais das unidades S.A Franchising",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bebas.variable} ${dm.variable} ${mono.variable} ${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}
