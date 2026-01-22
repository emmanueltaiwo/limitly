// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"api-reference/checkratelimit.mdx": () => import("../content/docs/api-reference/checkratelimit.mdx?collection=docs"), "api-reference/createclient.mdx": () => import("../content/docs/api-reference/createclient.mdx?collection=docs"), "api-reference/types.mdx": () => import("../content/docs/api-reference/types.mdx?collection=docs"), "examples/advanced.mdx": () => import("../content/docs/examples/advanced.mdx?collection=docs"), "examples/algorithms.mdx": () => import("../content/docs/examples/algorithms.mdx?collection=docs"), "examples/basic.mdx": () => import("../content/docs/examples/basic.mdx?collection=docs"), "examples/custom-strategies.mdx": () => import("../content/docs/examples/custom-strategies.mdx?collection=docs"), "getting-started/installation.mdx": () => import("../content/docs/getting-started/installation.mdx?collection=docs"), "getting-started/introduction.mdx": () => import("../content/docs/getting-started/introduction.mdx?collection=docs"), "getting-started/quick-start.mdx": () => import("../content/docs/getting-started/quick-start.mdx?collection=docs"), "guides/error-handling.mdx": () => import("../content/docs/guides/error-handling.mdx?collection=docs"), "guides/express.mdx": () => import("../content/docs/guides/express.mdx?collection=docs"), "guides/nextjs.mdx": () => import("../content/docs/guides/nextjs.mdx?collection=docs"), "guides/typescript.mdx": () => import("../content/docs/guides/typescript.mdx?collection=docs"), }),
};
export default browserCollections;