
import type { Metadata } from "next";
import { ThemeProvider } from "@/utils/ThemeProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./index.css";
import "./app.css";
import { StoreProvider } from "@/store/storeProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RS Next App",
  description: "Rick and Morty Next.js App",
};

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoreProvider>
          <ThemeProvider>
            <main id="root">
              {children}
            </main>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
