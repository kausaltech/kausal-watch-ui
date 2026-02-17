import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';
import { Spinner } from 'reactstrap';

import dayjs from '@/common/dayjs';
import { useWorkflowSelector } from '@/context/workflow-selector';

const DraftBanner = styled.div`
  padding: ${(props) => props.theme.spaces.s150};
  background-color: ${(props) => props.theme.graphColors.yellow010};
  border-radius: ${(props) =>
    `${props.theme.cardBorderRadius} ${props.theme.cardBorderRadius} 0 0`};
  display: flex;
  p {
    margin-bottom: 0;
    font-weight: ${(props) => props.theme.fontWeightBold};
  }
`;

const DraftBannerTitle = styled.div`
  flex: 0 0 50%;
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const DraftBannerInfo = styled.span`
  font-weight: ${(props) => props.theme.fontWeightBase};
`;

const DraftBannerDate = styled.div`
  flex: 0 0 50%;
  font-size: small;
  text-align: right;
`;

const ActionLogBanner = (props) => {
  const t = useTranslations();
  const { matchingVersion, updatedAt } = props;
  const { workflow: selectedWorkflowID, workflowStates, loading } = useWorkflowSelector();
  let info: string | null = null;
  const selectedWorkflow = workflowStates.find((state) => state.id === selectedWorkflowID);
  if (loading) {
    info = `${selectedWorkflow.description}: ${t('loading')}`;
  } else if (selectedWorkflowID !== matchingVersion?.id) {
    info = t('no-action-version-available', {
      versionType: selectedWorkflow.description,
    });
  }

  return (
    <DraftBanner>
      <DraftBannerTitle>
        {loading && <Spinner size="sm" className="me-3" />}
        {matchingVersion?.description}
        <DraftBannerInfo>{info && ` (${info})`} </DraftBannerInfo>
      </DraftBannerTitle>
      <DraftBannerDate>{dayjs(updatedAt).format('l')}</DraftBannerDate>
    </DraftBanner>
  );
};

export default ActionLogBanner;
