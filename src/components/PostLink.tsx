import Link from "next/link";
import { DateDisplay } from "@/components/DateDisplay";
import { Post } from "@/lib/postType";

export const PostLink = ({ post }: { post: Post }) => {
  return (
    <div>
      <Link href={`/posts/${post.slug}`}>
        <div className="md:hover:text-blue-700 group text-2xl px-8 md:px-12 pb-12 md:py-12 md:text-2xl lg:text-4xl flex flex-col dark:text-white">
          <div className="">{post.title}</div>
          <DateDisplay className="" date={post.date} />
        </div>
      </Link>
    </div>
  );
};
