import React from 'react'
import Hero from './components/Hero'
import Quiz from './components/Quiz'
import Research from './components/Research'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-rose-50 to-pink-50 text-rose-900">
      <Hero />
      <main>
        <section className="py-8">
          <div className="max-w-3xl mx-auto text-center px-6">
            <p className="text-rose-800">
              Answer a short series of statements on a 1–7 scale. We won’t mention attachment labels until after you finish, so your answers stay unbiased.
            </p>
          </div>
        </section>
        <Quiz />
        <Research />
      </main>
      <footer className="py-8 text-center text-rose-600 text-sm">
        Built for reflection, not diagnosis. Take care of your heart.
      </footer>
    </div>
  )
}

export default App
