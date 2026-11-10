'use client';

import { Box } from '@mui/material';

/** A hazard score as a bar filled to score/10. Decorative: the score is always next to it as text. */
export default function ScoreBar({ score }: { score: number }) {
  return (
    <Box
      aria-hidden
      sx={{ height: 8, borderRadius: 1, bgcolor: 'action.hover', overflow: 'hidden' }}
    >
      <Box sx={{ width: `${score * 10}%`, height: '100%', bgcolor: 'primary.main' }} />
    </Box>
  );
}
