'use client'

import { useState } from 'react'
import type { Subscription } from '@/lib/supabase'

interface Props {
  subscription: Subscription
  onNegotiate: (id: string) => void
  onCancel: (id: string) => void
}

export default function SubscriptionCard({ subscription, onNegotiate, onCancel }: Props) {
  const [loading, setLoading] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleNegotiate = async () => {
    setLoading(true)
    await onNegotiate(subscription.id)
    setLoading(false)
  }

  const handleCancel = async () => {
    setCancelling(true)
    await onCancel(subscription.id)
    setCancelling(false)
  }

  const getUsageColor = (score: number) => {
    if (score > 70) return '#00804C'
    if (score > 40) return '#DBE64C'
    return '#FF6B6B'
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'rgba(0, 128, 76, 0.2)', borderColor: '#00804C', label: 'Active' }
      case 'negotiating':
        return { color: 'rgba(219, 230, 76, 0.2)', borderColor: '#DBE64C', label: 'Negotiating' }
      case 'cancelled':
        return { color: 'rgba(30, 72, 143, 0.2)', borderColor: '#1E488F', label: 'Cancelled' }
      default:
        return { color: 'rgba(0, 31, 63, 0.1)', borderColor: '#001F3F', label: status }
    }
  }

  const getAIInsight = () => {
    if (subscription.usage_score < 20) {
      return {
        text: `Barely used. Cancel ${subscription.merchant} and save $${(subscription.amount * 12).toFixed(2)}/year`,
        action: 'Cancel Now',
        urgency: 'high'
      }
    } else if (subscription.usage_score < 50) {
      return {
        text: `Low usage detected. AI can negotiate a better rate for ${subscription.merchant}`,
        action: 'Negotiate',
        urgency: 'medium'
      }
    } else {
      return {
        text: `Active subscription with good usage. Keep monitoring for better deals`,
        action: 'Monitor',
        urgency: 'low'
      }
    }
  }

  const statusInfo = getStatusInfo(subscription.status)
  const insight = getAIInsight()

  return (
    <div 
      className="relative overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl"
      style={{
        background: '#FFFFFF',
        border: `2px solid ${statusInfo.borderColor}`,
        borderRadius: '16px'
      }}
    >
      {/* Top usage indicator bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
        style={{
          background: getUsageColor(subscription.usage_score),
          width: `${subscription.usage_score}%`
        }}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 
              className="text-2xl font-bold mb-1"
              style={{ color: '#001F3F' }}
            >
              {subscription.merchant}
            </h3>
            <div 
              className="text-xs tracking-wider uppercase font-medium"
              style={{ color: '#001F3F', opacity: 0.5 }}
            >
              {subscription.frequency} · {subscription.category}
            </div>
          </div>
          <div className="text-right">
            <div 
              className="text-3xl font-black"
              style={{ color: '#001F3F' }}
            >
              ${subscription.amount}
            </div>
            <div 
              className="text-xs font-medium"
              style={{ color: statusInfo.borderColor }}
            >
              {statusInfo.label}
            </div>
          </div>
        </div>

        {/* AI Insight Box */}
        <div 
          className="mb-4 p-4 rounded-lg"
          style={{
            background: insight.urgency === 'high' ? 'rgba(255, 107, 107, 0.1)' :
                       insight.urgency === 'medium' ? 'rgba(219, 230, 76, 0.1)' :
                       'rgba(0, 128, 76, 0.1)',
            border: `1px solid ${
              insight.urgency === 'high' ? 'rgba(255, 107, 107, 0.3)' :
              insight.urgency === 'medium' ? 'rgba(219, 230, 76, 0.3)' :
              'rgba(0, 128, 76, 0.3)'
            }`
          }}
        >
          <div 
            className="text-xs font-bold tracking-wider uppercase mb-1"
            style={{ color: '#001F3F', opacity: 0.5 }}
          >
            AI Analysis
          </div>
          <div 
            className="text-sm font-medium leading-relaxed"
            style={{ 
              color: insight.urgency === 'high' ? '#FF6B6B' :
                     insight.urgency === 'medium' ? '#B8A800' :
                     '#00804C'
            }}
          >
            {insight.text}
          </div>
        </div>

        {/* Usage Score Bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span style={{ color: '#001F3F', opacity: 0.6 }}>USAGE SCORE</span>
            <span style={{ color: '#001F3F' }}>{subscription.usage_score}%</span>
          </div>
          <div 
            className="h-2 rounded-full overflow-hidden"
            style={{ background: 'rgba(0, 31, 63, 0.1)' }}
          >
            <div
              className="h-full transition-all duration-500"
              style={{
                background: getUsageColor(subscription.usage_score),
                width: `${subscription.usage_score}%`
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {subscription.status === 'active' && subscription.usage_score < 50 && (
            <>
              {/* Show Cancel for very low usage */}
              {subscription.usage_score < 20 ? (
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="group relative w-full py-3 text-sm font-bold overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50"
                  style={{
                    background: '#FF6B6B',
                    color: '#FFFFFF',
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                  }}
                >
                  <span className="relative z-10">
                    {cancelling ? 'Sending Cancellation...' : 'Cancel Now'}
                  </span>
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: '#E05555' }}
                  />
                </button>
              ) : (
                <button
                  onClick={handleNegotiate}
                  disabled={loading}
                  className="group relative w-full py-3 text-sm font-bold overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50"
                  style={{
                    background: '#00804C',
                    color: '#FFFFFF',
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                  }}
                >
                  <span className="relative z-10">
                    {loading ? 'Sending Negotiation...' : 'Negotiate'}
                  </span>
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: '#74C365' }}
                  />
                </button>
              )}
            </>
          )}

          {/* Details Toggle */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full py-2 text-xs font-bold transition-all duration-300 rounded-lg"
            style={{
              color: '#001F3F',
              opacity: 0.6,
              background: showDetails ? 'rgba(0, 31, 63, 0.05)' : 'transparent'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
          >
            {showDetails ? '▲ Hide Details' : '▼ Show Details'}
          </button>
        </div>

        {/* Extended Details */}
        {showDetails && (
          <div 
            className="mt-4 pt-4 space-y-2 text-xs"
            style={{ borderTop: '1px solid rgba(0, 31, 63, 0.1)' }}
          >
            <div className="flex justify-between">
              <span style={{ color: '#001F3F', opacity: 0.5 }}>Last Charge:</span>
              <span className="font-medium" style={{ color: '#001F3F' }}>
                {new Date(subscription.last_charge).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#001F3F', opacity: 0.5 }}>Next Charge:</span>
              <span className="font-medium" style={{ color: '#001F3F' }}>
                {subscription.next_charge 
                  ? new Date(subscription.next_charge).toLocaleDateString()
                  : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#001F3F', opacity: 0.5 }}>Annual Cost:</span>
              <span className="font-bold" style={{ color: '#001F3F' }}>
                ${(subscription.amount * 12).toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Corner Accent */}
      <div 
        className="absolute bottom-0 right-0 w-8 h-8 rounded-tl-lg"
        style={{ background: statusInfo.borderColor, opacity: 0.2 }}
      />
    </div>
  )
}