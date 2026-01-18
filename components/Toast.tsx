'use client'

import { useEffect } from 'react'

interface ToastProps {
  type: 'success' | 'error' | 'info'
  title: string
  message: string
  onClose: () => void
}

export default function Toast({ type, title, message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000) // Auto-close after 5 seconds

    return () => clearTimeout(timer)
  }, [onClose])

  const colors = {
    success: {
      bg: '#00804C',
      border: '#74C365',
      text: '#F6F7ED'
    },
    error: {
      bg: '#FF6B6B',
      border: '#E05555',
      text: '#FFFFFF'
    },
    info: {
      bg: '#1E488F',
      border: '#DBE64C',
      text: '#F6F7ED'
    }
  }

  const color = colors[type]

  return (
    <div 
      className="fixed top-24 right-8 z-50 animate-slide-in max-w-md"
      style={{
        background: color.bg,
        border: `3px solid ${color.border}`,
        borderRadius: '12px',
        clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
      }}
    >
      <div className="p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
          style={{
            background: 'rgba(0, 0, 0, 0.2)',
            color: color.text
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Icon */}
        <div className="mb-3">
          {type === 'success' && (
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: color.border }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color.bg} strokeWidth="3">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
          {type === 'error' && (
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: color.border }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round"/>
              </svg>
            </div>
          )}
          {type === 'info' && (
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: color.border }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color.bg} strokeWidth="3">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01" strokeLinecap="round"/>
              </svg>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 
          className="text-xl font-bold mb-2"
          style={{ color: color.text }}
        >
          {title}
        </h3>

        {/* Message */}
        <p 
          className="text-sm leading-relaxed"
          style={{ color: color.text, opacity: 0.9 }}
        >
          {message}
        </p>
      </div>

      {/* Progress bar */}
      <div 
        className="h-1 animate-shrink"
        style={{ 
          background: color.border,
          transformOrigin: 'left'
        }}
      />
    </div>
  )
}