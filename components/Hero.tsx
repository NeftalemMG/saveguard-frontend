'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [dots, setDots] = useState<Array<{top: string, left: string, bg: string, delay: string, duration: string}>>([])

  useEffect(() => {
    const generatedDots = [...Array(30)].map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      bg: i % 3 === 0 ? '#74C365' : i % 3 === 1 ? '#F6F7ED' : '#DBE64C',
      delay: `${i * 0.2}s`,
      duration: `${3 + Math.random() * 2}s`
    }))
    setDots(generatedDots)
  }, [])

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #001F3F 0%, #1E488F 100%)' }}
    >
      {/* Animated geometric background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-5" style={{ mixBlendMode: 'overlay' }}>
          <defs>
            <pattern id="stripes" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(45)">
              <rect width="30" height="60" fill="#F6F7ED"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stripes)"/>
        </svg>

        {/* Floating dots */}
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-float"
            style={{
              background: dot.bg,
              top: dot.top,
              left: dot.left,
              opacity: 0.2,
              animationDelay: dot.delay,
              animationDuration: dot.duration
            }}
          />
        ))}
      </div>

      {/* Content - Full Width */}
      <div className="w-full relative z-10 px-8 md:px-16 lg:px-24 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-[1800px] mx-auto">
          
          {/* Left - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div 
                className="text-sm font-medium tracking-wider uppercase"
                style={{ color: '#DBE64C' }}
              >
                For Canadians
              </div>
              <h1 
                className="text-6xl lg:text-8xl font-bold tracking-tight leading-none"
                style={{ color: '#F6F7ED' }}
              >
                Stop
                <br />
                <span className="sketch-underline-yellow-bright">wasting</span>
                <br />
                money
              </h1>
            </div>

            <p 
              className="text-xl max-w-md leading-relaxed"
              style={{ color: '#F6F7ED', opacity: 0.9 }}
            >
              AI agent that automatically detects, negotiates, and cancels
              wasteful subscriptions from your bank transactions
            </p>

            <div className="pt-4">
              <Link
                href="/connect"
                className="group relative inline-block px-8 py-4 text-base font-bold overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  background: '#DBE64C',
                  color: '#001F3F',
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                }}
              >
                <span className="relative z-10">Connect Your Bank →</span>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: '#74C365' }}
                />
              </Link>
            </div>

            <div 
              className="pt-8 text-sm space-y-2"
              style={{ color: '#F6F7ED', opacity: 0.8 }}
            >
              {[
                'Bank-level security via Interac',
                'Canadian data storage only',
                'No credit card required'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div 
                    className="w-1 h-1 rounded-full"
                    style={{ background: '#74C365' }}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Modernized Savings Card */}
          <div className="relative group">
            <div 
              className="relative p-8 space-y-6 backdrop-blur-md border-2 transition-all duration-300 group-hover:scale-[1.02]"
              style={{
                background: 'rgba(246, 247, 237, 0.05)',
                borderColor: 'rgba(246, 247, 237, 0.2)',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Header with animated badge */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div 
                    className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full"
                    style={{ 
                      background: 'rgba(219, 230, 76, 0.2)',
                      color: '#DBE64C',
                      border: '1px solid rgba(219, 230, 76, 0.3)'
                    }}
                  >
                    In Action
                  </div>
                  <div 
                    className="text-sm font-medium"
                    style={{ color: '#F6F7ED', opacity: 0.8 }}
                  >
                    Your Potential Savings
                  </div>
                  <div 
                    className="text-5xl font-black"
                    style={{ color: '#F6F7ED' }}
                  >
                    $847.50
                  </div>
                  <div 
                    className="text-xs"
                    style={{ color: '#DBE64C' }}
                  >
                    per year on average
                  </div>
                </div>
                
                {/* Animated pulse indicator */}
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: '#74C365' }}
                  />
                  <span 
                    className="text-xs font-medium"
                    style={{ color: '#74C365' }}
                  >
                    Analyzing...
                  </span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Detected', value: '7', color: '#F6F7ED' },
                  { label: 'Wasteful', value: '4', color: '#DBE64C' },
                  { label: 'Savings', value: '$71/mo', color: '#74C365' }
                ].map((stat, i) => (
                  <div 
                    key={i}
                    className="text-center p-3 rounded-xl"
                    style={{ 
                      background: 'rgba(246, 247, 237, 0.05)',
                      border: '1px solid rgba(246, 247, 237, 0.1)'
                    }}
                  >
                    <div 
                      className="text-2xl font-black"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </div>
                    <div 
                      className="text-xs font-medium"
                      style={{ color: '#F6F7ED', opacity: 0.6 }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Subscription Items */}
              <div className="space-y-3">
                {[
                  { name: 'Netflix', amount: '$20.99', status: 'Unused 3mo', waste: true, urgency: 'high' },
                  { name: 'GoodLife Fitness', amount: '$64.99', status: 'Unused 4mo', waste: true, urgency: 'high' },
                  { name: 'Amazon Prime', amount: '$12.99', status: 'Low usage', waste: true, urgency: 'medium' },
                  { name: 'Spotify', amount: '$10.99', status: 'Active', waste: false, urgency: 'low' },
                  { name: 'Adobe CC', amount: '$29.99', status: 'Active', waste: false, urgency: 'low' }
                ].map((sub, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between text-sm p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                    style={{ 
                      background: sub.waste 
                        ? 'rgba(219, 230, 76, 0.1)' 
                        : 'rgba(246, 247, 237, 0.03)',
                      border: `1px solid ${sub.waste ? 'rgba(219, 230, 76, 0.3)' : 'rgba(246, 247, 237, 0.1)'}`,
                      boxShadow: sub.waste ? '0 4px 12px rgba(219, 230, 76, 0.1)' : 'none'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Status indicator */}
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ 
                          background: sub.urgency === 'high' ? '#FF6B6B' : 
                                     sub.urgency === 'medium' ? '#DBE64C' : '#74C365'
                        }}
                      />
                      <div>
                        <div 
                          className="font-medium"
                          style={{ color: '#F6F7ED' }}
                        >
                          {sub.name}
                        </div>
                        <div 
                          className="text-xs"
                          style={{ 
                            color: sub.waste ? '#DBE64C' : 'rgba(246, 247, 237, 0.6)' 
                          }}
                        >
                          {sub.status}
                        </div>
                      </div>
                    </div>
                    <div 
                      className="font-mono font-bold"
                      style={{ color: sub.waste ? '#DBE64C' : '#F6F7ED' }}
                    >
                      {sub.amount}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA at bottom */}
              <div 
                className="pt-4 border-t"
                style={{ borderColor: 'rgba(246, 247, 237, 0.1)' }}
              >
                <div 
                  className="text-xs text-center font-medium"
                  style={{ color: '#F6F7ED', opacity: 0.6 }}
                >
                  Connect your bank to see your actual subscriptions →
                </div>
              </div>
            </div>

            {/* Decorative corner accent */}
            <div 
              className="absolute -bottom-4 -right-4 w-20 h-20 border-4 rounded-tl-2xl"
              style={{ 
                borderColor: '#74C365',
                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div 
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2"
          style={{ borderColor: '#F6F7ED', opacity: 0.3 }}
        >
          <div 
            className="w-1 h-2 rounded-full"
            style={{ background: '#F6F7ED' }}
          />
        </div>
      </div>
    </section>
  )
}