import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Inicio | Epayco",
  description: "Pagina principal con accesos rapidos y guia de inicio.",
};

export default function Home() {
  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
          Epayco Posts
        </h1>
        <p className="max-w-md text-sm text-gray-500 sm:text-base">
          Explora el listado de posts y gestiona su contenido.
        </p>
        <Link
          className="rounded-full border border-solid border-black/[.08] transition-colors inline-flex items-center justify-center hover:bg-[#f2f2f2] hover:border-transparent text-black text-sm sm:text-base h-10 sm:h-12 px-6"
          href="/posts"
        >
          Ver posts
        </Link>
      </main>
    </div>
  );
}
