import React, { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { useTranslations } from 'next-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Collapse, UncontrolledTooltip } from 'reactstrap';
import styled from 'styled-components';

import { isServer } from '@/common/environment';
import Icon from '@/components/common/Icon';

import { replaceHashWithoutScrolling } from '../../common/links';

const Header = styled.h3<{ $small?: boolean }>`
  position: relative;
  font-size: ${({ theme, $small }) => ($small ? theme.fontSizeMd : theme.fontSizeLg)};

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
  flex-basis: ${(props) => props.theme.spaces.s200};
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: ${(props) => props.theme.spaces.s050};
  color: ${(props) => props.theme.linkColor};
  font-size: 2.5rem;
  line-height: 1.5rem;
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
  color: ${(props) => props.theme.themeColors.black};
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

const LinkCopyButton = ({ identifier }: { identifier: string }) => {
  const t = useTranslations();
  const pathname = usePathname();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [copyText, setCopyText] = useState(() => t('copy-to-clipboard'));

  const origin = !isServer && window.location.origin ? window.location.origin : '';

  const toggle = () => {
    setTooltipOpen(!tooltipOpen);
    if (!tooltipOpen) setCopyText(t('copy-to-clipboard'));
  };

  const onCopy = () => {
    setCopyText(t('copied-to-clipboard'));
  };

  return (
    <>
      <UncontrolledTooltip
        key={copyText} // Force rerender on tooltip content change for content positioning
        placement="top"
        isOpen={tooltipOpen}
        target={`tooltip-${identifier}`}
        id={`tt-content-${identifier}`}
        role="tooltip"
        toggle={toggle}
      >
        <span>{copyText}</span>
      </UncontrolledTooltip>
      <CopyToClipboard
        text={`${origin}${pathname}#q${identifier}`}
        id={`tooltip-${identifier}`}
        onCopy={onCopy}
        aria-describedby={tooltipOpen ? `tt-content-${identifier}` : undefined}
      >
        <CopyLink
          as="button"
          data-testid="link-copy-btn"
          aria-label={t('copy-to-clipboard')}
          className="copy-link"
        >
          <Icon.Link />
        </CopyLink>
      </CopyToClipboard>
    </>
  );
};

interface AccordionHeaderProps {
  children: React.ReactElement<any> | string;
  isOpen?: boolean;
  onClick?(...args: unknown[]): unknown;
  identifier?: string;
  small?: boolean;
}

const AccordionHeader = ({
  children,
  onClick,
  isOpen,
  identifier,
  small = false,
}: AccordionHeaderProps) => (
  <Header className={isOpen && 'is-open'} $small={small}>
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

interface AccordionBodyProps {
  isOpen?: boolean;
  identifier?: string;
  children: React.ReactNode;
}

const AccordionBody = ({ children, isOpen, identifier }: AccordionBodyProps) => (
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

interface AccordionItemProps {
  isOpen?: boolean;
  onClick?(...args: unknown[]): unknown;
  identifier?: string;
  children?: React.ReactNode;
}

const AccordionItem = ({ children, isOpen, onClick, identifier }: AccordionItemProps) => (
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

interface AccordionProps {
  open?: string;
  children: React.ReactNode;
}

function Accordion(props: AccordionProps) {
  const { open, children } = props;
  const [openItem, setOpenItem] = useState(open);

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

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

export default Accordion;
