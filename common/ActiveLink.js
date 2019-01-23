import React from 'react';
import { withRouter } from 'next/router';

// typically you want to use `next/link` for this usecase
// but this example shows how you can also access the router
// using the withRouter utility.

const ActiveLink = ({ children, router, href, className }) => {

  const activeClass = router.pathname === href ? 'active' : '';

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={`${activeClass} ${className}`}>
      {children}
    </a>
  );
};

export default withRouter(ActiveLink);
