import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'common/links';
import Icon from 'components/common/Icon';
import { GetCategoriesForTreeMapQuery } from 'common/__generated__/graphql';
import { useLocale, useTranslations } from 'next-intl';

const CardContent = styled(motion.div)`
  a {
    cursor: pointer;
  }
`;

const CategoryImage = styled.img`
  display: block;
  max-width: 100%;
  margin-bottom: 0.5rem;
`;

const CategoryText = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
`;

const formatEmissionSharePercent = (share: number, total: number) => {
  if (share === undefined || share === null) return null;
  const percent = (share / total) * 100;
  if (percent < 1) return `< 1 %`;
  return `${Math.round(percent)} %`;
};

type CategoryCardContentProps = {
  category: GetCategoriesForTreeMapQuery['planCategories'][0];
  isRoot: boolean;
  sumValues: number;
};

const CatecoryCardContent = (props: CategoryCardContentProps) => {
  const { category, sumValues, isRoot } = props;
  const t = useTranslations();

  // TESTME
  const language = useLocale();
  const numberFormat = new Intl.NumberFormat(language, {
    maximumSignificantDigits: 3,
  });

  const textcontent = category?.leadParagraph;
  const catImageSrc = category?.image?.rendition.src;
  const categoryEmissions = category?.attributes[0]?.value;
  const emissionShare = formatEmissionSharePercent(
    categoryEmissions,
    sumValues
  );
  const ofAllLabel = t('common-of-all-emissions');

  return (
    <CardContent initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {catImageSrc && <CategoryImage src={catImageSrc} alt="" />}
      <p>{category?.level?.name}</p>
      <h3>{category?.name}</h3>
      {!isRoot && <h5>{`${emissionShare} ${ofAllLabel}`}</h5>}
      <CategoryText
        className="text-content"
        dangerouslySetInnerHTML={{ __html: textcontent }}
      />
      {category?.categoryPage?.urlPath ? (
        <Link href={category?.categoryPage?.urlPath} legacyBehavior>
          <a>
            {t('read-more')}
            <Icon name="arrowRight" />
          </a>
        </Link>
      ) : null}
    </CardContent>
  );
};

export default CatecoryCardContent;
