import { Component } from "react";

class AppErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("The app could not load this page:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="app-error-page" role="alert">
          <h1>This page couldn’t be loaded</h1>
          <p>Please reload the app and try again.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Reload the app
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
