import type { StreamFieldFragment } from '@/common/__generated__/graphql';

import { blockHasContent, keepBlocksWithContent } from '../streamField.utils';

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

function richText(text: string) {
  return {
    ...base,
    __typename: 'RichTextBlock',
    value: `<p>${text}</p>`,
  } as unknown as StreamFieldFragment;
}
