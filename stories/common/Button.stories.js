import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import Button from '../../components/common/Button';

const Buttons = () => {
  return (
    <div>
      <div className="py-4">
        <Button color="primary">Primary Button</Button>
      </div>
      <div className="py-4">
        <Button color="secondary">Secondary Button</Button>
      </div>
      <div className="py-4">
        <Button outline color="primary">Primary Outline Button</Button>
      </div>
      <div className="py-4">
        <Button outline color="secondary">Secondary Outline Button</Button>
      </div>
      <div className="py-4">
        <Button outline color="light">Light Outline Button</Button>
      </div>
      <div className="py-4">
        <Button outline color="dark">Dark Outline Button</Button>
      </div>
      <div className="py-4">
        <Button color="link">Link Button</Button>
      </div>
    </div>
  );
};

const ButtonsLayout = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <Buttons />
        </div>
        <div className="col-6" style={{ backgroundColor: theme.themeColors.dark }}>
          <Buttons />
        </div>
      </div>
    </div>
  )
};

export const ButtonsStory = (theme) => <ButtonsLayout theme={theme} />;

ButtonsStory.story = {
  name: 'Basic Buttons',
};

export default {
  title: 'Global/Buttons',
  component: ButtonsStory,
};
