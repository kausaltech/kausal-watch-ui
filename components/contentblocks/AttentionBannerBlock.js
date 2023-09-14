import React, { useContext } from 'react';
import { Container, UncontrolledAlert } from 'reactstrap';
import styled from 'styled-components';
import PlanContext from 'context/plan';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

const AttentionBanner = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  position: relative;
  display: flex;

  .container {
    text-align: center;
  }
`;

const AttentionBox = styled(UncontrolledAlert)`
  background-color: ${(props) => props.theme.themeColors.white};
  margin: ${(props) => props.theme.spaces.s100} auto;
  padding: ${(props) => props.theme.spaces.s150}
    ${(props) => props.theme.spaces.s200} ${(props) => props.theme.spaces.s050};
  max-width: 850px;
  border: none;

  h1 {
    font-size: ${(props) => props.theme.fontSizeMd};
  }

  .btn {
    margin: ${(props) => props.theme.spaces.s100}
      ${(props) => props.theme.spaces.s050};
  }

  .close {
    font-size: 2rem;
  }
`;

const AttentionBannerBlock = (props) => {
  const { header, content, buttons } = props;

  const plan = useContext(PlanContext);

  return (
    <AttentionBanner className="actions">
      <Container>
        <AttentionBox color="dark">
          <h1>{header}</h1>
          <p dangerouslySetInnerHTML={{ __html: content }} />
          {buttons.map((button) => (
            <Button key={button.id} href={button.url} color="primary" outline>
              {button.label}
              <Icon name="arrowRight" color="" />
            </Button>
          ))}
        </AttentionBox>
      </Container>
    </AttentionBanner>
  );
};

export default AttentionBannerBlock;
