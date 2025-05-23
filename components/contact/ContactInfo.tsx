import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { motion } from "framer-motion"
import SocialLinks from "./SocialLinks"
import { contactConfig } from "@/config/contact"

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">{contactConfig.title}</h2>
      <div className="grid gap-8">
        <ContactInfoItem
          icon={<MapPin className="h-6 w-6 text-primary" />}
          title={contactConfig.location.title}
          details={contactConfig.location.details}
          delay={0}
        />
        <ContactInfoItem
          icon={<Phone className="h-6 w-6 text-primary" />}
          title={contactConfig.phone.title}
          details={contactConfig.phone.details}
          delay={0.1}
        />
        <ContactInfoItem
          icon={<Mail className="h-6 w-6 text-primary" />}
          title={contactConfig.email.title}
          details={contactConfig.email.details}
          delay={0.2}
        />
        <ContactInfoItem
          icon={<Clock className="h-6 w-6 text-primary" />}
          title={contactConfig.hours.title}
          details={contactConfig.hours.details}
          delay={0.3}
        />
      </div>
      <SocialLinks />
    </div>
  )
}

type ContactInfoItemProps = {
  icon: React.ReactNode
  title: string
  details: string[]
  delay: number
}

function ContactInfoItem({ icon, title, details, delay }: ContactInfoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="flex items-start gap-4"
    >
      <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {details.map((detail, index) => (
          <p key={index} className="text-muted-foreground">
            {detail}
          </p>
        ))}
      </div>
    </motion.div>
  )
}