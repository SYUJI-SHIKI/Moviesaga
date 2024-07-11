import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

const siteName = "MovieSaga";
const description = "映画";
const url = "https://www.movie-saga-app.com/";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(url),
    title: {
      default: siteName,
      template: `%s - ${siteName}`,
    },
    description,
    openGraph: {
      title: siteName,
      description,
      url,
      siteName,
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: siteName,
      description,
      creator: "@ganbaritaiman9",
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}