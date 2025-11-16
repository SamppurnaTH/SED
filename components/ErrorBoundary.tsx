import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorPage from '../pages/ErrorPage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  // FIX: The `handleRetry` method is converted to an arrow function to ensure `this` is correctly bound.
  // When passed as a prop to a child component, a regular class method loses its `this` context, causing `this.setState` to fail.
  // This also resolves the second error regarding `this.props` which was likely a cascading type issue from the incorrect `this` context.
  private handleRetry = () => {
    this.setState({ hasError: false });
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorPage onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;