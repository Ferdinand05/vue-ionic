export interface ArticleSource {
  id: string;
  name: string;
  url: string;
  country: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  lang: string;
  source: ArticleSource;
}

export interface News {
  totalArticles: number;
  articles: Article[];
}
