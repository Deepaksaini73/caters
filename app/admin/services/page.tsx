"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Trash2, Loader2, Plus, Image as ImageIcon, ListPlus } from "lucide-react"
import CreateServiceForm from "./components/CreateServiceForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ServicesAdmin() {
  const [services, setServices] = useState<{ title: string; slug: string; }[]>([])
  const [loading, setLoading] = useState(true) // Add loading state
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<{ title: string; slug: string; } | null>(null)
  const supabase = createClient()
  const [open, setOpen] = useState(false)

  async function fetchServices() {
    try {
      const { data } = await supabase
        .from('services')
        .select('title, slug')
        .order('title')

      setServices(data || [])
    } catch (error) {
      console.error('Error fetching services:', error)
      toast.error('Error loading services')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const refreshServices = () => {
    fetchServices()
  }

  const handleDeleteClick = (service: { title: string; slug: string }) => {
    setServiceToDelete(service)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = async () => {
    if (!serviceToDelete) return

    try {
      setDeletingSlug(serviceToDelete.slug)

      // Delete related gallery items first
      await supabase
        .from('service_gallery')
        .delete()
        .eq('service_id', serviceToDelete.slug)

      // Delete the service
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('slug', serviceToDelete.slug)

      if (error) throw error

      toast.success('Service deleted successfully')
      refreshServices()
    } catch (error) {
      console.error('Error deleting service:', error)
      toast.error('Error deleting service')
    } finally {
      setDeletingSlug(null)
      setShowDeleteDialog(false)
      setServiceToDelete(null)
    }
  }

  return (
    <div className="container mx-auto py-16 max-w-5xl">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Services Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage your services, galleries and features
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Add New Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Service</DialogTitle>
              </DialogHeader>
              <CreateServiceForm 
                onSuccess={refreshServices} 
                onOpenChange={setOpen}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {loading ? (
            // Loading skeleton
            [...Array(3)].map((_, index) => (
              <div 
                key={index}
                className="flex gap-3 p-4 rounded-lg border bg-card animate-pulse"
              >
                <div className="flex-1 space-y-2">
                  <div className="h-6 w-1/3 bg-muted rounded" />
                  <div className="h-4 w-2/3 bg-muted rounded" />
                </div>
                <div className="flex items-center gap-2">
                  {[...Array(3)].map((_, btnIndex) => (
                    <div 
                      key={btnIndex}
                      className="h-10 w-10 rounded-md bg-muted"
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Existing services list
            services.map((service) => (
              <div 
                key={service.slug} 
                className="flex gap-3 p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors"
              >
                <div className="flex-1">
                  <h2 className="font-semibold text-lg mb-1">{service.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage gallery and features for this service
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={`/admin/services/${service.slug}`}
                          className="flex-1"
                        >
                          <Button variant="outline" size="icon" className="h-10 w-10">
                            <ImageIcon className="h-5 w-5" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Manage Gallery</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/admin/services/${service.slug}/features`}>
                          <Button variant="outline" size="icon" className="h-10 w-10">
                            <ListPlus className="h-5 w-5" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Manage Features</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => handleDeleteClick(service)}
                          disabled={deletingSlug === service.slug}
                        >
                          {deletingSlug === service.slug ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Trash2 className="h-5 w-5" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Service</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Service</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete &quot;{serviceToDelete?.title}&quot;?
                This will also delete all gallery items associated with this service.
                This action cannot be undone.
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
                onClick={handleDeleteConfirm}
                disabled={deletingSlug !== null}
              >
                {deletingSlug ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </span>
                ) : (
                  'Delete Service'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}