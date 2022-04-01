import ActionStatusTable from 'components/dashboard/ActionStatusTable';

export default {
  title: 'Action/ActionStatusTable'
};

const plan = {
  primaryOrgs: [],
  actionImpacts: [],
  actionStatuses: []
};

export const AllCombinations = () => (
    <ActionStatusTable
      plan={plan}
      actions={[]}
      orgs={[]}
    />
)
