import React from 'react';
import { useContext } from 'react';
import { Container } from 'reactstrap';
import { ThemeContext } from 'styled-components';

export default {
  title: 'Design System/Text',
  component: TextContent,
};

export const TextContent = () => (
    <Container>
      <div className="text-content">
        <hr />

        <h1>A Heading h1</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          <em> This text will be italic. </em>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h2>A Heading h2</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          <strong> This text will be bold. </strong>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.
          <em><strong> This text will be italic and bold. </strong></em>
        </p>
        <h3>This is a Heading h3</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <h4>This is a Heading h4</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <h5>This is a Heading h5</h5>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h6>This is a Heading h6</h6>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <hr />

        <h3>Unordered List</h3>

        <ul><li>Item 1</li><li>Item 2<ul><li>Item 2a</li><li>Item 2b</li></ul></li></ul>

        <h3>Ordered List</h3>

        <ol><li>Item 1</li><li>Item 2</li><li>Item 3<ol><li>Item 3a</li><li>Item 3b</li></ol></li></ol>

        <h3>Image</h3>

        <p><img alt="This is a alt text." title="This is a sample image." src="/image/sample.png" /></p>

        <h2>Links</h2>

        <p>You may be using <a href="https://markdownlivepreview.com/">Markdown Live Preview</a>.</p>

        <h2>Blockquotes</h2>

        <blockquote><p>Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.</p><blockquote><p>Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.</p></blockquote></blockquote>

        <h2>Inline code</h2>

        <p>May the <code>Force</code> be with you</p>
      </div>
    </Container>
  );
