import {
  GetParametersQuery,
  SetNormalizationMutation,
  SetNormalizationMutationVariables,
} from 'common/__generated__/paths/graphql';
import { useTranslations } from 'next-intl';
import { GET_PARAMETERS } from 'queries/paths/get-paths-parameters';
import { FormGroup, Input, Label } from 'reactstrap';
import styled from 'styled-components';

import { usePaths } from '@/context/paths/paths';
import { getHttpHeaders } from '@/utils/paths/paths.utils';
import { gql, useMutation, useQuery } from '@apollo/client';

const SwitchWrapper = styled.div`
  max-width: 160px;
  .form-label {
    margin-bottom: 0;
    line-height: 1;
    font-size: 0.8rem;
  }
`;

const SET_NORMALIZATION_MUTATION = gql`
  mutation SetNormalizationFromWidget($id: ID) {
    setNormalizer(id: $id) {
      ok
    }
  }
`;

type NormalizationWidgetProps = {
  availableNormalizations: GetParametersQuery['availableNormalizations'];
};

function NormalizationWidget(props: NormalizationWidgetProps) {
  const t = useTranslations();
  const paths = usePaths();
  const { loading, error, data, previousData, refetch, networkStatus } =
    useQuery<GetParametersQuery>(GET_PARAMETERS, {
      notifyOnNetworkStatusChange: true,
      context: {
        uri: '/api/graphql-paths',
        headers: getHttpHeaders({ instanceIdentifier: paths?.instance.id }),
      },
    });

  const [
    setNormalization,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation<SetNormalizationMutation, SetNormalizationMutationVariables>(
    SET_NORMALIZATION_MUTATION,
    {
      context: {
        uri: '/api/graphql-paths',
        headers: getHttpHeaders({ instanceIdentifier: paths?.instance.id }),
      },
      refetchQueries: 'active',
    }
  );

  if ((loading && !previousData) || !data || !data.parameters) {
    return <>-</>;
  }
  if (error) {
    return (
      <>
        <div>{t('error-loading-data')}</div>
      </>
    );
  }

  const { availableNormalizations } = data;
  if (!availableNormalizations.length) return null;

  const norm = availableNormalizations[0];
  const label = t('normalize-by', { node: norm.label });
  return (
    <SwitchWrapper>
      <FormGroup switch>
        <Label for={norm.id}>{label}</Label>
        <Input
          disabled={mutationLoading}
          type="switch"
          role="switch"
          id={norm.id}
          name={norm.id}
          checked={norm.isActive}
          onChange={(e) => {
            setNormalization({
              variables: {
                id: norm.isActive ? null : norm.id,
              },
            });
          }}
        />
      </FormGroup>
    </SwitchWrapper>
  );
}

export default NormalizationWidget;
