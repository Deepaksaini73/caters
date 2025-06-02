"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Loader2, Plus, Trash2, Upload, Image as ImageIcon , Video } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GalleryImage {
  id: string
  src: string
  alt: string
  media_type: 'image' | 'video'
}

const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!

interface UploadingFile {
  file: File
  preview: string
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
  cloudinaryUrl?: string
  type: 'image' | 'video'
}

function AddImageForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const supabase = createClient()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    const newFiles: UploadingFile[] = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: 'pending',
      type: file.type.startsWith('video/') ? 'video' : 'image'
    }))

    setUploadingFiles(prev => [...prev, ...newFiles])
  }

  const uploadToCloudinary = async (file: UploadingFile) => {
    const formData = new FormData()
    formData.append('file', file.file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData
        }
      )

      const data = await res.json()
      return data.secure_url
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()    
    setLoading(true)

    try {
      const uploadPromises = uploadingFiles.map(async (file, index) => {
        setUploadingFiles(files => 
          files.map((f, i) => 
            i === index ? { ...f, status: 'uploading' } : f
          )
        )

        try {
          const cloudinaryUrl = await uploadToCloudinary(file)
          setUploadingFiles(files =>
            files.map((f, i) =>
              i === index ? { ...f, status: 'completed', cloudinaryUrl } : f
            )
          )
          return {
            src: cloudinaryUrl,
            alt: file.file.name,
            media_type: file.type
          }
        } catch (error) {
          setUploadingFiles(files =>
            files.map((f, i) =>
              i === index ? { ...f, status: 'error' } : f
            )
          )
          throw error
        }
      })

      const uploadedFiles = await Promise.all(uploadPromises)

      const { error } = await supabase
        .from('gallery_images')
        .insert(uploadedFiles)

      if (error) throw error

      toast.success('All files uploaded successfully')
      onSuccess()
      setUploadingFiles([])
    } catch (error) {
      console.error('Error uploading files:', error)
      toast.error('Error uploading files')
    } finally {
      setLoading(false)
    }
  }

  const removeFile = (index: number) => {
    setUploadingFiles(files => {
      const newFiles = [...files]
      URL.revokeObjectURL(newFiles[index].preview)
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  useEffect(() => {
    // Cleanup preview URLs
    return () => {
      uploadingFiles.forEach(file => {
        URL.revokeObjectURL(file.preview)
      })
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        disabled={loading}
        multiple
      />

      {/* Preview Grid */}
      {uploadingFiles.length > 0 && (
        <div className="space-y-4">
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto pr-2"
            style={{ scrollbarGutter: 'stable' }}
          >
            {uploadingFiles.map((file, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden border bg-card"
              >
                {file.type === 'video' ? (
                  <video
                    src={file.preview}
                    className="w-full h-full object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={file.preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFile(index)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {file.status === 'uploading' && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={loading || uploadingFiles.length === 0}
        className="w-full"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Uploading Files...
          </span>
        ) : (
          `Upload ${uploadingFiles.length} File${uploadingFiles.length === 1 ? '' : 's'}`
        )}
      </Button>
    </form>
  )
}

export default function GalleryAdmin() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [imageToDelete, setImageToDelete] = useState<GalleryImage | null>(null)
  const supabase = createClient()

  async function fetchImages() {
    try {
      const { data } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false })

      setImages(data || [])
    } catch (error) {
      console.error('Error fetching images:', error)
      toast.error('Error loading gallery')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const handleDeleteClick = (image: GalleryImage) => {
    setImageToDelete(image)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = async () => {
    if (!imageToDelete) return

    try {
      setDeleting(imageToDelete.id)
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', imageToDelete.id)

      if (error) throw error

      toast.success('Image deleted successfully')
      fetchImages()
    } catch (error) {
      console.error('Error deleting image:', error)
      toast.error('Error deleting image')
    } finally {
      setDeleting(null)
      setShowDeleteDialog(false)
      setImageToDelete(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Gallery Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your gallery images and videos
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Add Media
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to Gallery</DialogTitle>
            </DialogHeader>
            <AddImageForm onSuccess={fetchImages} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex justify-center gap-2 mb-8">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All Media
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" /> 
            Images
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Videos
          </TabsTrigger>
        </TabsList>

        {['all', 'image', 'video'].map((type) => (
          <TabsContent key={type} value={type}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images
                .filter(img => type === 'all' || img.media_type === type)
                .map((image) => (
                  <div
                    key={image.id}
                    className="group relative aspect-square rounded-lg overflow-hidden border bg-card"
                  >
                    {image.media_type === 'video' ? (
                      <video
                        src={image.src}
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-100 group-hover: transition-opacity"
                      onClick={() => handleDeleteClick(image)}
                      disabled={deleting === image.id}
                    >
                      {deleting === image.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Media</DialogTitle>
          </DialogHeader>
          
          {imageToDelete && (
            <div className="space-y-4">
              <div className="aspect-video relative rounded-lg overflow-hidden border">
                {imageToDelete.media_type === 'video' ? (
                  <video
                    src={imageToDelete.src}
                    className="w-full h-full object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={imageToDelete.src}
                    alt={imageToDelete.alt}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete this {imageToDelete.media_type}? This action cannot be undone.
              </p>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={!!deleting}
            >
              {deleting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </span>
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}