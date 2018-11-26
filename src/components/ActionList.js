import React from 'react';
import LazyLoad from 'react-lazyload';
import { Row, Col } from 'reactstrap';

import ActionCard from './ActionCard';
import ContentLoader from './ContentLoader';

class ActionList extends React.Component {
  constructor(props) {
    super(props);
    
    this.getCategory = this.getCategory.bind(this);
    this.getRootCategory = this.getRootCategory.bind(this);
  }

  getCategory(action) {
    let cat = this.props.included.filter(inc => inc.id === action.relationships.categories.data[0].id);
    if (cat[0] != null) {
      return cat[0].attributes.name;
    }
    else return "no category";
  }

  getRootCategory(catId) {
    let category = this.props.included.find(cat => cat.id === catId);
    if (category.relationships.parent.data != null) {
      let parentId = category.relationships.parent.data.id;
      return this.getRootCategory(parentId);
    }
    else return category;
  }
  
  render() {
    if (this.props.error) {
      return <div>Error: {this.props.error.message}</div>;
    } else if (!this.props.isLoaded) {
      return <ContentLoader />;
    } else {
      return (
        <Row>
          {this.props.data.map(item => (
            <Col md="4" sm="6" key={item.id} className="mb-4 d-flex align-items-stretch">
              <LazyLoad height={200}>
              <ActionCard 
                key={item.id} 
                id={item.id}
                number={item.attributes.identifier} 
                name={item.attributes.name} 
                theme={this.getCategory(item)} 
                themeId={item.rootCategory} />
              </LazyLoad>
            </Col>
          ))}
        </Row>
      );
    }
  }
}


export default ActionList
