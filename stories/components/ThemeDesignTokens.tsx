import React, { useContext, useState, useEffect } from 'react';
import { Container, Table } from 'reactstrap';
import _ from 'lodash';
import { useTheme } from 'styled-components';
import { ChromePicker } from 'react-color';
import defaultTheme from 'public/static/themes/default/theme.json';

const ColorPicker = (props) => {
  const { color, handleChange, isDefault } = props;
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handlePickerClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handlePickerClose = () => {
    setDisplayColorPicker(false);
  };

  const handlePickerChange = (newColor, evt) => {
    handleChange(
      `rgb(${newColor.rgb.r}, ${newColor.rgb.g}, ${newColor.rgb.b})`
    );
  };

  return (
    <div>
      <input
        type="text"
        defaultValue={color}
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
      {displayColorPicker ? (
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
          <ChromePicker color={color} onChangeComplete={handlePickerChange} />
        </div>
      ) : null}
    </div>
  );
};

const ThemeDesignTokens = () => {
  const themeContext = useTheme();
  const [editedTheme, setEditedTheme] = useState(_.cloneDeep(themeContext));

  useEffect(() => {
    setEditedTheme(_.cloneDeep(themeContext));
    console.log('Theme Changed');
  }, [themeContext]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    const changedTheme = _.cloneDeep(editedTheme);
    _.set(changedTheme, name, value);
    setEditedTheme(() => changedTheme);
  };

  const handleColorChange = (val, nam) => {
    const changedTheme = _.cloneDeep(editedTheme);
    _.set(changedTheme, nam, val);
    setEditedTheme(() => changedTheme);
  };

  const isColor = (strColor) => {
    // Check for valid hex color (3 or 6 digit hex)
    const hexPattern = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    if (hexPattern.test(strColor)) {
      return true;
    }

    // Check for named CSS color
    const s = new Option().style;
    s.color = strColor;
    // A valid CSS color will be retained, an invalid one will result in an empty string
    return s.color !== '';
  };

  const TokenInput = (props) => {
    const { tokenName, tokenValue } = props;

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

    if (isColor(tokenValue))
      AppropriateInput = (
        <ColorPicker
          color={tokenValue}
          handleChange={(newColor) => handleColorChange(newColor, tokenName)}
          isDefault={tokenState.isDefault}
        />
      );
    else
      AppropriateInput = (
        <input
          type="text"
          name={tokenName}
          defaultValue={tokenValue}
          onInput={handleChange}
          style={{
            color: tokenState.isDefault && '#999999',
            fontWeight: tokenState.isEdited && 'bold',
          }}
        />
      );

    return AppropriateInput;
  };

  const renderTokenRows = (token, tokenPath = '') => {
    if (!_.isObject(token)) {
      const tokenName = tokenPath;
      return (
        <tr key={tokenName}>
          <td>{tokenName}</td>
          <td>
            <TokenInput
              tokenName={tokenName}
              tokenValue={_.get(editedTheme, tokenName)}
              key={`input-${tokenName}`}
            />
          </td>
        </tr>
      );
    } else {
      return Object.entries(token).map(([key, value]) => {
        const newTokenPath = tokenPath ? `${tokenPath}.${key}` : key;
        return renderTokenRows(value, newTokenPath);
      });
    }
  };

  return (
    <Container>
      <hr />
      <h2>Theme Design Token editor</h2>
      <p>
        This can be used as a testground and documentation for theme variables
      </p>
      <Table responsive size="sm">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {themeContext &&
            Object.entries(themeContext).map(([key, value]) =>
              renderTokenRows(value, key)
            )}
        </tbody>
      </Table>
      <h3>Theme JSON: {editedTheme.name}</h3>
      <div contentEditable="true">
        <pre className="pre-scrollable bg-light">
          <code>{JSON.stringify(editedTheme, null, 2)}</code>
        </pre>
      </div>
      <button type="button" disabled>
        SAVE
      </button>
    </Container>
  );
};

export default ThemeDesignTokens;
