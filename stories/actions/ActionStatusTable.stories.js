import ActionStatusTable from 'components/dashboard/ActionStatusTable';
import { actions, plan } from './fixtures/actions';

export default {
  title: 'Action/ActionStatusTable'
};

export const AllCombinations = () => (
    <ActionStatusTable
      plan={plan}
      actions={actions}
      orgs={[]}
    />
);
