import React, { useEffect, useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [scale, setScale] = useState(null)
  const [answers, setAnswers] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API_BASE}/api/questions`)
      const data = await res.json()
      setQuestions(data.questions)
      setScale(data.scale)
    }
    load()
  }, [])

  const progress = useMemo(() => {
    if (!questions.length) return 0
    const answered = Object.keys(answers).length
    return Math.round((answered / questions.length) * 100)
  }, [answers, questions])

  const onChange = (qid, value) => {
    setAnswers(prev => ({ ...prev, [qid]: Number(value) }))
  }

  const canSubmit = useMemo(() => {
    return questions.length > 0 && Object.keys(answers).length === questions.length
  }, [answers, questions])

  const handleSubmit = async () => {
    if (!canSubmit) return
    setSubmitting(true)
    setResult(null)
    try {
      const payload = {
        answers: Object.entries(answers).map(([question_id, score]) => ({ question_id, score })),
        meta: { userAgent: navigator.userAgent }
      }
      const res = await fetch(`${API_BASE}/api/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  if (!questions.length) {
    return (
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="h-3 w-full bg-rose-100 rounded-full overflow-hidden">
            <div className="h-full w-1/3 animate-pulse bg-rose-300" />
          </div>
          <p className="mt-4 text-rose-700">Loading questions…</p>
        </div>
      </section>
    )
  }

  if (result) {
    return (
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-rose-100 p-6 md:p-8">
          <h2 className="text-3xl font-bold text-rose-900">Your Attachment Style</h2>
          <p className="mt-2 text-rose-700">Based on your responses across two research-backed dimensions.</p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="bg-rose-50 rounded-xl p-4">
              <p className="text-sm text-rose-600">Style</p>
              <p className="text-2xl font-semibold text-rose-900">{result.style}</p>
              <p className="mt-1 text-rose-700">Prevalence: {result.prevalence}</p>
            </div>
            <div className="bg-rose-50 rounded-xl p-4">
              <p className="text-sm text-rose-600">Scores (1–7)</p>
              <p className="text-rose-900">Anxiety: <span className="font-semibold">{result.anxiety_score}</span></p>
              <p className="text-rose-900">Avoidance: <span className="font-semibold">{result.avoidance_score}</span></p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-rose-900">What you can do</h3>
            <ul className="mt-2 list-disc pl-6 space-y-1 text-rose-800">
              {result.recommendations.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-xl bg-rose-50 p-4 text-rose-700">
            <p className="text-sm">{result.explanation}</p>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button onClick={() => { setAnswers({}); setResult(null); }} className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white transition">Retake quiz</button>
            <a href="#research" className="text-rose-700 underline">See research sources</a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-rose-900 font-medium">Progress</p>
            <p className="text-rose-700 text-sm">{progress}%</p>
          </div>
          <div className="h-3 w-full bg-rose-100 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Questions */}
        <div className="bg-white rounded-2xl shadow-lg border border-rose-100 p-4 md:p-8">
          <ol className="space-y-6">
            {questions.map((q, idx) => (
              <li key={q.id} className="border-b last:border-none border-rose-100 pb-6">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-700 text-sm font-semibold">{idx + 1}</span>
                  <p className="text-rose-900 font-medium">{q.text}</p>
                </div>
                <div className="mt-3 grid grid-cols-7 gap-2">
                  {Array.from({ length: 7 }).map((_, i) => {
                    const val = i + 1
                    const selected = answers[q.id] === val
                    return (
                      <button
                        key={val}
                        onClick={() => onChange(q.id, val)}
                        className={`h-10 rounded-lg border transition-all ${selected ? 'bg-rose-600 text-white border-rose-600' : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200'}`}
                        aria-label={`Select ${val} for question ${idx + 1}`}
                      >
                        {val}
                      </button>
                    )
                  })}
                </div>
                {scale && (
                  <div className="mt-2 flex items-center justify-between text-xs text-rose-600">
                    <span>{scale.labels[1]}</span>
                    <span>{scale.labels[4]}</span>
                    <span>{scale.labels[7]}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>

          <div className="mt-8 flex items-center justify-end">
            <button
              disabled={!canSubmit || submitting}
              onClick={handleSubmit}
              className={`px-6 py-3 rounded-full text-white font-semibold transition ${canSubmit ? 'bg-rose-600 hover:bg-rose-700' : 'bg-rose-300 cursor-not-allowed'}`}
            >
              {submitting ? 'Scoring…' : 'See my results'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
