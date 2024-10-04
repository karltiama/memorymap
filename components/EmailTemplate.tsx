import * as React from 'react'

interface EmailTemplateProps {
  name: string
  email: string
  message: string
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  name,
  email,
  message,
}) => {
  return (
    <div>
      <h1>New Contact Form Submission</h1>
    </div>
  )
}
