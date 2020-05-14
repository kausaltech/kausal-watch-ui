import React from 'react';
import { useContext } from 'react';
import { Table } from 'reactstrap';
import { ThemeContext } from 'styled-components';

const DesignTokens = () =>
{
  const themeContext = useContext(ThemeContext);
  // console.log('Current theme: ', themeContext);
  return (
    <div className="container">
      <hr />
      <h2>Testing Design Token Documentation</h2>
      <p>This can be used as a testground and documentation for theme variables</p>
      <Table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Value</td>
            <td>Output</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>actionColor</td>
            <td>{ themeContext.actionColor }</td>
            <td><div style={{ backgroundColor: themeContext.actionColor }}>sample</div></td>
          </tr>
          <tr>
            <td>themeColors.danger</td>
            <td>{ themeContext.themeColors.danger }</td>
            <td><div style={{ backgroundColor: themeContext.themeColors.danger }}>sample</div></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default {
  title: 'Basics',
  component: DesignTokens,
};

export const TokensStory = (theme) => <DesignTokens theme={theme} />;

TokensStory.story = {
  name: 'Design Tokens',
};

export const TypeStory = () => (
  <div>
    <h1>Headline 1</h1>
    <h2>Headline 2</h2>
    <h3>Headline 3</h3>
    <h4>Headline 4</h4>
  </div>
);

TypeStory.story = {
  name: 'Typography',
};
