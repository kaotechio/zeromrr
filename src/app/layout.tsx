import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "ZeroMRR",
  description: "A privacy-first database of verified startup revenues",
  metadataBase: new URL("https://zeromrr.app"),
  openGraph: {
    title: "ZeroMRR",
    description: "A privacy-first database of verified startup revenues",
    url: "https://zeromrr.app",
    siteName: "ZeroMRR",
    images: [
      {
        url: "/zeromrr-homepage.png",
        width: 1200,
        height: 630,
        alt: "ZeroMRR homepage"
      }
    ],
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeroMRR",
    description: "A privacy-first database of verified startup revenues",
    images: ["/zeromrr-homepage.png"],
    creator: "@kaotechio"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=assistant:400" rel="stylesheet" />
        {
          process.env.NODE_ENV === 'production' && (
            <>
              <script defer data-domain="zeromrr.app" src="https://plausible.io/js/script.js"></script>
            </>
          )
        }
        <script src="https://dev.easepop.dev/script.js" data-id="5JGOx5OGDFvpGMq1GKuQEfACCheO9Cbk" defer></script>
      </head>
      <body
        className={`font-['Assistant'] antialiased text-slate-900`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
