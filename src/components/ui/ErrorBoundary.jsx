import React, { Component } from 'react';
import { AlertTriangle, RefreshCcw, Home, ChevronDown, ChevronUp } from 'lucide-react';
import Button from './Button';

/**
 * GyaanSetu Error Boundary
 * 
 * Catches JavaScript errors anywhere in their child component tree, 
 * logs those errors, and displays a fallback UI instead of the 
 * component tree that crashed.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      showDetails: false 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background-primary p-6">
          <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
            {/* Illustration/Icon */}
            <div className="relative inline-block">
               <div className="w-32 h-32 rounded-[40px] bg-amber-500/10 flex items-center justify-center text-amber-500 mx-auto">
                  <AlertTriangle size={64} strokeWidth={1.5} />
               </div>
               <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-slate-800 flex items-center justify-center text-amber-500 shadow-lg animate-bounce">
                  !
               </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                Oops! Something went wrong
              </h1>
              <p className="text-lg font-bold text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                We've encountered an unexpected error. Our engineers have been notified (mock).
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={() => window.location.reload()} 
                variant="primary"
                className="w-full sm:w-auto px-10 h-14 font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20"
              >
                <RefreshCcw size={18} className="mr-2" /> Reload Page
              </Button>
              <Button 
                onClick={() => window.location.href = '/'} 
                variant="outline"
                className="w-full sm:w-auto px-10 h-14 font-black uppercase text-xs tracking-widest border-2"
              >
                <Home size={18} className="mr-2" /> Go to Home
              </Button>
            </div>

            {/* Error Details (for dev or troubleshooting) */}
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
               <button 
                 onClick={() => this.setState(prev => ({ showDetails: !prev.showDetails }))}
                 className="flex items-center justify-center gap-2 mx-auto text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
               >
                 {this.state.showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                 {this.state.showDetails ? 'Hide Error Details' : 'Show Error Details'}
               </button>

               {this.state.showDetails && (
                 <div className="mt-6 p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 text-left overflow-auto max-h-64 border border-slate-100 dark:border-slate-800">
                    <pre className="text-xs font-mono text-error/80 whitespace-pre-wrap">
                       {this.state.error && this.state.error.toString()}
                       <br />
                       {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </pre>
                 </div>
               )}
            </div>

            {/* Fun footer message */}
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
               Error Code: GS_RUN_FAIL_0x01
            </p>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
