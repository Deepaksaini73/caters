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

  // Suspense boundaries should wrap around the hooks that depend on client-side data fetching
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <Suspense fallback={<LoadingSpinner />}>
        {/* The SearchParams should be accessed inside the Suspense boundary */}
        <SearchWithSearchParams />
        {children}
      </Suspense>
    </LoadingContext.Provider>
  )
}

// A wrapper to use useSearchParams within Suspense boundary
function SearchWithSearchParams() {
  const searchParams = useSearchParams()
  const {isLoading, setIsLoading} = useLoading()
  
  useEffect(() => {
    // Trigger loading state based on search params or pathname
    setIsLoading(true)
    const timeout = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timeout)
  }, [searchParams])

  return <input placeholder="Search..." />
}

// Custom hook to use loading context
export const useLoading = () => useContext(LoadingContext)
