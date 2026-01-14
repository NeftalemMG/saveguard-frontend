'use client'

// Only show real, verifiable stats or remove this component entirely
const stats = [
  {
    value: 'Open Source',
    label: 'Built in public',
  },
  {
    value: 'Canadian',
    label: 'Data stored in Canada',
  },
  {
    value: 'Free Trial',
    label: 'No credit card required',
  },
]

export default function Stats() {
  return (
    <section className="py-16 px-6 border-y border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}