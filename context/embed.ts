import React from 'react';

export class InvalidEmbedAddressError extends Error {}

interface EmbedContext {
  active: boolean;
  type: string | null;
}

const EmbedContext = React.createContext<EmbedContext>({
  active: false,
  type: null,
});

export default EmbedContext;
