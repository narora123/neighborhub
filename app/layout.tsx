import "./globals.css";
import { clsx } from "clsx";

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "NeighborHub",
  description: "Hyper-local jobs & helpers for your community."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx("min-h-dvh bg-gray-50 text-gray-900")}>
        <div className="mx-auto max-w-5xl p-4">{children}</div>
      </body>
    </html>
  );
}
