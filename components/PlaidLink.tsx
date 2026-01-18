'use client'

import { useCallback, useState } from 'react'
import { usePlaidLink } from 'react-plaid-link'
import { useRouter } from 'next/navigation'

export default function PlaidLink() {
  const router = useRouter()
  const [linkToken, setLinkToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const generateToken = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/plaid/create-link-token', {
        method: 'POST',
      })
      const data = await response.json()
      setLinkToken(data.link_token)
    } catch (error) {
      console.error('Error generating token:', error)
    }
    setLoading(false)
  }

  const onSuccess = useCallback(async (public_token: string) => {
    setLoading(true)
    try {
      // Exchange token
      const response = await fetch('/api/plaid/exchange-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_token }),
      })

      const data = await response.json()

      if (data.success) {
        const userId = data.user_id

        // Fetch transactions (this might not find subscriptions in sandbox)
        await fetch('/api/plaid/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId }),
        })

        // SEED DEMO DATA for testing
        await fetch('/api/seed-demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId }),
        })

        // Store user_id in localStorage for demo
        localStorage.setItem('demo_user_id', userId)

        // Redirect to dashboard
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading(false)
  }, [router])

  const config = {
    token: linkToken,
    onSuccess,
  }

  const { open, ready } = usePlaidLink(config)

  if (!linkToken) {
    return (
      <button
        onClick={generateToken}
        disabled={loading}
        className="group relative px-12 py-5 text-lg font-bold overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: '#00804C',
          color: '#DBE64C',
          clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
        }}
      >
        <span className="relative z-10">{loading ? 'Preparing...' : 'Connect Your Bank →'}</span>
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: '#74C365' }}
        />
      </button>
    )
  }

  return (
    <button
      onClick={() => open()}
      disabled={!ready || loading}
      className="group relative px-12 py-5 text-lg font-bold overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        background: '#00804C',
        color: '#DBE64C',
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
      }}
    >
      <span className="relative z-10">{loading ? 'Connecting...' : 'Connect Your Bank →'}</span>
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: '#74C365' }}
      />
    </button>
  )
}