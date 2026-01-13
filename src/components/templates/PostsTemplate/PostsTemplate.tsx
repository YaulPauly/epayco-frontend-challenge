import type { ReactNode } from "react";
import Navbar from "@/components/organisms/Navbar";
import Container from "@/components/templates/Container";

type PostsTemplateProps = {
  title?: string;
  headerRight?: ReactNode;
  showHeader?: boolean;
  children: ReactNode;
};

export default function PostsTemplate({
  title = "Posts",
  headerRight,
  showHeader = true,
  children,
}: PostsTemplateProps) {
  return (
    <Container>
      <div className="rounded-lg bg-white shadow">
        <Navbar />
      </div>
      <section className="rounded-lg bg-white p-5 shadow">
        {showHeader ? (
          <div className="flex items-center justify-between">
            <h1 className="text-base font-semibold text-gray-900">{title}</h1>
            {headerRight ? (
              <div className="text-sm text-gray-500">{headerRight}</div>
            ) : null}
          </div>
        ) : null}
        <div className={showHeader ? "mt-4" : ""}>{children}</div>
      </section>
    </Container>
  );
}
