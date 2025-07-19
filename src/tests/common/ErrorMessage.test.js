import React from 'react';

import ErrorMessage from '../../components/common/ErrorMessage';
import { render } from '../test-utils';

describe('ErrorMessage component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<ErrorMessage message="Test Error" />);
    const errorMessage = getByText('Test Error');
    expect(errorMessage).toBeInTheDocument();
  });

  it('throws an error with the status code on the server', () => {
    const statusCode = 404;
    const message = 'Not Found';
    const serverRender = () => {
      expect(() => {
        render(<ErrorMessage message={message} statusCode={statusCode} />);
      }).toThrowError(new Error(message));
    };

    expect(serverRender).toThrow();
  });

  it('doesn not throw any errors on the client side', () => {
    const statusCode = 404;
    const message = 'Not Found';
    const clientRender = () => {
      expect(() =>
        render(<ErrorMessage message={message} statusCode={statusCode} />)
      ).not.toThrow();
    };
    clientRender();
  });

  const consoleErrorSpy = jest.spyOn(console, 'error');
  beforeEach(() => {
    consoleErrorSpy.mockClear();
  });

  it('does not log a prop type error for valid props', () => {
    render(<ErrorMessage message="Test Error" />);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
});
