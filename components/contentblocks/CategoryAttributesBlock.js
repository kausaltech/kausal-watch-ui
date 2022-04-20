import React, { useContext } from 'react';
import styled from 'styled-components';

import RichText from 'components/common/RichText';
import PlanContext from 'context/plan';
import ActionGroupStatus from 'components/actions/ActionGroupStatus';
import Icon from 'components/common/Icon';
import CategoryMetaBar from '../actions/CategoryMetaBar';

const ScaleIcon = styled(Icon)`
  font-size: ${(props) => {
    switch (props.size) {
      case 'sm': return '.8em';
      case 'md': return '1.5em';
      default: return '1.5em';
    }
  }};

  &.icon-on {
    fill: ${(props) => props.theme.brandDark} !important;
  }

  &.icon-off {
    fill: ${(props) => props.theme.themeColors.light} !important;
  }

  &.icon-bad {
    fill: ${(props) => props.theme.graphColors.red070} !important;
  }
`;

const AttributesList = styled.dl`
  display: flex;
  flex-flow: row wrap;
  max-width: 720px;
  margin: ${(props) => props.theme.spaces.s200} auto 0;

  dt {
    flex: 0 0 100%;
    text-align: center;
    margin-bottom: .5rem;
  }

  dd {
    flex: 0 1 100%;
    margin-bottom: 1rem;
    text-align: center;

    .text-content {
      text-align: left;
    }
    .text-content > *:last-child {
      margin-bottom: 0;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    margin: ${(props) => props.theme.spaces.s400} auto 0;

    dt {
      flex: 0 0 30%;
      text-align: right;
    }

    dd {
      flex: 0 1 60%;
      text-align: left;
      padding-left: ${(props) => props.theme.spaces.s150};
    }
  }
`;

const AttributeChoiceLabel = styled.span`
  margin-left: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeSm};
`;

const formatEmissionSharePercent = (share, total) => {
  const label = 'av totala utsläppen';
  if (!share) return null;
  const percent = share / total * 100;
  if (percent < 1) return `< 1 % ${label}`;
  return `${Math.round(percent)} % ${label}`;
};

function AttributeContent(props) {
  const { contentData, contentType, title, color } = props;

  switch (contentData.__typename) {
    case 'AttributeChoice':
      if (contentType) {
        // const choiceCount = contentType.choiceOptions.length;
        return (
          <>
            <dt>{title}</dt>
            <dd>
              <div>
                { contentType.choiceOptions.map((choice) => (
                  <ScaleIcon
                    name="circleFull"
                    className={choice.identifier <= contentData.valueIdentifier ? 'icon-on' : 'icon-off'}
                    size="md"
                    key={choice.identifier}
                  />
                ))}
                <AttributeChoiceLabel>{ contentData.value }</AttributeChoiceLabel>
              </div>
            </dd>
          </>
        );
      }
      return null;
    case 'AttributeRichText':
      return (
        <>
          <dt>{title}</dt>
          <dd>
            <RichText html={contentData.value} />
          </dd>
        </>
      );
    case 'AttributeNumericValue':
      // KPR specific hack
      if (contentData.keyIdentifier === 'impact') {
        const totalEmissions = 50.921;
        const segments = [{
          id: 'emissions',
          label: '',
          value: formatEmissionSharePercent(contentData.numericValue, totalEmissions),
          portion: contentData.numericValue / totalEmissions,
          color,
        }];
        return <CategoryMetaBar segments={segments} title={contentData.key} />;
      }
      return null;
    default: return <div />;
  }
}

function CategoryAttributesBlock(props) {
  const plan = useContext(PlanContext);
  const {
    color,
    attributes,
    id,
    types,
  } = props;

  return (
    <AttributesList>
      {attributes.map((item) => (
        <React.Fragment key={item.id}>
          <AttributeContent
            title={item.key}
            contentData={item}
            contentType={types?.find((type) => type.identifier === item.keyIdentifier)}
            color={color}
          />
        </React.Fragment>
      ))}
      {plan.actionStatuses.length ? <ActionGroupStatus category={id} /> : null}
    </AttributesList>
  );
}

// TODO: prop types and defaults
CategoryAttributesBlock.defaultProps = {

};

CategoryAttributesBlock.propTypes = {

};

export default CategoryAttributesBlock;
