import React, { Component } from 'react'
import { RotateCcw, AlertTriangle } from 'lucide-react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Fayrouz ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    if (this.props.onReset) {
      this.props.onReset()
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full max-w-2xl mx-auto my-12 p-6 rounded-3xl bg-gradient-to-b from-[#241a15] to-[#140e0b] border-2 border-fayrouz-amber/40 shadow-2xl flex flex-col items-center text-center text-fayrouz-cream">
          <div className="w-14 h-14 rounded-2xl bg-amber-950/60 border border-amber-500/50 flex items-center justify-center text-amber-300 mb-4 shadow-amber-glow">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-serif font-bold text-fayrouz-cream mb-1">
            Display Synchronizer Recovered
          </h3>
          <p className="text-xs text-fayrouz-foam/80 max-w-md mb-4 leading-relaxed">
            The presentation viewport encountered a layout transition mismatch. Your profile and order tray data remain safe.
          </p>
          <div className="p-3 rounded-xl bg-black/40 border border-fayrouz-border/60 text-[11px] font-mono text-fayrouz-amber mb-6 max-w-full overflow-x-auto text-left">
            {this.state.error?.message || 'Unknown render interruption'}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={this.handleReset}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian font-serif font-bold text-xs flex items-center gap-2 shadow-amber-glow cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Recover & Return to Dual Pitch</span>
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
