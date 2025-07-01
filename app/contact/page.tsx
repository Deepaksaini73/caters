"use client"

import { useState } from "react"
import HeroSection from "@/components/contact/HeroSection"
import ContactInfo from "@/components/contact/ContactInfo"
import ContactForm from "@/components/contact/ContactForm"
import MapSection from "@/components/contact/MapSection"
import type { FormState } from "@/types/contact"
import { supabase } from '@/lib/supabaseClient'

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formState.name,
            email: formState.email,
            phone: formState.phone,
            subject: formState.subject,
            message: formState.message,
            status: 'unread',
          }
        ])

      if (error) throw error

      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })

      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (err) {
      console.error('Error submitting form:', err)
      setError("Failed to submit form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      <section className="">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm
              formState={formState}
              isSubmitting={isSubmitting}
              isSubmitted={isSubmitted}
              error={error}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </section>

      {/* <MapSection /> */}
    </div>
  )
}