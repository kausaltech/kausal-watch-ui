import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { DynamicLink } from 'common/links';
import CategoryMetaDataBlock from './CategoryMetaDataBlock';

const HeaderBackground = styled.div`
  position: relative;
  min-height: 24rem;
  background-color: ${(props) => props.bg};
`;

const CategoryPageHeader = styled.div`
  position: absolute;
  height: 24rem;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${(props) => props.bg};
  padding: ${(props) => props.theme.spaces.s200} ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.bg};
  background-image: url(${(props) => props.image});
  background-position: ${(props) => props.imageAlign};
  background-size: cover;
  background-blend-mode: multiply;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    padding: ${(props) => props.theme.spaces.s400} ${(props) => props.theme.spaces.s050};
  }
`;

const Identifier = styled.span`
  color: ${(props) => props.theme.graphColors.grey050};
`;

const HeaderContent = styled.div`
  padding: ${(props) => props.theme.spaces.s150};
  margin: ${(props) => props.theme.spaces.s400} 0 ${(props) => props.theme.spaces.s400};
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};
  text-align: center;

  h1 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s200};
  }

  p {
    font-size: ${(props) => props.theme.fontSizeMd};
    margin-bottom: 0;
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    padding: ${(props) => props.theme.spaces.s300};
    h1 {
      font-size: ${(props) => props.theme.fontSizeXl};
    }
  }
`;

const Breadcrumb = styled.div`
  font-size: ${(props) => props.theme.fontSizeMd};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const CategoryPageHeaderBlock = (props) => {
  const {
    title,
    identifier,
    lead,
    headerImage,
    imageAlign,
    parentTitle,
    parentUrl,
    color,
    metadata,
  } = props;

  return (
    <HeaderBackground bg={color}>
      <CategoryPageHeader
        bg={color}
        imageAlign={imageAlign}
        image={headerImage}
      />
        <Container>
          <Row>
            <Col lg={{ size: 10, offset: 1 }}>
              <HeaderContent>
                { parentTitle && (
                  <Breadcrumb>
                    <DynamicLink href={parentUrl}><a>{parentTitle}</a></DynamicLink>
                    {' '}
                    /
                  </Breadcrumb>
                )}
                <h1>
                  <Identifier>
                    {identifier}
                    .
                  </Identifier>
                  {' '}
                  { title }
                </h1>
                <p>{ lead }</p>
                { metadata?.length > 0 && <CategoryMetaDataBlock metadata={metadata} color={color} /> }
              </HeaderContent>
            </Col>
          </Row>
        </Container>
    </HeaderBackground>
  );
};

CategoryPageHeaderBlock.defaultProps = {
  lead: null,
  headerImage: null,
  imageAlign: 'center',
};

CategoryPageHeaderBlock.propTypes = {
  title: PropTypes.string.isRequired,
  lead: PropTypes.string,
  headerImage: PropTypes.string,
  imageAlign: PropTypes.string,
};

export default CategoryPageHeaderBlock;
