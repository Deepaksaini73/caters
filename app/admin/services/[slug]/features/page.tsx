"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { createClient } from '@/lib/supabaseClient'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface Feature {
  id: string
  title: string
  description: string
  service_id: string
}

export default function ServiceFeaturesAdmin() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [featureToDelete, setFeatureToDelete] = useState<Feature | null>(null)
  
  const params = useParams()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })

  useEffect(() => {
    fetchFeatures()
  }, [params.slug])

  async function fetchFeatures() {
    try {
      const { data: service } = await supabase
        .from('services')
        .select('id')
        .eq('slug', params.slug)
        .single()

      if (!service) return

      const { data } = await supabase
        .from('service_features')
        .select('*')
        .eq('service_id', service.id)
        .order('title')

      setFeatures(data || [])
    } catch (error) {
      console.error('Error fetching features:', error)
      toast.error('Error loading features')
    } finally {
      setLoading(false)
    }
  }

  async function handleAddFeature(e: React.FormEvent) {
    e.preventDefault()
    setAdding(true)

    try {
      const { data: service } = await supabase
        .from('services')
        .select('id')
        .eq('slug', params.slug)
        .single()

      if (!service) throw new Error('Service not found')

      const { error } = await supabase
        .from('service_features')
        .insert({
          service_id: service.id,
          title: formData.title,
          description: formData.description
        })

      if (error) throw error

      toast.success('Feature added successfully')
      fetchFeatures()
      setFormData({ title: '', description: '' })
    } catch (error) {
      console.error('Error adding feature:', error)
      toast.error('Error adding feature')
    } finally {
      setAdding(false)
    }
  }

  async function handleEditFeature(feature: Feature) {
    setEditing(feature.id)

    try {
      const { error } = await supabase
        .from('service_features')
        .update({
          title: formData.title,
          description: formData.description
        })
        .eq('id', feature.id)

      if (error) throw error

      toast.success('Feature updated successfully')
      fetchFeatures()
    } catch (error) {
      console.error('Error updating feature:', error)
      toast.error('Error updating feature')
    } finally {
      setEditing(null)
    }
  }

  async function handleDeleteFeature() {
    if (!featureToDelete) return
    setDeleting(featureToDelete.id)

    try {
      const { error } = await supabase
        .from('service_features')
        .delete()
        .eq('id', featureToDelete.id)

      if (error) throw error

      toast.success('Feature deleted successfully')
      fetchFeatures()
    } catch (error) {
      console.error('Error deleting feature:', error)
      toast.error('Error deleting feature')
    } finally {
      setDeleting(null)
      setShowDeleteDialog(false)
      setFeatureToDelete(null)
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
      <h1 className="text-3xl font-bold mb-8">Manage Service Features</h1>

      {/* Add Feature Form */}
      <form onSubmit={handleAddFeature} className="mb-8 space-y-4">
        <Input
          placeholder="Feature Title"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
        <Textarea
          placeholder="Feature Description"
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
        <Button type="submit" disabled={adding}>
          {adding ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Adding Feature...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Feature
            </span>
          )}
        </Button>
      </form>

      {/* Features List */}
      <div className="space-y-4">
        {features.map(feature => (
          <div
            key={feature.id}
            className="p-4 rounded-lg border bg-card flex items-start justify-between gap-4"
          >
            <div>
              <h3 className="font-medium">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setFormData({
                    title: feature.title,
                    description: feature.description
                  })
                  setEditing(feature.id)
                }}
                disabled={!!deleting}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                  setFeatureToDelete(feature)
                  setShowDeleteDialog(true)
                }}
                disabled={!!deleting}
              >
                {deleting === feature.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Feature</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this feature? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteFeature}
              disabled={!!deleting}
            >
              {deleting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </span>
              ) : (
                'Delete Feature'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}