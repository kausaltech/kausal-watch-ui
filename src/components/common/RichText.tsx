import type { PropsWithChildren, ReactElement } from 'react';
import React, { type JSX, useMemo, useState } from 'react';

import { withScope } from '@sentry/nextjs';
import { ElementType } from 'domelementtype';
import type { DOMNode, Element, HTMLReactParserOptions } from 'html-react-parser';
import parse, { domToReact } from 'html-react-parser';
import { useTranslations } from 'next-intl';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Collapse } from 'reactstrap';
import styled from 'styled-components';

import { IndicatorLink } from '@/common/links';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import { usePlan } from '@/context/plan';

const BreakPoint = styled.div<{ $fade: boolean }>`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spaces.s150};
  position: relative;

  &:before {
    content: '';
    display: ${(props) => (props.$fade ? 'none' : 'block')};
    position: absolute;
    height: 75px;
    top: -90px;
    width: 100%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
  }
`;

const ToggleButton = styled(Button)`
  margin: auto;
  width: 25%;
  min-width: 120px;
  color: ${(props) => props.theme.themeColors.dark};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &.open {
    color: ${(props) => props.theme.graphColors.grey050};
  }
`;

const IndicatorLinkWrapper = styled.span`
  a {
    //background-color: ${(props) => props.theme.themeColors.white};
    color: ${(props) => props.theme.themeColors.black};
    text-decoration: underline !important;
    &:hover {
      text-decoration: none !important;
      color: ${(props) => props.theme.themeColors.black};
    }

    svg {
      fill: ${(props) => props.theme.linkColor};
    }
  }
`;

const NonBreakingWrapper = styled.span`
  white-space: nowrap;
`;

type RichTextImageProps = {
  attribs: React.JSX.IntrinsicElements['img'] & {
    class?: string;
    'data-original-src'?: string;
    'data-original-width'?: string;
    'data-original-height'?: string;
    src?: string;
  };
};

const StyledRichText = styled.div`
  // break words that can not fit on single line
  overflow-wrap: break-word;

  .responsive-object {
    position: relative;
  }

  .responsive-object iframe,
  .responsive-object object,
  .responsive-object embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

function ICompress() {
  return React.createElement(
    'svg',
    {
      'aria-hidden': 'true',
      'data-rmiz-btn-unzoom-icon': true,
      fill: 'currentColor',
      focusable: 'false',
      viewBox: '0 0 16 16',
      xmlns: 'http://www.w3.org/2000/svg',
    },
    React.createElement('path', {
      d: 'M 14.144531 1.148438 L 9 6.292969 L 9 3 L 8 3 L 8 8 L 13 8 L 13 7 L 9.707031 7 L 14.855469 1.851563 Z M 8 8 L 3 8 L 3 9 L 6.292969 9 L 1.148438 14.144531 L 1.851563 14.855469 L 7 9.707031 L 7 13 L 8 13 Z',
    })
  );
}
const CompressIcon = styled(ICompress)`
  vertical-align: baseline;
`;

function RichTextImage(props: RichTextImageProps) {
  const plan = usePlan();
  const { attribs } = props;
  const {
    src,
    alt,
    height,
    width,
    class: className,
    'data-original-src': originalSrc,
    'data-original-width': originalWidth,
    'data-original-height': originalHeight,
    ...rest
  } = attribs;

  const imageUrl = src?.startsWith('http') ? src : `${plan.serveFileBaseUrl}${src}`;

  if (!imageUrl) {
    return null;
  }

  const origWidth = Number(originalWidth);
  const applyZoom = !isNaN(origWidth) && origWidth > 1000;

  const imgElement = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageUrl}
      alt={alt || 'Image'}
      height={height}
      width={width}
      className={className || 'richtext-image full-width'}
      {...rest}
    />
  );

  if (applyZoom) {
    return <Zoom IconUnzoom={CompressIcon}>{imgElement}</Zoom>;
  }
  return imgElement;
}

type CollapsibleTextProps = {
  parsedContent: string | JSX.Element | JSX.Element[];
  className?: string;
};

const clipRichText = (parsedContent: string | JSX.Element | JSX.Element[], breakPoint: number) => {
  if (typeof parsedContent === 'string') {
    // Handle string input
    if (parsedContent.length <= breakPoint) {
      return { intro: parsedContent, restOfContent: '' };
    }
    // Find the last space before the breakpoint to avoid cutting words
    const lastSpace = parsedContent.lastIndexOf(' ', breakPoint);
    const splitIndex = lastSpace > 0 ? lastSpace : breakPoint;
    return {
      intro: parsedContent.slice(0, splitIndex) + '…',
      restOfContent: parsedContent.slice(splitIndex),
    };
  }
  // Make sure we do not break inside html elements, only break after <p> tags
  const intro: ReactElement<unknown>[] = [];
  const restOfContent: ReactElement<unknown>[] = [];
  let previousNodeType: string | React.JSXElementConstructor<unknown> = '';
  let introLength = 0;
  if (Array.isArray(parsedContent)) {
    parsedContent.forEach((node: ReactElement<unknown>, indx) => {
      const { children } = node.props as { children: ReactElement<unknown>[] | undefined };
      if (indx === 0) {
        intro.push(node);
        introLength += children?.length ?? 0;
      }
      if (indx > 0 && restOfContent.length === 0) {
        if (previousNodeType === 'p' && introLength > breakPoint) restOfContent.push(node);
        else {
          intro.push(node);
          introLength += children?.length ?? 0;
        }
      } else if (restOfContent.length > 0) restOfContent.push(node);
      previousNodeType = node.type;
    });
  }
  return { intro, restOfContent };
};

const CollapsibleText = (props: CollapsibleTextProps) => {
  const { parsedContent, className, ...rest } = props;
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const BREAK_POINT = 400; // characters at least visible
  const { intro, restOfContent } = clipRichText(parsedContent, BREAK_POINT);

  return (
    <div {...rest} className={`text-content ${className || ''}`}>
      {intro}
      {restOfContent.length > 0 && (
        <>
          <Collapse isOpen={isOpen}>{restOfContent}</Collapse>
          <BreakPoint $fade={isOpen}>
            <ToggleButton color="link" onClick={toggle} className={isOpen ? 'open' : ''}>
              {isOpen ? t('close') : t('read-more')}
              <Icon name={isOpen ? 'angle-up' : 'angle-down'} />
            </ToggleButton>
          </BreakPoint>
        </>
      )}
    </div>
  );
};

type RichTextIndicatorLinkProps = {
  id: string;
};

// Helper function to split first word from rest of text for non-breaking icon spacing
function splitFirstWord(children: React.ReactNode): {
  firstWord: React.ReactNode;
  rest: React.ReactNode;
} {
  if (typeof children === 'string') {
    const firstSpaceIndex = children.indexOf(' ');
    const firstWord = firstSpaceIndex > 0 ? children.slice(0, firstSpaceIndex) : children;
    const restOfText = firstSpaceIndex > 0 ? children.slice(firstSpaceIndex + 1) : '';
    return { firstWord, rest: restOfText || null };
  }
  // For non-string children, return as-is (will be wrapped entirely)
  return { firstWord: children, rest: null };
}

function RichTextIndicatorLink(props: PropsWithChildren<RichTextIndicatorLinkProps>) {
  const { id, children } = props;
  // FIXME: Add support for indicator modals

  const { firstWord, rest } = splitFirstWord(children);

  return (
    <IndicatorLinkWrapper>
      <IndicatorLink id={id}>
        <NonBreakingWrapper>
          <Icon.Tachometer />
          {'\u00A0'}
          {firstWord}
        </NonBreakingWrapper>
        {rest && ` ${rest}`}
      </IndicatorLink>
    </IndicatorLinkWrapper>
  );
}

type RichTextProps = {
  html: string;
  className?: string;
  isCollapsible?: boolean;
  maxLength?: number;
};

export default function RichText(props: RichTextProps) {
  const { html, isCollapsible, className, maxLength = undefined, ...rest } = props;
  const plan = usePlan();

  // FIXME: Hacky hack to figure out if the rich text links are internal
  const cutHttp = (url: string) => url.replace(/^https?:\/\//, '');
  const currentDomain = plan.viewUrl ? cutHttp(plan.viewUrl.split('.')[0]) : '';

  const options: HTMLReactParserOptions = useMemo(() => {
    function replaceDomElement(element: Element) {
      const { name, attribs, children } = element;

      const domChildren = children.filter(
        (child) => child.type !== ElementType.CDATA && child.type !== ElementType.Root
      );

      // Rewrite <a> tags to point to the FQDN
      if (name === 'a') {
        const href = attribs?.href;

        if (!href) {
          return <span>{domToReact(domChildren, options)}</span>;
        }

        const reactChildren = domToReact(domChildren, options);
        // File link
        const linkType = attribs['data-link-type'];
        if (linkType) {
          if (linkType === 'indicator') {
            const { 'data-id': id } = attribs;
            return <RichTextIndicatorLink id={id}>{reactChildren}</RichTextIndicatorLink>;
          }
          // FIXME: Add icon based on attribs['data-file-extension']
          return <a href={`${plan.serveFileBaseUrl}${href}`}>{reactChildren}</a>;
        }
        // Internal link
        if (cutHttp(href.split('.')[0]) === currentDomain || href.startsWith('#')) {
          return <a href={href}>{reactChildren}</a>;
        }
        // Assumed external link, open in new tab
        const { firstWord, rest } = splitFirstWord(reactChildren);
        return (
          <a target="_blank" href={href} rel="noreferrer">
            <NonBreakingWrapper>
              <Icon.ArrowUpRightFromSquare />
              {'\u00A0'}
              {firstWord}
            </NonBreakingWrapper>
            {rest && ` ${rest}`}
          </a>
        );
      }
      if (name === 'img') {
        return <RichTextImage attribs={attribs} />;
      }
      return null;
    }

    return {
      replace: (node: DOMNode) => {
        if (node.type !== ElementType.Tag) return null;
        const el = node;
        try {
          return replaceDomElement(el);
        } catch (err) {
          withScope((scope) => {
            scope.setExtra('type', el.type);
            scope.setExtra('name', el.name);
            scope.setExtra('attribs', el.attribs);
            scope.captureException(err);
          });
          console.error(err);
          return null;
        }
      },
    };
  }, [plan.serveFileBaseUrl, currentDomain]);

  if (typeof html !== 'string') return <div />;

  const parsedContent = parse(html, options);

  if (isCollapsible) return <CollapsibleText parsedContent={parsedContent} className={className} />;

  return (
    <div {...rest} className={`text-content clearfix ${className || ''}`}>
      <StyledRichText>
        {maxLength ? clipRichText(parsedContent, maxLength).intro : parsedContent}
      </StyledRichText>
    </div>
  );
}
