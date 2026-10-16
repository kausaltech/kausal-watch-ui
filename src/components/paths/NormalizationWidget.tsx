import { CircularProgress, FormControlLabel, Switch } from '@mui/material';

import styled from '@emotion/styled';

import { NetworkStatus, gql } from '@apollo/client';
import { useTranslations } from 'next-intl';

import {
  type GetParametersQuery,
  type SetNormalizationFromWidgetMutation,
  type SetNormalizationFromWidgetMutationVariables,
} from '@/common/__generated__/paths/graphql';
import { GET_PARAMETERS } from '@/queries/paths/get-paths-parameters';
import { usePathsMutation, usePathsQuery } from '@/utils/paths/hooks/usePathsApollo';

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
  const { loading, error, data, previousData, refetch, networkStatus } =
    usePathsQuery<GetParametersQuery>(GET_PARAMETERS, {
      notifyOnNetworkStatusChange: true,
    });

  const [setNormalization, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    usePathsMutation<
      SetNormalizationFromWidgetMutation,
      SetNormalizationFromWidgetMutationVariables
    >(SET_NORMALIZATION_MUTATION, {
      refetchQueries: 'active',
    });

  if ((loading && !previousData) || !data || !data.parameters) {
    return <CircularProgress size={10} sx={{ ml: 0.5, mb: -0.1 }} />;
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
      <FormControlLabel
        control={
          <Switch
            onChange={() =>
              void setNormalization({
                variables: {
                  id: norm.isActive ? null : norm.id,
                },
              })
            }
            disabled={mutationLoading || networkStatus === NetworkStatus.refetch}
            checked={norm.isActive}
            size="small"
          />
        }
        label={label}
        sx={{
          m: 0,
          p: 0,
        }}
        slotProps={{
          typography: {
            variant: 'caption',
          },
        }}
      />
    </SwitchWrapper>
  );
}

export default NormalizationWidget;
