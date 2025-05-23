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

export type Database = {
  public: {
    Tables: {
      contact_messages: {
        Row: ContactMessage
        Insert: Omit<ContactMessage, 'id' | 'created_at' | 'status'>
      }
    }
  }
}