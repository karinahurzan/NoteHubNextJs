"use client";

import { useRouter } from "next/navigation";
import css from "./page.module.css";
import { useEffect } from "react";
import { Metadata } from "next";
import { GRAPH_URL, URL } from "@/lib/constants";

export const metadat: Metadata = {
  title: "404 - Page not found",
  description: "The page you are looking for does not exist",
  openGraph: {
    title: "404 - Page not found",
    description: "The page you are looking for does not exist",
    url: `${URL}/404`,
    siteName: "NoteHub",
    images: [
      {
        url: GRAPH_URL,
        width: 1200,
        height: 630,
        alt: "Page not found",
      },
    ],
  },
};

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 4000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
