import type { Metadata } from "next";
import EditPostClient from "@/components/pages/posts/EditPostClient";

type EditPostPageProps = {
  params: { id: string };
};

export function generateMetadata({ params }: EditPostPageProps): Metadata {
  return {
    title: `Editar post ${params.id} | Epayco`,
    description: `Formulario para editar el post ${params.id}.`,
  };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  return <EditPostClient params={params} />;
}
