import React from 'react';

import Comment from './Comment';

class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="comment-list">
        <div class="comment-form-container">
            <div class="comment-form"><form>
              <h2><span>Kommentti</span></h2>
              <div class="form-group"><h4>Toimenpide numero N</h4>
              </div>
              
              <h4><span>Kommentti</span></h4>
              
              <textarea class="form-control"></textarea>
              
              <h4><span>Nimimerkki</span></h4>
              
              <div class="form-group"><input type="text" placeholder="Anonyymi" value="" maxlength="32" class="form-control" /></div>
              <div class="comment-buttons clearfix"><button type="button" class="btn btn-default"><span>Peru</span></button><button disabled="" type="button" class="btn btn-primary"><span>Lähetä</span></button></div>
              <div class="comment-conditions"><span>Annetut kommentit julkaistaan<a href="http://www.hri.fi/fi/mita-on-avoin-data/" target="_blank"><span>avoimena datana</span></a>Helsingin kaupungin palvelussa<a href="http://creativecommons.org/licenses/by/4.0/deed.fi" target="_blank"><span>avoimella lisenssillä</span></a>. Voit jättää kommenttisi nimettömänä, jos et ole kirjautunut sisään. Lisäksi tekstejä tarvittaessa muokataan loukkaavan tai muutoin törkeän kielenkäytön osalta.</span></div>
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