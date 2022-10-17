/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration.
 */
export enum ActionResponsiblePartyRole {
  COLLABORATOR = "COLLABORATOR",
  NONE = "NONE",
  PRIMARY = "PRIMARY",
}

/**
 * An enumeration.
 */
export enum ActionTaskState {
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  IN_PROGRESS = "IN_PROGRESS",
  NOT_STARTED = "NOT_STARTED",
}

/**
 * An enumeration.
 */
export enum AttributeTypeFormat {
  CATEGORY_CHOICE = "CATEGORY_CHOICE",
  NUMERIC = "NUMERIC",
  OPTIONAL_CHOICE = "OPTIONAL_CHOICE",
  ORDERED_CHOICE = "ORDERED_CHOICE",
  RICH_TEXT = "RICH_TEXT",
}

/**
 * An enumeration.
 */
export enum IndicatorLevelLevel {
  OPERATIONAL = "OPERATIONAL",
  STRATEGIC = "STRATEGIC",
  TACTICAL = "TACTICAL",
}

/**
 * An enumeration.
 */
export enum IndicatorTimeResolution {
  DAY = "DAY",
  MONTH = "MONTH",
  YEAR = "YEAR",
}

/**
 * An enumeration.
 */
export enum RelatedCommonIndicatorEffectType {
  DECREASES = "DECREASES",
  INCREASES = "INCREASES",
  PART_OF = "PART_OF",
}

/**
 * An enumeration.
 */
export enum RelatedIndicatorConfidenceLevel {
  HIGH = "HIGH",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
}

/**
 * An enumeration.
 */
export enum RelatedIndicatorEffectType {
  DECREASES = "DECREASES",
  INCREASES = "INCREASES",
  PART_OF = "PART_OF",
}

/**
 * An enumeration.
 */
export enum SiteGeneralContentActionTerm {
  ACTION = "ACTION",
  STRATEGY = "STRATEGY",
}

export interface UserFeedbackMutationInput {
  plan: string;
  name?: string | null;
  email?: string | null;
  comment: string;
  url: string;
  id?: string | null;
  clientMutationId?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
