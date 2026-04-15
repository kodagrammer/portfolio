import ReactDOMServer from 'react-dom/server'
import App from './App.jsx'

export function render(url, ssrPostContent) {
  globalThis.__SSR_URL__ = url
  globalThis.__SSR_POST_CONTENT__ = ssrPostContent ?? null
  return ReactDOMServer.renderToString(<App />)
}
