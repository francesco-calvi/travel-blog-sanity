import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";

import AuthorCard from "@/components/author-card";
import { ImageType } from "@/lib/types/article";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  params: { slug: string };
}

const getArticle = async (slug: string) => {
  const query = `
    *[ _type == "post" && slug.current == "${slug}"] {
      "author": *[_type == 'author']{ 
        name,
        slug,
        image
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

export default async function ArticlePage({ params: { slug } }: Props) {
  const articles = await getArticle(slug);
  const article = articles?.[0];
  if (!article) return notFound();

  return (
    <main className="max-w-2xl mx-auto">
      <article>
        <h1 className="text-5xl font-bold">{article.title}</h1>
        <section className="mb-10 py-8 border-b border-gray-200">
          <AuthorCard
            author={article.author[0]}
            publishDate={article.publishedAt}
          />
        </section>
        <section className="prose-h1:text-4xl prose-h1:mb-14 prose-headings:font-bold prose-h2:text-3xl prose-h2:mb-2 prose-p:text-lg prose-p:mb-10 prose-img:mb-10">
          <PortableText
            value={article.body}
            components={myPortableTextComponents}
          />
        </section>
      </article>
    </main>
  );
}

const myPortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageType }) => (
      <Image
        src={urlFor(value).url()}
        width={700}
        height={600}
        alt={value.alt}
      />
    ),
  },
};
