"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { quoteFormSections, FormField } from "@/config/quote"

interface FormData {
  [key: string]: string | boolean | Date | undefined;
}

export default function QuoteForm() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({})

  const handleChange = (id: string, value: string | boolean | Date) => {
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Combine form data with date
    const submitData = {
      ...formData,
      date: date
    }
    
    console.log('Form Data:', submitData) // For debugging
    
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const renderField = (field: FormField) => {
    const value = formData[field.id]

    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "number":
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input 
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={value as string || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
          </div>
        )
      case "select":
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id}>{field.label}</Label>
            <Select 
              required={field.required}
              onValueChange={(value) => handleChange(field.id, value)}
              value={value as string}
            >
              <SelectTrigger id={field.id}>
                <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      case "checkbox":
        return (
          <div className="flex items-center space-x-2" key={field.id}>
            <Checkbox 
              id={field.id}
              checked={value as boolean || false}
              onCheckedChange={(checked) => handleChange(field.id, checked)}
            />
            <Label htmlFor={field.id}>{field.label}</Label>
          </div>
        )
      case "radio":
        return (
          <RadioGroup 
            defaultValue={field.options?.[0]?.value || ""}
            key={field.id}
            value={value as string}
            onValueChange={(value) => handleChange(field.id, value)}
          >
            {field.options?.map((opt) => (
              <div className="flex items-center space-x-2" key={opt.value}>
                <RadioGroupItem value={opt.value} id={opt.value} />
                <Label htmlFor={opt.value}>{opt.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )
      case "textarea":
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id}>{field.label}</Label>
            <Textarea 
              id={field.id}
              placeholder={field.placeholder}
              rows={5}
              value={value as string || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
          </div>
        )
      case "date":
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id}>{field.label}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar 
                  mode="single" 
                  selected={date} 
                  onSelect={(newDate) => {
                    setDate(newDate)
                    handleChange(field.id, newDate as Date)
                  }}
                  initialFocus 
                />
              </PopoverContent>
            </Popover>
          </div>
        )
    }
  }

  return (
    <section className="py-16 md:py-24">
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  {Object.values(quoteFormSections).map((section, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                      <div
                        className={cn(
                          section.layout === "grid" ? `grid gap-6 md:grid-cols-${section.columns}` : "space-y-4"
                        )}
                      >
                        {section.fields.map(renderField)}
                      </div>
                    </div>
                  ))}

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting Request..." : <><Send className="mr-2 h-4 w-4" /> Submit Quote Request</>}
                  </Button>

                  {isSubmitted && (
                    <div className="bg-green-100 text-green-800 p-4 rounded-md">
                      Thank you for your quote request! We'll review your event details and get back to you within
                      24-48 hours.
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
