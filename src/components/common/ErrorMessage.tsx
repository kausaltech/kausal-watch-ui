import React from 'react';

import { Alert, Box, Typography } from '@mui/material';

interface Props {
  message: string;
  statusCode?: number;
  details?: string;
}

export default function ErrorMessage({ message, statusCode, details }: Props) {
  const isServer = typeof window === 'undefined';
  if (statusCode && isServer) {
    throw Object.assign(new Error(message), {
      statusCode,
      ...(statusCode === 404 && { code: 'NOENT' }),
    });
  }

  return (
    <Box sx={{ mx: 'auto', my: 2, maxWidth: '640px' }} data-testid="error-message">
      <Alert severity="error" data-testid="generic-error-boundary">
        <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
          {message}
        </Typography>
        {details && (
          <Typography variant="body1" sx={{ mb: 2, bgcolor: 'secondary.light' }}>
            <code>{details}</code>
          </Typography>
        )}
      </Alert>
    </Box>
  );
}
