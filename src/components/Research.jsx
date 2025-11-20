import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function Research() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API_BASE}/api/research`)
      const d = await res.json()
      setData(d)
    }
    load()
  }, [])

  return (
    <section id="research" className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-rose-100 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-rose-900">Where these questions come from</h2>
          <p className="mt-2 text-rose-700">This quiz adapts items from established research so you aren’t primed by labels while answering. Labels are only revealed at the end.</p>

          {!data ? (
            <p className="mt-4 text-rose-700">Loading sources…</p>
          ) : (
            <ul className="mt-4 space-y-4">
              {data.sources.map((s, i) => (
                <li key={i} className="p-4 rounded-xl bg-rose-50">
                  <p className="text-rose-900 font-medium">{s.title}</p>
                  <p className="text-rose-700 text-sm">{s.authors} ({s.year})</p>
                  <a href={s.url} target="_blank" className="text-rose-700 underline text-sm">View source</a>
                  {s.note && <p className="text-rose-700 text-sm mt-1">{s.note}</p>}
                </li>
              ))}
            </ul>
          )}

          {data && data.disclaimer && (
            <p className="mt-6 text-rose-700 text-sm">{data.disclaimer}</p>
          )}
        </div>
      </div>
    </section>
  )
}
