import ArticleCard from "@/components/article-card";
import { Article } from "@/lib/types/article";
import { client } from "@/sanity/lib/client";

const getArticles = async () => {
  const query = `
    *[ _type == "post"] {
      "author": *[_type == 'author']{ 
        name,
        slug
      },
      body,
      description,
      mainImage,
      publishedAt,
      slug,
      title  
    }
  `;

  return await client.fetch(query);
};

export default async function Home() {
  const articles = await getArticles();

  return (
    <main className="max-w-screen-xl">
      <section className="flex gap-6 flex-wrap">
        {articles.map((a: Article) => (
          <ArticleCard article={a} key={a.slug.current} />
        ))}
      </section>
    </main>
  );
}
