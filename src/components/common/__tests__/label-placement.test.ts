import { type PlacedLabel, placeLabels } from '../label-placement';

const GAP = 8;

/** Gaps between neighbouring labels; negative means overlap */
const gapsBetween = (placed: PlacedLabel[]) =>
  placed.slice(1).map((label, i) => label.left - (placed[i].left + placed[i].width));

describe('placeLabels', () => {
  it('returns nothing for no labels', () => {
    expect(placeLabels([], 500, GAP)).toEqual([]);
  });

  it('centres labels on their segments when there is room', () => {
    const placed = placeLabels(
      [
        { center: 100, width: 60 },
        { center: 300, width: 80 },
      ],
      500,
      GAP
    );
    expect(placed).toEqual([
      { left: 70, width: 60 },
      { left: 260, width: 80 },
    ]);
  });

  it('spreads overlapping labels evenly around their wanted positions', () => {
    // Both want 250, so they sit side by side around it
    const placed = placeLabels(
      [
        { center: 250, width: 100 },
        { center: 250, width: 100 },
      ],
      500,
      GAP
    );
    expect(placed).toEqual([
      { left: 146, width: 100 },
      { left: 254, width: 100 },
    ]);
  });

  it('keeps labels inside the row', () => {
    const placed = placeLabels(
      [
        { center: 5, width: 60 },
        { center: 495, width: 60 },
      ],
      500,
      GAP
    );
    expect(placed[0].left).toBeCloseTo(0);
    expect(placed[1].left + placed[1].width).toBe(500);
  });

  it('pushes a cluster away from the edge without overlapping its neighbour', () => {
    // Tiny segments at the right end
    const placed = placeLabels(
      [
        { center: 300, width: 80 },
        { center: 490, width: 50 },
        { center: 494, width: 50 },
        { center: 498, width: 50 },
      ],
      500,
      GAP
    );
    expect(Math.min(...gapsBetween(placed))).toBeGreaterThanOrEqual(GAP - 1e-9);
    expect(placed[3].left + placed[3].width).toBeCloseTo(500);
  });

  it('narrows labels that do not fit, so that they wrap instead of overlapping', () => {
    const placed = placeLabels(
      [
        { center: 50, width: 200 },
        { center: 150, width: 200 },
        { center: 250, width: 200 },
      ],
      300,
      GAP
    );
    const total = placed.reduce((sum, label) => sum + label.width, 0) + 2 * GAP;
    expect(total).toBeCloseTo(300);
    expect(placed[0].left).toBeCloseTo(0);
    for (const gap of gapsBetween(placed)) expect(gap).toBeCloseTo(GAP);
  });

  it('keeps label order', () => {
    const placed = placeLabels(
      [
        { center: 200, width: 40 },
        { center: 201, width: 40 },
        { center: 202, width: 40 },
        { center: 203, width: 40 },
      ],
      500,
      GAP
    );
    const lefts = placed.map((label) => label.left);
    expect(lefts).toEqual([...lefts].sort((a, b) => a - b));
  });

  it('does not narrow labels below their minimum width', () => {
    const placed = placeLabels(
      [
        { center: 50, width: 200, minWidth: 120 },
        { center: 150, width: 200, minWidth: 40 },
        { center: 250, width: 200, minWidth: 40 },
      ],
      300,
      GAP
    );
    expect(placed[0].width).toBeCloseTo(120);
    const total = placed.reduce((sum, label) => sum + label.width, 0) + 2 * GAP;
    expect(total).toBeCloseTo(300);
  });

  it('overlaps neighbours evenly and stays in the row when even minimum widths do not fit', () => {
    const placed = placeLabels(
      [
        { center: 20, width: 150, minWidth: 120 },
        { center: 100, width: 150, minWidth: 120 },
        { center: 200, width: 150, minWidth: 120 },
      ],
      300,
      GAP
    );
    expect(placed.map((label) => label.width)).toEqual([120, 120, 120]);
    expect(placed[0].left).toBeCloseTo(0);
    expect(placed[2].left + placed[2].width).toBeCloseTo(300);
    for (const gap of gapsBetween(placed)) expect(gap).toBeCloseTo(-30);
  });
});
