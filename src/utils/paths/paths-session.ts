import { makeVar } from '@apollo/client';

/**
 * Counts the Paths mutations in this browser, such as activating a scenario
 * or setting a parameter, which change the visitor's Paths session. Data
 * fetched for an earlier version is out of date.
 */
export const pathsSessionVersionVar = makeVar(0);
