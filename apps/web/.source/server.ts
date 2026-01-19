// @ts-nocheck
import * as __fd_glob_15 from "../content/docs/api-reference/types.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/api-reference/ratelimit.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/api-reference/createclient.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/api-reference/checkratelimit.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/getting-started/quick-start.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/getting-started/introduction.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/getting-started/installation.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/guides/typescript.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/guides/nextjs.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/guides/express.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/guides/error-handling.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/examples/custom-strategies.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/examples/basic.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/examples/advanced.mdx?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/getting-started/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "getting-started/meta.json": __fd_glob_1, }, {"examples/advanced.mdx": __fd_glob_2, "examples/basic.mdx": __fd_glob_3, "examples/custom-strategies.mdx": __fd_glob_4, "guides/error-handling.mdx": __fd_glob_5, "guides/express.mdx": __fd_glob_6, "guides/nextjs.mdx": __fd_glob_7, "guides/typescript.mdx": __fd_glob_8, "getting-started/installation.mdx": __fd_glob_9, "getting-started/introduction.mdx": __fd_glob_10, "getting-started/quick-start.mdx": __fd_glob_11, "api-reference/checkratelimit.mdx": __fd_glob_12, "api-reference/createclient.mdx": __fd_glob_13, "api-reference/ratelimit.mdx": __fd_glob_14, "api-reference/types.mdx": __fd_glob_15, });