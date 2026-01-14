'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import {
  CreditCardIcon,
  ChartBarIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline'

interface Subscription {
  id: string
  merchant: string
  amount: number
  frequency: string
  status: string
}

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

  useEffect(() => {
    // Demo data
    setSubscriptions([
      {
        id: '1',
        merchant: 'Netflix',
        amount: 16.99,
        frequency: 'monthly',
        status: 'active',
      },
      {
        id: '2',
        merchant: 'Spotify',
        amount: 10.99,
        frequency: 'monthly',
        status: 'active',
      },
    ])
  }, [])

  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

          {/* Metrics */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-600">Total Monthly</div>
                <CreditCardIcon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-bold">${totalMonthly.toFixed(2)}</div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-600">Subscriptions</div>
                <ChartBarIcon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-bold">{subscriptions.length}</div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-600">Potential Savings</div>
                <BanknotesIcon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-bold">$0.00</div>
              <div className="text-xs text-gray-500 mt-1">Connect bank to calculate</div>
            </div>
          </div>

          {/* Subscriptions list */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Your Subscriptions</h2>
            
            {subscriptions.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                Connect your bank to see subscriptions
              </div>
            ) : (
              <div className="space-y-3">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50"
                  >
                    <div>
                      <div className="font-medium">{sub.merchant}</div>
                      <div className="text-sm text-gray-600">{sub.frequency}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${sub.amount}</div>
                      <div className="text-xs text-gray-500">{sub.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}