import React from 'react';

import { readableColor } from 'polished';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import { useTheme } from 'styled-components';

import type {
  StreamFieldFragmentFragment,
  StreamFieldFragment_ActionCategoryFilterCardsBlock_Fragment,
} from '@/common/__generated__/graphql';
import { type CommonContentBlockProps } from '@/common/blocks.types';
import { getCategoryString } from '@/common/categories';
import { Link } from '@/common/links';
import Card from '@/components/common/Card';

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

const CardLead = styled.p`
  margin-bottom: ${(props) => props.theme.spaces.s050};
`;

const CardHeader = styled.h3`
  color: ${(props) =>
    readableColor(
      props.theme.brandDark,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
  font-size: ${(props) => props.theme.fontSizeMd};
  line-height: ${(props) => props.theme.lineHeightSm};
`;
interface CategoryListBlockProps extends CommonContentBlockProps {
  cards: StreamFieldFragment_ActionCategoryFilterCardsBlock_Fragment['cards'];
}
type CategoryListCard = NonNullable<CategoryListBlockProps['cards']>[number];
type CategoryListCardWithCategory = CategoryListCard & {
  category: NonNullable<CategoryListCard['category']>;
};

export default function CategoryListBlock({ id = '', cards }: CategoryListBlockProps) {
  const theme = useTheme();
  return (
    <CategoryListSection id={id}>
      <Container>
        <Row tag="ul" className="justify-content-center">
          {cards
            ?.filter((card) => card.category !== null)
            .map((card: CategoryListCardWithCategory) => (
              <Col
                tag="li"
                xs="12"
                sm="6"
                lg="4"
                key={card.category.id}
                className="mb-2 d-flex align-items-stretch"
                style={{ transition: 'all 0.5s ease' }}
              >
                <Link
                  className="card-wrapper"
                  href={`/actions?${getCategoryString(
                    card.category.type.identifier
                  )}=${card.category.id}`}
                >
                  <Card
                    customBackgroundColor={theme.brandDark}
                    customColor={readableColor(
                      theme.brandDark,
                      theme.themeColors.black,
                      theme.themeColors.white
                    )}
                  >
                    <div>
                      <CardHeader className="card-title">{card.heading}</CardHeader>
                      <CardLead>{card.lead}</CardLead>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
      </Container>
    </CategoryListSection>
  );
}
