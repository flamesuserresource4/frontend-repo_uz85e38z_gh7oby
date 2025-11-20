import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Soft pink/red gradient overlay for love vibe; pointer-events-none so Spline stays interactive */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-pink-200/40 via-rose-200/30 to-rose-300/40 mix-blend-multiply" />
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-rose-900 drop-shadow-sm">
            Find Your Attachment Pattern
          </h1>
          <p className="mt-4 text-rose-800/90 md:text-lg">
            A blind, research‑grounded quiz about how you connect. No labels until the end.
          </p>
        </div>
      </div>
    </section>
  )
}
