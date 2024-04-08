import { Component, ReactNode } from 'react';
import { captureException } from '@sentry/nextjs';

type Props = {
  fallback: ReactNode;
  children: ReactNode;
  errorExtras?: { [key: string]: string };
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    captureException(error, { extra: this.props.errorExtras });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
