import Head from 'next/head';

import styled from '@emotion/styled';

import PropTypes from 'prop-types';

import { Container } from '@/components/common/layout/LayoutGrid';

const MessageText = styled.p`
  color: #888888;
`;

export default function StatusMessage({ message, noindex }) {
  return (
    <div className="mb-5">
      <Head>
        <title>Kausal Watch</title>
        {noindex && <meta name="robots" content="noindex" />}
      </Head>
      <div className="rounded px-3 px-sm-4 py-3 py-sm-5 mb-5">
        <Container>
          <MessageText>{message}</MessageText>
        </Container>
      </div>
    </div>
  );
}

StatusMessage.propTypes = {
  message: PropTypes.string.isRequired,
  noindex: PropTypes.boolean,
};
