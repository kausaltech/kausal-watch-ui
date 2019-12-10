import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
} from 'reactstrap';

import styled from 'styled-components';
import { withTranslation } from '../common/i18n';

import Layout from '../components/layout';
import ActionHighlightsList from '../components/actions/ActionHighlightsList';
import IndicatorHighlightsList from '../components/indicators/IndicatorHighlightsList';
import HnhHero from '../components/HnhHero';
import FrontHero from '../components/FrontHero';
import ThlHero from '../components/ThlHero';
import PlanContext from '../context/plan';


const ActionsSection = styled.div`
  background-color: ${(props) => props.theme.brandLight};
  position: relative;
  padding: 8rem 0 4rem;
  
  .container {
    text-align: center;
  }
`;

const IndicatorsSection = styled.div`
  background-color: ${(props) => props.theme.themeColors.white};
  color: ${(props) => props.theme.brandDark};
  position: relative;
  padding: 7rem 0;
  
  .container {
    text-align: center;
  }
`;

class HomePage extends React.Component {
  static contextType = PlanContext;

  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;
    const plan = this.context;
    let { planIntroText } = "";

    if (plan.identifier === 'hnh2035') {
      planIntroText= "Helsinki on sitoutunut kantamaan vastuunsa ilmastonmuutoksen hillinnässä. Helsingin kaupunkistrategiassa 2017–2021 tavoitteeksi on asetettu hiilineutraali Helsinki vuoteen 2035 mennessä. Ilmastotavoitteet koskevat kaupunkiorganisaation lisäksi kaupunkilaisia ja Helsingissä toimivia organisaatioita. Helsingistä saadaan  hiilineutraali yhteistyöllä. Hiilineutraali Helsinki 2035 –toimenpideohjelma on esitys siitä, miten päästövähennykset käytännössä saavutetaan."
    }

    if (plan.identifier === 'ktstrat') {
      planIntroText= "THL:n tehtävänä on tuottaa tietoa päätöksenteon tueksi ja kansanterveyden parantamiseksi. THL päivittää osaamistaan jatkuvasti ja pyrkii varmistamaan, että oikeita asioita tehdään sekä talon sisällä että yhteiskunnassa yleisesti. Tällä sivustolla kokeillaan ajatusta, että kansanterveysstrategian sisältöä mietittäisiin avoimen verkkotyökalun avulla. Tarkoituksena on tunnistaa tarpeellisia toimenpiteitä, joilla THL voisi edistää kansanterveyttä. Lisäksi mietitään mittareita, joiden avulla toimenpiteiden toteutusta ja vaikutuksia voidaan seurata ja ohjata."
    }

    let heroComponent = <FrontHero bgImage={plan.imageUrl} heroText={plan.name} />;

    if (plan.theme === 'hnh2035') heroComponent = <HnhHero />;
    if (plan.theme === 'ktstrat') heroComponent = <ThlHero />;

    return (
      <Layout>
        { heroComponent }
        <ActionsSection className="actions-section">
          <Container>
            <ActionHighlightsList plan={plan} />
          </Container>
        </ActionsSection>
        <IndicatorsSection className="indicators-section">
          <Container>
            <IndicatorHighlightsList plan={plan} />
          </Container>
        </IndicatorsSection>
      </Layout>
    );
  }
}


HomePage.propTypes = {
  t: PropTypes.func.isRequired,
};
HomePage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(HomePage);
