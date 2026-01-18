'use client'

import Navigation from '@/components/Navigation'
import PlaidLink from '@/components/PlaidLink'
import { useState, useEffect } from 'react'

export default function ConnectPage() {
  const [step, setStep] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 30,
        y: (e.clientY / window.innerHeight) * 30
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const steps = [
    'Connect Bank',
    'AI Scans',
    'Get Insights',
    'Save Money'
  ]

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#F6F7ED' }}>
      <Navigation />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 border-4 rounded-full opacity-5"
          style={{ 
            borderColor: '#00804C',
            top: '20%',
            right: '-100px',
            transform: `rotate(${mousePosition.x}deg)`
          }}
        />
        <div 
          className="absolute w-64 h-64 border-4 opacity-5"
          style={{ 
            borderColor: '#DBE64C',
            bottom: '10%',
            left: '-50px',
            transform: `rotate(${-mousePosition.y}deg)`
          }}
        />
        
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <pattern id="connect-grid" patternUnits="userSpaceOnUse" width="100" height="100">
              <circle cx="50" cy="50" r="2" fill="#001F3F"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#connect-grid)"/>
        </svg>
      </div>

      {/* Main content - FULL WIDTH */}
      <div className="relative z-10 min-h-screen flex items-center w-full px-8 md:px-16 lg:px-24 pt-32 pb-16">
        <div className="w-full max-w-[1800px] mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 
              className="text-6xl lg:text-8xl font-black tracking-tight mb-6"
              style={{ color: '#001F3F' }}
            >
              Connect Your{' '}
              <span className="sketch-underline-montis">Bank</span>
            </h1>
            
            <p 
              className="text-2xl max-w-3xl mx-auto leading-relaxed mb-12"
              style={{ color: '#001F3F', opacity: 0.7 }}
            >
              We use Interac's secure infrastructure to analyze your subscriptions.<br />
              Your credentials are never stored. Setup takes 60 seconds.
            </p>

            {/* PlaidLink Component */}
            <div className="mb-12">
              <PlaidLink />
            </div>

            {/* Trust badges - NO EMOJIS */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {[
                { label: '256-bit Encryption', icon: <LockIcon /> },
                { label: 'Canadian Data Storage', icon: <MapleLeafIcon /> },
                { label: 'Read-Only Access', icon: <EyeIcon /> },
              ].map((badge, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-3 px-5 py-3 rounded-lg font-medium"
                  style={{ 
                    background: 'rgba(116, 195, 101, 0.1)',
                    color: '#00804C',
                    border: '1px solid rgba(116, 195, 101, 0.3)'
                  }}
                >
                  <div style={{ color: '#00804C' }}>
                    {badge.icon}
                  </div>
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works Timeline */}
          <div className="mb-20">
            <h2 
              className="text-3xl font-bold text-center mb-12"
              style={{ color: '#001F3F' }}
            >
              What Happens Next
            </h2>

            <div className="grid md:grid-cols-4 gap-6 relative">
              <div 
                className="hidden md:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2"
                style={{ 
                  background: 'linear-gradient(90deg, #DBE64C 0%, #74C365 50%, #00804C 100%)',
                  opacity: 0.3,
                  zIndex: 0
                }}
              />

              {steps.map((stepName, i) => (
                <div 
                  key={i}
                  className="relative z-10 p-8 text-center group cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    background: step === i ? '#00804C' : 'rgba(0, 128, 76, 0.05)',
                    border: '2px solid',
                    borderColor: step === i ? '#00804C' : 'rgba(0, 128, 76, 0.2)',
                    borderRadius: '16px'
                  }}
                  onMouseEnter={() => setStep(i)}
                >
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-black"
                    style={{
                      background: step === i ? '#DBE64C' : 'rgba(219, 230, 76, 0.2)',
                      color: step === i ? '#001F3F' : '#00804C'
                    }}
                  >
                    {i + 1}
                  </div>
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ color: step === i ? '#F6F7ED' : '#001F3F' }}
                  >
                    {stepName}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: step === i ? 'rgba(246, 247, 237, 0.8)' : 'rgba(0, 31, 63, 0.6)' }}
                  >
                    {i === 0 && 'Secure Interac connection to your bank'}
                    {i === 1 && 'AI analyzes 90 days of transactions'}
                    {i === 2 && 'Identify wasteful subscriptions'}
                    {i === 3 && 'Negotiate or cancel automatically'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* What We Analyze Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div 
              className="p-10 rounded-2xl"
              style={{
                background: 'rgba(0, 128, 76, 0.05)',
                border: '2px solid rgba(0, 128, 76, 0.2)'
              }}
            >
              <div 
                className="text-sm font-bold tracking-wider uppercase mb-6"
                style={{ color: '#00804C' }}
              >
                What We Analyze
              </div>
              
              <div className="space-y-4">
                {[
                  { text: 'Last 90 days of transactions', icon: <ChartIcon />, color: '#DBE64C' },
                  { text: 'Recurring payment patterns', icon: <RepeatIcon />, color: '#74C365' },
                  { text: 'Merchant categorization', icon: <StoreIcon />, color: '#00804C' },
                  { text: 'Spending trends & anomalies', icon: <TrendIcon />, color: '#DBE64C' },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-4 p-4 rounded-lg group hover:translate-x-2 transition-all duration-300"
                    style={{ background: 'rgba(246, 247, 237, 0.5)' }}
                  >
                    <div 
                      className="w-12 h-12 flex items-center justify-center rounded-lg"
                      style={{ background: `${item.color}20`, color: item.color }}
                    >
                      {item.icon}
                    </div>
                    <div 
                      className="font-medium"
                      style={{ color: '#001F3F' }}
                    >
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div 
              className="p-10 rounded-2xl"
              style={{
                background: 'rgba(30, 72, 143, 0.05)',
                border: '2px solid rgba(30, 72, 143, 0.2)'
              }}
            >
              <div 
                className="text-sm font-bold tracking-wider uppercase mb-6"
                style={{ color: '#1E488F' }}
              >
                What We Never See
              </div>
              
              <div className="space-y-4">
                {[
                  { text: 'Your banking password', icon: <LockIcon />, color: '#1E488F' },
                  { text: 'Full credit card numbers', icon: <CardIcon />, color: '#001F3F' },
                  { text: 'Account balances', icon: <BankIcon />, color: '#1E488F' },
                  { text: 'Personal identification info', icon: <UserIcon />, color: '#001F3F' },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-4 p-4 rounded-lg opacity-60"
                    style={{ background: 'rgba(246, 247, 237, 0.5)' }}
                  >
                    <div 
                      className="w-12 h-12 flex items-center justify-center rounded-lg"
                      style={{ background: `${item.color}10`, color: item.color }}
                    >
                      {item.icon}
                    </div>
                    <div 
                      className="font-medium line-through"
                      style={{ color: '#001F3F' }}
                    >
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div 
            className="p-12 rounded-2xl text-center"
            style={{
              background: 'linear-gradient(135deg, #00804C 0%, #74C365 100%)'
            }}
          >
            <h3 
              className="text-3xl font-black mb-4"
              style={{ color: '#F6F7ED' }}
            >
              Ready to Save $500+ Per Year?
            </h3>
            <p 
              className="text-lg mb-8"
              style={{ color: '#F6F7ED', opacity: 0.9 }}
            >
              Join thousands of Canadians who've already stopped wasting money
            </p>
            <PlaidLink />
          </div>

        </div>
      </div>
    </div>
  )
}

// Custom SVG Icons
function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

function MapleLeafIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L10 8L6 6L8 12L2 12L8 16L6 22L12 18L18 22L16 16L22 12L16 12L18 6L14 8L12 2Z"/>
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )
}

function RepeatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="17 1 21 5 17 9"/>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
      <polyline points="7 23 3 19 7 15"/>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  )
}

function StoreIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}

function TrendIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  )
}

function CardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  )
}

function BankIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="22" x2="21" y2="22"/>
      <path d="M6 18V11"/>
      <path d="M10 18V11"/>
      <path d="M14 18V11"/>
      <path d="M18 18V11"/>
      <polygon points="12 2 20 7 4 7"/>
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}