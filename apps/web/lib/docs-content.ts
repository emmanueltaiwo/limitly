import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DOCS_DIR = 'content/docs';

export interface DocPage {
  slug: string;
  title: string;
  description: string;
  body: string;
}

function parseFrontmatter(raw: string): {
  title: string;
  description: string;
  body: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { title: '', description: '', body: raw };
  }
  const [, front, body] = match;
  let title = '';
  let description = '';
  const frontText = front ?? '';
  for (const line of frontText.split('\n')) {
    const t = line.match(/^title:\s*["']?(.*?)["']?$/);
    const d = line.match(/^description:\s*["']?(.*?)["']?$/);
    if (t?.[1]) title = t[1].trim();
    if (d?.[1]) description = d[1].trim();
  }
  return { title, description, body: body ?? '' };
}

function resolveLinksInBody(
  body: string,
  dirSlug: string,
  baseUrl: string
): string {
  return body.replace(
    /\[([^\]]+)\]\((\.\.\/)*(\.\/)?([^)\s#]+)(#[^)]*)?\)/g,
    (_, text, parentDots, _dot, path, hash) => {
      let resolved: string;
      if ((parentDots ?? '').length > 0) {
        const up = dirSlug
          .split('/')
          .slice(0, -(parentDots!.length / 3))
          .join('/');
        resolved = (up ? up + '/' : '') + path.replace(/^(\.\.\/)+/, '');
      } else {
        resolved = dirSlug ? `${dirSlug}/${path}`.replace(/\/+/g, '/') : path;
      }
      return `[${text}](${baseUrl}/docs/${resolved}${hash ?? ''})`;
    }
  );
}

function collectMdxFiles(dir: string, baseDir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    const rel = full.slice(baseDir.length + 1).replace(/\\/g, '/');
    if (e.isDirectory()) {
      files.push(...collectMdxFiles(full, baseDir));
    } else if (e.isFile() && e.name.endsWith('.mdx')) {
      files.push(rel);
    }
  }
  return files;
}

function getDocsDir(): string | null {
  const cwd = process.cwd();
  const candidates = [join(cwd, DOCS_DIR), join(cwd, 'apps/web', DOCS_DIR)];
  for (const p of candidates) {
    try {
      readdirSync(p);
      return p;
    } catch {
      continue;
    }
  }
  return null;
}

export function getDocsContent(baseUrl: string): DocPage[] {
  const docsPath = getDocsDir();
  const pages: DocPage[] = [];
  if (!docsPath) return pages;
  let files: string[] = [];
  try {
    files = collectMdxFiles(docsPath, docsPath);
  } catch {
    return pages;
  }
  for (const rel of files.sort()) {
    const slug = rel.replace(/\.mdx$/, '');
    const dirSlug = slug.includes('/')
      ? slug.split('/').slice(0, -1).join('/')
      : '';
    const fullPath = join(docsPath, rel);
    let raw: string;
    try {
      raw = readFileSync(fullPath, 'utf-8');
    } catch {
      continue;
    }
    const { title, description, body } = parseFrontmatter(raw);
    const bodyWithLinks = resolveLinksInBody(body.trim(), dirSlug, baseUrl);
    pages.push({
      slug,
      title: title || slug,
      description,
      body: bodyWithLinks,
    });
  }
  return pages;
}
