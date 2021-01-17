import React, { useContext, useState, useEffect } from 'react';
import { Container, Table } from 'reactstrap';
import _ from 'lodash';
import { ThemeContext } from 'styled-components';
import { SketchPicker } from 'react-color';
import { themeProp } from 'common/theme';
import defaultTheme from 'styles/default/theme.json';

const ColorPicker = (props) => {
  const { color, handleChange, isDefault } = props;
  const [currentColor, setColor] = useState(color);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handlePickerClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handlePickerClose = () => {
    setDisplayColorPicker(false);
  };

  const handlePickerChange = (newColor, evt) => {
    //setColor(newColor.hex);
    handleChange(newColor.hex);
  };

  return (
    <div>
      <input
        type="text"
        defaultValue={color}
        size="12"
        style={{ color: isDefault && '#999999' }}
      />
      <button
        type="button"
        style={{
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        }}
        onClick={handlePickerClick}
      >
        <div
          style={{
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: color,
          }}
        />
      </button>
      { displayColorPicker
        ? (
          <div
            style={{
              position: 'absolute',
              zIndex: '2',
            }}
          >
            <div
              style={{
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              }}
              onClick={handlePickerClose}
            />
            <SketchPicker color={currentColor} onChangeComplete={handlePickerChange} />
          </div>
        ) : null }
    </div>
  );
};

const DesignTokens = () => {
  const themeContext = useContext(ThemeContext);
  const [editedTheme, setEditedTheme] = useState(_.cloneDeep(themeContext));

  useEffect(() => {
    setEditedTheme(_.cloneDeep(themeContext));
    console.log('Theme Changed');
  }, [themeContext]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    const changedTheme = _.cloneDeep(editedTheme);
    _.set(changedTheme, name, value);
    setEditedTheme(() => (
      changedTheme
    ));
  };

  const handleColorChange = (val, nam) => {
    const changedTheme = _.cloneDeep(editedTheme);
    _.set(changedTheme, nam, val);
    setEditedTheme(() => (
      changedTheme
    ));
  };

  const isColor = (strColor) => {
    const s = new Option().style;
    s.color = strColor;
    //console.log("test-color");
    //console.log(s.color);
    return s.color === strColor;
  };

  const TokenInput = (props) => {
    const {
      tokenName,
      tokenValue,
    } = props;

    const [tokenState, setTokenState] = useState({
      isEdited: _.get(themeContext, tokenName) !== tokenValue,
      isDefault: _.get(defaultTheme, tokenName) === tokenValue,
    });

    useEffect(() => {
      setTokenState({
        isEdited: _.get(themeContext, tokenName) !== tokenValue,
        isDefault: _.get(defaultTheme, tokenName) === tokenValue,
      });
    }, [tokenValue]);

    let AppropriateInput;

    if (isColor(tokenValue)) AppropriateInput = (
      <ColorPicker
        color={tokenValue}
        handleChange={(newColor) => handleColorChange(newColor, tokenName)}
        isDefault={tokenState.isDefault}
      />
    ); else AppropriateInput = (
      <input
        type="text"
        name={tokenName}
        defaultValue={tokenValue}
        onInput={handleChange}
        style={{ color: tokenState.isDefault && '#999999', fontWeight: tokenState.isEdited && 'bold' }}
      />
    );

    return AppropriateInput;
  };

  return (
    <Container>
      <hr />
      <h2>Theme Design Token editor</h2>
      <p>This can be used as a testground and documentation for theme variables</p>
      <Table responsive size="sm">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          { themeContext && Object.entries(themeContext).map((element) => (
            !_.isObject(element[1])
              ? (
                <tr key={element[0]}>
                  <td>{!_.isObject(element[0]) && element[0]}</td>
                  <td>
                    <TokenInput
                      tokenName={!_.isObject(element[0]) && element[0]}
                      tokenValue={_.get(editedTheme, element[0])}
                      key={`input-${!_.isObject(element[0]) && element[0]}`}
                    />
                  </td>
                </tr>
              )
              : (
                Object.entries(element[1]).map((subelement) => (
                  <tr key={`${element[0]}.${subelement[0]}`}>
                    <td>
                      <strong>{element[0]}</strong>
                      .
                      {subelement[0]}
                    </td>
                    <td>
                      <TokenInput
                        tokenName={!_.isObject(subelement[0]) && `${element[0]}.${subelement[0]}`}
                        tokenValue={_.get(editedTheme, `${element[0]}.${subelement[0]}`)}
                        key={`input-${element[0]}.${subelement[0]}`}
                      />
                    </td>
                  </tr>
                ))
              )
          ))}
        </tbody>
      </Table>
      <h3>
        Theme JSON:
        {' '}
        { editedTheme.name }
      </h3>
      <div><pre className="pre-scrollable bg-light"><code>{JSON.stringify(editedTheme, null, 2) }</code></pre></div>
      <button type="button">SAVE</button>
    </Container>
  );
};

export default {
  title: 'Design System',
  component: DesignTokens,
};

export const TokensStory = (theme) => <DesignTokens theme={theme} />;
