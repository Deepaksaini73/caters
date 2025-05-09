import { notFound } from "next/navigation"
import Image from "next/image"
import { getServiceBySlug } from "@/config/services"
import Gallery from "@/components/services/gallery"
import Details from "@/components/services/details"
import { Suspense } from "react"

interface ServicePageProps {
  params: {
    slug: string
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl font-bold mb-6">{service.title}</h1>
            <p className="text-xl text-muted-foreground">{service.longDescription}</p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Suspense fallback={<div className="w-full h-full bg-muted animate-pulse" />}>
              <Image
                src={service.imageSrc}
                alt={service.title}
                fill
                className="object-cover"
              />
            </Suspense>
          </div>
        </div>

        {/* Features */}
        <section>
          <h2 className="text-3xl font-bold mb-8">What We Offer</h2>
          <Suspense fallback={<div className="h-48 bg-muted animate-pulse rounded-lg" />}>
            <Details features={service.features} />
          </Suspense>
        </section>

        {/* Gallery */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Our Work</h2>
          <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-lg" />}>
            <Gallery images={service.gallery} title={service.title} />
          </Suspense>
        </section>
      </div>
    </div>
  )
}