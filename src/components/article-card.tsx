import { Article } from "@/lib/types/article";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  article: Article;
}

const ArticleCard: React.FC<Props> = (props) => {
  const { article } = props;
  return (
    <Link href={article.slug.current}>
      <div className="border border-gray-100 rounded-2xl w-full md:1/2 lg:w-1/3 overflow-hidden">
        <div className="relative w-full aspect-[1.6]">
          <Image
            src={urlFor(article.mainImage.asset._ref).url()}
            alt={article.mainImage.alt}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 bg-gray-100">
          <h5 className="font-bold">{article.title}</h5>
          <p className="mt-1 line-clamp-4">{article.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
