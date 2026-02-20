import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';

import type { DeploymentType } from '@common/env';

import { AnnouncementBannerWithRichTextMessage } from '@/components/common/AnnouncementBanner';
import PlanVersionBanner from '@/components/versioning/PlanVersionBanner';
import { usePlan } from '@/context/plan';

const Banner = styled.div`
  padding: 8px 16px;
  text-align: right;
  font-family:
    -apple-system,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif,
    helvetica neue,
    helvetica,
    Ubuntu,
    roboto,
    noto,
    segoe ui,
    arial,
    sans-serif;
  font-size: 12px;
  background-color: #000000;
  color: silver;
  @media print {
    display: none;
  }
`;

const Label = styled.strong<{ type: DeploymentType }>`
  color: goldenrod;
  margin-right: 0.5em;

  &:before {
    margin-right: 1em;
    content: ${(props) => {
      switch (props.type) {
        case 'production':
        case 'staging':
          return '';
        case 'testing':
        case 'preview':
          return '"🔍"';
        case 'ci':
          return '"🤖"';
        case 'wip':
          return '"🚧"';
        default:
          return '"🚧"'; /* construction emoji for dev */
      }
    }};
  }
`;

function ApplicationStateBanner(props: { deploymentType: DeploymentType }) {
  const { deploymentType = 'development' } = props;
  const t = useTranslations();

  let typeLabel: string | null = null;
  let typeMessage: string | null = null;

  const plan = usePlan();

  // Only show superseding versions in production if they are published
  let supersedingVersions = plan.supersedingPlans;
  if (deploymentType === 'production') {
    supersedingVersions = supersedingVersions.filter((p) => p.publishedAt);
  }

  switch (deploymentType) {
    case 'production':
      typeLabel = null;
      break;
    case 'testing':
      typeLabel = t('instance-type-testing-label');
      typeMessage = t('instance-type-testing-message');
      break;
    case 'preview':
      typeLabel = t('instance-type-preview-label');
      typeMessage = t('instance-type-preview-message');
      break;
    case 'staging':
      typeLabel = t('instance-type-staging-label');
      typeMessage = t('instance-type-staging-message');
      break;
    default:
      typeLabel = t('instance-type-development-label');
      typeMessage = t('instance-type-development-message');
  }
  const banner =
    typeLabel != null ? (
      <Banner>
        <Label type={deploymentType}>{typeLabel.toUpperCase()}</Label>
        {` ${typeMessage}`}
      </Banner>
    ) : null;

  return (
    <>
      {banner}
      {supersedingVersions?.length > 0 && (
        <PlanVersionBanner
          currentVersion={plan}
          latestVersion={supersedingVersions[supersedingVersions.length - 1]}
        />
      )}
      {plan.generalContent.sitewideAnnouncement && (
        <AnnouncementBannerWithRichTextMessage message={plan.generalContent.sitewideAnnouncement} />
      )}
    </>
  );
}

export default ApplicationStateBanner;
