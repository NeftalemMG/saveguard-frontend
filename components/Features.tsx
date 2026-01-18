'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Main Navigation Bar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'shadow-lg' : ''
        }`}
        style={{ 
          background: scrolled ? '#DBE64C' : '#DBE64C',
          backdropFilter: scrolled ? 'blur(10px)' : 'none'
        }}
      >
        <div className="relative">
          {/* Top accent line */}
          <div 
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: '#001F3F' }}
          />

          <div className="w-full px-6 lg:px-16 py-6">
            <div className="flex items-center justify-between max-w-[1800px] mx-auto">
              {/* Logo */}
              <Link href="/" className="relative group">
                <div className="relative">
                  <div 
                    className="text-3xl font-black tracking-tighter leading-none"
                    style={{ color: '#001F3F' }}
                  >
                    <div className="relative inline-block">
                      Save
                      <span 
                        className="absolute -right-2 -top-1 w-2 h-2 rounded-full"
                        style={{ background: '#00804C' }}
                      />
                    </div>
                    <div className="text-2xl -mt-1 ml-1">Guard</div>
                  </div>
                  {/* Underline accent */}
                  <div 
                    className="absolute -bottom-1 left-0 w-16 h-1 transition-all duration-300 group-hover:w-full"
                    style={{ background: '#74C365' }}
                  />
                </div>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-8">
                <Link 
                  href="/#work" 
                  className="relative pb-1 text-sm font-bold tracking-tight transition-colors group"
                  style={{ color: '#001F3F' }}
                >
                  <span className="relative">
                    How It Works
                    <span 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                      style={{ background: '#001F3F' }}
                    />
                  </span>
                </Link>
                
                <Link 
                  href="/dashboard" 
                  className="relative group overflow-hidden"
                >
                  <div className="relative px-6 py-3 font-bold text-sm tracking-tight transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: '#001F3F',
                      color: '#DBE64C',
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                    }}
                  >
                    Try Demo
                  </div>
                  <div 
                    className="absolute top-1 left-1 w-full h-full -z-10 transition-all duration-300 group-hover:top-2 group-hover:left-2"
                    style={{
                      background: '#74C365',
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                    }}
                  />
                </Link>
              </div>

              {/* Mobile burger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative w-12 h-12 flex items-center justify-center"
              >
                <div className="relative w-8 h-8">
                  <span 
                    className={`absolute top-1 left-0 w-full h-0.5 transition-all ${isOpen ? 'rotate-45 top-3.5' : ''}`}
                    style={{ background: '#001F3F' }}
                  />
                  <span 
                    className={`absolute top-3.5 left-0 w-full h-0.5 transition-all ${isOpen ? 'opacity-0' : ''}`}
                    style={{ background: '#001F3F' }}
                  />
                  <span 
                    className={`absolute top-6 left-0 w-3/4 h-0.5 transition-all ${isOpen ? '-rotate-45 top-3.5 w-full' : ''}`}
                    style={{ background: '#001F3F' }}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Bottom accent line */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: '#00804C' }}
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden" style={{ background: '#00804C' }}>
          {/* Background pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-5">
            <defs>
              <pattern id="mobile-grid" patternUnits="userSpaceOnUse" width="40" height="40">
                <circle cx="20" cy="20" r="1" fill="#F6F7ED"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mobile-grid)"/>
          </svg>

          <div className="relative h-full flex flex-col items-start justify-center px-8 space-y-8">
            <Link
              href="/#work"
              className="relative group"
              onClick={() => setIsOpen(false)}
            >
              <div 
                className="text-4xl font-black"
                style={{ color: '#F6F7ED' }}
              >
                How It
                <br />
                <span className="text-5xl ml-4" style={{ color: '#DBE64C' }}>Works</span>
              </div>
              <div 
                className="absolute -bottom-2 left-0 w-24 h-1"
                style={{ background: '#74C365' }}
              />
            </Link>
            
            <Link
              href="/dashboard"
              className="relative inline-block"
              onClick={() => setIsOpen(false)}
            >
              <div 
                className="px-8 py-4 text-2xl font-black"
                style={{
                  background: '#DBE64C',
                  color: '#001F3F',
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                }}
              >
                Try Demo
              </div>
              <div 
                className="absolute top-2 left-2 w-full h-full -z-10"
                style={{
                  background: '#74C365',
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                }}
              />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}