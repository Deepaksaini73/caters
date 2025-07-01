import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { motion } from "framer-motion"
import SocialLinks from "./SocialLinks"
import { contactConfig } from "@/config/contact"

export default function ContactInfo() {
  return (
    <section className="relative py-10 md:py-16 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 blur-2xl z-0"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8 text-center"
        >
          {contactConfig.title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <SocialLinks />
        </motion.div>
      </div>
    </section>
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
      className="flex items-start gap-4 bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-2xl shadow-lg p-6 transition-all duration-200 hover:shadow-2xl hover:bg-primary/10 min-w-0"
    >
      <motion.div
        whileHover={{
          y: [-2, 6, -2],
          scale: 1.15,
          transition: { duration: 0.6, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
        }}
        className="bg-primary/10 p-3 rounded-full flex-shrink-0"
      >
        {icon}
      </motion.div>
      <div className="min-w-0">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {details.map((detail, index) => (
          <p key={index} className="text-muted-foreground break-all">
            {detail}
          </p>
        ))}
      </div>
    </motion.div>
  )
}