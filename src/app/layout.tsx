import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ractysh Global Trade | Import, Export & Logistics Solutions",
  description:
    "Premium import, export, sourcing, and logistics services for businesses worldwide. Connecting global markets through trusted trade solutions.",
  keywords: [
    "import services",
    "export services",
    "logistics",
    "freight forwarding",
    "customs clearance",
    "global trade",
    "supply chain management",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@flaticon/flaticon-uicons@3.3.1/css/regular/rounded.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@flaticon/flaticon-uicons@3.3.1/css/solid/rounded.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@flaticon/flaticon-uicons@3.3.1/css/bold/rounded.css"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" forcedTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
