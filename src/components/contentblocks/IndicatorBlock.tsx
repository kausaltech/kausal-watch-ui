import styled from '@emotion/styled';

import { Col, Container, Row } from 'reactstrap';

import IndicatorVisualisation from '@/components/indicators/IndicatorVisualisation';

const IndicatorGraphSection = styled.div`
  background-color: ${(props) => props.theme.themeColors.light};
  padding: ${(props) => props.theme.spaces.s300};
`;

type IndicatorBlockProps = {
  indicator: { id: string };
};

const IndicatorBlock = (props: IndicatorBlockProps) => {
  const { indicator } = props;
  return (
    <IndicatorGraphSection>
      <Container>
        <Row>
          <Col>
            <h2>{indicator.id}</h2>
            <IndicatorVisualisation indicatorId={indicator.id} />
          </Col>
        </Row>
      </Container>
    </IndicatorGraphSection>
  );
};

export default IndicatorBlock;
