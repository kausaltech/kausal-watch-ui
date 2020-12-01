import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Container, Table } from 'reactstrap';
import { parseToRgb, rgbToColorString } from 'polished';

const ColorExample = styled.div`
  background-color: ${(props) => props.color};
  width: 3.5rem;
  height: 1.5rem;
  border-radius: .75rem;
`;

function ColorRow(props) {
  const {colorName, colorValue} = props;
  return (
    <tr>
      <td>{colorName}</td>
      <td><ColorExample color={colorValue} /></td>
      <td>{colorValue}</td>
      <td>{rgbToColorString(parseToRgb(colorValue))}</td>
    </tr>
  );
}
const Colors = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <Container className="my-5">
      <h3>Color tokens</h3>
      <Table responsive>
        <tbody>
          <ColorRow
            colorName="brandLight"
            colorValue={themeContext.brandLight}
          />
          <ColorRow
            colorName="brandDark"
            colorValue={themeContext.brandDark}
          />
          <ColorRow
            colorName="neutralLight"
            colorValue={themeContext.neutralLight}
          />
          <ColorRow
            colorName="neutralDark"
            colorValue={themeContext.neutralDark}
          />

          <ColorRow
            colorName="themeColors.light"
            colorValue={themeContext.themeColors.light}
          />
          <ColorRow
            colorName="themeColors.dark"
            colorValue={themeContext.themeColors.dark}
          />
          <ColorRow
            colorName="themeColors.black"
            colorValue={themeContext.themeColors.black}
          />
          <ColorRow
            colorName="themeColors.white"
            colorValue={themeContext.themeColors.white}
          />
          <tr>
            <th colSpan={3}>Functional UI Colors</th>
          </tr>
          <ColorRow
            colorName="themeColors.success"
            colorValue={themeContext.themeColors.success}
          />
          <ColorRow
            colorName="themeColors.info"
            colorValue={themeContext.themeColors.info}
          />
          <ColorRow
            colorName="themeColors.warning"
            colorValue={themeContext.themeColors.warning}
          />
          <ColorRow
            colorName="themeColors.danger"
            colorValue={themeContext.themeColors.danger}
          />
          <tr>
            <th colSpan={3}>Semantic Colors</th>
          </tr>
          <ColorRow
            colorName="actionColor"
            colorValue={themeContext.actionColor}
          />
          <ColorRow
            colorName="operationalIndicatorColor"
            colorValue={themeContext.operationalIndicatorColor}
          />
          <ColorRow
            colorName="tacticalIndicatorColor"
            colorValue={themeContext.tacticalIndicatorColor}
          />
          <ColorRow
            colorName="strategicIndicatorColor"
            colorValue={themeContext.strategicIndicatorColor}
          />
          <ColorRow
            colorName="causalityIncreasesColor"
            colorValue={themeContext.causalityIncreasesColor}
          />
          <ColorRow
            colorName="causalityDecreasesColor"
            colorValue={themeContext.causalityDecreasesColor}
          />
          <ColorRow
            colorName="causalityIsPartOfColor"
            colorValue={themeContext.causalityIsPartOfColor}
          />
        </tbody>
      </Table>
      <h3>Graph colors</h3>
      <Table responsive>
        <tbody>
          {Object.keys(themeContext.graphColors).map((key) => (
            <ColorRow
              colorName={key}
              colorValue={themeContext.graphColors[key]}
              key={key}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default {
  title: 'Design System/Colors',
  component: Colors,
};

export const ColorsStory = (theme) => <Colors theme={theme} />;
