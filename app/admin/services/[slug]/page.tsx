"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { createClient } from '@/lib/supabaseClient';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Trash2, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"

const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

interface GalleryItem {
  id: number
  image_url: string
  service_id: number
}

interface UploadProgress {
  fileName: string
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
}

export default function ServiceGalleryAdmin() {
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [existingMedia, setExistingMedia] = useState<GalleryItem[]>([])
  const [deleting, setDeleting] = useState<number | null>(null)
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null)
  const params = useParams()
  const supabase = createClient()

  useEffect(() => {
    fetchExistingMedia()
  }, [params.slug])

  const fetchExistingMedia = async () => {
    try {
      const service = await supabase
        .from('services')
        .select('id')
        .eq('slug', params.slug)
        .single()

      if (service.data) {
        const { data } = await supabase
          .from('service_gallery')
          .select('*')
          .eq('service_id', service.data.id)

        setExistingMedia(data || [])
      }
    } catch (error) {
      console.error('Error fetching media:', error)
      toast.error('Error loading existing media')
    }
  }

  const handleDeleteClick = (item: GalleryItem) => {
    setItemToDelete(item)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return
    
    try {
      setDeleting(itemToDelete.id)
      
      // Delete from Supabase first
      await supabase
        .from('service_gallery')
        .delete()
        .eq('id', itemToDelete.id)

      // Extract public_id from Cloudinary URL
      const urlParts = itemToDelete.image_url.split('/')
      const fileNameWithExt = urlParts[urlParts.length - 1]
      const fileName = fileNameWithExt.split('.')[0]
      
      const uploadIndex = urlParts.indexOf('upload')
      const folderPath = urlParts.slice(uploadIndex + 2, -1).join('/')
      
      const publicId = folderPath ? `${folderPath}/${fileName}` : fileName

      // Delete from Cloudinary
      const response = await fetch('/api/cloudinary-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          public_id: publicId
        })
      })

      if (!response.ok) {
        throw new Error('Failed to delete from Cloudinary')
      }

      toast.success('Media deleted successfully')
      fetchExistingMedia()
    } catch (error) {
      console.error('Error deleting media:', error)
      toast.error('Error deleting media')
    } finally {
      setDeleting(null)
      setShowDeleteDialog(false)
      setItemToDelete(null)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles(newFiles)
      // Initialize progress tracking for each file
      setUploadProgress(newFiles.map(file => ({
        fileName: file.name,
        progress: 0,
        status: 'pending'
      })))
    }
  }

  const handleUpload = async () => {
    try {
      setUploading(true)

      const service = await supabase
        .from('services')
        .select('id')
        .eq('slug', params.slug)
        .single()

      if (!service.data) {
        toast.error('Service not found')
        return
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        // Update status to uploading
        setUploadProgress(prev => prev.map((p, index) => 
          index === i ? { ...p, status: 'uploading' } : p
        ))

        try {
          // Upload to Cloudinary
          const formData = new FormData()
          formData.append("file", file)
          formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)

          const cloudinaryRes = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
            {
              method: "POST",
              body: formData
            }
          )

          const data = await cloudinaryRes.json()

          if (!data.secure_url) {
            throw new Error("Cloudinary upload failed")
          }

          // Determine media type
          const mediaType = file.type.startsWith('video/') ? 'video' : 'image'

          // Save to both tables in parallel
          await Promise.all([
            // Save to service_gallery
            supabase
              .from('service_gallery')
              .insert({
                service_id: service.data.id,
                image_url: data.secure_url
              }),
            
            // Save to gallery_images
            supabase
              .from('gallery_images')
              .insert({
                src: data.secure_url,
                alt: file.name,
                media_type: mediaType
              })
          ])

          // Update progress to completed
          setUploadProgress(prev => prev.map((p, index) => 
            index === i ? { ...p, progress: 100, status: 'completed' } : p
          ))
        } catch (error) {
          // Update progress to error
          setUploadProgress(prev => prev.map((p, index) => 
            index === i ? { ...p, status: 'error' } : p
          ))
          console.error(`Error uploading ${file.name}:`, error)
        }
      }

      toast.success('Files uploaded successfully to both galleries')
      setFiles([])
      setUploadProgress([])
      fetchExistingMedia()
    } catch (error) {
      toast.error('Error uploading files')
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8">Upload Gallery Images & Videos</h1>
      
      <div className="space-y-8">
        {/* Upload section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Upload New Media</h2>
          <Input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            disabled={uploading}
          />
          
          <div className="flex gap-4 flex-wrap">
            {files.map((file, i) => (
              <div key={i} className="relative">
                {file.type.startsWith('video/') ? (
                  <video
                    controls
                    className="w-24 h-24 rounded object-cover"
                    src={URL.createObjectURL(file)}
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${i}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                
                {/* Progress Overlay */}
                {uploadProgress[i]?.status === 'uploading' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                  </div>
                )}
                
                {/* Status Indicator */}
                <div className="text-xs mt-1 text-center">
                  {uploadProgress[i]?.status === 'pending' && 'Ready'}
                  {uploadProgress[i]?.status === 'uploading' && 'Uploading...'}
                  {uploadProgress[i]?.status === 'completed' && 'Done!'}
                  {uploadProgress[i]?.status === 'error' && 'Failed'}
                </div>
              </div>
            ))}
          </div>

          <Button 
            onClick={handleUpload}
            disabled={uploading || files.length === 0}
            className="w-full"
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading {uploadProgress.filter(p => p.status === 'completed').length} of {files.length}...
              </span>
            ) : (
              'Upload Files'
            )}
          </Button>
        </div>


        {/* Existing media section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Existing Media</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {existingMedia.map((item) => (
              <div key={item.id} className="relative group">
                {item.image_url.includes('video') ? (
                  <video
                    src={item.image_url}
                    className="w-full h-48 object-cover rounded"
                    controls
                  />
                ) : (
                  <img
                    src={item.image_url}
                    alt="Gallery item"
                    className="w-full h-48 object-cover rounded"
                  />
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeleteClick(item)}
                  disabled={deleting === item.id}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Media</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this media? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {itemToDelete && (
            <div className="aspect-video relative rounded-lg overflow-hidden border">
              {itemToDelete.image_url.includes('video') ? (
                <video
                  src={itemToDelete.image_url}
                  className="w-full h-full object-cover"
                  controls
                />
              ) : (
                <img
                  src={itemToDelete.image_url}
                  alt="Media to delete"
                  className="w-full h-full object-cover"
                />
              )}
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
                'Delete Media'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
