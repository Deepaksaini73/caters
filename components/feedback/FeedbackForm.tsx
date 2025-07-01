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
import { ImageUpload } from '../feedback/ImageUpload'
import { motion } from "framer-motion"

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
    <section className="relative py-8 md:py-16 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 blur-2xl z-0"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:w-5/12"
          >
            <div className="relative h-[340px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl group bg-white/70 dark:bg-black/40 backdrop-blur-md border border-primary/10">
              <motion.img
                src="https://res.cloudinary.com/dpt4bhayi/image/upload/v1746867823/468807740_816097507232942_1482742955630624124_n.jpg_voiwhk.jpg"
                alt="Mahakal Events"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 z-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Share Your Experience</h2>
                <p className="text-white/90">We value your feedback! Help us improve by sharing your thoughts.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:w-7/12"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 bg-white/80 dark:bg-black/40 p-6 md:p-8 rounded-2xl shadow-xl border border-primary/10 transition-colors duration-500"
            >
              <div className="space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-primary text-lg flex-shrink-0 dark:text-indigo-400" />
                    <Label htmlFor="name" className="font-medium">Name</Label>
                  </div>
                  <Input
                    id="name"
                    type="text"
                    {...register('name')}
                    placeholder="Your name"
                    className="w-full px-4 py-3"
                  />
                  {errors.name && <p className="text-sm font-medium text-destructive mt-1.5">{errors.name.message}</p>}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaBriefcase className="text-primary text-lg flex-shrink-0 dark:text-indigo-400" />
                    <Label htmlFor="role" className="font-medium">Role</Label>
                  </div>
                  <Input
                    id="role"
                    type="text"
                    {...register('role')}
                    placeholder="Your professional role"
                    className="w-full px-4 py-3"
                  />
                  {errors.role && <p className="text-sm font-medium text-destructive mt-1.5">{errors.role.message}</p>}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaComments className="text-primary text-lg flex-shrink-0 dark:text-indigo-400" />
                    <Label htmlFor="review" className="font-medium">Review</Label>
                  </div>
                  <Textarea
                    id="review"
                    {...register('review')}
                    rows={4}
                    placeholder="Share your thoughts..."
                    className="w-full px-4 py-3 resize-none"
                  />
                  {errors.review && <p className="text-sm font-medium text-destructive mt-1.5">{errors.review.message}</p>}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-primary text-lg flex-shrink-0 dark:text-indigo-400" />
                    <Label className="font-medium">Rating</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <FaStar
                        key={rating}
                        className={`text-3xl cursor-pointer transition-all duration-200 ${
                          rating <= (hoveredRating || selectedRating)
                            ? 'text-yellow-400 scale-110'
                            : 'text-gray-300 hover:text-gray-400 dark:text-gray-600 dark:hover:text-gray-400'
                        }`}
                        onClick={() => setValue('rating', rating)}
                        onMouseEnter={() => setHoveredRating(rating)}
                        onMouseLeave={() => setHoveredRating(0)}
                      />
                    ))}
                  </div>
                  {errors.rating && <p className="text-sm font-medium text-destructive mt-1">{errors.rating.message}</p>}
                </div>

                <ImageUpload
                  isUploading={imageUploading}
                  onImageUpload={(url) => setValue('image', url)}
                  setIsUploading={setImageUploading}
                />
              </div>

              <div className="pt-4">
                <motion.div
                  whileHover={{ scale: 1.04, boxShadow: "0 0 16px 2px var(--primary)" }}
                  transition={{ duration: 0.2 }}
                >
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
                </motion.div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
