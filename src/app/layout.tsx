import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "ZeroMRR",
  description: "A privacy-first database of verified startup revenues",
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
              <script async src="https://plausible.io/js/pa-QFDNm4lYEO8UOL5UVZE4I.js"></script>
              <script>
                window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
                plausible.init()
              </script>
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
