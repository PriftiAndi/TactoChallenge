import DefaultLayout from '@/modules/layout/components/DefaultLayout';
import OrganizationTable from '@/modules/organization_overview/components/OrganizationTable';
import { useOrganizationTable } from '@/modules/organization_overview/helpers/hooks';
import ApiHandler from '@/services/ApiHandler';
import { useStore } from '@/store';
import { default as React, useEffect } from 'react';

const App: React.FC = () => {
  const { fetchOrganizations } = useStore(({ fetchOrganizations }) => ({ fetchOrganizations }));
  const { fetchDepartments } = useStore(({ fetchDepartments }) => ({ fetchDepartments }));
  const { fetchUsers } = useStore(({ fetchUsers }) => ({ fetchUsers }));
  const { fetchArticles } = useStore(({ fetchArticles }) => ({ fetchArticles }));

  const rows = useOrganizationTable();

  useEffect(() => {
    ApiHandler.init();
    Promise.allSettled([fetchOrganizations(), fetchUsers(), fetchDepartments(), fetchArticles()]);
  }, []);

  return (
    <DefaultLayout>
      <OrganizationTable rows={rows} />
    </DefaultLayout>
  );
};

export default App;
