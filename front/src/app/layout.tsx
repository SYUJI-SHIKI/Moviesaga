import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "components/layouts/header/Header";
import Footer from "components/layouts/footer/Footer";
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as HotToaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

const siteName = "Movie Saga";
const description = "";
const url = "Movie Saga";

// export const metadata: Metadata = {
//   metadataBase: new URL(url),
//   title: {
//     default: siteName,
//     template: `%s - ${siteName}`,
//   },
//   description,
//   openGraph: {
//     title: siteName,
//     description,
//     url,
//     siteName,
//     locale: "ja_JP",
//     type: "website",
//   },
//   twitter: {
//     card: "summary",
//     title: siteName,
//     description,
//     creator: "@ganbaritaiman9",
//   },
//   alternates: {
//     canonical: url,
//   },
// };

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
      <html lang="ja">
        <body>
          <head>${process.env.GOOGLE_HTML}</head>
          <div className={inter.className}>
            <Header />
            {/* <HotToaster position="top-center" reverseOrder={false} /> */}
            {children}
            <Footer />
          </div>
        </body>
      </html>
  );
};

export default RootLayout;