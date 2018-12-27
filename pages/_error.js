import React from 'react'
import Layout from '../components/layout'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    let errorMessage = ''
    const statusCode = this.props.statusCode

    if (statusCode) {
      errorMessage = `An error ${statusCode} occurred `
      if (statusCode == 404) {
        errorMessage = "Page not found"
      }
    } else {
      errorMessage = "An error occurred on the client"
    }
    return (
      <Layout>
        <div className="mb-5">
          <div className="jumbotron" style={{marginBottom: "6rem"}}>
            <div className="container">
              <h1>{errorMessage}</h1>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
