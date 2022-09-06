import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'common/links';
import { useTranslation } from 'common/i18n';
import Icon from 'components/common/Icon';

const CardContent = styled(motion.div)`
  a {
    cursor: pointer;
  }
`;

const CategoryImage = styled.img`
  display: block;
  max-width: 100%;
  margin-bottom: .5rem;
`;

const CategoryText = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
`;

const formatEmissionSharePercent = (share, total) => {
  const label = 'av totala utsläppen';
  if (!share) return null;
  const percent = share / total * 100;
  if (percent < 1) return `< 1 % ${label}`;
  return `${Math.round(percent)} % ${label}`;
};

const CatecoryCardContent = (props) => {
  const { category, totalEmissions } = props;
  const { i18n, t } = useTranslation();
  const { language } = i18n;
  const numberFormat = new Intl.NumberFormat(language, {
    maximumSignificantDigits: 3,
  });

  const textcontent = category?.categoryPage?.body.find((block) => block.__typename === 'RichTextBlock');
  const catImageSrc = category?.image?.rendition.src;
  const categoryEmissions = category?.attributes[0]?.value;
  const emissionShare = formatEmissionSharePercent(categoryEmissions, totalEmissions);

  return (
    <CardContent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      { catImageSrc && <CategoryImage src={catImageSrc} alt=""/> }
      <p>{category?.level?.name}</p>
      <h3>{category?.name}</h3>
      <h5>
        {emissionShare}
      </h5>
      <CategoryText className="text-content" dangerouslySetInnerHTML={{ __html: textcontent?.value }} />
      { category?.categoryPage?.urlPath ? (
        <Link href={category?.categoryPage?.urlPath}>
          <a>
            {t('read-more')}
            <Icon name="arrowRight" />
          </a>
        </Link>
      ) : null }
    </CardContent>
  );
};

export default CatecoryCardContent;
