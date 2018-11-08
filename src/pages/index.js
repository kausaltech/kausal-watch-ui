import React from 'react'
import { Jumbotron, Button } from 'reactstrap';

import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <Jumbotron className="mt-5">
      <h1 className="display-3">Hello, world!</h1>
      <p className="lead">This is Carbon Neutral Helsinki site.</p>
      <hr className="my-2" />
      <p>It uses Gatsby static site genereator for fast kick-off React App.</p>
      <p className="lead">
        <Button color="success" href="https://www.gatsbyjs.org">Learn More</Button>
      </p>
    </Jumbotron>
  </Layout>
)

export default IndexPage
