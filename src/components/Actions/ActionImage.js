import React from 'react'
import LazyLoad from 'react-lazyload';

import { CardImg as BaseCardImg } from 'reactstrap';
import styled from 'styled-components';

const CardImg = styled(BaseCardImg)`
  mix-blend-mode: multiply;
`

const ImgBg = styled.div`
  background-color: ${props => props.theme.helTram};
`

class ActionImage extends React.Component {

  render() {
    let catImages = {
      58:"hZxv71OrD7E",
      59:"yp71rK_ymvU",
      64:"mN4sEfN79SE",
      67:"H5K6HXkZXdw",
      68:"_rrroSmRdeo",
      69:"VxoE4nUnOtI",
      73:"023T4jyCRqA",
      75:"KnevlsuWxzk",
      77:"b8Mwo34avAo"
    };
    let imageURL= "https://source.unsplash.com/" + catImages[this.props.category] + "/400x150";
    
    return (
      <LazyLoad height={150}>
        <ImgBg>
          <CardImg top width="100%" src={ imageURL } alt="Action Image" />
        </ImgBg>
      </LazyLoad>
    )
  }
}

export default ActionImage
