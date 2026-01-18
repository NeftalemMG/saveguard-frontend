'use client'

import Link from 'next/link'

const steps = [
  {
    title: 'Connect Bank',
    desc: 'Link your account securely via Interac - we only read transaction data, never touch your money',
  },
  {
    title: 'AI Scans',
    desc: 'Analyzes 90 days of transactions and automatically detects all recurring subscription patterns',
  },
  {
    title: 'Track Usage',
    desc: 'AI monitors which services you actually use and calculates a usage score for each subscription',
  },
  {
    title: 'Agent Acts',
    desc: 'Automatically generates negotiation emails for overpriced subscriptions or recommends cancellations for unused ones',
  },
]

export default function HowItWorks() {
  return (
    <section 
      id="work" 
      className="relative py-32 px-8 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: '#F6F7ED' }}
    >
      {/* Background pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <defs>
          <pattern id="work-pattern" patternUnits="userSpaceOnUse" width="80" height="80">
            <rect width="2" height="80" fill="#00804C"/>
            <rect width="80" height="2" fill="#00804C"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#work-pattern)"/>
      </svg>

      <div className="relative max-w-[1400px] mx-auto">
        <div className="mb-20">
          <h2 
            className="text-5xl font-bold tracking-tight mb-6"
            style={{ color: '#001F3F' }}
          >
            Setup takes
            <br />
            <span className="sketch-underline-montis">2 minutes</span>
          </h2>
          <p 
            className="text-xl max-w-2xl"
            style={{ color: '#001F3F', opacity: 0.7 }}
          >
            No complicated setup, no forms to fill. Just connect and start saving.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="relative p-8 group"
              style={{
                background: 'rgba(0, 128, 76, 0.05)',
                border: '2px solid rgba(0, 128, 76, 0.2)',
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
              }}
            >
              {/* Step number */}
              <div 
                className="absolute -top-4 -left-4 w-16 h-16 flex items-center justify-center font-black text-3xl"
                style={{
                  background: '#DBE64C',
                  color: '#001F3F',
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)'
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="pt-6">
                <h3 
                  className="text-3xl font-bold mb-3"
                  style={{ color: '#001F3F' }}
                >
                  {step.title}
                </h3>
                <p 
                  className="text-lg jp-spacing leading-relaxed"
                  style={{ color: '#001F3F', opacity: 0.7 }}
                >
                  {step.desc}
                </p>
              </div>

              {/* Hover accent */}
              <div 
                className="absolute bottom-0 right-0 w-0 h-1 group-hover:w-1/2 transition-all duration-300"
                style={{ background: '#00804C' }}
              />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div 
          className="pt-16 border-t-4 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{ borderColor: 'rgba(0, 128, 76, 0.2)' }}
        >
          <div>
            <h3 
              className="text-3xl font-bold mb-2"
              style={{ color: '#001F3F' }}
            >
              Ready to stop wasting money?
            </h3>
            <p 
              className="text-lg"
              style={{ color: '#001F3F', opacity: 0.6 }}
            >
              Connect your bank via Interac to get started
            </p>
          </div>
          
          <div className="flex gap-4">
            <Link
              href="/connect"
              className="group relative px-8 py-4 text-base font-bold overflow-hidden transition-all duration-300"
              style={{
                background: '#00804C',
                color: '#DBE64C',
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
              }}
            >
              <span className="relative z-10">Get Started →</span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: '#74C365' }}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}