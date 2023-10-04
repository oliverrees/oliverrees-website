import { Container } from "@/components/Container";
import { PostHeader } from "@/components/PostHeader";
import RenderComponent from "@/components/RenderComponent";
import { getPostBySlug } from "@/lib/getPostsInfo";
import markdownToHtml from "@/lib/markdownToHtml";
import { Post } from "@/lib/postType";

export default async function Post({ params }: { params: { slug: string } }) {
  const post: Post = getPostBySlug(params.slug, [
    "title",
    "date",
    "component",
    "content",
  ]);

  const content = await markdownToHtml(post.content || "");

  return (
    <Container>
      <div className="w-full mb-12">
        <PostHeader post={post} />
        {post.component ? (
          <RenderComponent componentName={post.component} />
        ) : (
          <div
            className="prose lg:prose-lg max-w-4xl dark:text-white"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        )}
      </div>
    </Container>
  );
}
