// app/feedback/page.tsx
import FeedbackForm from '@/components/feedback/FeedbackForm'

export default function FeedbackPage() {
  return (
    <div className="w-full py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl font-bold mb-2">Got a Minute?</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We’d love to hear from you! Tell us what you like or what could be better.
          </p>
        </div>
      </div>
      <FeedbackForm />
    </div>
  )
}
