import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class RootErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('MySoulTrip render error:', error, info)
  }

  render() {
    if (!this.state.error) {
      return this.props.children
    }

    return (
      <div className="min-h-screen bg-[#f7fcff] px-6 py-10 text-navy-900">
        <div className="mx-auto max-w-3xl rounded-3xl border border-red-200 bg-white p-6 shadow-lg">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-500">Render Error</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-navy-900">
            The homepage hit a runtime error.
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            The app is loading, but one component crashed while rendering. The browser console will
            have the full stack trace.
          </p>
          <pre className="mt-5 overflow-x-auto rounded-2xl bg-navy-900 p-4 text-xs leading-6 text-white">
            {String(this.state.error?.stack || this.state.error?.message || this.state.error)}
          </pre>
        </div>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element "#root" was not found in index.html.')
}

createRoot(rootElement).render(
  <StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </StrictMode>,
)
