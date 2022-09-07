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
export enum ActionsActionTaskStateChoices {
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  IN_PROGRESS = "IN_PROGRESS",
  NOT_STARTED = "NOT_STARTED",
}

/**
 * An enumeration.
 */
export enum ActionsAttributeTypeFormatChoices {
  NUMERIC = "NUMERIC",
  OPTIONAL_CHOICE = "OPTIONAL_CHOICE",
  ORDERED_CHOICE = "ORDERED_CHOICE",
  RICH_TEXT = "RICH_TEXT",
}

/**
 * An enumeration.
 */
export enum ContentSiteGeneralContentActionTermChoices {
  ACTION = "ACTION",
  STRATEGY = "STRATEGY",
}

/**
 * An enumeration.
 */
export enum IndicatorsIndicatorLevelLevelChoices {
  OPERATIONAL = "OPERATIONAL",
  STRATEGIC = "STRATEGIC",
  TACTICAL = "TACTICAL",
}

/**
 * An enumeration.
 */
export enum IndicatorsIndicatorTimeResolutionChoices {
  DAY = "DAY",
  MONTH = "MONTH",
  WEEK = "WEEK",
  YEAR = "YEAR",
}

/**
 * An enumeration.
 */
export enum IndicatorsRelatedCommonIndicatorEffectTypeChoices {
  DECREASES = "DECREASES",
  INCREASES = "INCREASES",
  PART_OF = "PART_OF",
}

/**
 * An enumeration.
 */
export enum IndicatorsRelatedIndicatorConfidenceLevelChoices {
  HIGH = "HIGH",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
}

/**
 * An enumeration.
 */
export enum IndicatorsRelatedIndicatorEffectTypeChoices {
  DECREASES = "DECREASES",
  INCREASES = "INCREASES",
  PART_OF = "PART_OF",
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
