import React from 'react';
import { Alert } from 'reactstrap';

import { Sentry } from '../../common/sentry';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Alert>Tapahtui virhe.</Alert>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
