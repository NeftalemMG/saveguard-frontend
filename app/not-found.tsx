'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360)
    }, 20)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Navigation />
      
      <div 
        className="min-h-screen flex items-center justify-center px-8 relative overflow-hidden pt-24"
        style={{ background: '#00804C' }}
      >

        <div className="relative z-10 text-center max-w-3xl">
          {/* 404 Sign - Creative Design */}
          <div className="mb-12 relative inline-block">
            {/* Main 404 */}
            <div className="relative">
              <div 
                className="text-[200px] font-black leading-none"
                style={{ color: '#DBE64C' }}
              >
                4
                <span 
                  className="inline-block mx-4"
                  style={{ 
                    color: '#F6F7ED',
                    transform: `rotate(${rotation / 2}deg)`,
                    display: 'inline-block'
                  }}
                >
                  0
                </span>
                4
              </div>
              
              {/* Scribble decoration */}
              <svg 
                className="absolute -bottom-8 left-0 w-full"
                height="20"
                viewBox="0 0 600 20"
                fill="none"
              >
                <path
                  d="M 10,10 Q 150,5 300,10 T 590,10"
                  stroke="#74C365"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="10 5"
                />
              </svg>
            </div>
          </div>

          {/* Funny One-Liner */}
          <h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: '#F6F7ED' }}
          >
            Looks like this page is{' '}
            <span className="sketch-underline-yellow">cancelled</span>
          </h1>

          <p 
            className="text-xl mb-12 leading-relaxed"
            style={{ color: '#F6F7ED', opacity: 0.8 }}
          >
            Unlike your subscriptions, this page doesn&apos;t exist.<br />
            (But we can help you cancel the ones that do!)
          </p>

          {/* Single CTA Button */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="group relative px-8 py-4 text-base font-bold overflow-hidden transition-all duration-300"
              style={{
                background: '#DBE64C',
                color: '#001F3F',
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
              }}
            >
              <span className="relative z-10">Go Home →</span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: '#74C365' }}
              />
            </Link>
          </div>

          {/* Fun stats */}
          <div 
            className="mt-16 p-8 inline-block"
            style={{
              background: 'rgba(246, 247, 237, 0.05)',
              border: '2px solid rgba(246, 247, 237, 0.2)',
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
            }}
          >
            <div 
              className="text-sm font-bold mb-2"
              style={{ color: '#DBE64C' }}
            >
              404 Fun Fact
            </div>
            <p 
              className="text-sm"
              style={{ color: '#F6F7ED', opacity: 0.7 }}
            >
              While you were looking for this page, you probably spent $2.34<br />
              on subscriptions you forgot about. We can fix that.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}