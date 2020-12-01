import React, { useContext } from 'react';
import { Container, Table } from 'reactstrap';
import { ThemeContext } from 'styled-components';

const DesignTokens = () =>
{
  const themeContext = useContext(ThemeContext);
  return (
    <Container>
      <hr />
      <h2>Testing Design Token Documentation</h2>
      <p>This can be used as a testground and documentation for theme variables</p>
      <Table responsive>
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
      <h3>
        Theme JSON:
        {' '}
        { themeContext.name }
      </h3>
      <div><pre className="pre-scrollable bg-light"><code>{JSON.stringify(themeContext, null, 2) }</code></pre></div>
    </Container>
  );
};

export default {
  title: 'Design System',
  component: DesignTokens,
};

export const TokensStory = (theme) => <DesignTokens theme={theme} />;
