import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorPage from '../pages/ErrorPage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // FIX: Refactored to use modern class property syntax for state initialization
  // and an arrow function for the event handler. This approach is more concise
  // and automatically handles 'this' binding, resolving the errors where component
  // properties like 'state', 'setState', and 'props' were not being found.
  state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      return <ErrorPage onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
