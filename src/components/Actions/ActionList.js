import React from 'react';
import { Row, Col, Alert } from 'reactstrap';

import ActionCard from './ActionCard';
import ContentLoader from '../Common/ContentLoader';

class ActionList extends React.Component {
  constructor(props) {
    super(props);
    
    this.getCategories = this.getCategories.bind(this);
    this.getCategoryName = this.getCategoryName.bind(this);
    this.getRootCategory = this.getRootCategory.bind(this);
  }

  getCategoryName(catId) {
    let cat = this.props.cats.filter(inc => inc.id === catId);
    if (cat[0] != null) {
      return cat[0].attributes.name;
    }
    else return "Unknown";
  }

  getOrganizationName(orgId) {
    let org = this.props.orgs.filter(inc => inc.id === orgId);
    if (org[0] != null) {
      return org[0].attributes.name;
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

  getOrganizations(action) {
    let orgs = [];
    action.relationships.responsible_parties.data.map((org, index) => (
            orgs[index] = {
              id: org.id,
              name: this.getOrganizationName(org.id)
            }
          ))
    return orgs;
  }
  
  getRootCategory(catId) {
    let category = this.props.cats.find(cat => cat.id === catId);
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
            <Col lg="4" md="6" key={item.id} className="mb-4 d-flex align-items-stretch">
              <ActionCard 
                key={item.id} 
                id={item.id}
                number={item.attributes.identifier} 
                name={item.attributes.name} 
                themes={this.getCategories(item)} 
                themeId={item.rootCategory} 
                orgs={this.getOrganizations(item)} 
                progress={this.attributes.completion} 
                />
            </Col>
          ))}
        </Row>
      );
    }
  }
}


export default ActionList
