import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Container, Table } from 'reactstrap';

const SpacerExample = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  width: ${(props) => props.theme.spaces[props.size]};
  height: ${(props) => props.theme.spaces[props.size]};
`;

const Spacings = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <Container className="my-5">
      <h3>Spacing tokens</h3>
      <Table responsive>
        <tbody>
          <tr>
            <td>spaces.s000</td>
            <td>
              <SpacerExample size="s000" />
            </td>
            <td>{themeContext.spaces.s000}</td>
          </tr>
          <tr>
            <td>spaces.s025</td>
            <td>
              <SpacerExample size="s025" />
            </td>
            <td>{themeContext.spaces.s025}</td>
          </tr>
          <tr>
            <td>spaces.s050</td>
            <td>
              <SpacerExample size="s050" />
            </td>
            <td>{themeContext.spaces.s050}</td>
          </tr>
          <tr>
            <td>spaces.s100</td>
            <td>
              <SpacerExample size="s100" />
            </td>
            <td>{themeContext.spaces.s100}</td>
          </tr>
          <tr>
            <td>spaces.s150</td>
            <td>
              <SpacerExample size="s150" />
            </td>
            <td>{themeContext.spaces.s150}</td>
          </tr>
          <tr>
            <td>spaces.s200</td>
            <td>
              <SpacerExample size="s200" />
            </td>
            <td>{themeContext.spaces.s200}</td>
          </tr>
          <tr>
            <td>spaces.s300</td>
            <td>
              <SpacerExample size="s300" />
            </td>
            <td>{themeContext.spaces.s300}</td>
          </tr>
          <tr>
            <td>spaces.s400</td>
            <td>
              <SpacerExample size="s400" />
            </td>
            <td>{themeContext.spaces.s400}</td>
          </tr>
          <tr>
            <td>spaces.s600</td>
            <td>
              <SpacerExample size="s600" />
            </td>
            <td>{themeContext.spaces.s600}</td>
          </tr>
          <tr>
            <td>spaces.s800</td>
            <td>
              <SpacerExample size="s800" />
            </td>
            <td>{themeContext.spaces.s800}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default {
  title: 'Design System/Spaces',
  component: Spacings,
};

export const SpacingStory = (theme) => <Spacings theme={theme} />;
