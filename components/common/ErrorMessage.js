import React from 'react';
import PropTypes from 'prop-types';


export default function ErrorMessage(props) {
  const { message, statusCode } = props;

  if (statusCode && !process.browser) {
    const e = new Error();
    e.code = 'ENOENT';
    throw e;
  }

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
  statusCode: PropTypes.number,
};
