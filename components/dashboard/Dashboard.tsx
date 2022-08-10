/* eslint-disable max-classes-per-file */
/*
*
* Legacy page for City of Helsinki, not used in Kausal Watch platform
*
*
*/
import React from 'react';
import PropTypes from "prop-types";
import { gql, useQuery } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import {
  Container, Row, Col, TabContent, TabPane,
} from 'reactstrap';
import styled from 'styled-components';
import { captureException } from 'common/sentry';
import { getActionTermContext, useTranslation, withTranslation } from 'common/i18n';
import RichText from 'components/common/RichText';
import ContentLoader from 'components/common/ContentLoader';
import { usePlan } from 'context/plan';
import ImpactGroupActionList from './ImpactGroupActionList';

import Bar from './Bar';
import { useRouter } from 'next/router';
import { TFunction } from 'next-i18next';

const IMPACT_GROUP_MIN_WEIGHT = 1;
const IMPACT_GROUP_OTHERS_ID = '_others';

const DashboardSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
`;

const DashboardHeader = styled.div`
  padding-top: ${(props) => props.theme.spaces.s300};
  margin-bottom: ${(props) => props.theme.spaces.s100};
  background-color: ${(props) => props.theme.neutralLight};

  h1 {
    font-size: ${(props) => props.theme.fontSizeXl};
    margin-bottom: ${(props) => props.theme.spaces.s150};

    @media (min-width: ${(props) => props.theme.breakpointMd}) {
      font-size: ${(props) => props.theme.fontSizeXxl};
    }
  }
`;

const ImpactGroupSection = styled.div`
  padding-top: ${(props) => props.theme.spaces.s200};
  padding-bottom: ${(props) => props.theme.spaces.s200};
`;

export const GET_IMPACT_GROUP_LIST = gql`
  query ImpactGroupList($plan: ID!) {
    plan(id: $plan) {
      id
      impactGroups {
        id
        identifier
        name
        weight
        color
        actions {
          action {
            id
            identifier
            name
            mergedWith {
              id
            }
            status {
              id
              identifier
              name
            }
            implementationPhase {
              id
              identifier
              name
            }
          }
          impact {
            id
          }
        }
      }
    }
  }
`;

const DashboardTab = ({ t, segment }) => {
  const plan = usePlan();
  let content;
  if (segment.actions.length) {
    content = (
      <ImpactGroupActionList
        t={t}
        actions={segment.actions}
      />
    );
  } else {
    content = (
      <div className="mb-5 pd-5">{t('impact-group-no-actions', getActionTermContext(plan))}</div>
    );
  }

  return (
    <TabPane
      tabId={segment.id}
      role="tabpanel"
      id={`tab-${segment.id}`}
      aria-labelledby={`segment-${segment.id}`}
    >
      <h2 className="mb-3">{ segment.name }</h2>
      {content}
    </TabPane>
  );
};

type DashboardLoadedProps = {
  t: TFunction,
  leadContent: string,
  filters: {
    group: string,
  },
  segments: any[],
  onFilterChange: Function,
};

class DashboardLoaded extends React.PureComponent<DashboardLoadedProps> {
  static getFiltersFromQuery(query) {
    const {
      group,
    } = query;
    return {
      group,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      activeTabId: props.filters.group,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(segment) {
    this.setState({
      activeTabId: segment.id,
    });

    // @ts-ignore Update query string of URL
    this.props.onFilterChange({ group: segment.id });
  }

  render() {
    // @ts-ignore
    const { t, filters, leadContent, segments } = this.props;
    // @ts-ignore by default show the first segment
    const activeTabId = this.state.activeTabId || (segments.length ? segments[0].id : undefined);

    return (
      <div id="dashboard">
        <DashboardHeader>
          <Container>
            <h1>{ t('dashboard') }</h1>
            {leadContent && (
              <Row>
                <Col sm="12" md="12" className="mb-5">
                  <RichText html={leadContent} />
                </Col>
              </Row>
            )}
          </Container>
        </DashboardHeader>
        <ImpactGroupSection>
          <Container>
            <Bar
              segments={segments}
              active={activeTabId}
              onSelect={this.handleSelect}
            />
            <TabContent activeTab={activeTabId}>
              {segments.map((segment) => (
                <DashboardTab
                  key={segment.id}
                  t={t}
                  segment={segment}
                />
              ))}
            </TabContent>
          </Container>
        </ImpactGroupSection>
      </div>
    );
  }
}

export default function Dashboard(props) {
  const { onFilterChange } = props;
  const plan = usePlan();
  const { query } = useRouter();
  const { t } = useTranslation(['actions', 'common']);
  const filters = DashboardLoaded.getFiltersFromQuery(query)

  const makeSegments = (impactGroups) => {
    const segments = [];
    const others = {
      id: IMPACT_GROUP_OTHERS_ID,
      name: t('common:impact-group-others'),
      value: 0,
      groups: [],
    };

    impactGroups.forEach((grp) => {
      if (grp.weight > IMPACT_GROUP_MIN_WEIGHT) {
        segments.push({
          id: grp.identifier,
          name: grp.name,
          value: grp.weight,
          color: grp.color,
          groups: [grp],
        });
      } else {
        others.groups.push(grp);
        others.value += grp.weight;
      }
    });
    segments.push(others);

    // add actions to each segment
    const impacts = Object.fromEntries(plan.actionImpacts.map((x) => [x.id, x]));

    segments.forEach((segment) => {
      // Merge actions from all ImpactGroups
      const actions = [];
      const actionExists = (actId) => actions.find((act) => act.action.id === actId) !== undefined;
      segment.groups.forEach((grp) => {
        grp.actions.forEach((item) => {
          // do not add merged actions or duplicates
          if (item.action.mergedWith === null && !actionExists(item.action.id)) {
            actions.push(item);
          }
        });
      });
      actions.sort((a, b) => impacts[b.impact.id].order - impacts[a.impact.id].order);

      segment.actions = actions;
    });

    return segments;
  }
  const { data, loading, error } = useQuery(GET_IMPACT_GROUP_LIST, {
    variables: { plan: plan.identifier },
  })
  if (loading) return <ContentLoader />;
  if (error) {
    captureException(error);
    return <p>{ t('error-loading-actions', getActionTermContext(plan)) }</p>;
  }

  const leadContent = '<p>Olemme selvitt&auml;neet, kuinka paljon&nbsp;eri toimenpiteill&auml; olisi mahdollista saada&nbsp;p&auml;&auml;st&ouml;v&auml;hennyksi&auml; vuoteen 2035 menness&auml;. Toimenpiteet on useimmiten niputettu yhteen, koska yksitt&auml;isen toimenpiteen p&auml;&auml;st&ouml;v&auml;hennysvaikutusta on vaikea arvioida tarkasti ja monet toimenpiteist&auml; tukevat toisiaan. Suurimmat p&auml;&auml;st&ouml;v&auml;hennykset voidaan saada kaukol&auml;mm&ouml;ntuotannon puhdistumisesta (Helenin toimet), v&auml;hent&auml;m&auml;ll&auml; rakennusten l&auml;mm&ouml;nkulutusta, lis&auml;&auml;m&auml;ll&auml; maal&auml;mm&ouml;n tuotantoa&nbsp;ja tuottamalla enemm&auml;n s&auml;hk&ouml;&auml; aurinkopaneeleilla. P&auml;&auml;st&ouml;tavoitteen saavuttamisessa&nbsp;my&ouml;s s&auml;hk&ouml;autojen osuuden kasvattamisella on huomattava merkitys. On t&auml;rke&auml;&auml;, ett&auml; kaikki toimenpiteet toteutetaan,&nbsp;jotta tavoitteeseen p&auml;&auml;st&auml;&auml;n. P&auml;&auml;st&ouml;v&auml;hennysarvioon olemme laskeneet mukaan vain ne toimet, jotka v&auml;hent&auml;v&auml;t Helsingin v&auml;litt&ouml;mi&auml; p&auml;&auml;st&ouml;j&auml;&nbsp;ja jotka lasketaan 80 prosentin p&auml;&auml;st&ouml;v&auml;hennystavoitteeseen mukaan. Siin&auml; ei siis ole mukana toimenpiteit&auml;, jotka v&auml;hent&auml;v&auml;t v&auml;lillisi&auml; p&auml;&auml;st&ouml;j&auml;.&nbsp;</p>\r\n\r\n<p><em>T&auml;ll&auml; sivulla esitetty arvio&nbsp;p&auml;&auml;st&ouml;v&auml;hennyksist&auml; perustuu vuoden 2015 l&auml;ht&ouml;tietoihin. Arviota ei ole viel&auml; p&auml;ivitetty vastaamaan uusimpia saatavilla olevia tietoja. Tieto toimenpiteiden etenemisest&auml; puolestaan perustuu toimenpiteiden yhteyshenkil&ouml;iden tekem&auml;&auml;n seurantaan (katso p&auml;ivitysajankohta&nbsp;kunkin toimenpiteen omalta sivulta).</em></p>';
  const segments = makeSegments(data.plan.impactGroups);

  return (
    <DashboardLoaded
      t={t}
      leadContent={leadContent}
      filters={filters}
      onFilterChange={onFilterChange}
      segments={segments}
    />
  );
}
Dashboard.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};
