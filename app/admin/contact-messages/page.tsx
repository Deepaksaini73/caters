"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Loader2, RefreshCw, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import type { ContactMessage } from '@/types/database'

const FILTERS = ['all', 'unread', 'read'] as const
type FilterType = (typeof FILTERS)[number]

export default function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterType>('all')

  const fetchMessages = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (err) {
      console.error('Error fetching messages:', err)
      setError('Failed to load messages. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const toggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'unread' ? 'read' : 'unread'
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, status: newStatus } : msg
        )
      )
    } catch (err) {
      console.error('Error updating status:', err)
      setError('Failed to update message status. Please try again.')
    }
  }

  const deleteMessage = async (id: number) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)

      if (error) throw error

      setMessages((prev) => prev.filter((msg) => msg.id !== id))
    } catch (err) {
      console.error('Error deleting message:', err)
      setError('Failed to delete message. Please try again.')
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'all') return true
    return msg.status === filter
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Messages ({filteredMessages.length})</h1>
        <Button onClick={fetchMessages} variant="outline" disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="mb-6 flex gap-2">
        {FILTERS.map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            No messages found
          </div>
        ) : (
          filteredMessages.map((message) => (
            <Card
              key={message.id}
              className={`
                ${message.status === 'unread' ? 'border-blue-500 bg-blue-50' : ''}
                hover:shadow-md transition-shadow
              `}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className="text-lg font-medium">{message.subject}</span>
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <strong>From:</strong>
                    <span>{message.name}</span>
                    <span className="text-gray-400">({message.email})</span>
                  </div>
                  {message.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <strong>Phone:</strong>
                      <span>{message.phone}</span>
                    </div>
                  )}
                  <p className="mt-4 text-gray-700 whitespace-pre-wrap">{message.message}</p>

                  <div className="flex items-center gap-3 mt-4">
                    <Button
                      onClick={() => toggleStatus(message.id, message.status)}
                      size="sm"
                      variant={message.status === 'unread' ? 'default' : 'outline'}
                    >
                      Mark as {message.status === 'unread' ? 'Read' : 'Unread'}
                    </Button>

                    <Button
                      onClick={() => deleteMessage(message.id)}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
