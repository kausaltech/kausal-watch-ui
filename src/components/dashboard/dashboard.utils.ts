import type { ActionListAction } from './dashboard.types';

/* The subset of a plan needed to identify it visually; satisfied both by the
 * plan context plan and by the leaner related-plan shape. */
interface PlanIdentity {
  id: string;
  name: string;
  shortName?: string | null;
  image?: {
    rendition?: { src: string } | null;
    square?: { src: string } | null;
  } | null;
}

type ActionPlan = ActionListAction['plan'];

export const isFromOtherPlan = (actionPlan: ActionPlan, plan: PlanIdentity) =>
  actionPlan ? actionPlan.id !== plan.id : false;

/*
 * Image identifying the plan an action belongs to. A related plan must not
 * borrow the viewed plan's image, which would brand a foreign action with the
 * host organization's logo; PlanChip falls back to the theme's default avatar.
 */
export const getActionPlanImage = (actionPlan: ActionPlan, plan: PlanIdentity) =>
  isFromOtherPlan(actionPlan, plan)
    ? actionPlan?.image?.rendition?.src
    : actionPlan?.image?.rendition?.src || plan.image?.square?.src || plan.image?.rendition?.src;

/* Name of the plan an action belongs to, for labelling an avatar-only chip. */
export const getActionPlanName = (actionPlan: ActionPlan, plan: PlanIdentity) =>
  isFromOtherPlan(actionPlan, plan)
    ? actionPlan?.shortName || actionPlan?.name
    : plan.shortName || plan.name;
