import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import {
  CONTRAST_REQUIREMENTS,
  type ContrastCheck,
  type ThemeColorRef,
  contrastChecks,
} from '@kausal/themes/contrast-checks';
import type { Theme } from '@kausal/themes/types';
import { getContrast, parseToRgb, readableColor } from 'polished';

const TextContrastOutput = styled.div<{
  $foreground: string;
  $background: string;
}>`
  display: flex;
  padding: 0.5rem;
  color: ${({ $foreground }) => $foreground};
  background-color: ${({ $background }) => $background || 'white'};
`;

const Badge = styled.span<{ $bad?: boolean }>`
  color: white;
  background-color: ${(props) =>
    props.$bad ? props.theme.graphColors.red070 : props.theme.graphColors.green070};
  font-size: 0.8rem;
  font-weight: bold;
  padding: 0.25rem;
  border-radius: 0.25rem;
`;

const TestedItems = styled.div`
  flex: 1;
`;

const Result = styled.div`
  flex: 1;
  text-align: right;
`;

const LEVEL_LABELS = { text: '', largeText: '(Large)', nonText: '(Non-text)' };

type CheckResult =
  | { status: 'pass' | 'fail'; foreground: string; background: string; ratio: number }
  | { status: 'error'; message: string };

// Mirrors the check in the kausal-themes build (contrast.ts)
const resolveThemeColor = (
  theme: Theme,
  ref: Exclude<ThemeColorRef, 'readable'>
): { color: string } | { error: string } => {
  const value = ref.split('.').reduce<unknown>((current, key) => {
    if (typeof current !== 'object' || current === null) return undefined;
    return (current as Record<string, unknown>)[key];
  }, theme);
  if (typeof value !== 'string' || !value) return { error: `${ref} is not set` };
  try {
    const rgb = parseToRgb(value);
    if ('alpha' in rgb && rgb.alpha < 1) return { error: `${ref} is translucent (${value})` };
  } catch {
    return { error: `${ref} is not a color (${value})` };
  }
  return { color: value };
};

const checkPair = (theme: Theme, check: ContrastCheck): CheckResult => {
  const { foreground, background, level = 'text' } = check;
  if (foreground === 'readable' && background === 'readable') {
    return { status: 'error', message: 'both sides are readable' };
  }
  const fixed =
    foreground === 'readable'
      ? resolveThemeColor(theme, background as Exclude<ThemeColorRef, 'readable'>)
      : resolveThemeColor(theme, foreground);
  if ('error' in fixed) return { status: 'error', message: fixed.error };

  let other: string;
  if (foreground === 'readable' || background === 'readable') {
    other = readableColor(fixed.color, theme.themeColors.black, theme.themeColors.white);
  } else {
    const res = resolveThemeColor(theme, background);
    if ('error' in res) return { status: 'error', message: res.error };
    other = res.color;
  }

  const [fg, bg] = foreground === 'readable' ? [other, fixed.color] : [fixed.color, other];
  const ratio = getContrast(fg, bg);
  return {
    status: ratio >= CONTRAST_REQUIREMENTS[level] ? 'pass' : 'fail',
    foreground: fg,
    background: bg,
    ratio,
  };
};

const TextContrast = ({ check, result }: { check: ContrastCheck; result: CheckResult }) => {
  const { foreground, background, level = 'text', note } = check;
  const isError = result.status === 'error';

  return (
    <TextContrastOutput
      $foreground={isError ? 'black' : result.foreground}
      $background={isError ? 'white' : result.background}
    >
      <TestedItems>
        {foreground} on {background}
        {note && (
          <>
            <br />
            <small>{note}</small>
          </>
        )}
      </TestedItems>
      <Result>
        <small>{LEVEL_LABELS[level]}</small>
        {result.status === 'pass' ? <Badge>OK</Badge> : <Badge $bad>Fail</Badge>}
        <br />
        <small>
          {isError ? result.message : `${result.ratio} / ${CONTRAST_REQUIREMENTS[level]}`}
        </small>
      </Result>
    </TextContrastOutput>
  );
};

const ThemeAccessibilityTest = () => {
  const theme = useTheme();
  const results = contrastChecks.map((check) => ({ check, result: checkPair(theme, check) }));
  const passed = results.every(({ result }) => result.status === 'pass');

  return (
    <div>
      {passed ? (
        <h2>
          All tests <Badge>pass</Badge>
        </h2>
      ) : (
        <h2>
          Some tests <Badge $bad>fail</Badge>
        </h2>
      )}
      {results.map(({ check, result }, index) => (
        <div key={`${check.foreground}-${check.background}`}>
          {check.group && check.group !== results[index - 1]?.check.group && <h3>{check.group}</h3>}
          <TextContrast check={check} result={result} />
        </div>
      ))}
    </div>
  );
};

export default ThemeAccessibilityTest;
