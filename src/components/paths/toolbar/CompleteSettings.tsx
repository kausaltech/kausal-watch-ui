import { useCallback } from 'react';

import { useReactiveVar } from '@apollo/client';
import RangeSelector from 'components/paths/RangeSelector';
import { useTranslations } from 'next-intl';
import { Button, CardBody, Col, Container, Row, UncontrolledCollapse } from 'reactstrap';
import styled from 'styled-components';

import Icon from '@/components/common/Icon';
import GoalSelector from '@/components/paths/GoalSelector';
import ScenarioSelector from '@/components/paths/ScenarioSelector';
import GoalOutcomeBar from '@/components/paths/toolbar/GoalOutcomeBar';
import { activeScenarioVar, yearRangeVar } from '@/context/paths/cache';
import { usePaths } from '@/context/paths/paths';

import NormalizationWidget from '../NormalizationWidget';

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
  const instance = paths?.instance;
  const activeScenario = useReactiveVar(activeScenarioVar);

  const hasGlobalParameters = paths.parameters.find((param) => param.isCustomizable) !== undefined;
  const hasNormalizations = paths.availableNormalizations.length > 0;

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
  const availableNormalizations = paths.availableNormalizations;
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
              <Icon name="angle-down" width="24px" height="24px" />
            </AccordionHeader>
            <UncontrolledCollapse toggler="#display-toggler" defaultOpen>
              <Card>
                <CardBody>
                  <DisplaySettings>
                    <Row>
                      <Col md="5">
                        <h5>{t('comparing-years')}</h5>
                        <RangeSelector
                          min={instance.minimumHistoricalYear}
                          max={instance.modelEndYear}
                          referenceYear={instance.referenceYear}
                          defaultMin={yearRange[0]}
                          defaultMax={yearRange[1]}
                          handleChange={setYearRange}
                        />
                      </Col>
                      {hasNormalizations && (
                        <Col md="3">
                          <h5>{t('normalization')}</h5>
                          <NormalizationWidget availableNormalizations={availableNormalizations} />
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
                {t('scenario')}: {activeScenario?.name}
              </h4>
              <Icon name="angle-down" width="24px" height="24px" />
            </AccordionHeader>
            <UncontrolledCollapse toggler="#scenario-toggler" defaultOpen>
              <Card>
                <CardBody>
                  <Widget>
                    <h5>{t('change-scenario')}</h5>
                    <ScenarioSelector />
                  </Widget>
                  <Widget>
                    {hasGlobalParameters && (
                      <>
                        <h5>Global settings</h5>
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
