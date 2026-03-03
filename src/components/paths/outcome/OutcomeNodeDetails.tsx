import { Box, Typography } from '@mui/material';

import type { OutcomeNodeFieldsFragment } from '@/common/__generated__/paths/graphql';
import type { TFunction } from '@/common/i18n';
import RichText from '@/components/common/RichText';

type OutcomeNodeDetailsProps = {
  node: OutcomeNodeFieldsFragment;
  t: TFunction;
};

export default function OutcomeNodeDetails(props: OutcomeNodeDetailsProps) {
  const { node, t } = props;

  return (
    <Box sx={{ maxWidth: '700px', mt: 2, mr: 'auto', ml: 2 }}>
      <Typography variant="h3" component="h5" sx={{ mb: 2 }}>
        {node.name}
      </Typography>
      {node.shortDescription && <RichText html={node.shortDescription} />}
    </Box>
  );
}
