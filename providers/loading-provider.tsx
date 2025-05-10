"use client"
import { createContext, useContext, useState } from "react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { Suspense } from "react"

const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: (loading: boolean) => {},
})

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Show loading on route changes
    setIsLoading(true)
    const timeout = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timeout)
  }, [pathname])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
      {isLoading && <LoadingSpinner />}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)
