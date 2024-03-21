import { useTheme } from 'styled-components';
import styled from 'styled-components';
import { meetsContrastGuidelines } from 'polished';

const TextContrastOutput = styled.div<{
  $foreground: string;
  $background: string;
}>`
  display: flex;
  padding: 0.5rem;
  color: ${({ $foreground }) => $foreground};
  background-color: ${({ $background }) => $background || 'white'};
`;

const TestedItems = styled.div`
  flex: 1;
`;

const Result = styled.div`
  flex: 1;
  text-align: right;
`;

const TextContrast = (props) => {
  const { foreground, background } = props;
  const theme = useTheme();

  const foregroundColor = foreground.split('.').reduce((a, b) => a[b], theme);
  const backgroundColor = background.split('.').reduce((a, b) => a[b], theme);

  const contrastScore = meetsContrastGuidelines(
    foregroundColor,
    backgroundColor
  );

  const DisplayContrastScore = () => {
    return <span>{contrastScore.AA ? 'OK' : 'Fail 👺'} </span>;
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
      <TextContrast foreground="brandDark" background="themeColors.white" />
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
        foreground="textColor.tertiary"
        background="cardBackground.primary"
      />
      <TextContrast foreground="themeColors.white" background="brandDark" />
      <TextContrast foreground="headingsColor" background="themeColors.white" />
      {/* image credit with transclusent bg */}
      <TextContrast foreground="neutralDark" background="themeColors.white" />
      <TextContrast foreground="themeColors.light" background="brandDark" />
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
      />
      <TextContrast foreground="neutralDark" background="themeColors.white" />
      <TextContrast
        foreground="textColor.primary"
        background="cardBackground.secondary"
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
