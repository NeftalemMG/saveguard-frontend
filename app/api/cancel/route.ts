import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { generateCancellationEmail, sendEmail } from '@/lib/email'

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

    // Generate cancellation email
    const emailBody = generateCancellationEmail(subscription)

    // Send email to merchant (for demo, sending to my email)
    const merchantEmail = 'testsontestsp6@gmail.com'
    
    const emailResult = await sendEmail({
      to: merchantEmail,
      subject: `Subscription Cancellation Request - ${subscription.merchant}`,
      text: emailBody
    })

    // Update subscription status to cancelled
    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({ 
        status: 'cancelled',
        cancelled_at: new Date().toISOString()
      })
      .eq('id', subscription_id)

    if (updateError) {
      console.error('Error updating subscription:', updateError)
    }

    // Log the cancellation
    await supabase.from('negotiation_logs').insert({
      subscription_id,
      attempt: 1,
      method: 'email',
      message: emailBody,
      status: 'cancelled',
    })

    return NextResponse.json({
      success: true,
      email: emailBody,
      email_sent: emailResult.success,
      message: emailResult.success
        ? `Cancellation request sent to ${subscription.merchant}!`
        : 'Cancellation email generated but not sent (check email configuration)'
    })

  } catch (error: any) {
    console.error('Cancel error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}