import React, { useContext } from 'react';
import { Card, CardBody, CardTitle, Badge } from 'reactstrap';
import styled from 'styled-components';
import { transparentize } from 'polished';
import PlanContext, { usePlan } from '@/context/plan';
import { useTheme } from 'styled-components';
import EmbedContext from '@/context/embed';
import { cleanActionStatus } from '@/common/preprocess';
import { ActionHighlightListAction } from './ActionHighlightsList';
import { getStatusColorForAction } from '@/common/ActionStatusSummary';
import { ActionLink } from '@/common/links';
import Icon from '@/components/common/Icon';
import ActionStatus from '@/components/actions/ActionStatus';

const StyledCard = styled(Card)`
  width: 100%;
  transition: all 0.5s ease;
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 4px 4px 8px
      ${(props) => transparentize(0.8, props.theme.themeColors.dark)};
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

const ImgArea = styled.div<{ $bgcolor?: string }>`
  min-height: 9rem;
  position: relative;
  background-color: ${(props) =>
    props.$bgcolor || props.theme.themeColors.light};
`;

const ImgBg = styled.div<{ $background: string }>`
  height: 9rem;
  background-image: url(${(props) => props.$background});
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
  padding: 0.5rem 1rem;
  border-radius: 1.75rem;

  &:after {
    content: '.';
  }
`;

type ActionHighlightCardProps = {
  action: ActionHighlightListAction;
  imageUrl?: string;
  hideIdentifier?: boolean;
};

// TODO: FIX typechecking

function ActionHighlightCard(props: ActionHighlightCardProps) {
  const { action, imageUrl, hideIdentifier } = props;
  const plan = usePlan();
  const embed = useContext(EmbedContext);
  const theme = useTheme();
  const actionStatus = cleanActionStatus(action, plan.actionStatuses);

  let statusText = actionStatus.name || null;
  const statusColor = getStatusColorForAction(action, plan, theme);

  // if Action is set in one of the phases, create message accordingly
  const { implementationPhase } = action;
  if (implementationPhase) {
    statusText = implementationPhase.name;
    if (actionStatus.name) statusText = `${statusText} (${actionStatus.name})`;
    // Let's assume if status is completed the phase is irrelevant
    if (actionStatus.identifier === 'completed') statusText = actionStatus.name;
  }

  let actionName = action.name;
  if (actionName.length > 120) actionName = `${action.name.substring(0, 120)}…`;
  return (
    <ActionLink action={action} prefetch={false}>
      <CardLink href target={embed.active ? '_blank' : undefined}>
        <StyledCard>
          <ImgArea $bgcolor={statusColor}>
            {imageUrl && <ImgBg $background={imageUrl} />}
            <ImgOverlay>
              {!hideIdentifier && (
                <ActionNumber>
                  <span>{action.identifier}</span>
                </ActionNumber>
              )}
            </ImgOverlay>
          </ImgArea>
          {statusText && (
            <StyledActionStatus
              statusSummary={action.statusSummary}
              completion={action.completion}
              text={statusText}
              plan={plan}
            />
          )}
          <CardBody>
            {actionStatus && actionStatus.identifier === 'completed' && (
              <ReadyBadge pill>
                <Icon.Check color="#ffffff" width="2em" height="2em" />
              </ReadyBadge>
            )}
            <StyledCardTitle tag="h3" className="card-title">
              {actionName}
            </StyledCardTitle>
          </CardBody>
        </StyledCard>
      </CardLink>
    </ActionLink>
  );
}

export default React.memo(ActionHighlightCard);
