import { LucideIcon, Users, Calendar, DollarSign, Gift, Camera, Video, PenTool } from "lucide-react"

// Types for form data
export interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'date'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  icon?: LucideIcon
}

export interface FormSection {
  title: string
  description?: string
  fields: FormField[]
  layout?: 'grid' | 'stack'
  columns?: number
}

export const quoteFormSections = {
  personalInfo: {
    title: "Personal Information",
    layout: "grid",
    columns: 2,
    fields: [
      { id: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
      { id: "email", label: "Email Address", type: "email", placeholder: "john@example.com", required: true },
      { id: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (234) 567-890", required: true },
      { id: "location", label: "Event Location", type: "text", placeholder: "City, State", required: true },
    ]
  },
  eventDetails: {
    title: "Event Details",
    layout: "grid",
    columns: 2,
    fields: [
      {
        id: "event_type",  // Changed from "event-type"
        label: "Event Type",
        type: "select",
        required: true,
        options: [
          { value: "wedding", label: "Wedding" },
          { value: "birthday", label: "Birthday Party" },
          { value: "corporate", label: "Corporate Event" },
          { value: "festival", label: "Festival/Cultural Event" },
          { value: "other", label: "Other" }
        ]
      },
      { id: "date", label: "Event Date", type: "date", required: true, icon: Calendar },
      { id: "guests", label: "Number of Guests", type: "number", placeholder: "100", required: true, icon: Users },
      {
        id: "budget",  // Budget ID was fine
        label: "Budget Range",
        type: "select",
        required: true,
        icon: DollarSign,
        options: [
          { value: "10300-3000", label: "13,000 - 3,000 rupees" },
          { value: "30300-5000", label: "33,000 - 5,000 rupees" },
          { value: "53000-10000", label: "45,000 - 10,000 rupees" },
          { value: "100030+", label: "10,5000+ rupees" }
        ]
      }
    ]
  },
  services: {
    title: "Services Needed",
    layout: "stack",
    fields: [
      { id: "decoration", label: "Decoration", type: "checkbox", icon: Gift },
      { id: "photography", label: "Photography", type: "checkbox", icon: Camera },
      { id: "videography", label: "Videography", type: "checkbox", icon: Video },
      { id: "drone", label: "Drone Footage", type: "checkbox", icon: Video },
      { id: "full_planning", label: "Full Event Planning", type: "checkbox", icon: PenTool },  // underscore here too
      { id: "other_service", label: "Other", type: "checkbox" }  // underscore here too
    ]
  },
  additionalInfo: {
    title: "Additional Information",
    layout: "stack",
    fields: [
      {
        id: "additional_info",
        label: "Additional Information",
        type: "textarea",
        placeholder: "Tell us more about your event, theme preferences, or any specific requirements...",
        required: false
      }
    ]
  },
  referralSource: {
    title: "How did you hear about us?",
    layout: "stack",
    fields: [
      {
        id: "referral_source",
        label: "Source",
        type: "radio",
        options: [
          { value: "social_media", label: "Social Media" },
          { value: "search_engine", label: "Search Engine" },
          { value: "referral", label: "Referral from Friend/Family" },
          { value: "other", label: "Other" }
        ]
      }
    ]
  }
}

export type QuoteFormSections = typeof quoteFormSections