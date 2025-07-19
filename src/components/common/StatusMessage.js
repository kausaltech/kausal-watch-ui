import React from 'react';

import Head from 'next/head';

import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';

const MessageText = styled.p`
  color: #888888;
`;

export default function StatusMessage({ message, noindex }) {
  const isServer = typeof window === 'undefined';
  return (
    <div className="mb-5">
      <Head>
        <title>Kausal Watch</title>
        {noindex && <meta name="robots" content="noindex" />}
      </Head>
      <div className="rounded px-3 px-sm-4 py-3 py-sm-5 mb-5">
        <div className="container">
          <MessageText>{message}</MessageText>
        </div>
      </div>
    </div>
  );
}

StatusMessage.propTypes = {
  message: PropTypes.string.isRequired,
  noindex: PropTypes.boolean,
};
