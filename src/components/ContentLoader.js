import React from 'react'

import styled from 'styled-components';

const Loader = styled.div`
  height: 300px;
  padding: 6rem 0;
  margin-bottom: 4rem;
  text-align: center;
`

class ContentLoader extends React.Component {

  render() {
    return (
      <Loader><h3 className="display-5">Loading......</h3></Loader>
    );
  }
}

export default ContentLoader
