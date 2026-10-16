import type { DocumentNode, OperationVariables } from '@apollo/client';
import { Kind } from 'graphql';

/**
 * Identifies a preloaded Paths query by operation name and variables.
 *
 * The server preload and the block that reads the data compute it
 * separately, so the variables have to match exactly: a block whose key is
 * not preloaded fetches in the browser as usual.
 */
export function getPreloadKey(query: DocumentNode, variables: OperationVariables) {
  const operation = query.definitions.find((def) => def.kind === Kind.OPERATION_DEFINITION);
  const name = operation?.name?.value ?? '<anonymous>';
  const entries = Object.entries(variables)
    .filter(([, value]) => value !== undefined)
    .sort(([a], [b]) => a.localeCompare(b));
  return `${name}:${JSON.stringify(entries)}`;
}
