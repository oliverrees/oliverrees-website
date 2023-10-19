import { Container } from "@/components/Container";
import { PostHeader } from "@/components/PostHeader";
import RenderComponent from "@/components/RenderComponent";
import { getPostBySlug } from "@/lib/getPostsInfo";
import { Post } from "@/lib/postType";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeExternalLinks from "rehype-external-links";

export default async function Post({ params }: { params: { slug: string } }) {
  const post: Post = getPostBySlug(params.slug, [
    "title",
    "date",
    "component",
    "content",
    "description",
    "image",
  ]);

  return (
    <Container>
      <meta property="og:title" content={post.title} />
      <meta
        property="og:url"
        content={`https://oliverrees.co.uk/posts/${params.slug}`}
      />
      {post.image && (
        <meta
          property="og:image"
          content={`https://oliverrees.co.uk${post.image}`}
        />
      )}
      {post.description && (
        <meta property="og:description" content={post.description} />
      )}
      <div className="w-full mb-12">
        <PostHeader post={post} />
        {post.component ? (
          <RenderComponent componentName={post.component} />
        ) : (
          <div className="prose lg:prose-lg max-w-4xl dark:text-white prose-a:font-normal dark:prose-a:text-white dark:prose-h1:text-white dark:prose-h2:text-white dark:prose-h3:text-white dark:prose-strong:text-white dark:prose-blockquote:text-white">
            <Markdown
              rehypePlugins={[
                rehypeRaw,
                [rehypeExternalLinks, { target: "new" }],
              ]}
            >
              {post.content}
            </Markdown>
          </div>
        )}
      </div>
    </Container>
  );
}
