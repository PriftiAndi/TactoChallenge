import { Article } from '@/api';
import { useStore } from '@/store';
import { useMemo } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useArticles = (): Array<Article> => {
  const { articleDict } = useStore(({ articleDict }) => ({ articleDict }));
  return useMemo(() => {
    return Object.values(articleDict);
  }, [articleDict]);
};
