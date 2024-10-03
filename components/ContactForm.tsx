'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface ContactFormState {
  error: string | null;
  success: string | null;
}

async function submitContactForm(formData: FormData) {
  // Simulate server delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const name = formData.get('name')
  const email = formData.get('email')
  const message = formData.get('message')
  
  if (!name || !email || !message) {
    return { error: 'All fields are required' }
  }
  
  console.log('Form submitted:', { name, email, message })
  
  return { success: 'Thank you for your message. We\'ll get back to you soon!' }
}

export default function ContactForm() {
  const [state, setState] = useState<ContactFormState>({ error: null, success: null })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const result = await submitContactForm(formData)

    // Ensure result matches ContactFormState
    const state: ContactFormState = {
      success: result.success || null,
      error: result.error || null,
    }

    setState(state)
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">Contact Us</h2>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" required />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
      {state.error && (
        <div role="alert" className="text-red-500 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span>{state.error}</span>
        </div>
      )}
      {state.success && (
        <div role="alert" className="text-green-500 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          <span>{state.success}</span>
        </div>
      )}
    </form>
  )
}