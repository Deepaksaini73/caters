// components/quote/FormFieldRenderer.tsx
"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { FormField } from "@/config/quote"

interface FormFieldRendererProps {
  field: FormField
  value: string | boolean | Date | undefined
  date?: Date
  setDate?: (date: Date | undefined) => void
  onChange: (id: string, value: string | boolean | Date) => void
}

export default function FormFieldRenderer({ field, value, date, setDate, onChange }: FormFieldRendererProps) {
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
            onChange={(e) => onChange(field.id, e.target.value)}
          />
        </div>
      )
    case "select":
      return (
        <div className="space-y-2" key={field.id}>
          <Label htmlFor={field.id}>{field.label}</Label>
          <Select
            required={field.required}
            onValueChange={(value) => onChange(field.id, value)}
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
            onCheckedChange={(checked) => onChange(field.id, checked)}
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
          onValueChange={(val) => onChange(field.id, val)}
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
            onChange={(e) => onChange(field.id, e.target.value)}
          />
        </div>
      )
    case "date":
      return (
        <div className="space-y-2" key={field.id}>
          <Label htmlFor={field.id}>{field.label}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  setDate?.(newDate)
                  onChange(field.id, newDate as Date)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      )
  }
}
