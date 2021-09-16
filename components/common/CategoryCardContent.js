import React from 'react';

const CatecoryCardContent = (props) => {
  const { category } = props;
  return (
    <div>
      <h4>{category?.name}</h4>
      <h5>
        { category?.metadata[0]?.value ? (
          <>
            {category?.metadata[0]?.value}
            {' '}
            Mt CO
            <sub>2</sub>
            e
          </>
        ) : <>-</>}
      </h5>
    </div>
  );
};

export default CatecoryCardContent;
