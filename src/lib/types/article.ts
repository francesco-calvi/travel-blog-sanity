export interface Article {
  mainImage: ImageType;
  description: string;
  publishedAt: string;
  slug: Slug;
  title: string;
  author: Author[];
  body: Body[];
}

export interface ImageType {
  _type: string;
  _key: string;
  alt: string;
  asset: Asset;
}

export interface Asset {
  _ref: string;
}

export interface Slug {
  current: string;
}

export interface Author {
  name: string;
  slug: Slug;
  image: ImageType;
}

export interface Body {
  children: Children[];
  _type: string;
  style: string;
  _key: string;
  markDefs: any[];
}

export interface Children {
  _type: string;
  marks: string[];
  text: string;
  _key: string;
}
