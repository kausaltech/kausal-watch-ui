import React from 'react';
import Zoom from 'react-medium-image-zoom';
import parse, { domToReact } from 'html-react-parser';

import 'react-medium-image-zoom/dist/styles.css'

import { usePlan } from 'context/plan';
import styled from 'styled-components';


type RichTextImageProps = {
  attribs: {
    src: string,
    [key: string]: any,
  },
}

function ICompress() {
  // eslint-disable-next-line max-len
  return (React.createElement("svg", { "aria-hidden": "true", "data-rmiz-btn-unzoom-icon": true, fill: "currentColor", focusable: "false", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" },
      // eslint-disable-next-line max-len
      React.createElement("path", { d: "M 14.144531 1.148438 L 9 6.292969 L 9 3 L 8 3 L 8 8 L 13 8 L 13 7 L 9.707031 7 L 14.855469 1.851563 Z M 8 8 L 3 8 L 3 9 L 6.292969 9 L 1.148438 14.144531 L 1.851563 14.855469 L 7 9.707031 L 7 13 L 8 13 Z" })));
}
const CompressIcon = styled(ICompress)`
  vertical-align: baseline;
`;

function RichTextImage(props: RichTextImageProps) {
  const plan = usePlan();
  const { attribs } = props;
  const { src, alt, height, width, ...rest } = attribs;
  rest.className = rest.class;
  delete rest.class;

  // eslint-disable-next-line @next/next/no-img-element
  const imgElement = (<img
    src={`${plan.serveFileBaseUrl}${src}`}
    alt={alt}
    height={height}
    width={width}
    className={rest.className} />
  );

  const [origWidth, origHeight] = [Number(rest['data-original-width']), Number(rest['data-original-height'])];
  if (!isNaN(origWidth) && !isNaN(origHeight) && rest['data-original-src']) {
    if (origWidth > Number(height) * 1.2 || origHeight > Number(width) * 1.2) {
      const zoomImgAttribs = {
        src: `${plan.serveFileBaseUrl}${rest['data-original-src']}`,
        alt,
        height: origHeight,
        width: origWidth,
      }
      return (
        <Zoom zoomImg={zoomImgAttribs} IconUnzoom={CompressIcon}>
          {imgElement}
        </Zoom>
      )
    }
  }
  return imgElement;
}

type RichTextProps = {
  html: string,
  className?: string,
};

export default function RichText(props: RichTextProps) {
  const { html, className, ...rest } = props;
  const plan = usePlan();

  if (typeof html !== 'string') return <div />;

  const options = {
    replace: (domNode) => {
      const {
        type, name, attribs, children,
      } = domNode;
      if (type !== 'tag') return null;
      // Rewrite <a> tags to point to the FQDN
      if (name === 'a') {
        if (attribs['data-link-type']) {
          // FIXME: Add icon based on attribs['data-file-extension']
          return <a href={`${plan.serveFileBaseUrl}${attribs.href}`}>{domToReact(children, options)}</a>;
        }
        return <a target='_blank' href={attribs.href} rel="noreferrer">{domToReact(children, options)}</a>;
      } else if (name === 'img') {
        if (attribs.src && attribs.src[0] === '/') {
          return <RichTextImage attribs={attribs} />
        }
      }
      return null;
    },
  };

  return <div {...rest} className={`text-content ${className || ''}`}>{parse(html, options)}</div>;
}
