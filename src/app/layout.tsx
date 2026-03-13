import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "GanitaHub — Smart Calculators for Finance, Business & Creators",
  description:
    "Free online calculators for finance, taxes, investments, business planning, and creator economy tools.",
  openGraph: {
    title: "GanitaHub — Smart Calculators",
    description:
      "Free online calculators for finance, taxes, investments, business planning, and creator economy tools.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GanitaHub — Smart Calculators",
    description:
      "Free online calculators for finance, taxes, investments, business planning, and creator economy tools.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
