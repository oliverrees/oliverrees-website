export interface Post {
  title: string;
  date: string;
  slug?: string;
  component?: string;
  description?: string;
  image?: string;
  content?: string;
  [key: string]: string | undefined;
}
