"use client"

import { Suspense } from "react"

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Sorry, the page you're looking for cannot be found.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-md bg-primary text-white"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </Suspense>
  )
}