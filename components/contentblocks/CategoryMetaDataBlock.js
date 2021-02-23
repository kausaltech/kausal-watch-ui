import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
      text-align: left;
      text-align: right;
    }

    dd {
      flex: 0 1 60%;
      text-align: left;
      padding-left: ${(props) => props.theme.spaces.s150};
    }
  }
`;

const MetaContent = (props) => {
  const { contentData } = props;

  switch (contentData.__typename) {
    case 'CategoryMetadataChoice': {
      return (
        <div>
          <ScaleIcon name="circleFull" className="icon-on" size="md" />
          <ScaleIcon name="circleFull" className="icon-on" size="md" />
          <ScaleIcon name="circleFull" className="icon-on" size="md" />
          <ScaleIcon name="circleFull" className="icon-off" size="md" />
          <ScaleIcon name="circleFull" className="icon-off" size="md" />
        </div>
      );
    }
    case 'CategoryMetadataRichText': {
      const rtContent = contentData.value;
      return (<div className="text-content" dangerouslySetInnerHTML={{ __html: rtContent }} />);
    }
    default: return <div />;
  }
};

const CategoryMeta = (props) => {
  const { metadata } = props;

  return (
    <MetaDataList>
      {metadata.map((item) => (
        <React.Fragment key={item.id}>
          <dt>{item.key}</dt>
          <dd><MetaContent contentData={item} /></dd>
        </React.Fragment>
      ))}
    </MetaDataList>
  );
};

const CategoryMetaDataBlock = (props) => {
  const {
    color,
    metadata,
  } = props;

  return (
    <MetaDataList>
      {metadata.map((item) => (
        <React.Fragment key={item.id}>
          <dt>{item.key}</dt>
          <dd><MetaContent contentData={item} /></dd>
        </React.Fragment>
      ))}
    </MetaDataList>
  );
};

CategoryMetaDataBlock.defaultProps = {

};

CategoryMetaDataBlock.propTypes = {

};

export default CategoryMetaDataBlock;
