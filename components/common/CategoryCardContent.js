import React from 'react';
import styled from 'styled-components';
import { Link } from 'routes';

const CardContent = styled.div`
  max-height: 100%;
  overflow: scroll;
`;

const CategoryImage = styled.img`
  display: block;
  max-width: 100%;
  margin-bottom: .5rem;
`;

const CategoryText = styled.div`
  font-size: 0.75rem;
`;

const CatecoryCardContent = (props) => {
  const { category, totalEmissions } = props;
  console.log(category);

  const textcontent = category?.categoryPage?.body.find((block) => block.__typename === 'RichTextBlock');
  const catImageSrc = category?.image?.rendition.src;
  const emissionPortion = category?.metadata[0]?.value;

  return (
    <CardContent>
      <h4>{category?.name}</h4>
      <h5>
        {emissionPortion ? `${Math.round((emissionPortion / totalEmissions) * 10000) / 100} %` : null}
        { category?.metadata[0]?.value ? (
          <>
            {' '}
            (
            {category?.metadata[0]?.value}
            {' '}
            Mt CO
            <sub>2</sub>
            e
            )
          </>
        ) : <>-</>}
        {' '}
      </h5>

      { catImageSrc && <CategoryImage src={catImageSrc} /> }
      <CategoryText className="text-content" dangerouslySetInnerHTML={{ __html: textcontent?.value }} />
      { category?.categoryPage?.urlPath ? <Link href={category?.categoryPage?.urlPath}>read more</Link> : null }
    </CardContent>
  );
};

export default CatecoryCardContent;
