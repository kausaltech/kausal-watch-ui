import { useEffect, useState } from 'react';

import { getContrast, meetsContrastGuidelines, readableColor } from 'polished';
import { useTheme } from 'styled-components';
import styled from 'styled-components';

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

const TextContrast = (props: {
  foreground: string;
  background: string;
  largeOnly?: boolean;
  setPassed: (passed: boolean) => void;
}) => {
  const { foreground, background, largeOnly = false, setPassed } = props;
  const theme = useTheme();

  // 'readable' means that we check this color combination against the theme colors.white and theme colors.black in the component
  const foregroundFromTheme =
    foreground !== 'readable' ? foreground.split('.').reduce((a, b) => a[b], theme) : '#FFFFFF';
  const backgroundFromTheme =
    background !== 'readable' ? background.split('.').reduce((a, b) => a[b], theme) : '#FFFFFF';

  const foregroundColor =
    foreground !== 'readable'
      ? foregroundFromTheme
      : readableColor(backgroundFromTheme, theme.themeColors.black, theme.themeColors.white);
  const backgroundColor =
    background !== 'readable'
      ? backgroundFromTheme
      : readableColor(foregroundFromTheme, theme.themeColors.black, theme.themeColors.white);

  const contrastScore = meetsContrastGuidelines(foregroundColor, backgroundColor);
  const contrastValue = getContrast(foregroundColor, backgroundColor);

  const DisplayContrastScore = () => {
    const meetsGuidelines = largeOnly ? contrastScore.AALarge : contrastScore.AA;
    if (!meetsGuidelines) setPassed(false);
    return (
      <span>
        {largeOnly ? <small>(Large)</small> : ''}
        {meetsGuidelines ? <Badge>OK</Badge> : <Badge $bad>Fail</Badge>}
        <br />
        <small>{contrastValue}</small>
      </span>
    );
  };

  return (
    <TextContrastOutput $foreground={foregroundColor} $background={backgroundColor}>
      <TestedItems>
        {foreground} on {background}
      </TestedItems>
      <Result>
        <DisplayContrastScore />
      </Result>
    </TextContrastOutput>
  );
};

const ThemeAccessibilityTest = () => {
  const [passed, setPassed] = useState(true);
  //const theme = useTheme();
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
      <TextContrast foreground="brandDark" background="readable" setPassed={setPassed} />
      <TextContrast foreground="readable" background="brandDark" setPassed={setPassed} />
      <TextContrast
        foreground="textColor.primary"
        background="cardBackground.primary"
        setPassed={setPassed}
      />
      <TextContrast
        foreground="textColor.primary"
        background="cardBackground.secondary"
        setPassed={setPassed}
      />
      <TextContrast
        foreground="textColor.secondary"
        background="cardBackground.primary"
        setPassed={setPassed}
      />
      <TextContrast
        foreground="textColor.secondary"
        background="cardBackground.secondary"
        setPassed={setPassed}
      />
      <TextContrast
        foreground="textColor.tertiary"
        background="cardBackground.primary"
        setPassed={setPassed}
      />
      <TextContrast
        foreground="headingsColor"
        background="themeColors.white"
        setPassed={setPassed}
      />
      <TextContrast
        foreground="headingsColor"
        background="themeColors.light"
        setPassed={setPassed}
      />
      {/* image credit with transclusent bg */}
      <TextContrast foreground="neutralDark" background="themeColors.white" setPassed={setPassed} />
      {/* ToggleButton with readableColor function */}
      <TextContrast
        foreground="themeColors.black"
        background="themeColors.light"
        setPassed={setPassed}
      />
      <TextContrast
        foreground="graphColors.grey070"
        background="themeColors.light"
        setPassed={setPassed}
      />
      {/* ActionNumberBadge with brandLight bg and readableColor */}
      {/* RestrictedBlockWrapper pink bg */}
      {/* Attributes */}
      Announcement banner
      <TextContrast
        foreground="graphColors.grey010"
        background="graphColors.blue070"
        setPassed={setPassed}
      />
      {/* BadgeTooltip against readableColor white or black */}
      Navigation
      <TextContrast
        foreground="brandNavColor"
        background="brandNavBackground"
        largeOnly={true}
        setPassed={setPassed}
      />
      <TextContrast
        foreground="textColor.primary"
        background="cardBackground.secondary"
        setPassed={setPassed}
      />
      <TextContrast foreground="linkColor" background="themeColors.white" setPassed={setPassed} />
      <TextContrast
        foreground="linkColor"
        background="cardBackground.primary"
        setPassed={setPassed}
      />
      <TextContrast
        foreground="linkColor"
        background="cardBackground.secondary"
        setPassed={setPassed}
      />
      {/* SearchSection neutralLight bg with readable color text*/}
      <TextContrast
        foreground="footerColor"
        background="footerBackgroundColor"
        setPassed={setPassed}
      />
      <TextContrast foreground="graphColors.grey070" background="inputBg" setPassed={setPassed} />
      <TextContrast
        foreground="themeColors.black"
        background="graphColors.blue010"
        setPassed={setPassed}
      />
      <TextContrast
        foreground="section.indicatorShowcase.color"
        background="section.indicatorShowcase.background"
        setPassed={setPassed}
      />
      <TextContrast
        foreground="themeColors.white"
        background="themeColors.dark"
        setPassed={setPassed}
      />
      <TextContrast
        foreground="graphColors.grey020"
        background="themeColors.dark"
        setPassed={setPassed}
      />
      <TextContrast
        foreground="themeColors.black"
        background="graphColors.blue010"
        setPassed={setPassed}
      />
      <TextContrast
        foreground="themeColors.black"
        background="graphColors.blue030"
        setPassed={setPassed}
      />
      <TextContrast
        foreground="themeColors.white"
        background="graphColors.blue070"
        setPassed={setPassed}
      />
      <TextContrast foreground="readable" background="actionColor" setPassed={setPassed} />
    </div>
  );
};

export default ThemeAccessibilityTest;
