import React, { useState } from 'react';

import { useTranslations } from 'next-intl';
import { Button, Col, Collapse, Row } from 'reactstrap';
import styled from 'styled-components';

import dayjs from '@/common/dayjs';
import ActionAttribute from '@/components/common/ActionAttribute';
import Icon from '@/components/common/Icon';

const ReportSection = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s200};
  padding-bottom: ${(props) => props.theme.spaces.s050};
  border-top: 1px solid ${(props) => props.theme.graphColors.grey020};
  border-bottom: 1px solid ${(props) => props.theme.graphColors.grey020};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: ${(props) => props.theme.spaces.s050} 0;

  h2 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin: 0;
  }
`;

const FieldHeader = styled.div`
  font-size: ${(props) => props.theme.fontSizeBase};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const ReportName = styled.div``;

const ToggleButton = styled(Button)`
  padding: 0;
  margin: 0;
  color: ${(props) => props.theme.themeColors.dark};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &.open {
    color: ${(props) => props.theme.graphColors.grey050};
  }
`;

const ReportFieldComparison = styled.div`
  overflow-x: auto;
  padding: ${(props) => props.theme.spaces.s050} 0;
  margin-bottom: ${(props) => props.theme.spaces.s050};

  background-image:
    linear-gradient(to right, white, white), linear-gradient(to right, white, white),
    linear-gradient(to right, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0)),
    linear-gradient(to left, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0));
  background-position:
    left center,
    right center,
    left center,
    right center;
  background-repeat: no-repeat;
  background-color: white;
  background-size:
    20px 100%,
    20px 100%,
    10px 100%,
    10px 100%;
  background-attachment: local, local, scroll, scroll;
`;

const ReportField = styled.div`
  padding: ${(props) =>
    `${props.theme.spaces.s050} ${props.theme.spaces.s050} 0 ${props.theme.spaces.s050}`};
  margin-right: ${(props) => props.theme.spaces.s100};
  margin-bottom: ${(props) => props.theme.spaces.s100};
  border: 1px solid ${(props) => props.theme.graphColors.grey020};
`;

const ReportDate = styled.span`
  font-size: ${(props) => props.theme.fontSizeBase};
  color: ${(props) => props.theme.graphColors.grey060};
`;

const ReportComparisonBlock = (props) => {
  const { block, action } = props;
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { reportField, reportsToCompare } = block;
  // Augment each report with the field we're looking for
  // TODO: Right now we're only interested in attributes. Display report field values of other types as well.
  const reports = reportsToCompare.map((report) => ({
    ...report,
    attribute: report.valuesForAction?.filter(
      ({ field }) =>
        field.id === reportField && field.__typename === 'ActionAttributeTypeReportFieldBlock'
    )?.[0]?.attribute,
  }));
  reports.sort((a, b) => {
    if (a.endDate == null || b.endDate == null) {
      return 0;
    }
    return dayjs(a.endDate).diff(dayjs(b.endDate));
  });

  return (
    <ReportSection className="text-content">
      <Row>
        <Col>
          <SectionHeader>
            <h2>{block.reportType.name}</h2>
            {reports && reports.length > 0 && (
              <ToggleButton color="link" onClick={toggle} className={isOpen ? 'open' : ''}>
                {isOpen ? t('close') : t('open')}
                <Icon name={isOpen ? 'angle-down' : 'angle-right'} />
              </ToggleButton>
            )}
          </SectionHeader>
        </Col>
      </Row>
      {reports && reports.length > 0 ? (
        <Collapse isOpen={isOpen}>
          <ReportFieldComparison>
            {reports.map((report) => (
              <ReportField key={report.identifier}>
                <FieldHeader>
                  <ReportDate>
                    {`${t('report')}: `}
                    {dayjs(report.startDate).format('l')}
                    {` `}&ndash;{` `}
                    {dayjs(report.endDate).format('l')}
                  </ReportDate>
                  <ReportName>{report.name}</ReportName>
                </FieldHeader>
                {report.attribute ? (
                  <ActionAttribute
                    key={report.attribute.id}
                    attribute={report.attribute}
                    attributeType={undefined}
                    fontSize="fontSizeBase"
                  />
                ) : (
                  <div>{t('no-action-data-for-report')}</div>
                )}
              </ReportField>
            ))}
          </ReportFieldComparison>
        </Collapse>
      ) : (
        <div>{t('no-reports')}</div>
      )}
    </ReportSection>
  );
};

export default ReportComparisonBlock;
