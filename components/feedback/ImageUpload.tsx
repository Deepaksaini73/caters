import { FaImage, FaTimes } from 'react-icons/fa'
import { Label } from "@/components/ui/label"
import { toast } from 'sonner'
import { LoadingSpinner } from './LoadingSpinner'
import { useState } from 'react'

interface ImageUploadProps {
  onImageUpload: (url: string) => void
  isUploading: boolean
  setIsUploading: (loading: boolean) => void
}

export function ImageUpload({ onImageUpload, isUploading, setIsUploading }: ImageUploadProps) {
  const [uploadedImage, setUploadedImage] = useState<string>('')
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleFileUpload = async (file: File) => {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size must be less than 10MB')
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'mahakal_events_images')

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dhi5df340/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      setUploadedImage(data.secure_url)
      onImageUpload(data.secure_url)
      toast.success('Image uploaded successfully!')
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      await handleFileUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleRemoveImage = () => {
    setUploadedImage('')
    onImageUpload('')
  }

  return (
    <div className="space-y-3 relative">
      {isUploading && (
        <div className="absolute inset-0 bg-gray-50/80 flex items-center justify-center z-10">
          <LoadingSpinner />
        </div>
      )}
      <div className="flex items-center gap-2">
        <FaImage className="text-primary text-lg flex-shrink-0" />
        <Label className="font-medium">Image (optional)</Label>
      </div>
      <div className="mt-1">
        {uploadedImage ? (
          <div className="relative">
            <img 
              src={uploadedImage} 
              alt="Uploaded preview" 
              className="w-full h-64 object-cover rounded-xl"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              type="button"
            >
              <FaTimes />
            </button>
          </div>
        ) : (
          <div
            className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50 hover:bg-gray-50 hover:border-primary/60 transition-colors duration-200"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="space-y-2 text-center">
              <FaImage className="mx-auto h-12 w-12 text-gray-400" />
              <div className="text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80">
                  <span>Upload an image</span>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        await handleFileUpload(file)
                      }
                    }}
                  />
                </label>
                <p className="pl-1 inline">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}