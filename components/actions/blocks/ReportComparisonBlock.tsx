import dayjs from 'common/dayjs';

import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import { ActionSection, SectionHeader } from 'components/actions/ActionContent';
import RichText from 'components/common/RichText';
import { getActionTermContext, useTranslation } from 'common/i18n';
import ActionAttribute from 'components/common/ActionAttribute';

const FieldHeader = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  color: ${(props) => props.theme.graphColors.grey040};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const ReportName = styled.h3`
  font-size: ${(props) => props.theme.fontSizeBase};
`;

const ReportDate = styled.span`
  font-size: ${(props) => props.theme.fontSizeSm};
  color: ${(props) => props.theme.graphColors.grey040};
`;

const FieldName = styled.h3`
  font-size: ${(props) => props.theme.fontSizeBase};
`;


const ReportComparisonBlock = (props) => {
  const { plan, block, action } = props;
  const { t } = useTranslation();
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
  console.log('attributes', attributes);
  console.log('action', action);
  console.log('plan', plan);
  // TODO: Display attributes so that they can be nicely compared with each other.
  // They are not necessarily rich text. You may want to check attribute.__typename or attribute.type.format.
  return (
    <ActionSection className="text-content">
      <Row>
        <Col>
          <SectionHeader>Reports</SectionHeader>
        </Col>
      </Row>
      { attributes && attributes.map((attribute) => (
        <div key={attribute.id}>
          <FieldHeader>
            <ReportName>{attribute.type.report.name}</ReportName>
            <ReportDate>
              {attribute.type.report.startDate}
              &ndash;
              {attribute.type.report.endDate}
            </ReportDate>
          </FieldHeader>
          <ActionAttribute
            key={attribute.id}
            attribute={attribute}
            attributeType={undefined}
            />
        </div>
      ))}
    </ActionSection>
  );
};

export default ReportComparisonBlock;
