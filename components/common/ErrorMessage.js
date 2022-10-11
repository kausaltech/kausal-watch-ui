import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorMessage(props) {
  const { message, statusCode } = props;

  const isServer = typeof window === "undefined";
  if (statusCode && isServer) {
    const e = new Error(message);
    e.statusCode = statusCode;
    if (statusCode === 404) e.code = 'NOENT';
    throw e;
  }

  return (
    <div className="mb-5">
      <div className="rounded px-3 px-sm-4 py-3 py-sm-5 mb-5">
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
