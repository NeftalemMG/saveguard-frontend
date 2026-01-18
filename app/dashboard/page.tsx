'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import SubscriptionCard from '@/components/SubscriptionCard'
import Toast from '@/components/Toast'
import type { Subscription } from '@/lib/supabase'

interface ToastState {
  show: boolean
  type: 'success' | 'error' | 'info'
  title: string
  message: string
}

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: 'success',
    title: '',
    message: ''
  })

  const showToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    setToast({ show: true, type, title, message })
  }

  const hideToast = () => {
    setToast({ ...toast, show: false })
  }

  useEffect(() => {
    initUser()
  }, [])

  const initUser = async () => {
    try {
      // Check localStorage first
      const storedUserId = localStorage.getItem('demo_user_id')
      if (storedUserId) {
        setUserId(storedUserId)
        await loadData(storedUserId)
      } else {
        setLoading(false)
      }
    } catch (error) {
      console.error('Init user error:', error)
      setLoading(false)
    }
  }

  const loadData = async (uid: string) => {
    try {
      const subsRes = await fetch(`/api/subscriptions?user_id=${uid}`)
      const subsData = await subsRes.json()
      setSubscriptions(subsData.subscriptions || [])

      const analyticsRes = await fetch(`/api/analytics?user_id=${uid}`)
      const analyticsData = await analyticsRes.json()
      setAnalytics(analyticsData.analytics)
    } catch (error) {
      console.error('Error loading data:', error)
    }
    setLoading(false)
  }

  const handleSeedData = async () => {
    setSeeding(true)
    try {
      const res = await fetch('/api/seed-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      
      if (data.success) {
        setUserId(data.user_id)
        await loadData(data.user_id)
        showToast(
          'success',
          'Demo Data Loaded!',
          `${data.count} subscriptions loaded successfully. Start negotiating or cancelling!`
        )
      } else {
        showToast('error', 'Error', data.error || 'Failed to load demo data')
      }
    } catch (error) {
      console.error('Seed error:', error)
      showToast('error', 'Error', 'Failed to load demo data')
    }
    setSeeding(false)
  }

  const handleNegotiate = async (subscriptionId: string) => {
    try {
      const res = await fetch('/api/negotiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription_id: subscriptionId }),
      })
      const data = await res.json()
      
      if (data.success) {
        const sub = subscriptions.find(s => s.id === subscriptionId)
        const merchantName = sub?.merchant || 'merchant'
        
        showToast(
          'success',
          'Negotiation Email Sent!',
          `AI-generated negotiation email sent to ${merchantName}. Check testsontestsp6@gmail.com to see it!`
        )
        
        if (userId) await loadData(userId)
      } else {
        showToast('error', 'Error', data.error || 'Failed to send negotiation email')
      }
    } catch (error) {
      console.error('Negotiation error:', error)
      showToast('error', 'Error', 'Failed to generate negotiation email')
    }
  }

  const handleCancel = async (subscriptionId: string) => {
    try {
      const res = await fetch('/api/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription_id: subscriptionId }),
      })
      const data = await res.json()
      
      if (data.success) {
        const sub = subscriptions.find(s => s.id === subscriptionId)
        const merchantName = sub?.merchant || 'subscription'
        
        showToast(
          'success',
          'Cancellation Request Sent!',
          `Cancellation email sent to ${merchantName}. Check testsontestsp6@gmail.com to see it!`
        )
        
        if (userId) await loadData(userId)
      } else {
        showToast('error', 'Error', data.error || 'Failed to send cancellation request')
      }
    } catch (error) {
      console.error('Cancel error:', error)
      showToast('error', 'Error', 'Failed to send cancellation request')
    }
  }

  const handleExport = () => {
    if (!userId) {
      alert('No data to export')
      return
    }
    window.location.href = `/api/export?user_id=${userId}`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F6F7ED' }}>
        <div className="text-center">
          <div 
            className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-t-transparent animate-spin"
            style={{ borderColor: '#00804C', borderTopColor: 'transparent' }}
          />
          <div className="text-2xl font-bold" style={{ color: '#001F3F' }}>
            Loading Dashboard...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#F6F7ED' }}>
      <Navigation />
      
      {/* Toast notification */}
      {toast.show && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={hideToast}
        />
      )}
      
      <div className="pt-32 pb-16 px-8 md:px-16 lg:px-24">
        <div className="max-w-[1800px] mx-auto">
          
          {/* Header */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div 
                className="text-sm font-bold tracking-wider uppercase mb-2"
                style={{ color: '#00804C' }}
              >
                Your Financial Dashboard
              </div>
              <h1 
                className="text-6xl lg:text-7xl font-black tracking-tight mb-3"
                style={{ color: '#001F3F' }}
              >
                Subscriptions
              </h1>
              <p 
                className="text-xl"
                style={{ color: '#001F3F', opacity: 0.6 }}
              >
                {subscriptions.length} active subscriptions tracked
              </p>
            </div>

            {/* Seed Data Button */}
            {subscriptions.length === 0 && (
              <button
                onClick={handleSeedData}
                disabled={seeding}
                className="group relative px-8 py-4 text-base font-bold overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50"
                style={{
                  background: '#00804C',
                  color: '#DBE64C',
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                }}
              >
                <span className="relative z-10">
                  {seeding ? 'Loading Demo Data...' : 'Load Demo Data'}
                </span>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: '#74C365' }}
                />
              </button>
            )}
          </div>

          {/* Analytics Cards */}
          {analytics && subscriptions.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {/* Total Monthly */}
              <div 
                className="p-6 transition-all duration-300 hover:translate-y-[-4px]"
                style={{
                  background: '#FFFFFF',
                  border: '2px solid rgba(0, 128, 76, 0.2)',
                  borderRadius: '12px'
                }}
              >
                <div 
                  className="text-xs font-bold tracking-wider uppercase mb-2"
                  style={{ color: '#00804C', opacity: 0.6 }}
                >
                  Monthly Total
                </div>
                <div 
                  className="text-5xl font-black mb-1"
                  style={{ color: '#001F3F' }}
                >
                  ${analytics.totalMonthly}
                </div>
                <div 
                  className="text-sm font-medium"
                  style={{ color: '#001F3F', opacity: 0.5 }}
                >
                  {analytics.activeCount} active
                </div>
              </div>

              {/* Wasted */}
              <div 
                className="p-6 transition-all duration-300 hover:translate-y-[-4px]"
                style={{
                  background: 'linear-gradient(135deg, rgba(219, 230, 76, 0.1) 0%, rgba(219, 230, 76, 0.05) 100%)',
                  border: '2px solid #DBE64C',
                  borderRadius: '12px'
                }}
              >
                <div 
                  className="text-xs font-bold tracking-wider uppercase mb-2"
                  style={{ color: '#DBE64C', opacity: 0.8 }}
                >
                  Wasted Monthly
                </div>
                <div 
                  className="text-5xl font-black mb-1"
                  style={{ color: '#DBE64C' }}
                >
                  ${analytics.potentialSavings}
                </div>
                <div 
                  className="text-sm font-bold"
                  style={{ color: '#001F3F', opacity: 0.7 }}
                >
                  {analytics.unusedCount} unused
                </div>
              </div>

              {/* Saved */}
              <div 
                className="p-6 transition-all duration-300 hover:translate-y-[-4px]"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 128, 76, 0.15) 0%, rgba(116, 195, 101, 0.05) 100%)',
                  border: '2px solid #00804C',
                  borderRadius: '12px'
                }}
              >
                <div 
                  className="text-xs font-bold tracking-wider uppercase mb-2"
                  style={{ color: '#00804C', opacity: 0.8 }}
                >
                  Total Saved
                </div>
                <div 
                  className="text-5xl font-black mb-1"
                  style={{ color: '#00804C' }}
                >
                  ${analytics.totalSaved}
                </div>
                <div 
                  className="text-sm font-medium"
                  style={{ color: '#001F3F', opacity: 0.6 }}
                >
                  via AI negotiation
                </div>
              </div>

              {/* Cancelled */}
              <div 
                className="p-6 transition-all duration-300 hover:translate-y-[-4px]"
                style={{
                  background: 'rgba(30, 72, 143, 0.05)',
                  border: '2px solid rgba(30, 72, 143, 0.3)',
                  borderRadius: '12px'
                }}
              >
                <div 
                  className="text-xs font-bold tracking-wider uppercase mb-2"
                  style={{ color: '#1E488F', opacity: 0.8 }}
                >
                  Cancelled
                </div>
                <div 
                  className="text-5xl font-black mb-1"
                  style={{ color: '#1E488F' }}
                >
                  {analytics.cancelledCount}
                </div>
                <div 
                  className="text-sm font-medium"
                  style={{ color: '#001F3F', opacity: 0.6 }}
                >
                  this month
                </div>
              </div>
            </div>
          )}

          {/* Subscriptions Section */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <h2 
                className="text-3xl font-black tracking-tight"
                style={{ color: '#001F3F' }}
              >
                All Subscriptions
              </h2>
              
              <div className="flex gap-3">
                {subscriptions.length > 0 && (
                  <>
                    <button
                      onClick={handleExport}
                      className="group relative px-6 py-3 text-sm font-bold overflow-hidden transition-all duration-300 hover:scale-105"
                      style={{
                        background: '#DBE64C',
                        color: '#001F3F',
                        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                      }}
                    >
                      <span className="relative z-10">Export to CSV</span>
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: '#C5CF43' }}
                      />
                    </button>
                    <button
                      onClick={handleSeedData}
                      disabled={seeding}
                      className="group relative px-6 py-3 text-sm font-bold overflow-hidden transition-all duration-300 hover:scale-105"
                      style={{
                        background: 'transparent',
                        color: '#00804C',
                        border: '2px solid #00804C',
                        borderRadius: '8px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 128, 76, 0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      {seeding ? 'Reloading...' : 'Reload Data'}
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {subscriptions.length === 0 ? (
              <div 
                className="p-20 text-center rounded-2xl"
                style={{
                  background: '#FFFFFF',
                  border: '4px dashed rgba(0, 128, 76, 0.2)'
                }}
              >
                <div className="mb-6">
                  <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto" fill="none">
                    <circle cx="60" cy="60" r="50" stroke="#00804C" strokeWidth="3" opacity="0.2"/>
                    <path d="M40 60h40M60 40v40" stroke="#00804C" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </div>
                <p 
                  className="text-3xl font-bold mb-4"
                  style={{ color: '#001F3F' }}
                >
                  No Subscriptions Yet
                </p>
                <p 
                  className="text-lg mb-10"
                  style={{ color: '#001F3F', opacity: 0.6 }}
                >
                  Load demo data to see the AI agent in action
                </p>
                <button
                  onClick={handleSeedData}
                  disabled={seeding}
                  className="group relative px-12 py-5 text-lg font-bold overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50"
                  style={{
                    background: '#00804C',
                    color: '#DBE64C',
                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
                  }}
                >
                  <span className="relative z-10">
                    {seeding ? 'Loading...' : 'Load Demo Data'}
                  </span>
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: '#74C365' }}
                  />
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subscriptions.map(sub => (
                  <SubscriptionCard
                    key={sub.id}
                    subscription={sub}
                    onNegotiate={handleNegotiate}
                    onCancel={handleCancel}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}