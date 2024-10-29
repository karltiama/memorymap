import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const SENDER_EMAIL = 'memorymapper@resend.dev'
const SENDER_NAME = 'Memory Mapper'

export async function sendEmail({
  to,
  subject,
  content
}: {
  to: string
  subject: string
  content: string
}) {
  try {
    await resend.emails.send({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to,
      subject,
      html: content,
    })

    console.log('Email sent successfully to:', to)
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}
