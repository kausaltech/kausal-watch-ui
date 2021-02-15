import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from 'reactstrap';

import { useTranslation } from 'common/i18n';

const Banner = styled.div`
  padding: 8px 16px;
  text-align: right;
  font-family: -apple-system, -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif,
  helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif;
  font-size: 12px;
  background-color: black;
  color: silver;
`;

const Label = styled.strong`
  color: goldenrod;
  margin-right: .5em;

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
  }}
  }
`;

function ApplicationStateBanner(props) {
  const { instanceType } = props;
  const { t } = useTranslation();
  let typeLabel;
  let typeMessage;

  if (instanceType === 'production') return null;

  if (instanceType === 'testing') {
    typeLabel = t('instance-type-testing-label');
    typeMessage = t('instance-type-testing-message');
  } else {
    typeLabel = t('instance-type-development-label');
    typeMessage = t('instance-type-development-message');
  }

  return (
    <Banner>
      <Label type={instanceType}>{typeLabel.toUpperCase()}</Label>
      {` ${typeMessage}`}
    </Banner>
  );
}

ApplicationStateBanner.defaultProps = {
  instanceType: 'development',
};

ApplicationStateBanner.propTypes = {
  instanceType: PropTypes.oneOf(['production', 'testing', 'development']),
};

export default ApplicationStateBanner;
