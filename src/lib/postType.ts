export interface Post {
  title: string;
  date: string;
  slug?: string;
  component?: string;
  content?: string;
  [key: string]: string | undefined;
}
