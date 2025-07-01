"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { quoteFormSections, FormField } from "@/config/quote"
import FormFieldRenderer from "@/components/quote/FormFieldRenderer"
import { supabase } from "@/lib/supabaseClient"

interface FormData {
  [key: string]: string | boolean | Date | undefined;
}

export default function QuoteForm() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({})

  const handleChange = (id: string, value: string | boolean | Date) => {
    if (id === "date") setDate(value as Date)
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const requiredFields = [
                                "name",
                                "email",
                                "phone",
                                "location",
                                "event_type",
                                "date",
                                "guests",
                                "budget"
                              ];

      const missingFields = requiredFields.filter(field => !formData[field]);

      if (missingFields.length > 0) {
        throw new Error(`Required fields missing: ${missingFields.join(', ')}`);
      }

      const submitData = {
        ...formData,
        date: date ? date.toISOString() : null,
        submitted_at: new Date().toISOString(),
      }

      const { error, data } = await supabase
        .from("quotes")
        .insert([submitData])
        .select()

      if (error) {
        console.error("Supabase error details:", error)
        throw new Error(error.message || "Unknown submission error");
      }

      setIsSubmitted(true)
      setFormData({})
      setDate(undefined)
      setTimeout(() => setIsSubmitted(false), 5000)

    } catch (error) {
      console.error("Submission error:", error)
      alert(error instanceof Error ? error.message : "Failed to submit quote request")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Request a Quote</CardTitle>
                <CardDescription>
                  Fill out the form below with your event details and we'll get back to you with a customized quote.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {Object.values(quoteFormSections).map((section, idx) => (
                      <div key={idx}>
                        <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                        <div
                          className={cn(
                            section.layout === "grid"
                              ? `grid gap-6 md:grid-cols-${section.columns}`
                              : "space-y-4"
                          )}
                        >
                          {section.fields.map((field) => (
                            <FormFieldRenderer
                              key={field.id}
                              field={field}
                              value={formData[field.id]}
                              date={date}
                              setDate={setDate}
                              onChange={handleChange}
                            />
                          ))}
                        </div>
                      </div>
                    ))}

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting Request..." : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Quote Request
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="bg-green-100 text-green-800 p-4 rounded-md">
                    Thank you for your quote request! We'll review your event details and get back to you within
                    24-48 hours.
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
