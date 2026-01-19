import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { Navbar } from "../components/navbar";

export default function DocsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar hideLinks />
      <DocsLayout 
        tree={source.getPageTree()}
        nav={{
          title: "Limitly",
          url: "/",
        }}
      >
        {children}
      </DocsLayout>
    </div>
  );
}
