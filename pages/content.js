import { withRouter } from 'next/router';
import Layout from '../components/layout';
import { Container } from 'reactstrap';
import {Accordion} from '../components/Common/Accordion';

const Contents = withRouter(props => (
  <Container className="mb-5">
    <h1>{props.router.query.title}</h1>
    <p>This is the blog post content.</p>
    <Accordion open={1}>
      <Accordion.Item>
        <Accordion.Header>
          <h3>Mikä on Hillineutraali Helsinki 2035?</h3>
        </Accordion.Header>
        <Accordion.Body>
          some body
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.Header>
          <h3>Mikä on Hillineutraali Helsinki 2035?</h3>
        </Accordion.Header>
        <Accordion.Body>
          some body
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </Container>
))

const Page = props => (
  <Layout>
    <Contents />
  </Layout>
)

export default Page