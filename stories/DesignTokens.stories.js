import React from 'react';
import { useContext } from 'react';
import { Table } from 'reactstrap';
import { ThemeContext } from 'styled-components';

const DesignTokens = () =>
{
  const themeContext = useContext(ThemeContext);
  return (
    <div className="container">
      <hr />
      <h2>Testing Design Token Documentation</h2>
      <p>This can be used as a testground and documentation for theme variables</p>
      <Table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Sample</th>
          </tr>
        </thead>
        <tbody>
          { themeContext && Object.entries(themeContext).map((element) => (
            typeof element[1] !== 'object'
              ? (
                <tr key={element[0]}>
                  <td>{typeof element[0] !== 'object' && element[0]}</td>
                  <td>{element[1]}</td>
                  <td><div style={{ backgroundColor: element[1] }}>sample</div></td>
                </tr>
              )
              : (
                <tr key={element[0]}>
                  <td colSpan="3">
                    <Table>
                      <thead>
                        <tr>
                          <th>&nbsp;</th>
                          <th colSpan="3">
                            {element[0]}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(element[1]).map((subelement) => (
                          <tr key={subelement[0]}>
                            <td>&nbsp;</td>
                            <td>{subelement[0]}</td>
                            <td>{subelement[1]}</td>
                            <td><div style={{ backgroundColor: subelement[1] }}>sample</div></td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </td>
                </tr>
              )
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default {
  title: 'Basics/Tokens',
  component: DesignTokens,
};

export const TokensStory = (theme) => <DesignTokens theme={theme} />;

TokensStory.story = {
  name: 'Design Tokens',
};

export const TypeStory = () => (
  <div className="container">
    <h1>Headline 1</h1>
    <h2>Headline 2</h2>
    <h3>Headline 3</h3>
    <h4>Headline 4</h4>
  </div>
);

TypeStory.story = {
  name: 'Typography',
};
