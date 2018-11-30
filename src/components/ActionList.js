import React from 'react';
import { Row, Col, Alert } from 'reactstrap';

import ActionCard from './ActionCard';
import ContentLoader from './ContentLoader';

class ActionList extends React.Component {
  constructor(props) {
    super(props);
    
    this.getCategories = this.getCategories.bind(this);
    this.getCategoryName = this.getCategoryName.bind(this);
    this.getRootCategory = this.getRootCategory.bind(this);
  }

  getCategoryName(catId) {
    let cat = this.props.included.filter(inc => inc.id === catId);
    if (cat[0] != null) {
      return cat[0].attributes.name;
    }
    else return "Unknown";
  }

  getCategories(action) {
    let cats = [];
    action.relationships.categories.data.map((cat, index) => (
            cats[index] = {
              id: cat.id,
              name: this.getCategoryName(cat.id)
            }
          ))
    return cats;
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
      return <Alert color="danger">Error: {this.props.error.message}</Alert>;
    } else if (!this.props.isLoaded) {
      return <ContentLoader />;
    } else {
      return (
        <Row>
          {this.props.data.map(item => (
            <Col md="4" sm="6" key={item.id} className="mb-4 d-flex align-items-stretch">
              <ActionCard 
                key={item.id} 
                id={item.id}
                number={item.attributes.identifier} 
                name={item.attributes.name} 
                themes={this.getCategories(item)} 
                themeId={item.rootCategory} />
            </Col>
          ))}
        </Row>
      );
    }
  }
}


export default ActionList
