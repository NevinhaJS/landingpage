import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/google-analytics";

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
  twitter: {
    card: "summary_large_image",
    title: "NevTec",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />

        {children}
      </body>
    </html>
  );
}
