'use client'

import {
  MagnifyingGlassIcon,
  SparklesIcon,
  EnvelopeIcon,
  BoltIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: MagnifyingGlassIcon,
    title: 'Automatic Detection',
    description: 'Scans your transactions and identifies all recurring subscriptions.',
  },
  {
    icon: SparklesIcon,
    title: 'AI Analysis',
    description: 'Analyzes usage patterns and spots subscriptions you\'re not using.',
  },
  {
    icon: EnvelopeIcon,
    title: 'Autonomous Negotiation',
    description: 'Sends professional emails to negotiate lower rates on your behalf.',
  },
  {
    icon: BoltIcon,
    title: 'One-Click Cancel',
    description: 'Cancel unwanted subscriptions instantly. We handle everything.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-xl text-gray-600">
            SaveGuard operates autonomously to protect your finances
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#8B7355] to-[#5D4E37] rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}