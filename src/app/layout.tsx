import type { Metadata } from "next";
import StoreProvider from "@/lib/StoreProvider"; // Make sure this is imported
import { styles } from "@/lib/styles";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Todo App",
  description: "A Todo application built with Next.js and Firebase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={styles.appContainer}>
        {/*
          THIS IS THE FIX!
          We must wrap the {children} with our StoreProvider so that
          all child components (like your MainLayout) have access to the Redux store.
        */}
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}