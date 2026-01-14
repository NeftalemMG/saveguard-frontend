'use client'

import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  return (
    <section className="pt-32 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-8">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Stop paying for
            <br />
            <span className="gradient-text">subscriptions you don&apos;t use</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            AI agent that monitors, negotiates, and cancels wasteful subscriptions.
            Built for Canadians.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard"
              className="group px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 flex items-center space-x-2"
            >
              <span>Start Saving</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Simple trust line */}
          <p className="text-sm text-gray-500 pt-8">
            Powered by Interac • Bank-level security • Canadian infrastructure
          </p>
        </div>
      </div>
    </section>
  )
}