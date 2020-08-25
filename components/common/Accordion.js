import React, { useState, useEffect } from 'react';
import { Collapse, Button, Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import SiteContext from 'context/site';

import Icon from './icon';
import { replaceHashWithoutScrolling } from '../../common/links';

const Header = styled.h3`
  display: flex;
  font-size: ${(props) => props.theme.fontSizeLg};

  &:hover {
    .copy-link {
      visibility: visible;
    }
  }
`;

const CopyLink = styled.button`
  display: block;
  visibility: hidden;
  flex-basis: 20px;
  flex-grow: 0;
  flex-shrink: 0;
  align-self: flex-start;
  margin-left: 12px;
  color: ${props => props.theme.themeColors.dark};
  font-weight: ${(props) => props.theme.fontWeightNormal};
`;

const TriggerIcon = styled.span`
  display: inline-block;
  content: '+';
  flex-basis: 20px;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 12px;
  color: ${props => props.theme.themeColors.dark};
  font-weight: ${(props) => props.theme.fontWeightNormal};
`;

const QuestionTrigger = styled(Button)`
  display: flex;
  flex-grow: 1;
  padding: 0;
  margin-bottom: 1em;
  text-align: left;
  font-size: inherit;
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightMd};
  hyphens: auto;

  span {
    text-decoration: none !important;
  }
`;

const AccordionContent = styled(Collapse)`
  margin-bottom: 3em;
  margin-left: 32px;
`;

function Accordion(props) {
  const [open, setOpen] = useState(props.open);

  // const site = useContext(SiteContext);

  const getOpenQuestionId = () => {
    const hash = window.location.hash;
    return hash && hash.length > 2 ? hash.substr(2) : undefined;
  };

  useEffect(() => {
    // Read open question id from location.hash.
    // Unfortunately this can't be done in server side because
    // hash is not available there.
    const openNow = getOpenQuestionId();
    if (openNow) setOpen(openNow);
  }, [open])

  const toggleSection = id => () => {
    const prevOpen = open;
    setOpen(id === open ? undefined : id);

    // put opened question id into URL hash so URL can be shared
    replaceHashWithoutScrolling(id !== prevOpen ? `q${id}` : undefined);
  };

  return (
    <div className="accordion">
      {React.Children.map(props.children, (child, index) => {
        if (child.type !== AccordionItem) return null;
        const id = child.props.id || `${index}`;
        return React.cloneElement(child, {
          isOpen: child.props.open || open === id,
          onClick: toggleSection(id),
          identifier: id,
        });
      })}
    </div>
  );
}

Accordion.defaultProps = {
  open: undefined,
};

Accordion.propTypes = {
  open: PropTypes.string,
};

const AccordionItem = ({
  children, isOpen, onClick, identifier,
}) => (
  <div id={`q${identifier}`}>
    {React.Children.map(children, child => {
      if (child.type === AccordionHeader) {
        return React.cloneElement(child, { onClick, isOpen, identifier });
      }

      if (child.type === AccordionBody) {
        return React.cloneElement(child, { isOpen, identifier });
      }

      return null;
    })}
  </div>
);

AccordionItem.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  identifier: PropTypes.string,
};

const copyToClipboard = (what) => {
  console.log(what);
};

const AccordionHeader = ({
  children, onClick, isOpen, identifier,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  return (
    <Header className={isOpen && 'is-open'}>
      <QuestionTrigger
        className="question-trigger"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`#collapse-${identifier}`}
        id={`heading-${identifier}`}
      >
        <TriggerIcon>+</TriggerIcon>
        {children}
      </QuestionTrigger>
      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        target={`tooltip-${identifier}`}
        toggle={toggle}
      >
        Copy Link to Clipboard
      </Tooltip>
      <CopyToClipboard
        text={`#q${identifier}`}
        id={`tooltip-${identifier}`}
      >
        <CopyLink
          className="copy-link"
          color="link"
        >
          <Icon name="commenting" />
        </CopyLink>
      </CopyToClipboard>
    </Header>
  );
};

AccordionHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  identifier: PropTypes.string,
};

const AccordionBody = ({ children, isOpen, identifier }) => (
  <AccordionContent
    isOpen={isOpen}
    role="region"
    id={`#collapse-${identifier}`}
    aria-labelledby={`heading-${identifier}`}
    hidden=""
  >
    {children}
  </AccordionContent>
);

AccordionBody.propTypes = {
  isOpen: PropTypes.bool,
  identifier: PropTypes.string,
};

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

export default Accordion;
