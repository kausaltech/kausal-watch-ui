import React from 'react'

import { CardImg } from 'reactstrap';


class ActionImage extends React.Component {

  render() {
    let imageURL= "https://placeholdit.imgix.net/~text?txtsize=33&txt=" + this.props.id + "&w=400&h=300";
    
    return (
      <CardImg top width="100%" src={ imageURL } alt="Action Image" />
    )
  }
}

export default ActionImage
