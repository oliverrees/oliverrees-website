import { remark } from "remark";
import html from "remark-html";
import remarkEmbedder, { TransformerInfo } from "@remark-embedder/core";

const YoutubeTransformer = {
  name: "Youtube",
  shouldTransform(url: string) {
    const { host, pathname } = new URL(url);
    return ["youtube.com", "www.youtube.com"].includes(host);
  },
  getHTML(url: string) {
    const iframeUrl = url.replace("watch?v=", "embed/");
    console.log(iframeUrl);
    return `<iframe src="${iframeUrl}"></iframe>`;
    return `<div class="embed-youtube aspect-w-16 aspect-h-9"><iframe width="1280" height="720" src="${iframeUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
  },
};

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkEmbedder, {
      transformers: [YoutubeTransformer],
    })
    .use(html)
    .process(markdown);
  return result.toString();
}
