import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import { useTranslations } from 'next-intl';
import { BoxArrowInRight, BoxArrowRight } from 'react-bootstrap-icons';

import type { NodePageLinkedNodeFragment } from '@/common/__generated__/paths/graphql';
import { PathsNodeLink } from '@/common/links';

type LinkedNodesProps = {
  title: string;
  nodes: NodePageLinkedNodeFragment[];
  icon: typeof BoxArrowInRight;
};

function LinkedNodes({ title, nodes, icon: Icon }: LinkedNodesProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <List>
          {nodes.map((node) => (
            <ListItem key={node.id}>
              <ListItemIcon>
                <Icon size={24} aria-hidden="true" focusable="false" />
              </ListItemIcon>
              <ListItemText>
                <PathsNodeLink id={node.id}>{node.name}</PathsNodeLink>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

type NodeLinksProps = {
  inputNodes: NodePageLinkedNodeFragment[];
  outputNodes: NodePageLinkedNodeFragment[];
};

/** Links to the nodes a Paths node is computed from and to those it affects */
export default function NodeLinks({ inputNodes, outputNodes }: NodeLinksProps) {
  const t = useTranslations();
  return (
    <Grid container spacing={2} sx={{ mb: 2, pt: 2 }}>
      <Grid size={{ xs: 12, md: 6, lg: 5 }}>
        {inputNodes.length > 0 && (
          <LinkedNodes title={t('affected-by')} nodes={inputNodes} icon={BoxArrowInRight} />
        )}
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 5 }} offset={{ md: 0, lg: 2 }}>
        {outputNodes.length > 0 && (
          <LinkedNodes title={t('has-effect-on')} nodes={outputNodes} icon={BoxArrowRight} />
        )}
      </Grid>
    </Grid>
  );
}
