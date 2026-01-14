'use client'

const steps = [
  {
    number: '01',
    title: 'Connect Your Bank',
    description: 'Link your account securely through Interac.',
  },
  {
    number: '02',
    title: 'AI Scans Transactions',
    description: 'Identifies all recurring subscriptions automatically.',
  },
  {
    number: '03',
    title: 'Set Your Rules',
    description: 'Define when to cancel or negotiate subscriptions.',
  },
  {
    number: '04',
    title: 'Agent Takes Action',
    description: 'Negotiates and cancels on your behalf.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Get started in minutes
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-5xl font-bold text-gray-200 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}