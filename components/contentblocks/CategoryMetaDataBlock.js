import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RichText from 'components/common/RichText';
import ActionGroupStatus from 'components/actions/ActionGroupStatus';
import { useTranslation } from 'common/i18n';
import Icon from 'components/common/Icon';

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

const MetaContent = (props) => {
  const { contentData, contentType } = props;
  const { t } = useTranslation(['actions']);

  switch (contentData.__typename) {
    case 'CategoryMetadataChoice': {
      if (contentType) {
        const choiceCount = contentType.choices.length;
        return (
          <div>
            <span aria-hidden="true">
              { contentType.choices.map((choice) => (
                <ScaleIcon
                  name="circleFull"
                  className={choice.identifier <= contentData.valueIdentifier ? 'icon-on' : 'icon-off'}
                  size="md"
                  key={choice.identifier}
                />
              ))}
            </span>
            <span class="sr-only">
              { `${t('meta-level')} ${contentData.valueIdentifier}/${choiceCount}: ` }
            </span>
            <MetaChoiceLabel>
              { contentData.value }
            </MetaChoiceLabel>
          </div>
        );
      }
    }
    case 'CategoryMetadataRichText': {
      const rtContent = contentData.value;
      return (<RichText html={rtContent} />);
    }
    default: return <div />;
  }
};

const CategoryMetaDataBlock = (props) => {
  const {
    color,
    metadata,
    id,
    types,
  } = props;

  return (
    <MetaDataList>
      {metadata.map((item) => (
        <React.Fragment key={item.id}>
          <dt>{item.key}</dt>
          <dd>
            <MetaContent
              contentData={item}
              contentType={types?.find((type) => type.identifier === item.keyIdentifier)}
            />
          </dd>
        </React.Fragment>
      ))}
      <dt>Eteneminen</dt>
      <dd>
        <ActionGroupStatus category={id} />
      </dd>
    </MetaDataList>
  );
};

// TODO: prop types and defaults
CategoryMetaDataBlock.defaultProps = {

};

CategoryMetaDataBlock.propTypes = {

};

export default CategoryMetaDataBlock;
