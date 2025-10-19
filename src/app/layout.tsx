import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Demo App",
  description: "Comprehensive Next.js features demonstration",
};

type Props = LayoutProps<"/">;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex gap-4 flex-wrap">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/static" className="hover:underline">
              Static
            </Link>
            <Link href="/dynamic" className="hover:underline">
              Dynamic
            </Link>
            <Link href="/isr" className="hover:underline">
              ISR
            </Link>
            <Link href="/ssg/1" className="hover:underline">
              SSG Params
            </Link>
            <Link href="/posts" className="hover:underline">
              Posts
            </Link>
            <Link href="/parallel" className="hover:underline">
              Parallel
            </Link>
            <Link href="/photos" className="hover:underline">
              Photos
            </Link>
            <Link href="/server-actions" className="hover:underline">
              Server Actions
            </Link>
            <Link href="/performance" className="hover:underline">
              Performance
            </Link>
            <Link href="/streaming" className="hover:underline">
              Streaming
            </Link>
            <Link href="/error-handling" className="hover:underline">
              Error Handling
            </Link>
          </div>
        </nav>
        <main className="container mx-auto p-8">{children}</main>
      </body>
    </html>
  );
}
