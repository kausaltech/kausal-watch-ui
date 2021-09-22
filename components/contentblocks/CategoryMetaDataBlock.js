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
    fill: ${(props) => props.theme.themeColors.danger} !important;
  }
`;

const MetaDataList = styled.dl`
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

const MetaChoiceLabel = styled.span`
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

const MetaContent = (props) => {
  const { contentData, contentType, title, color } = props;

  switch (contentData.__typename) {
    case 'CategoryMetadataChoice':
      if (contentType) {
        // const choiceCount = contentType.choices.length;
        return (
          <>
            <dt>{title}</dt>
            <dd>
              <div>
                { contentType.choices.map((choice) => (
                  <ScaleIcon
                    name="circleFull"
                    className={choice.identifier <= contentData.valueIdentifier ? 'icon-on' : 'icon-off'}
                    size="md"
                    key={choice.identifier}
                  />
                ))}
                <MetaChoiceLabel>{ contentData.value }</MetaChoiceLabel>
              </div>
            </dd>
          </>
        );
      }
      return null;
    case 'CategoryMetadataRichText':
      return (
        <>
          <dt>{title}</dt>
          <dd>
            <RichText html={contentData.value} />
          </dd>
        </>
      );
    case 'CategoryMetadataNumericValue':
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
};

const CategoryMetaDataBlock = (props) => {
  const plan = useContext(PlanContext);
  const {
    color,
    metadata,
    id,
    types,
  } = props;

  const plan = useContext(PlanContext);

  return (
    <MetaDataList>
      {metadata.map((item) => (
        <React.Fragment key={item.id}>
          <MetaContent
            title={item.key}
            contentData={item}
            contentType={types?.find((type) => type.identifier === item.keyIdentifier)}
            color={color}
          />
        </React.Fragment>
      ))}
      {plan.actionStatuses.length ? <ActionGroupStatus category={id} /> : null}
    </MetaDataList>
  );
};

// TODO: prop types and defaults
CategoryMetaDataBlock.defaultProps = {

};

CategoryMetaDataBlock.propTypes = {

};

export default CategoryMetaDataBlock;
