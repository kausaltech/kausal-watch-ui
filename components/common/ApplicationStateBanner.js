import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { usePlan } from 'context/plan';
import { useTranslation } from 'common/i18n';
import PlanVersionBanner from 'components/versioning/PlanVersionBanner';

const Banner = styled.div`
  padding: 8px 16px;
  text-align: right;
  font-family: -apple-system, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif,
    helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif;
  font-size: 12px;
  background-color: #000000;
  color: silver;
  @media print {
    display: none;
  }
`;

const Label = styled.strong`
  color: goldenrod;
  margin-right: 0.5em;

  &:before {
    margin-right: 1em;
    content: ${(props) => {
      switch (props.type) {
        case 'production':
          return '';
        case 'testing':
          return '"\\1F50D"'; /* magnifying emoji for test */
        default:
          return '"\\1F6A7"'; /* construction emoji for dev */
      }
    }};
  }
`;

function ApplicationStateBanner(props) {
  const { deploymentType } = props;
  const { t } = useTranslation();
  let typeLabel;
  let typeMessage;

  const plan = usePlan();

  // Only show superseding versions in production if they are published
  const supersedingVersions =
    deploymentType !== 'production'
      ? plan.supersedingPlans
      : plan.supersedingPlans.filter((p) => p.publishedAt);

  switch (deploymentType) {
    case 'production':
      return null;
    case 'testing':
      typeLabel = t('instance-type-testing-label');
      typeMessage = t('instance-type-testing-message');
      break;
    case 'staging':
      typeLabel = t('instance-type-staging-label');
      typeMessage = t('instance-type-staging-message');
      break;
    default:
      typeLabel = t('instance-type-development-label');
      typeMessage = t('instance-type-development-message');
  }

  return (
    <>
      <Banner>
        <Label type={deploymentType}>{typeLabel.toUpperCase()}</Label>
        {` ${typeMessage}`}
      </Banner>
      {supersedingVersions?.length > 0 && (
        <PlanVersionBanner
          currentVersion={plan}
          latestVersion={supersedingVersions[supersedingVersions.length - 1]}
        />
      )}
    </>
  );
}

ApplicationStateBanner.defaultProps = {
  deploymentType: 'development',
};

ApplicationStateBanner.propTypes = {
  deploymentType: PropTypes.oneOf([
    'production',
    'testing',
    'staging',
    'development',
  ]),
};

export default ApplicationStateBanner;
