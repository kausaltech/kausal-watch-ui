import React from 'react'
import { Jumbotron, Button, Container } from 'reactstrap';

import Layout from '../components/layout'
import ActionListFiltered from '../components/ActionListFiltered'

const IndexPage = () => (
  <Layout>
    <Jumbotron>
      <Container>
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead">This is Carbon Neutral Helsinki site.</p>
        <hr className="my-2" />
        <p>It uses Gatsby static site genereator for fast kick-off React App.</p>
        <p className="lead">
          <Button color="primary" outline href="https://www.gatsbyjs.org">Learn More</Button>
        </p>
      </Container>
    </Jumbotron>
    <Container>
      <ActionListFiltered />
    </Container>
  </Layout>
)

export default IndexPage
