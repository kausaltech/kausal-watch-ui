import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input } from 'reactstrap';

function Switch(props) {
  const { label, state, onChange, id } = props;
  return (
    <Form>
      <FormGroup switch>
        <Input
          type="switch"
          checked={state}
          onChange={onChange}
          id={id}
          role="switch"
        />
        <Label check htmlFor={id}>
          {label}
        </Label>
      </FormGroup>
    </Form>
  );
}

Switch.propTypes = {
  onChange: PropTypes.func.isRequired,
  state: PropTypes.bool,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default Switch;
