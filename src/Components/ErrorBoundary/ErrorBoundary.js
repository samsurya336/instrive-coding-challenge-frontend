import React from "react";
import "./ErrorBoundary.css";

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
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-boundary-wrapper">
          <h4>oops! something broken</h4>
          <button
            className="error-boundary-button"
            onClick={() => window.location.reload()}
          >
            Take me Back
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
