import React from 'react';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'bootstrap';

const PopoverTip = (props) => {
  const { header, content } = props;
  return (
    <div>
      <Button
        id="UncontrolledPopover"
        type="button"
      >
        Launch Popover
      </Button>
      <UncontrolledPopover
        placement="bottom"
        target="UncontrolledPopover"
      >
        <PopoverHeader>
          { header }
        </PopoverHeader>
        <PopoverBody>
          { content }
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );
};

export default PopoverTip;
