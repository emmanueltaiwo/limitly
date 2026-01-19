declare module "fumadocs-mdx:collections/server" {
  import type { DocsCollection } from "fumadocs-core/source";

  export const docs: DocsCollection & {
    toFumadocsSource(): {
      pages: any[];
      [key: string]: any;
    };
  };
}
