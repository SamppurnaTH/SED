import React, { Component, ErrorInfo, ReactNode } from 'react';
import { reportError } from '../services/analytics';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

class WidgetErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Widget Error:", error, errorInfo);
    reportError(error, { context: 'Widget Error', componentStack: errorInfo.componentStack });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg h-full flex flex-col justify-center" role="alert">
          <p className="font-bold">Oops!</p>
          <p className="text-sm">This component could not be loaded.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default WidgetErrorBoundary;
