"use client"
import { createContext, useContext, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { Suspense } from "react"

// Create context for loading state
const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: (loading: boolean) => {},
})

// LoadingProvider component
export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setIsLoading(true)
    const timeout = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timeout)
  }, [pathname, searchParams])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {/* Wrap children with Suspense for loading state */}
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
    </LoadingContext.Provider>
  )
}

// Custom hook to use loading context
export const useLoading = () => useContext(LoadingContext)
