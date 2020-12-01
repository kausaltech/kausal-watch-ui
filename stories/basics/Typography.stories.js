import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Container, Table } from 'reactstrap';

const TypeExample = styled.div`
  max-width: 480px;
  font-size: ${(props) => props.theme[props.size]};
`;

const TypeList = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <Container className="my-5">
      <h3>Typography tokens</h3>
      <Table responsive>
        <tbody>
          <tr>
            <th colSpan={3}>Sizes</th>
          </tr>
          <tr>
            <td>fontSizeSm</td>
            <td><TypeExample size="fontSizeSm">Lorem ipsum <strong>dolor</strong></TypeExample></td>
            <td>{themeContext.fontSizeSm}</td>
          </tr>
          <tr>
            <td>fontSizeBase</td>
            <td><TypeExample size="fontSizeBase">Lorem ipsum <strong>dolor</strong></TypeExample></td>
            <td>{themeContext.fontSizeBase}</td>
          </tr>
          <tr>
            <td>fontSizeMd</td>
            <td><TypeExample size="fontSizeMd">Lorem ipsum <strong>dolor</strong></TypeExample></td>
            <td>{themeContext.fontSizeMd}</td>
          </tr>
          <tr>
            <td>fontSizeLg</td>
            <td><TypeExample size="fontSizeLg">Lorem ipsum <strong>dolor</strong></TypeExample></td>
            <td>{themeContext.fontSizeLg}</td>
          </tr>
          <tr>
            <td>fontSizeXl</td>
            <td><TypeExample size="fontSizeXl">Lorem ipsum <strong>dolor</strong></TypeExample></td>
            <td>{themeContext.fontSizeXl}</td>
          </tr>
          <tr>
            <td>fontSizeXxl</td>
            <td><TypeExample size="fontSizeXxl">Lorem ipsum <strong>dolor</strong></TypeExample></td>
            <td>{themeContext.fontSizeXxl}</td>
          </tr>
          <tr>
            <th colSpan={3}>Weights</th>
          </tr>
          <tr>
            <td>fontWeightNormal</td>
            <td><TypeExample size="fontSizeMd"><span style={{ fontWeight: themeContext.fontWeightNormal }}>Font Weight</span></TypeExample></td>
            <td>{themeContext.fontWeightNormal}</td>
          </tr>
          <tr>
            <td>fontWeightNormal</td>
            <td><TypeExample size="fontSizeMd"><span style={{ fontWeight: themeContext.fontWeightBold }}>Font Weight</span></TypeExample></td>
            <td>{themeContext.fontWeightNormal}</td>
          </tr>
          <tr>
            <th colSpan={3}>Line Heights</th>
          </tr>
          <tr>
            <td>lineHeightSm</td>
            <td>
              <TypeExample size="fontSizeBase">
                <div style={{ lineHeight: themeContext.lineHeightSm }}>
                  Deserunt veniam ipsum deserunt est non officia excepteur culpa. In et culpa cupidatat tempor sit ea aute officia ipsum sunt culpa. Non aute eiusmod Lorem laborum do incididunt nulla minim sint. Voluptate est nisi esse ullamco deserunt laboris mollit tempor cillum exercitation esse excepteur.
                </div>
              </TypeExample>
            </td>
            <td>{themeContext.lineHeightSm}</td>
          </tr>
          <tr>
            <td>lineHeightMd</td>
            <td>
              <TypeExample size="fontSizeBase">
                <div style={{ lineHeight: themeContext.lineHeightMd }}>
                  Deserunt veniam ipsum deserunt est non officia excepteur culpa. In et culpa cupidatat tempor sit ea aute officia ipsum sunt culpa. Non aute eiusmod Lorem laborum do incididunt nulla minim sint. Voluptate est nisi esse ullamco deserunt laboris mollit tempor cillum exercitation esse excepteur.
                </div>
              </TypeExample>
            </td>
            <td>{themeContext.lineHeightMd}</td>
          </tr>
          <tr>
            <td>lineHeightBase</td>
            <td>
              <TypeExample size="fontSizeBase">
                <div style={{ lineHeight: themeContext.lineHeightBase }}>
                  Deserunt veniam ipsum deserunt est non officia excepteur culpa. In et culpa cupidatat tempor sit ea aute officia ipsum sunt culpa. Non aute eiusmod Lorem laborum do incididunt nulla minim sint. Voluptate est nisi esse ullamco deserunt laboris mollit tempor cillum exercitation esse excepteur.
                </div>
              </TypeExample>
            </td>
            <td>{themeContext.lineHeightBase}</td>
          </tr>
          <tr>
            <td>lineHeightLg</td>
            <td>
              <TypeExample size="fontSizeBase">
                <div style={{ lineHeight: themeContext.lineHeightLg }}>
                  Deserunt veniam ipsum deserunt est non officia excepteur culpa. In et culpa cupidatat tempor sit ea aute officia ipsum sunt culpa. Non aute eiusmod Lorem laborum do incididunt nulla minim sint. Voluptate est nisi esse ullamco deserunt laboris mollit tempor cillum exercitation esse excepteur.
                </div>
              </TypeExample>
            </td>
            <td>{themeContext.lineHeightLg}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default {
  title: 'Design System/Type',
  component: TypeList,
};

export const TypesStory = (theme) => <TypeList theme={theme} />;

TypesStory.story = {
  name: 'Typography',
};
