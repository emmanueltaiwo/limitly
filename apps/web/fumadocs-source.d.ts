import type React from "react";

declare module "fumadocs-core/source" {
  export interface PageData {
    title: string;
    description?: string;
    body: React.ComponentType<any>;
    toc?: any[];
    full?: boolean;
    [key: string]: any;
  }

  export interface Page {
    data: PageData;
    url: string;
    [key: string]: any;
  }

  export interface Source {
    getPage(slug?: string[]): Page | undefined;
    getPages(): Page[];
    getPageTree(): any;
    generateParams(): Array<{ slug: string[] }>;
    getPageByHref?(href: string): Page | undefined;
    resolveHref?(href: string): string;
    getLanguages?(): string[];
  }

  export function loader(config: {
    baseUrl: string;
    source: any;
  }): Source;
}
