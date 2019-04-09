import React from 'react';
import PropTypes from 'prop-types';


export default function ErrorMessage(props) {
  const { message } = props;
  return (
    <div className="mb-5">
      <div className="jumbotron" style={{ marginBottom: '6rem' }}>
        <div className="container">
          <h1>{message}</h1>
        </div>
      </div>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
