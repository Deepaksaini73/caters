"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { 
  Loader2, X, Upload, Layout, Type, 
  FileText, Image as ImageIcon, ListPlus,Plus 
} from "lucide-react"
import { cn } from "@/lib/utils"

const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

interface ServiceFormData {
  title: string
  description: string
  long_description: string
  icon: string
  image_src: string
}

interface Feature {
  title: string
  description: string
}

export default function CreateServiceForm({ 
  onSuccess, 
  onOpenChange 
}: { 
  onSuccess: () => void
  onOpenChange: (open: boolean) => void 
}) {
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [formData, setFormData] = useState<ServiceFormData>({
    title: '',
    description: '',
    long_description: '',
    icon: '',
    image_src: ''
  })
  const [features, setFeatures] = useState<Feature[]>([
    { title: '', description: '' }
  ])

  useEffect(() => {
    // Cleanup preview URL on unmount
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const supabase = createClient()

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB')
      return
    }

    // Create preview
    const objectUrl = URL.createObjectURL(file)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(objectUrl)
    setImageFile(file)

    try {
      setUploadingImage(true)

      // Upload to Cloudinary
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData
        }
      )

      const data = await response.json()

      if (!data.secure_url) {
        throw new Error('Upload failed')
      }

      // Update form data with image URL
      setFormData(prev => ({
        ...prev,
        image_src: data.secure_url
      }))
      
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Error uploading image')
      // Reset image state on error
      setImageFile(null)
      setPreviewUrl('')
    } finally {
      setUploadingImage(false)
    }
  }

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setImageFile(null)
    setPreviewUrl('')
    setFormData(prev => ({
      ...prev,
      image_src: ''
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const addFeature = () => {
    setFeatures([...features, { title: '', description: '' }])
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    setFeatures(features.map((feature, i) => 
      i === index ? { ...feature, [field]: value } : feature
    ))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const slug = generateSlug(formData.title)

      // First create the service
      const { data: service, error: serviceError } = await supabase
        .from('services')
        .insert({
          title: formData.title,
          slug,
          description: formData.description,
          long_description: formData.long_description,
          icon: formData.icon,
          image_src: formData.image_src
        })
        .select()
        .single()

      if (serviceError) throw serviceError

      // Then create the features
      const { error: featuresError } = await supabase
        .from('service_features')
        .insert(
          features.map(feature => ({
            service_id: service.id,
            title: feature.title,
            description: feature.description
          }))
        )

      if (featuresError) throw featuresError

      toast.success('Service created successfully')
      setFormData({
        title: '',
        description: '',
        long_description: '',
        icon: '',
        image_src: ''
      })
      setFeatures([{ title: '', description: '' }])
      onSuccess()
      // Close the dialog
      onOpenChange(false)

    } catch (error) {
      console.error('Error creating service:', error)
      toast.error('Error creating service')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[80vh]">
      <form onSubmit={handleSubmit} className="space-y-6 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto pr-4">
          {/* Basic Info Section */}
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Layout className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Basic Information</h2>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Service Title</label>
                  <Input
                    name="title"
                    placeholder="Enter service title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Short Description</label>
                  <Input
                    name="description"
                    placeholder="Brief description of the service"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Description</label>
                  <Textarea
                    name="long_description"
                    placeholder="Detailed description of the service"
                    value={formData.long_description}
                    onChange={handleChange}
                    required
                    className="min-h-[100px] resize-y"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Icon Name</label>
                  <Input
                    name="icon"
                    placeholder="Icon identifier"
                    value={formData.icon}
                    onChange={handleChange}
                    className="h-11"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Service Image</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploadingImage}
                    className="h-11"
                  />
                  {previewUrl && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={removeImage}
                      disabled={uploadingImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {uploadingImage && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading image...
                  </div>
                )}

                {previewUrl && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="object-cover w-full h-full transition-all hover:scale-105"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Features Section */}
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ListPlus className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-lg font-semibold">Service Features</h2>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addFeature}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Feature
                </Button>
              </div>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "p-4 rounded-lg border transition-colors",
                      "hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium">Feature {index + 1}</h3>
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeFeature(index)}
                          className="h-8 gap-1"
                        >
                          <X className="h-4 w-4" />
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <Input
                        placeholder="Feature title"
                        value={feature.title}
                        onChange={(e) => updateFeature(index, 'title', e.target.value)}
                        required
                        className="h-11"
                      />
                      <Input
                        placeholder="Feature description"
                        value={feature.description}
                        onChange={(e) => updateFeature(index, 'description', e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Buttons */}
        <div className="pt-4 space-x-4 border-t flex justify-end">
          <Button 
            type="submit" 
            size="lg"
            disabled={loading || uploadingImage}
            className="min-w-[200px]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating Service...
              </span>
            ) : (
              'Create Service'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}