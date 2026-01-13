import type { ReactNode } from "react";
import Navbar from "@/components/organisms/Navbar";
import Container from "@/components/layout/Container";

export default function PostsLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <div className="rounded-lg bg-white shadow">
        <Navbar />
      </div>
      <section className="rounded-lg bg-white p-5 shadow">{children}</section>
    </Container>
  );
}
