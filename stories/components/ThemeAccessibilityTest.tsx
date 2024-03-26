import { useTheme } from 'styled-components';
import styled from 'styled-components';
import { meetsContrastGuidelines, readableColor } from 'polished';

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
    props.$bad
      ? props.theme.graphColors.red070
      : props.theme.graphColors.green070};
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

const TextContrast = (props) => {
  const { foreground, background, largeOnly = false } = props;
  const theme = useTheme();

  const foregroundFromTheme =
    foreground !== 'readable'
      ? foreground.split('.').reduce((a, b) => a[b], theme)
      : '#FFFFFF';
  const backgroundFromTheme =
    background !== 'readable'
      ? background.split('.').reduce((a, b) => a[b], theme)
      : '#FFFFFF';

  const foregroundColor =
    foreground !== 'readable'
      ? foregroundFromTheme
      : readableColor(
          backgroundFromTheme,
          theme.themeColors.black,
          theme.themeColors.white
        );
  const backgroundColor =
    background !== 'readable'
      ? backgroundFromTheme
      : readableColor(
          foregroundFromTheme,
          theme.themeColors.black,
          theme.themeColors.white
        );

  const contrastScore = meetsContrastGuidelines(
    foregroundColor,
    backgroundColor
  );

  const DisplayContrastScore = () => {
    const meetsGuidelines = largeOnly
      ? contrastScore.AALarge
      : contrastScore.AA;
    return (
      <span>
        {largeOnly ? <small>(Large)</small> : ''}
        {meetsGuidelines ? <Badge>OK</Badge> : <Badge $bad>Fail</Badge>}
      </span>
    );
  };

  return (
    <TextContrastOutput
      $foreground={foregroundColor}
      $background={backgroundColor}
    >
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
  //const theme = useTheme();
  return (
    <div>
      <TextContrast foreground="brandDark" background="readable" />
      <TextContrast foreground="readable" background="brandDark" />
      <TextContrast
        foreground="textColor.primary"
        background="cardBackground.primary"
      />
      <TextContrast
        foreground="textColor.primary"
        background="cardBackground.secondary"
      />
      <TextContrast
        foreground="textColor.secondary"
        background="cardBackground.primary"
      />
      <TextContrast
        foreground="textColor.secondary"
        background="cardBackground.secondary"
      />
      <TextContrast
        foreground="textColor.tertiary"
        background="cardBackground.primary"
      />
      <TextContrast foreground="headingsColor" background="themeColors.white" />
      {/* image credit with transclusent bg */}
      <TextContrast foreground="neutralDark" background="themeColors.white" />
      {/* ToggleButton with readableColor function */}
      <TextContrast
        foreground="themeColors.black"
        background="themeColors.light"
      />
      {/* ActionNumberBadge with brandLight bg and readableColor */}
      {/* RestrictedBlockWrapper pink bg */}
      {/* Attributes */}
      Announcement banner
      <TextContrast
        foreground="graphColors.grey010"
        background="graphColors.blue070"
      />
      {/* BadgeTooltip against readableColor white or black */}
      Navigation
      <TextContrast
        foreground="brandNavColor"
        background="brandNavBackground"
        largeOnly="true"
      />
      <TextContrast
        foreground="textColor.primary"
        background="cardBackground.secondary"
      />
      <TextContrast foreground="linkColor" background="themeColors.white" />
      <TextContrast
        foreground="linkColor"
        background="cardBackground.primary"
      />
      {/* SearchSection neutralLight bg with readable color text*/}
      <TextContrast
        foreground="footerColor"
        background="footerBackgroundColor"
      />
      <TextContrast foreground="graphColors.grey070" background="inputBg" />
      <TextContrast
        foreground="themeColors.black"
        background="graphColors.blue010"
      />
      <TextContrast
        foreground="section.indicatorShowcase.color"
        background="section.indicatorShowcase.background"
      />
      <TextContrast
        foreground="themeColors.white"
        background="themeColors.dark"
      />
      <TextContrast
        foreground="themeColors.black"
        background="graphColors.blue010"
      />
      <TextContrast
        foreground="themeColors.black"
        background="graphColors.blue030"
      />
      <TextContrast
        foreground="themeColors.white"
        background="graphColors.blue070"
      />
      <TextContrast foreground="themeColors.white" background="actionColor" />
    </div>
  );
};

export default ThemeAccessibilityTest;
