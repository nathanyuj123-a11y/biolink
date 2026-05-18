import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, JetBrains_Mono, Geist, Montserrat, Oswald } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ["300", "400", "500", "600", "700", "800"] });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", weight: ["500", "600", "700"] });

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
    <html lang="pt-BR" className={`${bebas.variable} ${dm.variable} ${mono.variable} ${geist.variable} ${montserrat.variable} ${oswald.variable}`}>
      <body>{children}</body>
    </html>
  );
}
