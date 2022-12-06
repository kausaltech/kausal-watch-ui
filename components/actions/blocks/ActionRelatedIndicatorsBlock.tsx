import styled from 'styled-components';
import {
  Row, Col,
} from 'reactstrap';

import { getActionTermContext, useTranslation } from 'common/i18n';
import { ActionSection, SectionHeader } from 'components/actions/ActionContent';

import ActionIndicators from 'components/actions/ActionIndicators';

const RelatedActionList = styled(Row)`
  padding-left: 0;
`;

const RelatedActionItem = styled(Col)`
  list-style: none;
`;

const ActionRelatedIndicatorsBlock = (props) => {
  const { indicators, actionId } = props;
  const { t } = useTranslation();

  return (
    <div>
    <Row>
      <Col>
        <SectionHeader>{ t('indicators') }</SectionHeader>
      </Col>
    </Row>
    <Row>
      <Col sm="12">
        <ActionIndicators
          actionId={actionId}
          relatedIndicators={indicators}
        />
      </Col>
    </Row>
  </div>
  )
}

export default ActionRelatedIndicatorsBlock;
