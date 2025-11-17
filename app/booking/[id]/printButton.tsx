"use client" // This tells Next.js this is browser code

import React from 'react'

export default function PrintButton() {
  // This is safe because it's a client component
  return (
    <button onClick={() => window.print()}>
      Print
    </button>
  )
}