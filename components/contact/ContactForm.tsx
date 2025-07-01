import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ContactFormProps } from "@/types/contact"

export default function ContactForm({
  formState,
  isSubmitting,
  isSubmitted,
  error,
  handleChange,
  handleSubmit,
}: ContactFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        scale: 1.01,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="bg-white/80 dark:bg-black/40 backdrop-blur-md border border-primary/10 shadow-lg rounded-2xl transition-all duration-200 hover:shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Send Us a Message</CardTitle>
          <CardDescription>
            Fill out the form below and we'll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Goutam Saini"
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="xyz@example.com"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+91 7878412963"
                value={formState.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="Event Inquiry"
                value={formState.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your event or inquiry..."
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
              />
            </div>

            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: "0 0 16px 2px var(--primary)" }}
                transition={{ duration: 0.2 }}
              >
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Sending Message...</>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </>
                  )}
                </Button>
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-100 text-red-800 p-4 rounded-md"
                >
                  {error}
                </motion.div>
              )}

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 text-green-800 p-4 rounded-md"
                >
                  Thank you for your message! We'll get back to you soon.
                </motion.div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}