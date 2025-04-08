import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./daily-quote.css";
import "./layout.css";
import "./auth.css";
import "./dashboard.css";
import "./livestreams.css";
import "./content.css";
import "./profile.css";
import "./admin.css";
import "./upgrade.css";
import Footer from "../components/Footer";
import AuthProvider from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CapitalBulls | South Africa's Elite Trading Community",
  description: "Join CapitalBulls, South Africa's ONLY LIVE forex trading community with 4700+ members. Profits wait for no one. Neither do we.",
  keywords: "forex trading, trading community, CapitalBulls, trading discord, live trading, South Africa",
  openGraph: {
    title: "CapitalBulls | South Africa's Elite Trading Community",
    description: "Join our private LIVE trading community with 4700+ members. We are the ONLY trading community in South Africa to trade LIVE everyday.",
    images: "/images/logo.png",
    url: "https://capitalbulls.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <div className="texture-overlay"></div>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
