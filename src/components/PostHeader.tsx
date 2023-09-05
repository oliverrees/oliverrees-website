import { Post } from "@/lib/postType";
import { DateDisplay } from "./DateDisplay";

interface PostHeaderProps {
  post: Post;
}

export const PostHeader = ({ post }: PostHeaderProps) => {
  return (
    <div className="flex flex-col mb-8">
      <div className="font-bold md:text-3xl lg:text-4xl md:leading-tight text-2xl">
        {post.title}
      </div>
      <DateDisplay date={post.date} />
    </div>
  );
};
