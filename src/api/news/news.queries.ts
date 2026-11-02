import { useQuery } from '@tanstack/vue-query';

import { getTopNews } from './news.api';

export const QUERY_KEY_TOP_NEWS = 'top-news';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useTopNewsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY_TOP_NEWS],
    queryFn: getTopNews, // Fungsi fetch Axios yang Anda buat sebelumnya
    staleTime: 1000 * 60 * 5, // Cache berlaku 5 menit (tidak hit API ulang jika user balik ke halaman ini)
    retry: 1, // Jika gagal, coba hit ulang 1 kali sebelum melempar error
  });
};
