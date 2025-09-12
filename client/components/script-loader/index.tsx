'use client'

import Script from 'next/script'

function ScriptLoader() {
  return (
    <Script
      src="/js/content.js"
      strategy="afterInteractive"
    />
  )
}
export default ScriptLoader
