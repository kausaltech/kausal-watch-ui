'use client';

import { Box, Typography } from '@mui/material';

import { ActionLink } from '@/common/links';
import { usePlan } from '@/context/plan';

import type { LinkedAction } from '../queries/get-linked-action';

/**
 * Adopted actions of the plan, each with its own status and, when it has one,
 * its owner. Both come from the plan's own records.
 */
export default function LinkedActions({ actions }: { actions: LinkedAction[] }) {
  const plan = usePlan();

  return (
    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
      {actions.map((action) => {
        const details = [action.primaryOrg?.name, action.statusSummary.label].filter(Boolean);
        return (
          <Box component="li" key={action.id} sx={{ py: 1 }}>
            <Typography component="span" sx={{ display: 'block', fontWeight: 'bold' }}>
              <ActionLink action={action}>
                {!plan.hideActionIdentifiers && <>{action.identifier} </>}
                {action.name}
              </ActionLink>
            </Typography>
            {details.length > 0 && (
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                {details.join(' · ')}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
