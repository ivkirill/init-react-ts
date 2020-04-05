export interface PageMeta {
  title: string;
  description?: string;
  keywords?: string;
}

export interface Route {
  path: string;
  pageType: string;
  pageMeta?: () => PageMeta;
}
