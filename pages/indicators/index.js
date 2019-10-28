import React from 'react';
import { withTranslation } from '../../common/i18n';
import Layout, { Meta } from '../../components/layout';
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
        <IndicatorList />
      </Layout>
    );
  }
}

IndicatorsPage.contextType = PlanContext;

export default withTranslation('common')(IndicatorsPage);
