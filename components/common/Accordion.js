import React from 'react';
import { Collapse, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { replaceHashWithoutScrolling } from '../../common/links';

const Header = styled.h3`
  display: flex;
  font-size: 1.4em;

  &:before {
    display: block;
    content: '+';
    flex-basis: 20px;
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 12px;
    color: ${props => props.theme.themeColors.dark};
    font-weight: 100;
  }

  .is-open&:before {
    content: '-';
  }
`;

const QuestionTrigger = styled(Button)`
  padding: 0;
  margin-bottom: 1em;
  text-align: left;
  font-size: inherit;
  font-weight: 600;
  line-height: 1.2;
  hyphens: auto;
`;

const AccordionContent = styled(Collapse)`
  margin-bottom: 3em;
  margin-left: 32px;
`;

export default class Accordion extends React.Component {
  state = {
    open: this.props.open
  };

  componentDidMount() {
    // Read open faq id from location.hash.
    // Unfortunately this can't be done in server side because
    // hash is not available there.
    const getOpenFaqId = () => {
      const hash = window.location.hash;
      return hash && hash.length > 2 ? hash.substr(2) : undefined;
    };

    const open = getOpenFaqId();
    if (open) {
      this.setState({
        open,
      });
    }
  }

  toggleSection = id => () => {
    this.setState(({ open }) => ({
      open: id == open ? undefined : id,
    }));

    // put opened faq id into URL hash so URL can be shared
    replaceHashWithoutScrolling(`q${id}`);
  };

  render() {
    return (
      <div className="accordion">
        {React.Children.map(this.props.children, (child, index) => {
          if (child.type !== AccordionItem) return null;
          const id = child.props.id || index;
          return React.cloneElement(child, {
            isOpen: child.props.open || this.state.open === id,
            onClick: this.toggleSection(id),
            identifier: id,
          });
        })}
      </div>
    );
  }
}

Accordion.defaultProps = {
  open: 0,
};

Accordion.propTypes = {
  open: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  identifier: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const AccordionHeader = ({
  children, onClick, isOpen, identifier,
}) => (
  <Header className={isOpen && 'is-open'}>
    <QuestionTrigger
      color="link"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={`#collapse-${identifier}`}
      id={`heading-${identifier}`}
    >
      {children}
    </QuestionTrigger>
  </Header>
);

AccordionHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  identifier: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  identifier: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;
