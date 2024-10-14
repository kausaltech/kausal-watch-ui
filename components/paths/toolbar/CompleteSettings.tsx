import { useCallback } from 'react';

import { useTranslations } from 'next-intl';
import {
  Button,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledCollapse,
} from 'reactstrap';
import styled from 'styled-components';

import Icon from '@/components/common/Icon';
import GoalSelector from '@/components/paths/GoalSelector';
import RangeSelector from '@/components/paths/RangeSelector';
import ScenarioSelector from '@/components/paths/ScenarioSelector';
//import ScenarioBadge from 'components/paths/ScenarioBadge';
import GlobalParameters from '@/components/paths/toolbar/GlobalParameters';
import GoalOutcomeBar from '@/components/paths/toolbar/GoalOutcomeBar';
import { activeScenarioVar, yearRangeVar } from '@/context/paths/cache';
import { usePaths } from '@/context/paths/paths';
import { useReactiveVar } from '@apollo/client';

const SettingsHeader = styled.div`
  padding: 1rem 0;
  background-color: ${(props) => props.theme.graphColors.grey010};

  h2 {
    font-size: ${(props) => props.theme.fontSizeLg};
  }
`;

const SettingsContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem 0 6rem;
  background-color: ${(props) => props.theme.graphColors.grey020};
  overflow-y: scroll;
`;

const DisplaySettings = styled.div``;

const SettingsSection = styled.div`
  margin-bottom: 1rem;
`;

const Widget = styled.div`
  margin-bottom: 2rem;
`;

const AccordionHeader = styled(Button)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  border-radius: 0;
  //border-bottom: 2px solid ${(props) => props.theme.graphColors.grey050};
  border-top: none;
  border-left: none;
  border-right: none;
  background-color: ${(props) => props.theme.graphColors.grey000};
  color: ${(props) => props.theme.graphColors.grey090};
  //box-shadow: 0 0 4px 4px rgba(20,20,20,0.05);
  //border-top: 2px solid ${(props) => props.theme.graphColors.grey050};

  &:hover,
  &:active,
  &:focus {
    background-color: ${(props) => props.theme.graphColors.grey010} !important;
    color: ${(props) => props.theme.graphColors.grey090} !important;
  }
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.graphColors.grey000};
  padding: 1rem;
`;

const CompleteSettings = (props) => {
  const t = useTranslations();
  const paths = usePaths();
  const instance = useInstance();
  const activeScenario = useReactiveVar(activeScenarioVar);

  const hasGlobalParameters =
    site.parameters.find((param) => param.isCustomizable) !== undefined;
  const hasNormalizations = site.availableNormalizations.length > 0;

  // State of display settings
  // Year range
  const yearRange = useReactiveVar(yearRangeVar);
  const setYearRange = useCallback(
    (newRange: [number, number]) => {
      yearRangeVar(newRange);
    },
    [yearRangeVar]
  );

  // Target
  const nrGoals = instance.goals.length;

  // Normalization
  const availableNormalizations = site.availableNormalizations;
  return (
    <>
      <SettingsHeader>
        <Container fluid="lg">
          <h2>{t('all-settings')}</h2>
        </Container>
      </SettingsHeader>
      <SettingsContent>
        <Container fluid="lg">
          <SettingsSection>
            <AccordionHeader color="primary" id="display-toggler">
              <h4>{t('display')}</h4>
              <Icon name="angleDown" width="24px" height="24px" />
            </AccordionHeader>
            <UncontrolledCollapse toggler="#display-toggler" defaultOpen>
              <Card>
                <CardBody>
                  <DisplaySettings>
                    <Row>
                      <Col md="5">
                        <h5>{t('comparing-years')}</h5>
                        <RangeSelector
                          min={site.minYear}
                          max={site.maxYear}
                          defaultMin={yearRange[0]}
                          defaultMax={yearRange[1]}
                          referenceYear={
                            instance.referenceYear ?? site.referenceYear
                          }
                          handleChange={setYearRange}
                        />
                      </Col>
                      {hasNormalizations && (
                        <Col md="3">
                          <h5>{t('normalization')}</h5>
                          {/*
                          <NormalizationWidget
                            availableNormalizations={availableNormalizations}
                          />*/}
                          (coming soon)
                        </Col>
                      )}
                      {nrGoals > 1 && (
                        <Col md="4">
                          <h5>{t('target-climate')}</h5>
                          <GoalSelector />
                        </Col>
                      )}
                    </Row>
                  </DisplaySettings>
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </SettingsSection>
          <SettingsSection>
            <AccordionHeader color="primary" id="scenario-toggler">
              <h4>
                {t('scenario')}: {activeScenario.name}
              </h4>
              <Icon name="angleDown" width="24px" height="24px" />
            </AccordionHeader>
            <UncontrolledCollapse toggler="#scenario-toggler" defaultOpen>
              <Card>
                <CardBody>
                  <Widget>
                    <h5>{t('change-scenario')}</h5>
                    <ScenarioSelector />
                  </Widget>
                  <Widget>
                    <h5>{t('actions')}</h5>
                    {/*<ActionsSummary activeScenario={activeScenario} />*/}
                    (coming soon)
                  </Widget>
                  <Widget>
                    {hasGlobalParameters && (
                      <>
                        <h5>Global settings</h5>
                        <GlobalParameters parameters={site.parameters} />
                      </>
                    )}
                  </Widget>
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </SettingsSection>
          <SettingsSection>
            <GoalOutcomeBar />
          </SettingsSection>
        </Container>
      </SettingsContent>
    </>
  );
};

export default CompleteSettings;
