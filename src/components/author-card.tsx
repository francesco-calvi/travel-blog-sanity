import Image from "next/image";

import { Author } from "@/lib/types/article";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  author: Author;
  publishDate: string;
}

const AuthorCard: React.FC<Props> = (props) => {
  const { author, publishDate } = props;
  const { name, image } = author;

  return (
    <div className="flex items-center space-x-4">
      <div className="relative w-12 h-12 rounded-full overflow-hidden">
        <Image
          src={urlFor(image).url()}
          alt={`Immagine profilo di ${name}`}
          fill
          className="object-cover"
        />
      </div>
      <span className="flex flex-col">
        <span className="text-lg font-medium">{name}</span>
        <span className="text-gray-500">
          Pubblicato il&nbsp;
          <time dateTime={new Date(publishDate).toISOString()}>
            {new Date(publishDate).toDateString()}
          </time>
        </span>
      </span>
    </div>
  );
};

export default AuthorCard;
