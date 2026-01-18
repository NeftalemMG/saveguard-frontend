import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { generateNegotiationEmail, sendEmail, sendUserAlert } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { subscription_id } = await request.json()

    if (!subscription_id) {
      return NextResponse.json({ success: false, error: 'Missing subscription_id' }, { status: 400 })
    }

    // Get subscription details
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('id', subscription_id)
      .single()

    if (subError || !subscription) {
      return NextResponse.json({ success: false, error: 'Subscription not found' }, { status: 404 })
    }

    // Generate AI negotiation email
    const emailBody = await generateNegotiationEmail(subscription)

    // Send email to merchant (for demo, sending to my test email)
    // In production, I eed to change this to send to the actual merchant's support email
    const merchantEmail = 'testsontestsp6@gmail.com'
    
    const emailResult = await sendEmail({
      to: merchantEmail,
      subject: `Subscription Rate Inquiry - ${subscription.merchant}`,
      text: emailBody
    })

    // Log the negotiation
    const { error: logError } = await supabase
      .from('negotiation_logs')
      .insert({
        subscription_id,
        attempt: 1,
        method: 'email',
        message: emailBody,
        status: emailResult.success ? 'sent' : 'failed',
        merchant_response: null
      })

    if (logError) {
      console.error('Error logging negotiation:', logError)
    }

    // Update subscription status
    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({ 
        status: 'negotiating',
        last_negotiated: new Date().toISOString()
      })
      .eq('id', subscription_id)

    if (updateError) {
      console.error('Error updating subscription:', updateError)
    }

    return NextResponse.json({
      success: true,
      email: emailBody,
      email_sent: emailResult.success,
      message: emailResult.success 
        ? 'Negotiation email sent successfully!'
        : 'Email generated but not sent (check email configuration)'
    })

  } catch (error: any) {
    console.error('Negotiate error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}