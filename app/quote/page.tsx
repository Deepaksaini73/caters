"use client"

import type React from "react"

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

export default function QuotePage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get a Quote</h1>
            <p className="text-xl text-muted-foreground">
              Tell us about your event and we'll provide you with a customized quote.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
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
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" placeholder="john@example.com" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" placeholder="+1 (234) 567-890" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Event Location</Label>
                          <Input id="location" placeholder="City, State" required />
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Event Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="event-type">Event Type</Label>
                          <Select required>
                            <SelectTrigger id="event-type">
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="wedding">Wedding</SelectItem>
                              <SelectItem value="birthday">Birthday Party</SelectItem>
                              <SelectItem value="corporate">Corporate Event</SelectItem>
                              <SelectItem value="festival">Festival/Cultural Event</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="date">Event Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="guests">Number of Guests</Label>
                          <Input id="guests" type="number" placeholder="100" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="budget">Budget Range</Label>
                          <Select required>
                            <SelectTrigger id="budget">
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1000-3000">$1,000 - $3,000</SelectItem>
                              <SelectItem value="3000-5000">$3,000 - $5,000</SelectItem>
                              <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                              <SelectItem value="10000+">$10,000+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Services Needed */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Services Needed</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="decoration" />
                          <Label htmlFor="decoration">Decoration</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="photography" />
                          <Label htmlFor="photography">Photography</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="videography" />
                          <Label htmlFor="videography">Videography</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="drone" />
                          <Label htmlFor="drone">Drone Footage</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="full-planning" />
                          <Label htmlFor="full-planning">Full Event Planning</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="other-service" />
                          <Label htmlFor="other-service">Other</Label>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-2">
                      <Label htmlFor="additional-info">Additional Information</Label>
                      <Textarea
                        id="additional-info"
                        placeholder="Tell us more about your event, theme preferences, or any specific requirements..."
                        rows={5}
                      />
                    </div>

                    {/* How did you hear about us */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">How did you hear about us?</h3>
                      <RadioGroup defaultValue="social-media">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="social-media" id="social-media" />
                          <Label htmlFor="social-media">Social Media</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="search-engine" id="search-engine" />
                          <Label htmlFor="search-engine">Search Engine</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="referral" id="referral" />
                          <Label htmlFor="referral">Referral from Friend/Family</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>Submitting Request...</>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Submit Quote Request
                        </>
                      )}
                    </Button>

                    {isSubmitted && (
                      <div className="bg-green-100 text-green-800 p-4 rounded-md">
                        Thank you for your quote request! We'll review your event details and get back to you within
                        24-48 hours with a customized quote.
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
