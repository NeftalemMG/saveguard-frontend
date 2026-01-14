'use client'

import Link from 'next/link'
import { CheckIcon } from '@heroicons/react/24/solid'

const plans = [
  {
    name: 'Free',
    price: '0',
    features: [
      'Up to 5 subscriptions',
      'Basic monitoring',
      'Email notifications',
    ],
  },
  {
    name: 'Pro',
    price: '9.99',
    popular: true,
    features: [
      'Unlimited subscriptions',
      'AI-powered negotiation',
      'Automated cancellation',
      'Priority support',
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Simple pricing
          </h2>
          <p className="text-xl text-gray-600">
            Start free. Upgrade when ready.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card rounded-2xl p-8 ${
                plan.popular ? 'ring-2 ring-gray-900' : ''
              }`}
            >
              {plan.popular && (
                <div className="text-xs font-semibold text-gray-900 mb-4">
                  MOST POPULAR
                </div>
              )}
              
              <div className="mb-8">
                <div className="text-2xl font-bold mb-1">{plan.name}</div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <CheckIcon className="w-5 h-5 text-[#8B7355] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/dashboard"
                className={`block w-full py-3 text-center rounded-lg font-medium ${
                  plan.popular
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'glass-card hover:bg-gray-50'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}