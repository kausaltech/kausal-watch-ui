import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import parse, { domToReact } from 'html-react-parser';

import PlanContext from 'context/plan';

export default function RichText({ html }) {
  const plan = useContext(PlanContext);

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
        return <a target='_blank' href={attribs.href}>{domToReact(children, options)}</a>;
      } else if (name === 'img') {
        if (attribs.src && attribs.src[0] === '/') {
          const { alt, src, height, width, ...rest } = attribs;
          rest.className = rest.class;
          delete rest.class;
          return <img src={`${plan.serveFileBaseUrl}${src}`} alt={alt} height={height} width={width} className={rest.className} />;
        }
      }
      return null;
    },
  };

  return <div className="text-content">{parse(html, options)}</div>;
}
RichText.propTypes = {
  html: PropTypes.string.isRequired,
};
