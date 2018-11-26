import React from 'react';

import Comment from './Comment';

class CommentList extends React.Component {

  render() {
    return (
      <div className="comment-list">
        <div className="comment-form-container">
            <div className="comment-form"><form>
              <h2><span>Kommentti</span></h2>
              <div className="form-group"><h4>Toimenpide numero N</h4>
              </div>
              
              <h4><span>Kommentti</span></h4>
              
              <textarea className="form-control"></textarea>
              
              <h4><span>Nimimerkki</span></h4>
              
              <div className="form-group"><input type="text" placeholder="Anonyymi" defaultValue="" maxLength="32" className="form-control" /></div>
              <div className="comment-buttons clearfix"><button type="button" className="btn btn-default"><span>Peru</span></button><button disabled="" type="button" className="btn btn-primary"><span>Lähetä</span></button></div>
              <div className="comment-conditions"><span>Annetut kommentit julkaistaan<a href="http://www.hri.fi/fi/mita-on-avoin-data/"><span>avoimena datana</span></a>Helsingin kaupungin palvelussa<a href="http://creativecommons.org/licenses/by/4.0/deed.fi"><span>avoimella lisenssillä</span></a>. Voit jättää kommenttisi nimettömänä, jos et ole kirjautunut sisään. Lisäksi tekstejä tarvittaessa muokataan loukkaavan tai muutoin törkeän kielenkäytön osalta.</span></div>
            </form></div>
        </div>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    );
  }
}

export default CommentList;