"use client";

import Script from "next/script";
import { ReactNode, useState } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/alphaTab.js"
        onReady={() => setIsReady(true)}
      />
      {isReady && children}
    </>
  );
}
