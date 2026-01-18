import { NextResponse } from 'next/server'
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'
import { supabase } from '@/lib/supabase'

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
})

const plaidClient = new PlaidApi(configuration)

export async function POST(request: Request) {
  try {
    const { user_id } = await request.json()

    // Get user's access token
    const { data: user } = await supabase
      .from('users')
      .select('plaid_access_token')
      .eq('id', user_id)
      .single()

    if (!user?.plaid_access_token) {
      return NextResponse.json({ error: 'No access token' }, { status: 400 })
    }

    // Get last 90 days of transactions
    const now = new Date()
    const start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)

    const response = await plaidClient.transactionsGet({
      access_token: user.plaid_access_token,
      start_date: start.toISOString().split('T')[0],
      end_date: now.toISOString().split('T')[0],
    })

    const transactions = response.data.transactions

    // Save to database
    for (const txn of transactions) {
      await supabase.from('transactions').insert({
        user_id,
        plaid_transaction_id: txn.transaction_id,
        merchant: txn.merchant_name || txn.name,
        amount: Math.abs(txn.amount),
        date: txn.date,
        description: txn.name,
        category: txn.category?.[0],
      })
    }

    // Detect subscriptions
    await detectSubscriptions(user_id)

    return NextResponse.json({ success: true, count: transactions.length })
  } catch (error: any) {
    console.error('Transactions error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

async function detectSubscriptions(user_id: string) {
  // Get all transactions
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user_id)
    .order('date', { ascending: true })

  if (!transactions) return

  // Group by merchant
  const merchantGroups: { [key: string]: any[] } = {}
  
  transactions.forEach(txn => {
    const merchant = txn.merchant.toUpperCase()
    if (!merchantGroups[merchant]) {
      merchantGroups[merchant] = []
    }
    merchantGroups[merchant].push(txn)
  })

  // Detect recurring patterns
  for (const [merchant, txns] of Object.entries(merchantGroups)) {
    if (txns.length < 2) continue

    // Calculate intervals
    const intervals = []
    for (let i = 0; i < txns.length - 1; i++) {
      const days = Math.floor(
        (new Date(txns[i + 1].date).getTime() - new Date(txns[i].date).getTime()) /
        (1000 * 60 * 60 * 24)
      )
      intervals.push(days)
    }

    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length

    // Check if recurring (20% variance tolerance)
    const isRecurring = intervals.every(
      i => Math.abs(i - avgInterval) / avgInterval < 0.2
    )

    if (isRecurring) {
      let frequency = 'irregular'
      if (avgInterval >= 25 && avgInterval <= 35) frequency = 'monthly'
      else if (avgInterval >= 350 && avgInterval <= 380) frequency = 'annual'
      else if (avgInterval >= 85 && avgInterval <= 95) frequency = 'quarterly'

      const lastTxn = txns[txns.length - 1]
      const nextCharge = new Date(lastTxn.date)
      nextCharge.setDate(nextCharge.getDate() + Math.round(avgInterval))

      // Check if already exists
      const { data: existing } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('user_id', user_id)
        .eq('merchant', merchant)
        .single()

      if (!existing) {
        await supabase.from('subscriptions').insert({
          user_id,
          merchant,
          amount: lastTxn.amount,
          frequency,
          last_charge: lastTxn.date,
          next_charge: nextCharge.toISOString(),
          status: 'active',
          usage_score: Math.floor(Math.random() * 100), // Placeholder
          category: lastTxn.category,
        })
      }
    }
  }
}