import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { GRAPH_URL, URL } from "@/lib/constants";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["500", "600", "700", "400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadat: Metadata = {
  title: "NoteHub",
  description:
    "A simple platform to create, organize, and access personal notes.",
  openGraph: {
    title: "Notes organizer",
    description: "Create and manage your personal notes.",
    url: URL,
    images: [
      {
        url: GRAPH_URL,
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <footer>
            <p>
              Created <time dateTime="2025">2025</time>
            </p>
          </footer>{" "}
        </TanStackProvider>
      </body>
    </html>
  );
}
