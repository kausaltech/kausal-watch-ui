import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input } from 'reactstrap';

function Switch(props) {
  const {label, state, onChange} = props;
  return (
    <Form>
      <FormGroup switch>
        <Input
          type="switch"
          checked={state}
          onChange={onChange}
        />
        <Label check>{ label }</Label>
      </FormGroup>
    </Form>
  );
}

Switch.propTypes = {
  onChange: PropTypes.func.isRequired,
  state: PropTypes.bool,
  label: PropTypes.string,
}

export default Switch;
