import type { Metadata } from "next";
import "./globals.css";

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
      </head>
      <body
        className={`font-['Assistant'] antialiased text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
