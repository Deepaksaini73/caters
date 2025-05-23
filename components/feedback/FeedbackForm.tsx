'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { toast } from 'sonner'
import { FaUser, FaBriefcase, FaComments, FaStar } from 'react-icons/fa'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ImageUpload } from './ImageUpload'

const schema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  review: z.string().min(5),
  rating: z.number().min(1).max(5),
  image: z.string().optional()
})

type FeedbackFormData = z.infer<typeof schema>

export default function FeedbackForm() {
  const router = useRouter()
  const [imageUploading, setImageUploading] = useState(false)
  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm<FeedbackFormData>({
    resolver: zodResolver(schema)
  })
  const [hoveredRating, setHoveredRating] = useState(0)
  const selectedRating = watch('rating') || 0

  const onSubmit = async (data: FeedbackFormData) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('role', data.role)
    formData.append('review', data.review)
    formData.append('rating', data.rating.toString())
    if (data.image) formData.append('image', data.image)

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        body: formData
      })

      if (res.ok) {
        toast.success('Thank you for your feedback!')
        reset()
        router.push('/feedback/success')
      } else {
        toast.error('Failed to submit feedback')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column - Image */}
          <div className="lg:w-5/12">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
              <img
                src="https://res.cloudinary.com/dpt4bhayi/image/upload/v1746867823/468807740_816097507232942_1482742955630624124_n.jpg_voiwhk.jpg"
                alt="Mahakal Events"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-80"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transition-transform duration-500 group-hover:translate-y-[-10px]">
                <h2 className="text-3xl font-bold text-white mb-2 transition duration-500 group-hover:scale-105">Share Your Experience</h2>
                <p className="text-white/90 transition duration-500 group-hover:opacity-100">We value your feedback! Help us improve by sharing your thoughts.</p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:w-7/12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <div className="space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-primary text-lg flex-shrink-0" />
                    <Label htmlFor="name" className="font-medium">Name</Label>
                  </div>
                  <Input id="name" type="text" {...register('name')} placeholder="Your name" className="w-full px-4 py-3" />
                  {errors.name && <p className="text-sm font-medium text-destructive mt-1.5">{errors.name.message}</p>}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaBriefcase className="text-primary text-lg flex-shrink-0" />
                    <Label htmlFor="role" className="font-medium">Role</Label>
                  </div>
                  <Input id="role" type="text" {...register('role')} placeholder="Your professional role" className="w-full px-4 py-3" />
                  {errors.role && <p className="text-sm font-medium text-destructive mt-1.5">{errors.role.message}</p>}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaComments className="text-primary text-lg flex-shrink-0" />
                    <Label htmlFor="review" className="font-medium">Review</Label>
                  </div>
                  <Textarea id="review" {...register('review')} rows={4} placeholder="Share your thoughts..." className="w-full px-4 py-3 resize-none" />
                  {errors.review && <p className="text-sm font-medium text-destructive mt-1.5">{errors.review.message}</p>}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-primary text-lg flex-shrink-0" />
                    <Label className="font-medium">Rating</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <FaStar
                        key={rating}
                        className={`text-3xl cursor-pointer transition-all duration-200 ${rating <= (hoveredRating || selectedRating) ? 'text-yellow-400 scale-110' : 'text-gray-300 hover:text-gray-400'}`}
                        onClick={() => setValue('rating', rating)}
                        onMouseEnter={() => setHoveredRating(rating)}
                        onMouseLeave={() => setHoveredRating(0)}
                      />
                    ))}
                  </div>
                  {errors.rating && <p className="text-sm font-medium text-destructive mt-1">{errors.rating.message}</p>}
                </div>

                {/* Use the ImageUpload component */}
                <ImageUpload
                  isUploading={imageUploading}
                  onImageUpload={(url) => setValue('image', url)}
                  setIsUploading={setImageUploading}
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Feedback'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
