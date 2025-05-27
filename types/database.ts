export type ContactMessage = {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  status: 'unread' | 'read'
}

export type Service = {
  id: string
  slug: string
  title: string
  description: string
  long_description: string | null
  icon: string
  image_src: string
  created_at: string
}

export type ServiceGallery = {
  id: string
  service_id: string
  image_url: string
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      contact_messages: {
        Row: ContactMessage
        Insert: Omit<ContactMessage, 'id' | 'created_at' | 'status'>
      }
      services: {
        Row: Service
        Insert: Omit<Service, 'id' | 'created_at'>
      }
      service_gallery: {
        Row: ServiceGallery
        Insert: Omit<ServiceGallery, 'id' | 'created_at'>
      }
      // ...existing tables...
    }
  }
}