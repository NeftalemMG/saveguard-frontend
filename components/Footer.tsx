'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: '#00804C' }}>

      {/* FULL WIDTH - Removed max-w constraint */}
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 py-20">
        
        {/* Top section - Asymmetric layout */}
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          
          {/* Left - Brand (larger) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative inline-block">
              <h3 
                className="text-5xl font-bold tracking-tight"
                style={{ color: '#F6F7ED' }}
              >
                SaveGuard
              </h3>
              {/* Scribble underline - changed to yellow */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="12"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M 5,6 Q 75,3 150,6 T 295,6"
                  stroke="#DBE64C"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            <p 
              className="max-w-sm leading-relaxed"
              style={{ color: '#F6F7ED', opacity: 0.9 }}
            >
              Stop wasting money on subscriptions you don&apos;t use. AI-powered management
              for Canadians.
            </p>

            {/* Badge with dark blue background */}
            <div 
              className="inline-block px-6 py-3 text-sm font-bold rounded-lg"
              style={{
                background: '#001F3F',
                color: '#DBE64C',
              }}
            >
              🇨🇦 Built in Canada
            </div>
          </div>

          {/* Right - Links in unique boxes */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Dashboard'] },
              { title: 'Company', links: ['About', 'Blog'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
            ].map((section) => (
              <div 
                key={section.title}
                className="relative"
              >
                {/* Corner accent - changed to yellow */}
                <div 
                  className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2"
                  style={{ borderColor: '#DBE64C' }}
                />
                
                <div className="pt-4">
                  <h4 
                    className="text-sm font-bold mb-4 tracking-tight"
                    style={{ color: '#DBE64C' }}
                  >
                    {section.title}
                  </h4>
                  <div className="space-y-3">
                    {section.links.map((link) => (
                      <div key={link}>
                        <Link
                          href={`/${link.toLowerCase()}`}
                          className="text-sm transition-colors block group"
                          style={{ color: 'rgba(246, 247, 237, 0.8)' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#DBE64C'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(246, 247, 237, 0.8)'}
                        >
                          <span className="inline-block group-hover:translate-x-1 transition-transform">
                            → {link}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider with unique pattern - updated colors, more bars for full width */}
        <div className="relative h-1 mb-12">
          <div className="absolute inset-0 flex gap-2">
            {[...Array(40)].map((_, i) => (
              <div 
                key={i} 
                style={{
                  flex: 1,
                  background: i % 3 === 0 ? '#DBE64C' : i % 2 === 0 ? '#74C365' : '#001F3F',
                  height: i % 3 === 0 ? '100%' : i % 2 === 0 ? '60%' : '30%',
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Copyright */}
          <div 
            className="text-sm"
            style={{ color: 'rgba(246, 247, 237, 0.7)' }}
          >
            © 2025 SaveGuard.
          </div>

          {/* Social - Dark blue buttons with yellow text */}
          <div className="flex items-center gap-4">
            {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
              <Link
                key={social}
                href={`#${social.toLowerCase()}`}
                className="px-6 py-3 text-sm font-bold transition-all duration-300 rounded-lg hover:scale-105"
                style={{ 
                  background: '#001F3F',
                  color: '#DBE64C',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1E488F'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#001F3F'}
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}