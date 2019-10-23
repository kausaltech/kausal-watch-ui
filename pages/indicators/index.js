import React from 'react';
import { Container } from 'reactstrap';
import { withTranslation } from '../../common/i18n';
import Layout, { Meta } from '../../components/layout';
import IndicatorsHero from '../../components/indicators/IndicatorsHero';
import IndicatorList from '../../components/indicators/IndicatorList';

import PlanContext from '../../context/plan';


class IndicatorsPage extends React.Component {
  static async getInitialProps() {
    const ret = {
      namespacesRequired: ['common'],
    };
    return ret;
  }

  render() {
    const { t } = this.props;
    return (
      <Layout>
        <Meta title={t('indicators')} />
        <IndicatorsHero />
        <Container>
          <IndicatorList />
        </Container>
      </Layout>
    );
  }
}

IndicatorsPage.contextType = PlanContext;

export default withTranslation('common')(IndicatorsPage);
