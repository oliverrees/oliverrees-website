import Image from "next/image";
import { getPosts } from "../lib/getPosts";
import RenderComponent from "@/components/RenderComponent";
import { getAllPosts } from "@/lib/getPostsInfo";
import { Post } from "@/components/Post";

export default function Home() {
  const posts = getAllPosts(["title", "date", "slug"]);
  return (
    <>
      <div className="">
        {posts.reverse().map((post) => (
          <div key={post.title}>
            <Post post={post} />
          </div>
        ))}
      </div>
    </>
  );
}
