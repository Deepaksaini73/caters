"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Loader2, Plus, Trash2, Upload } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface TeamMember {
  id: string
  name: string
  role: string
  image_url: string
}

function AddTeamMemberForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const supabase = createClient()

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image_url: ''
  })

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploadingImage(true)
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))

      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData
        }
      )

      const data = await res.json()
      setFormData(prev => ({ ...prev, image_url: data.secure_url }))
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Error uploading image')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('team_members')
        .insert(formData)

      if (error) throw error

      toast.success('Team member added successfully')
      onSuccess()
      setFormData({ name: '', role: '', image_url: '' })
      setPreviewUrl('')
    } catch (error) {
      console.error('Error adding team member:', error)
      toast.error('Error adding team member')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Name"
        value={formData.name}
        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
        required
      />
      <Input
        placeholder="Role"
        value={formData.role}
        onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
        required
      />
      <div className="space-y-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={uploadingImage}
        />
        {uploadingImage && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Uploading image...
          </div>
        )}
        {previewUrl && (
          <div className="relative aspect-square w-full rounded-lg overflow-hidden">
            <img
              src={previewUrl}
              alt="Preview"
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </div>
      <Button 
        type="submit" 
        disabled={loading || uploadingImage}
        className="w-full"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Adding Member...
          </span>
        ) : (
          'Add Team Member'
        )}
      </Button>
    </form>
  )
}

export default function TeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const supabase = createClient()

  async function fetchMembers() {
    try {
      const { data } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at')

      setMembers(data || [])
    } catch (error) {
      console.error('Error fetching members:', error)
      toast.error('Error loading team members')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      setDeleting(id)
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success('Team member deleted successfully')
      fetchMembers()
    } catch (error) {
      console.error('Error deleting member:', error)
      toast.error('Error deleting team member')
    } finally {
      setDeleting(null)
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
          <h1 className="text-4xl font-bold">Team Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your team members information
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
            </DialogHeader>
            <AddTeamMemberForm onSuccess={fetchMembers} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map(member => (
          <div
            key={member.id}
            className="rounded-lg border bg-card overflow-hidden group relative"
          >
            <div className="aspect-square relative">
              <img
                src={member.image_url}
                alt={member.name}
                className="object-cover w-full h-full"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-100 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDelete(member.id)}
                disabled={deleting === member.id}
              >
                {deleting === member.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}