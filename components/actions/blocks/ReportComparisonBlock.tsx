import React, { useState } from 'react';
import dayjs from 'common/dayjs';

import styled from 'styled-components';
import { Row, Col, Button, Collapse } from 'reactstrap';
import { useTranslation } from 'common/i18n';
import ActionAttribute from 'components/common/ActionAttribute';
import Icon from 'components/common/Icon';


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
  font-size: ${(props) => props.theme.fontSizeSm};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const ReportName = styled.div`
`;

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
  display: flex;
  overflow-x: auto;
  padding: ${(props) => props.theme.spaces.s050} 0;
  margin-bottom: ${(props) => props.theme.spaces.s050};

  background-image: 
    linear-gradient(to right, white, white),
    linear-gradient(to right, white, white),
    linear-gradient(to right, rgba(0,0,0,.25), rgba(255,255,255,0)),
    linear-gradient(to left, rgba(0,0,0,.25), rgba(255,255,255,0));   
  background-position: left center, right center, left center, right center;
	background-repeat: no-repeat;
	background-color: white;
	background-size: 20px 100%, 20px 100%, 10px 100%, 10px 100%;
	background-attachment: local, local, scroll, scroll;
`;

const ReportField = styled.div`
  flex: 2 0 320px;
  padding: ${(props) => `${props.theme.spaces.s050} ${props.theme.spaces.s050} 0 ${props.theme.spaces.s050}`};
  margin-right: ${(props) => props.theme.spaces.s100};
  border: 1px solid ${(props) => props.theme.graphColors.grey020};
`;

const ReportDate = styled.span`
  font-size: ${(props) => props.theme.fontSizeSm};
  color: ${(props) => props.theme.graphColors.grey060};
`;

const ReportComparisonBlock = (props) => {
  const { block, action } = props;
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { reportField, reportsToCompare } = block;
  const reportIdentifiers = reportsToCompare.map(({ identifier }) => identifier);
  const attributes = (action.attributes
    .filter(({ type }) => reportIdentifiers.includes(type.report?.identifier) && type.reportField === reportField)
    .sort((a, b) => {
      const aDate = a?.type?.report?.startDate;
      const bDate = b?.type?.report?.startDate;
      if (aDate == null || bDate == null) {
        return 0;
      }
      return dayjs(aDate).diff(dayjs(bDate));
    })
  );

  return (
    <ReportSection className="text-content">
      <Row>
        <Col>
          <SectionHeader>
            <h2>{block.reportType.name}</h2>
            <ToggleButton
              color="link"
              onClick={toggle}
              className={isOpen ? 'open' : ''}
            >
              { isOpen ? t('close') : t('open') }
              <Icon name={isOpen ? 'angle-down' : 'angle-right'} />
            </ToggleButton>
          </SectionHeader>
        </Col>
      </Row>
      <Collapse isOpen={isOpen}>
        <ReportFieldComparison>
        { attributes && attributes.map((attribute) => (
          <ReportField key={attribute.id}>
            <FieldHeader>
              <ReportDate>
                { `${t('report')}: ` }
                { dayjs(attribute.type.report.startDate).format('l') }
                {` `}&ndash;{` `}
                { dayjs(attribute.type.report.endDate).format('l') }
              </ReportDate>
              <ReportName>{attribute.type.report.name}</ReportName>
            </FieldHeader>
            <ActionAttribute
              key={attribute.id}
              attribute={attribute}
              attributeType={undefined}
            />
          </ReportField>
        ))}
        </ReportFieldComparison>
      </Collapse>
    </ReportSection>
  );
};

export default ReportComparisonBlock;
