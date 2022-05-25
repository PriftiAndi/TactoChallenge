import { Department } from '@/api';
import { useStore } from '@/store';
import { useMemo } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useDepartments = (): Array<Department> => {
  const { departmentDict } = useStore(({ departmentDict }) => ({ departmentDict }));
  return useMemo(() => {
    return Object.values(departmentDict);
  }, [departmentDict]);
};
