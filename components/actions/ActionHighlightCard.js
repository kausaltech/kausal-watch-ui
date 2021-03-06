import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody,
  CardTitle, Badge,
} from 'reactstrap';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { Spring } from 'react-spring/renderprops.cjs';
import PlanContext from 'context/plan';
import { cleanActionStatus } from 'common/preprocess';
import { ActionLink } from 'common/links';
import Icon from 'components/common/Icon';
import ActionStatus from 'components/actions/ActionStatus';

const StyledCard = styled(Card)`
  width: 100%;
  transition: all 0.5s ease;
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 4px 4px 8px ${(props) => transparentize(0.8, props.theme.themeColors.dark)};
  }
`;

const StyledActionStatus = styled(ActionStatus)`
  border-bottom: 1px solid ${(props) => props.theme.themeColors.light};
`;

const CardLink = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.neutralDark};
  width: 100%;

  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.neutralDark};
  }
`;

const ReadyBadge = styled(Badge)`
  position: absolute;
  top: 1em;
  left: 1em;
  background-color: ${(props) => props.theme.themeColors.success};
`;

const StyledCardTitle = styled(CardTitle)`
  font-size: ${(props) => props.theme.fontSizeMd};
  color: ${(props) => props.theme.neutralDark};
  text-align: left;
  hyphens: auto;
  margin-bottom: 0;
`;

const ImgArea = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.imageOverlay};
`;

const ImgBg = styled.div`
  height: 9rem;
  background-image: url(${(props) => props.background});
  background-position: center;
  background-size: cover;
  mix-blend-mode: multiply;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    height: 8rem;
  }
`;

const ImgOverlay = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
`;

const ActionNumber = styled.div`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizeXxl};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: 9rem;
  color: ${(props) => props.theme.themeColors.light};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    line-height: 8rem;
  }
`;

function ActionHighlightCard(props) {
  const { action, imageUrl } = props;
  const plan = useContext(PlanContext);
  const actionStatus = cleanActionStatus(action, plan.actionStatuses);
  let actionName = action.name;
  if (actionName.length > 120) actionName = `${action.name.substring(0, 120)}…`;
  return (
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
    >
      {(springProps) => (
        <ActionLink action={action} prefetch={false}>
          <CardLink href>
            <StyledCard style={springProps}>
              <ImgArea>
                <ImgBg background={imageUrl} />
                <ImgOverlay>
                  <ActionNumber>{action.identifier}</ActionNumber>
                </ImgOverlay>
              </ImgArea>
              {actionStatus && (
                <StyledActionStatus
                  name={actionStatus.name}
                  identifier={actionStatus.identifier}
                  completion={action.completion}
                />
              )}
              <CardBody>
                { actionStatus && actionStatus.identifier === 'completed'
                  && (
                    <ReadyBadge pill>
                      <Icon name="check" color="#ffffff" width="2em" height="2em" />
                    </ReadyBadge>
                  )}
                <StyledCardTitle tag="h3">{actionName}</StyledCardTitle>
              </CardBody>
            </StyledCard>
          </CardLink>
        </ActionLink>
      )}
    </Spring>
  );
}

ActionHighlightCard.propTypes = {
  action: PropTypes.shape({
    identifier: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.shape({
      name: PropTypes.string,
      identifier: PropTypes.string,
    }),
    completion: PropTypes.number,
  }).isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default ActionHighlightCard;
