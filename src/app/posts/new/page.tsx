import type { Metadata } from "next";
import NewPostClient from "@/components/pages/posts/NewPostClient";

export const metadata: Metadata = {
  title: "Crear post | Epayco",
  description: "Formulario para crear un nuevo post.",
};

export default function NewPostPage() {
  return <NewPostClient />;
}
