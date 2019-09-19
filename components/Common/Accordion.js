import React from 'react';
import { Collapse, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Header = styled.h3`
  display: flex;

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
  margin-bottom: 2em;
`;

export class Accordion extends React.Component {
  state = {
    open: this.props.open
  };

  toggleSection = index => () => {
    this.setState(({ open }) => ({
      open: index === open ? undefined : index
    }));
  };

  render() {
    return (
      <div className="accordion">
        {React.Children.map(this.props.children, (child, index) => {
          if (child.type !== AccordionItem) return null;
          return React.cloneElement(child, {
            isOpen: child.props.open || this.state.open === index,
            onClick: this.toggleSection(index),
            identifier: index
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
  open: PropTypes.number,
};

const AccordionItem = ({
  children, isOpen, onClick, identifier
}) => (
  <div>
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
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  identifier: PropTypes.number.isRequired,
};

const AccordionHeader = ({
  children, onClick, isOpen, identifier
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
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  identifier: PropTypes.number.isRequired,
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
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  identifier: PropTypes.number.isRequired,
};

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;
