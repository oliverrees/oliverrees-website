import { getAllPosts } from "@/lib/getPostsInfo";
import { PostLink } from "@/components/PostLink";
import { Post } from "@/lib/postType";

export default function Home() {
  const posts: Post[] = getAllPosts(["title", "date", "slug", "draft"]);
  posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const publishedPosts = posts.filter((post) => !post.draft);

  return (
    <>
      {publishedPosts.reverse().map((post) => (
        <div key={post.title}>
          <PostLink post={post} />
        </div>
      ))}
    </>
  );
}
