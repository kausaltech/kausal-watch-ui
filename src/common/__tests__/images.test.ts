import { getBgImageAlignment } from '../images';

const baseImage = {
  width: 8000,
  height: 4000,
  focalPointX: null,
  focalPointY: null,
  focalPointWidth: null,
  focalPointHeight: null,
};

describe('getBgImageAlignment', () => {
  it('returns center for a missing image', () => {
    expect(getBgImageAlignment(null)).toBe('center center');
  });

  it('returns center when no focal point is set', () => {
    expect(getBgImageAlignment(baseImage)).toBe('center center');
  });

  it('centers a focal area in the middle of the image', () => {
    expect(
      getBgImageAlignment({
        ...baseImage,
        focalPointX: 4000,
        focalPointY: 2000,
        focalPointWidth: 1000,
        focalPointHeight: 500,
      })
    ).toBe('50.0% 50.0%');
  });

  it('biases toward the edge the focal area is closest to', () => {
    // Focal box spans x [5600, 8000], y [400, 2000]:
    // no slack right of the box, so x pins to 100%;
    // y slack is 400 above vs 2000 below -> 400/2400
    expect(
      getBgImageAlignment({
        ...baseImage,
        focalPointX: 6800,
        focalPointY: 1200,
        focalPointWidth: 2400,
        focalPointHeight: 1600,
      })
    ).toBe('100.0% 16.7%');
  });

  it('pins to the edge when the focal area touches it', () => {
    expect(
      getBgImageAlignment({
        ...baseImage,
        focalPointX: 500,
        focalPointY: 250,
        focalPointWidth: 1000,
        focalPointHeight: 500,
      })
    ).toBe('0.0% 0.0%');
  });

  it('handles a focal area covering the whole image', () => {
    expect(
      getBgImageAlignment({
        ...baseImage,
        focalPointX: 4000,
        focalPointY: 2000,
        focalPointWidth: 8000,
        focalPointHeight: 4000,
      })
    ).toBe('50.0% 50.0%');
  });

  it('treats focalPointX/Y as the center of the focal area', () => {
    // A point focal (no box) at 75%/25% maps directly to those percentages
    expect(
      getBgImageAlignment({
        ...baseImage,
        focalPointX: 6000,
        focalPointY: 1000,
        focalPointWidth: 0,
        focalPointHeight: 0,
      })
    ).toBe('75.0% 25.0%');
  });
});
