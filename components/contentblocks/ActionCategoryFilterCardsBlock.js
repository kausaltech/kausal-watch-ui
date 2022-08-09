import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import RichText from 'components/common/RichText';
import { useTheme } from 'common/theme';
import { getBgImageAlignment } from 'common/images';
import { Link } from 'common/links';
import CategoryTreeBlock from 'components/contentblocks/CategoryTreeBlock';
import Card from 'components/common/Card';


const CategoryListSection = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  padding: ${(props) => props.theme.spaces.s400} 0;

  a.card-wrapper {
    display: flex;
    width: 100%;
    background-color: transparent;
    text-align: center;
    color: ${(props) => props.theme.themeColors.white};

    &:hover {
      color: ${(props) => props.theme.themeColors.white};
      text-decoration: none;

      .card-title {
        text-decoration: underline;
      }
    }
    .card {
      border: 1px solid ${(props) => props.theme.themeColors.light};
      border-radius: 0;
    }
  }

  .lead-text {
    text-align: center;
    font-size: ${(props) => props.theme.fontSizeMd};
    margin-bottom: ${(props) => props.theme.spaces.s300};
  }
`;

const SectionHeader = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.headingsColor};
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

const CardHeader = styled.h3`
  color: ${(props) => props.theme.themeColors.white};
  font-size: ${(props) => props.theme.fontSizeMd};
  line-height: ${(props) => props.theme.lineHeightMd};
`;

const Identifier = styled.span`
  color: ${(props) => props.theme.graphColors.grey050};
`;

const CategoryListBlock = (props) => {
  const { cards } = props;
  const theme = useTheme();
  return (
    <CategoryListSection bg={theme.themeColors.dark}>
      <Container>
        <Row tag="ul">
          { cards?.map((card) => (
            <Col
              tag="li"
              xs="12"
              sm="6"
              lg="4"
              key={card.category.id}
              className="mb-5 d-flex align-items-stretch"
              style={{ transition: 'all 0.5s ease' }}
            >
              <Link href={`/actions?category_${card.category.type.identifier}=${card.category.id}`}>
                <a className="card-wrapper">
                  <Card
                    customColor={theme.brandDark}
                  >
                    <div>
                      <CardHeader className="card-title">
                        { card.heading }
                      </CardHeader>
                      <p>{card.lead}</p>
                    </div>
                  </Card>
                </a>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </CategoryListSection>
  );
};

export default CategoryListBlock;
