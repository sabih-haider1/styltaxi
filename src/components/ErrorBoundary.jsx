import { Component } from 'react'
import i18n from '../i18n'

const COPY = {
  en: { title: 'Something went wrong', text: 'An unexpected error occurred. Please reload the page.', button: 'Reload page' },
  es: { title: 'Algo ha salido mal', text: 'Ha ocurrido un error inesperado. Por favor, recarga la página.', button: 'Recargar página' },
  ca: { title: 'Alguna cosa ha fallat', text: "S'ha produït un error inesperat. Si us plau, recarrega la pàgina.", button: 'Recarregar pàgina' },
}

/** Last line of defence: a friendly recovery screen instead of a blank page. */
export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('[StylTaxi] render error:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    const lang = (i18n.language || 'en').slice(0, 2)
    const copy = COPY[lang] || COPY.en
    return (
      <main className="flex min-h-svh items-center justify-center bg-ink-950 px-4 text-center">
        <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 p-10">
          <img src="/logo-160.png" alt="StylTaxi" className="mx-auto h-14 w-14" />
          <h1 className="mt-6 font-display text-2xl font-bold text-white">{copy.title}</h1>
          <p className="mt-3 text-white/60">{copy.text}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-8 cursor-pointer rounded-full bg-brand-700 px-8 py-3.5 font-display font-semibold text-white transition-colors hover:bg-brand-800"
          >
            {copy.button}
          </button>
        </div>
      </main>
    )
  }
}
