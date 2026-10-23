/** A label's wanted centre, natural width and narrowest wrapped width */
export type LabelBox = { center: number; width: number; minWidth?: number };

/** A placed label's left edge and width */
export type PlacedLabel = { left: number; width: number };

type Cluster = {
  /** Sum of (wanted left edge − offset in the cluster) over the cluster's labels */
  sum: number;
  count: number;
  /** Total width, gaps included */
  width: number;
};

/**
 * Places labels in order in a row of `totalWidth`, each as close to its
 * `center` as possible, `gap` apart and inside the row.
 *
 * Overlapping labels merge into clusters, each at the mean of its labels'
 * wanted positions, which minimises the squared displacement.
 *
 * Labels that don't fit are narrowed evenly, down to their `minWidth`; if that
 * isn't enough, neighbours overlap evenly.
 */
export function placeLabels(labels: LabelBox[], totalWidth: number, gap: number): PlacedLabel[] {
  if (labels.length === 0) return [];

  const gapCount = labels.length - 1;
  const widths = fitWidths(labels, totalWidth - gap * gapCount);
  const used = widths.reduce((sum, width) => sum + width, 0);
  // Negative when the labels overlap
  if (gapCount > 0) gap = Math.min(gap, (totalWidth - used) / gapCount);

  const leftOf = (cluster: Cluster) =>
    Math.min(Math.max(cluster.sum / cluster.count, 0), Math.max(totalWidth - cluster.width, 0));

  const clusters: Cluster[] = [];
  labels.forEach((label, i) => {
    clusters.push({ sum: label.center - widths[i] / 2, count: 1, width: widths[i] });
    // Clamping can cause new overlaps, so keep merging
    while (clusters.length > 1) {
      const current = clusters[clusters.length - 1];
      const previous = clusters[clusters.length - 2];
      if (leftOf(previous) + previous.width + gap <= leftOf(current)) break;
      const offset = previous.width + gap;
      clusters.splice(-2, 2, {
        sum: previous.sum + current.sum - current.count * offset,
        count: previous.count + current.count,
        width: offset + current.width,
      });
    }
  });

  const placed: PlacedLabel[] = [];
  for (const cluster of clusters) {
    let left = leftOf(cluster);
    for (let i = 0; i < cluster.count; i++) {
      const width = widths[placed.length];
      placed.push({ left, width });
      left += width + gap;
    }
  }
  return placed;
}

/** Widths scaled evenly to fit `available`, not below `minWidth` */
function fitWidths(labels: LabelBox[], available: number): number[] {
  const widthsAt = (scale: number) =>
    labels.map((label) => Math.max(label.minWidth ?? 0, label.width * scale));
  const total = (widths: number[]) => widths.reduce((sum, width) => sum + width, 0);
  if (total(widthsAt(1)) <= available) return widthsAt(1);
  // Bisect for the largest scale that fits
  let low = 0;
  let high = 1;
  for (let i = 0; i < 30; i++) {
    const mid = (low + high) / 2;
    if (total(widthsAt(mid)) <= available) low = mid;
    else high = mid;
  }
  return widthsAt(low);
}
