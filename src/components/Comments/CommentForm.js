import React from 'react';
import axios from 'axios';

import { Alert, Button }  from 'reactstrap';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isSent: false,
      content: "",
      author: "Anonyymi"
    };
    
    this.resetForm = this.resetForm.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleUserInput (e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  
  resetForm() {
    this.setState({
      error: null,
      isSent: false,
      content: "",
      author: "Anonyymi"
    });
    this.props.onPost();
  }
  
  handlePost() {
    axios.post(process.env.GATSBY_KK_API + "/comment/", {
        section: this.props.section,
        content: this.state.content,
        author_name: this.state.author
    })
    .then(
      (result) => {
        this.setState({
          isSent: true
        });
        this.props.onPost();
      })
    .catch(
      (error) => {
        this.setState({
          isSent: false,
          error: true
        });
      }
    );
  }


  render() {
    if (this.state.error) {
      return (<Alert>
          <p>Error: {this.state.error.message}</p>
          <Button onClick={this.resetForm} >OK</Button>
        </Alert>);
    } else if (this.state.isSent) {
      return (<Alert>
          <p>Kommenttisi on lähetetty</p>
          <Button onClick={this.resetForm} >OK</Button>
        </Alert>);
    }
    else {
      return (
        <div className="comment-form-container">
          <div className="comment-form">
            <form>
              <div className="form-group">
                <label htmlFor="content"><h4>Kommentti</h4></label>
                <textarea className="form-control" value={this.state.content} name="content" onChange={(event) => this.handleUserInput(event)} />
              </div>
              <div className="form-group">
                <label htmlFor="author"><h4>Nimimerkki</h4></label>
                <input type="text" placeholder="Anonyymi" value={this.state.author} maxLength="32" className="form-control" name="author" onChange={(event) => this.handleUserInput(event)}/>
              </div>
              <div className="comment-buttons clearfix text-right">
                <Button color="primary" outline onClick={this.resetForm}>Peru</Button>
                {' '}
                <Button color="secondary" onClick={this.handlePost}>Lähetä</Button>
              </div>
            </form>
            <div className="comment-conditions"><small>
              Annetut kommentit julkaistaan <a href="http://www.hri.fi/fi/mita-on-avoin-data/"><span>avoimena datana</span> </a>Helsingin kaupungin palvelussa <a href="http://creativecommons.org/licenses/by/4.0/deed.fi"><span>avoimella lisenssillä</span></a>. 
              Voit jättää kommenttisi nimettömänä, jos et ole kirjautunut sisään. Lisäksi tekstejä tarvittaessa muokataan loukkaavan tai muutoin törkeän kielenkäytön osalta.
            </small></div>
          </div>
        </div>
      );
    }
  }
}

export default CommentForm;