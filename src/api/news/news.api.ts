import axios from 'axios';

import type { Article, News } from './news.types';

const BASE_URL = 'https://gnews.io/api/v4';

export const getTopNews = async (): Promise<Article[]> => {
  const response = await axios.get<News>(`${BASE_URL}/search?`, {
    params: {
      q: 'b',
      lang: 'id',
      max: 10, // Ambil 10 berita saja
      apikey: import.meta.env.VITE_GNEWS_API_KEY,
    },
  });

  return response.data.articles;
};
