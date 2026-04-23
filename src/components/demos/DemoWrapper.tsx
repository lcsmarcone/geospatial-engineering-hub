import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class DemoErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Demo Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex h-full w-full items-center justify-center bg-muted/50">
            <div className="text-center p-6">
              <p className="text-lg font-semibold text-destructive mb-2">
                Erro ao carregar demonstração
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {this.state.error?.message || 'Erro desconhecido'}
              </p>
              <p className="text-xs text-muted-foreground">
                Verifique o console do navegador para mais detalhes
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default DemoErrorBoundary;
