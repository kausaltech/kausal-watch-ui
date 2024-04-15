import { ActionListAction } from '@/components/dashboard/dashboard.types';

/**
 * Map over all action dependency relationships and add the action object to
 * the relationship. Required because we only query the id of an action in a relationship.
 */
export function mapActionsToExpandDependencies(
  action: ActionListAction,
  index: number,
  actions: ActionListAction[]
) {
  return action.dependencyRole && action.allDependencyRelationships?.length
    ? {
        ...action,
        allDependencyRelationships: action.allDependencyRelationships.map(
          (relationship) => ({
            ...relationship,
            preceding:
              actions.find(
                (action) => action.id === relationship.preceding.id
              ) ?? null,
            dependent:
              actions.find(
                (action) => action.id === relationship.dependent.id
              ) ?? null,
          })
        ),
      }
    : action;
}
