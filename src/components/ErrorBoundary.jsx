import React from "react";

/**
 * ErrorBoundary — catches unhandled render errors in any child subtree and
 * shows a graceful fallback instead of a blank white screen.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <App />
 *   </ErrorBoundary>
 *
 * The reset button clears the error state so the user can retry without
 * refreshing the whole page.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.reset = this.reset.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // In production this is where you'd send to Sentry / Datadog.
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  reset() {
    this.setState({ error: null });
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div
        role="alert"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
          backgroundColor: "var(--bg-base)",
          color: "var(--text-body)",
          fontFamily: "Georgia, serif",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "2rem" }}>✦</p>
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "var(--text-heading)",
            fontFamily: "Georgia, serif",
          }}
        >
          The flame flickered — but it has not gone out.
        </h2>
        <p
          style={{
            maxWidth: "32rem",
            fontSize: "0.9rem",
            lineHeight: 1.85,
            color: "var(--text-muted)",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
          }}
        >
          "Even a brief glimpse of this practice is enough to free one from the greatest fear."
          <br />
          <span style={{ fontSize: "0.78rem", fontStyle: "normal" }}>
            — Bhagavad Gita 2.40
          </span>
        </p>
        <p
          style={{
            maxWidth: "32rem",
            fontSize: "0.875rem",
            lineHeight: 1.75,
            color: "var(--text-muted)",
            fontFamily: "Georgia, serif",
          }}
        >
          Something went wrong while rendering this page. The error has been logged.
          You can try recovering below — or simply reload. The teaching will still be here.
        </p>

        {/* Collapsed technical detail — useful for devs, hidden by default */}
        <details
          style={{
            maxWidth: "32rem",
            width: "100%",
            textAlign: "left",
            fontSize: "0.75rem",
            color: "var(--text-light)",
          }}
        >
          <summary
            style={{ cursor: "pointer", color: "var(--text-muted)" }}
          >
            Error detail
          </summary>
          <pre
            style={{
              marginTop: "0.5rem",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              backgroundColor: "var(--bg-raised)",
              overflowX: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {this.state.error.toString()}
          </pre>
        </details>

        <button
          onClick={this.reset}
          style={{
            marginTop: "0.5rem",
            padding: "0.625rem 1.5rem",
            borderRadius: "0.75rem",
            border: "1px solid var(--teal-dim)",
            backgroundColor: "var(--teal-bg)",
            color: "var(--teal)",
            fontSize: "0.875rem",
            cursor: "pointer",
          }}
        >
          Begin again
        </button>
      </div>
    );
  }
}
