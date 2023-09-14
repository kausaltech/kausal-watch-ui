import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Collapse, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SiteContext from 'context/site';

import { useTranslation } from 'common/i18n';
import Icon from 'components/common/Icon';
import { replaceHashWithoutScrolling } from '../../common/links';

const Header = styled.h3`
  position: relative;
  font-size: ${(props) => props.theme.fontSizeLg};

  &:hover {
    .copy-link {
      visibility: visible;
    }

    .question-title {
      text-decoration: underline;
    }
  }
`;

const CopyLink = styled.button`
  display: block;
  position: absolute;
  visibility: hidden;
  width: 2rem;
  right: -1rem;
  top: -0.5rem;
  border: none;
  border-radius: 0;
  margin: 0;
  padding: 0;
  overflow: visible;
  background: transparent;
  line-height: normal;
  -webkit-appearance: none;

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  svg {
    fill: ${(props) => props.theme.themeColors.dark} !important;
  }
`;

const TriggerIcon = styled.span`
  display: inline-block;
  flex-basis: ${(props) => props.theme.spaces.s150};
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: ${(props) => props.theme.spaces.s050};
  color: ${(props) => props.theme.themeColors.dark};
  font-weight: ${(props) => props.theme.fontWeightNormal};
  text-align: center;
`;

const QuestionTrigger = styled.button`
  display: flex;
  flex-grow: 1;
  width: 100%;
  padding: 0;
  margin: 0 0 1em;
  text-align: left;
  font-size: inherit;
  color: ${(props) => props.theme.brandDark};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: ${(props) => props.theme.lineHeightMd};
  hyphens: manual;
  border: none;
  overflow: visible;
  background: transparent;
  line-height: normal;
  border-radius: 0;
  -webkit-appearance: none;
`;

const AccordionContent = styled(Collapse)`
  margin-bottom: ${(props) => props.theme.spaces.s300};
  margin-left: ${(props) => props.theme.spaces.s200};
`;

const TooltipContent = (props) => {
  const { scheduleUpdate, children } = props;
  scheduleUpdate();
  return <>{children}</>;
};

TooltipContent.defaultProps = {
  scheduleUpdate: () => null,
};

TooltipContent.propTypes = {
  scheduleUpdate: PropTypes.func,
  children: PropTypes.node.isRequired,
};

const LinkCopyButton = React.memo((props) => {
  const { identifier } = props;
  const site = useContext(SiteContext);
  const { t } = useTranslation();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [copyText, setCopyText] = useState(t('copy-to-clipboard'));
  const toggle = useCallback(() => {
    setTooltipOpen(!tooltipOpen);
    if (!tooltipOpen) setCopyText(t('copy-to-clipboard'));
  }, [tooltipOpen, setCopyText]);
  const onCopy = useCallback(() => {
    setCopyText(t('copied-to-clipboard'));
  }, [setCopyText]);

  return (
    <>
      <UncontrolledTooltip
        placement="top"
        isOpen={tooltipOpen}
        target={`tooltip-${identifier}`}
        id={`tt-content-${identifier}`}
        role="tooltip"
        toggle={toggle}
      >
        {({ scheduleUpdate }) => (
          <TooltipContent scheduleUpdate={scheduleUpdate}>
            {copyText}
          </TooltipContent>
        )}
      </UncontrolledTooltip>
      <CopyToClipboard
        text={`${site.hostname}${site.path}#q${identifier}`}
        id={`tooltip-${identifier}`}
        onCopy={onCopy}
        aria-describedby={`tt-content-${identifier}`}
      >
        <CopyLink className="copy-link">
          <Icon name="link" />
        </CopyLink>
      </CopyToClipboard>
    </>
  );
});

LinkCopyButton.propTypes = {
  identifier: PropTypes.string,
};

LinkCopyButton.displayName = 'LinkCopyButton';

const AccordionHeader = ({ children, onClick, isOpen, identifier }) => (
  <Header className={isOpen && 'is-open'}>
    <QuestionTrigger
      className="question-trigger"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={`#collapse-${identifier}`}
      id={`heading-${identifier}`}
    >
      <TriggerIcon>{isOpen ? '-' : '+'}</TriggerIcon>
      <span className="question-title">{children}</span>
    </QuestionTrigger>
    <LinkCopyButton identifier={identifier} />
  </Header>
);

AccordionHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
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
  children: PropTypes.node.isRequired,
};

const AccordionItem = ({ children, isOpen, onClick, identifier }) => (
  <div id={`q${identifier}`}>
    {React.Children.map(children, (child) => {
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
  children: PropTypes.node,
};

function Accordion(props) {
  const { open, children } = props;
  const [openItem, setOpenItem] = useState(open);

  // const site = useContext(SiteContext);

  const getOpenQuestionId = () => {
    const { hash } = window.location;
    return hash && hash.length > 2 ? hash.substr(2) : undefined;
  };

  useEffect(() => {
    // Read open question id from location.hash.
    // Unfortunately this can't be done in server side because
    // hash is not available there.
    const openNow = getOpenQuestionId();
    if (openNow) setOpenItem(openNow);
  }, [openItem]);

  const toggleSection = (id) => () => {
    const prevOpen = openItem;
    setOpenItem(id === openItem ? undefined : id);

    // put opened question id into URL hash so URL can be shared
    replaceHashWithoutScrolling(id !== prevOpen ? `q${id}` : undefined);
  };

  return (
    <div className="accordion">
      {React.Children.map(children, (child, index) => {
        if (child.type !== AccordionItem) return null;
        const id = child.props.id || `${index}`;
        return React.cloneElement(child, {
          isOpen: child.props.open || openItem === id,
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
  children: PropTypes.node.isRequired,
};

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

export default Accordion;
