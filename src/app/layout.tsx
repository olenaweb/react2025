import "./app.css";
import StoreProvider from "@/store/storeProviders";
import { AppProvider } from "@/app/page/[pageId]/AppProvider";

import type { Metadata } from "next";
import { ThemeProvider } from "@/utils/ThemeProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./index.css";
import "./app.css";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoreProvider>
          <ThemeProvider>
            <AppProvider>
              <main id="root">{children}</main>
            </AppProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
