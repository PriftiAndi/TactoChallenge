import { Organization } from '@/api';
import { useArticles } from '@/store/articles/hooks';
import { useDepartments } from '@/store/departments/hooks';
import { useOrganizations } from '@/store/organizations/hooks';
import { useUsersGroupedByOrganizations } from '@/store/users/hooks';

export interface OrganizationTableRow extends Organization {
  numberOfUsers: number;
  managerContact: string;
  numberOfArticles: number;
  articleStatusIfApplicable: string;
}

const userTemplate = {
  firstName: '',
  lastName: '',
  email: '',
};

export const useOrganizationTable = (): Array<OrganizationTableRow> => {
  const organizations = useOrganizations();
  const departments = useDepartments();
  const articles = useArticles();
  const userOrgDict = useUsersGroupedByOrganizations();

  const suppliedByOrgIds = articles.map((article) => article.suppliedBy);
  const concatenatedOrgIds = Array.prototype.concat.apply([], suppliedByOrgIds);

  const articlesSoldToOneOrg = articles.filter((article) => article.suppliedBy.length === 1);

  return organizations.map((organization) => {
    const organizationUsers = userOrgDict[organization.id];
    const { firstName, lastName, email } = organizationUsers?.find((user) => user.departmentIds[0] === departments[0]?.id) || userTemplate;
    const singleArticleFound = articlesSoldToOneOrg.find((article) => article.suppliedBy[0] === organization.id);

    return {
      ...organization,
      numberOfUsers: organizationUsers?.length || 0,
      managerContact: `${firstName} ${lastName} ${email}`,
      numberOfArticles: concatenatedOrgIds.filter((orgId) => orgId === organization.id).length,
      articleStatusIfApplicable: `${singleArticleFound?.id} - ${singleArticleFound?.name}`,
    };
  });
};
