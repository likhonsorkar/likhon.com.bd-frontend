export function AppLoader({ text = 'Loading…' }) {
  return (
    <div className="app-loader">
      <div className="app-loader__mark">
        <span className="app-loader__ring" />
        <img src="/assets/logo.png" alt="" />
      </div>
      <p>{text}</p>
    </div>
  )
}

export function AppError({ message, onRetry }) {
  return (
    <div className="app-loader app-loader--error">
      <div className="app-loader__mark app-loader__mark--error">!</div>
      <p>{message || "Something went wrong loading the site's content."}</p>
      <button type="button" className="btn btn--primary" onClick={onRetry}>
        Try Again
      </button>
    </div>
  )
}
