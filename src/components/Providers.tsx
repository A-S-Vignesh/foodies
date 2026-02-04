"use client";

import { SessionProvider } from "next-auth/react";

import { Toaster } from "sonner";
import { CartProvider } from "@/context/CartContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
        <Toaster position="bottom-right" richColors />
      </CartProvider>
    </SessionProvider>
  );
}
