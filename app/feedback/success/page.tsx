import Link from 'next/link'
import { FaCheckCircle } from 'react-icons/fa'

export default function FeedbackSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Thank You!</h2>
          <p className="mt-2 text-lg text-gray-600">
            Your feedback has been successfully submitted. We appreciate your valuable input!
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}