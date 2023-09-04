import { getAllPosts } from "@/lib/getPostsInfo";
import { Post } from "@/components/Post";
interface Article {
  [key: string]: string;
}

export default function Home() {
  const posts: Article[] = getAllPosts(["title", "date", "slug"]);
  posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return (
    <>
      {posts.reverse().map((post) => (
        <div key={post.title}>
          <Post post={post} />
        </div>
      ))}
    </>
  );
}
