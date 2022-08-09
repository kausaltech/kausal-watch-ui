import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody,
  CardTitle, Badge,
} from 'reactstrap';
import styled from 'styled-components';
import { transparentize } from 'polished';
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

    .card-title {
      text-decoration: underline;
    }
  }
`;

const ReadyBadge = styled(Badge)`
  position: absolute;
  top: 1em;
  left: 1em;
  background-color: ${(props) => props.theme.graphColors.green070} !important;
`;

const StyledCardTitle = styled(CardTitle)`
  font-size: ${(props) => props.theme.fontSizeMd};
  color: ${(props) => props.theme.neutralDark};
  text-align: left;
  hyphens: manual;
  margin-bottom: 0;
`;

const ImgArea = styled.div`
  position: relative;
  background-color: ${(props) => (props.theme.brandDark)};
`;

const ImgBg = styled.div`
  height: 9rem;
  background-image: url(${(props) => props.background});
  background-position: center;
  background-size: cover;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    height: 8rem;
  }
`;

const ImgOverlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 9rem;
  top: 0;
`;

const ActionNumber = styled.div`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizeXl};
  font-weight: ${(props) => props.theme.fontWeightBold};
  color: ${(props) => props.theme.themeColors.light};
  background: ${(props) => transparentize(0.1, props.theme.brandDark)};
  line-height: 1;
  padding: .5rem 1rem;
  border-radius: 1.75rem;

  &:after {
    content: ".";
  }
`;

function ActionHighlightCard(props) {
  const { action, imageUrl, hideIdentifier } = props;
  const plan = useContext(PlanContext);
  const actionStatus = cleanActionStatus(action, plan.actionStatuses);
  let actionName = action.name;
  if (actionName.length > 120) actionName = `${action.name.substring(0, 120)}…`;
  return (
    <ActionLink action={action} prefetch={false}>
      <CardLink href>
        <StyledCard>
          <ImgArea>
            { imageUrl && <ImgBg background={imageUrl} /> }
            <ImgOverlay>
              { !hideIdentifier && (
                <ActionNumber>
                  <span>
                    {action.identifier}
                  </span>
                </ActionNumber>
              )}
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
            <StyledCardTitle tag="h3" className="card-title">{actionName}</StyledCardTitle>
          </CardBody>
        </StyledCard>
      </CardLink>
    </ActionLink>
  );
}

ActionHighlightCard.defaultProps = {
  hideIdentifier: false,
  imageUrl: undefined,
};

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
  imageUrl: PropTypes.string,
  hideIdentifier: PropTypes.bool,
};

export default React.memo(ActionHighlightCard);
