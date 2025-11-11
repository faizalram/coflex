import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-lg border border-neutral-200 p-8 max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-danger-50 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-danger-500" />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-neutral-900 mb-2">
              Something went wrong
            </h2>
            
            <p className="text-neutral-600 mb-6">
              We encountered an unexpected error. Please try again or contact support if the problem persists.
            </p>

            {this.state.error && (
              <div className="mb-6 p-4 bg-neutral-50 rounded-lg text-left">
                <p className="text-xs font-mono text-neutral-700 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex gap-3 justify-center">
              <Button onClick={this.handleReset} variant="default">
                Try Again
              </Button>
              <Button 
                onClick={() => window.location.href = '/'} 
                variant="outline"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ 
  title = 'Error', 
  message, 
  onRetry 
}: ErrorMessageProps) {
  return (
    <div className="bg-white rounded-lg border border-danger-200 p-6 text-center">
      <div className="flex justify-center mb-4">
        <div className="h-12 w-12 rounded-full bg-danger-50 flex items-center justify-center">
          <AlertTriangle className="h-6 w-6 text-danger-500" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">
        {title}
      </h3>
      
      <p className="text-neutral-600 mb-4">
        {message}
      </p>

      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          Try Again
        </Button>
      )}
    </div>
  );
}
