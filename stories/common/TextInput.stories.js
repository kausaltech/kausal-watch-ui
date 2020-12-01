import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import TextInput from '../../components/common/TextInput';
import DropDown from '../../components/common/DropDown';

const Inputs = () => {
  return (
    <div>
      <h3 className="mt-4">Inputs</h3>
      <TextInput
        label="Input Label"
        id="searchfield"
        name="search"
        placeholder="Placeholder"
      />
      <TextInput
        id="searchfield"
        name="search"
        placeholder="No Label"
      />
      <h3 className="mt-4">Dropdowns</h3>
      <DropDown
        label="Dropdown Label"
        id="impactfield"
        name="impact"
        value=""
      >
        <option value="">Option</option>
      </DropDown>
      <DropDown
        id="impactfield"
        name="impact"
        value=""
      >
        <option value="">No label</option>
      </DropDown>
    </div>
  );
};

const InputsLayout = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <Inputs />
        </div>
        <div className="col-6" style={{ backgroundColor: theme.themeColors.light }}>
          <Inputs />
        </div>
      </div>
    </div>
  )
};

export const InputStory = (theme) => <InputsLayout theme={theme} />;

InputStory.story = {
  name: 'Text Input',
};

export default {
  title: 'Global/Form',
  component: InputStory,
};
