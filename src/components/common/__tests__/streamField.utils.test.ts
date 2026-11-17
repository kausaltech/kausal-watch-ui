import { type Client, type Event, dedupeIntegration } from '@sentry/core';

import type { StreamFieldFragment } from '@/common/__generated__/graphql';

import {
  blockHasContent,
  buildBrokenReferenceReport,
  findBrokenReferences,
  keepBlocksWithContent,
} from '../streamField.utils';
import type * as StreamFieldUtils from '../streamField.utils';

const base = { blockType: '', field: '', id: null };

const indicator = { id: '1', name: 'Emissions' };

const showcase = (withIndicator: boolean) =>
  ({
    ...base,
    __typename: 'IndicatorShowcaseBlock',
    indicator: withIndicator ? indicator : null,
  }) as unknown as StreamFieldFragment;

const group = (indicators: unknown) =>
  ({ ...base, __typename: 'IndicatorGroupBlock', indicators }) as unknown as StreamFieldFragment;

const groupItem = (withIndicator: boolean) => ({
  __typename: 'IndicatorBlock',
  style: 'graph',
  indicator: withIndicator ? indicator : null,
});

describe('blockHasContent', () => {
  it('keeps a showcase block with an indicator', () => {
    expect(blockHasContent(showcase(true))).toBe(true);
  });

  it('leaves out a showcase block whose indicator was deleted', () => {
    expect(blockHasContent(showcase(false))).toBe(false);
  });

  it('keeps an indicator group with at least one indicator', () => {
    expect(blockHasContent(group([groupItem(false), groupItem(true)]))).toBe(true);
  });

  it('leaves out an indicator group whose indicators were all deleted', () => {
    expect(blockHasContent(group([groupItem(false), null]))).toBe(false);
  });

  it('leaves out an empty indicator group', () => {
    expect(blockHasContent(group([]))).toBe(false);
    expect(blockHasContent(group(null))).toBe(false);
  });

  it('keeps other blocks', () => {
    expect(blockHasContent(richText('Text'))).toBe(true);
  });
});

describe('keepBlocksWithContent', () => {
  it('makes the blocks around a left-out block neighbours', () => {
    const before = richText('Before');
    const after = richText('After');
    const { blocks } = keepBlocksWithContent([before, showcase(false), after]);
    expect(blocks).toEqual([before, after]);
  });

  it('keeps the section numbers of the blocks after a left-out block', () => {
    const { sectionNumbers } = keepBlocksWithContent([
      richText('First'),
      group([groupItem(false)]),
      richText('Third'),
      showcase(true),
    ]);
    expect(sectionNumbers).toEqual([1, 3, 4]);
  });
});

describe('findBrokenReferences', () => {
  it('lists showcase blocks without an indicator with their section numbers', () => {
    const broken = showcase(false);
    expect(findBrokenReferences([richText('First'), showcase(true), broken])).toEqual([
      { block: broken, sectionNumber: 3 },
    ]);
  });

  it('does not list empty indicator groups, which editors may leave empty', () => {
    expect(findBrokenReferences([group([]), group([groupItem(false)])])).toEqual([]);
  });
});

describe('buildBrokenReferenceReport', () => {
  const page = { __typename: 'StaticPage', id: '42', slug: 'climate' };
  const reportFor = (sectionNumber: number) =>
    buildBrokenReferenceReport({ block: showcase(false), sectionNumber }, page, 'plan-1');

  it('groups the reports of all broken blocks into one issue', () => {
    expect(reportFor(1).captureContext.fingerprint).toEqual(
      reportFor(2).captureContext.fingerprint
    );
  });

  it("gets past Sentry's Dedupe for each of two broken blocks in a row", () => {
    const dedupe = dedupeIntegration();
    const client = {} as Client;
    const toEvent = ({ message, captureContext }: ReturnType<typeof reportFor>): Event => ({
      message,
      fingerprint: captureContext.fingerprint,
    });
    const first = toEvent(reportFor(1));
    const second = toEvent(reportFor(2));
    expect(dedupe.processEvent?.(first, {}, client)).toBe(first);
    expect(dedupe.processEvent?.(second, {}, client)).toBe(second);
    // A repeat of the same block is dropped, as the check is meant to do
    expect(dedupe.processEvent?.(toEvent(reportFor(2)), {}, client)).toBeNull();
  });
});

describe('markBrokenBlockReported', () => {
  const loadUtils = async () => {
    let utils: typeof StreamFieldUtils | undefined;
    // A fresh module stands for a new page load in the same tab
    await jest.isolateModulesAsync(async () => {
      utils = await import('../streamField.utils');
    });
    return utils!;
  };

  beforeEach(() => {
    sessionStorage.clear();
    jest.restoreAllMocks();
  });

  it('reports a block once per page load', async () => {
    const { markBrokenBlockReported } = await loadUtils();
    expect(markBrokenBlockReported('a')).toBe(false);
    expect(markBrokenBlockReported('a')).toBe(true);
    expect(markBrokenBlockReported('b')).toBe(false);
  });

  it('does not report a block again after a reload', async () => {
    expect((await loadUtils()).markBrokenBlockReported('a')).toBe(false);
    expect((await loadUtils()).markBrokenBlockReported('a')).toBe(true);
  });

  it('still reports each block once per page load when storage is blocked', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Blocked');
    });
    const { markBrokenBlockReported } = await loadUtils();
    expect(markBrokenBlockReported('a')).toBe(false);
    expect(markBrokenBlockReported('a')).toBe(true);
  });

  it('ignores stored data it did not write', async () => {
    sessionStorage.setItem('reported-broken-stream-field-blocks', '{"a": true}');
    const { markBrokenBlockReported } = await loadUtils();
    expect(markBrokenBlockReported('a')).toBe(false);
  });
});

function richText(text: string) {
  return {
    ...base,
    __typename: 'RichTextBlock',
    value: `<p>${text}</p>`,
  } as unknown as StreamFieldFragment;
}
