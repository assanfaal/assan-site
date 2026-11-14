import ArticleClient from "./ArticleClient";

export async function generateStaticParams() {
  return [{ slug: "fallback" }];
}

export default function ArticlePage() {
  return <ArticleClient />;
}