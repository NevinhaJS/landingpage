import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NevTec",
  description:
    "Desenvolvimento de software, aplicativos, sites e automações com inteligência artificial",
  openGraph: {
    type: "website",
    url: "https://nevtec.netlify.app/",
    title: "NevTec",
    description:
      "Desenvolvimento de software, aplicativos, sites e automações com inteligência artificial",
    siteName: "NevTec",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
