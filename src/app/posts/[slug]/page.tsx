import { DateDisplay } from "@/components/DateDisplay";
import RenderComponent from "@/components/RenderComponent";
import { getPostBySlug } from "@/lib/getPostsInfo";
import markdownToHtml from "@/lib/markdownToHtml";

export default async function Post({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "component",
    "content",
  ]);

  const content = await markdownToHtml(post.content || "");

  return (
    <>
      <div className="container flex max-w-4xl w-full px-8 md:px-12 md:py-10">
        {post.component ? (
          <RenderComponent componentName={post.component} />
        ) : (
          <main>
            <div className="w-full text-black">
              <div className="flex flex-col mb-8">
                <div className="font-bold md:text-3xl lg:text-4xl md:leading-tight text-2xl">
                  {post.title}
                </div>
                <DateDisplay date={post.date} />
              </div>

              <div
                className="prose lg:prose-lg max-w-4xl"
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
            </div>
          </main>
        )}
      </div>
    </>
  );
}
