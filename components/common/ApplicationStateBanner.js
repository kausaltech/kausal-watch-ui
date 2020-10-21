import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from 'reactstrap';

import { useTranslation } from 'common/i18n';

const Banner = styled.div`
  padding: .75rem 0;
  font-size: ${(props) => props.theme.fontSizeSm};
  background-color: ${(props) => props.theme.themeColors.dark};
  color: ${(props) => props.theme.themeColors.light};
`;

const Label = styled.strong`
  color: ${(props) => props.theme.themeColors.warning};
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
      <Container>
        <Label type={instanceType}>{typeLabel.toUpperCase()}</Label>
        {` ${typeMessage}`}
      </Container>
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
