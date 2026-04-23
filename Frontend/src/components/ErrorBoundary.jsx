import { Component } from "react";
import { Icon } from "@/components/Icon";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen grid place-items-center bg-surface px-6">
          <div className="max-w-md w-full bg-surface-container-lowest rounded-2xl p-10 text-center shadow-ambient">
            <div className="w-16 h-16 mx-auto rounded-2xl primary-gradient flex items-center justify-center text-on-primary mb-6">
              <Icon name="warning" className="text-3xl" />
            </div>
            <h1 className="text-2xl font-black text-on-surface mb-2">Something went wrong</h1>
            <p className="text-on-surface-variant mb-6 text-sm">
              An unexpected error occurred. Try refreshing — the GyaanSetu team has been notified.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 primary-gradient text-on-primary font-bold rounded-xl hover:shadow-ambient transition-shadow"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
