import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from 'reactstrap';

import { withTranslation } from '../../common/i18n';


const Banner = styled.div`
  padding: 1.5em 0;
  font-size: 80%;
  background-color: ${(props) => props.theme.themeColors.black};
  color: ${(props) => props.theme.themeColors.light};
`;

const Label = styled.strong`
  color: ${(props) => props.theme.brandLight};
  margin-right: .5em;
`;

function ApplicationStateBanner(props) {
  const { instanceType, t } = props;
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
        <Label>{typeLabel.toUpperCase()}</Label>
        {` ${typeMessage}`}
      </Container>
    </Banner>
  );
}

ApplicationStateBanner.propTypes = {
  instanceType: PropTypes.oneOf(['production', 'testing', 'development']).isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(ApplicationStateBanner);
