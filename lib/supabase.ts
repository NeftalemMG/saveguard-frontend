import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface User {
  id: string
  email: string
  name?: string
  plaid_access_token?: string
  plaid_item_id?: string
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  merchant: string
  amount: number
  frequency: string
  last_charge: string
  next_charge?: string
  status: string
  usage_score: number
  category?: string
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  plaid_transaction_id: string
  merchant: string
  amount: number
  date: string
  description: string
  category?: string
}

export interface NegotiationLog {
  id: string
  subscription_id: string
  attempt: number
  method: string
  message: string
  response?: string
  status: string
  savings_amount?: number
  created_at: string
}