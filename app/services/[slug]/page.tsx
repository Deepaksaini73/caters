import { notFound } from "next/navigation"
import Image from "next/image"
import { services } from "@/config/home/services"
import Gallery from "@/components/services/gallery"
import Details from "@/components/services/details"
import { Suspense } from "react"

interface ServicePageProps {
  params: {
    slug: string
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services.find(s => s.href.endsWith(params.slug))

  if (!service) {
    notFound()
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h1 className="text-4xl font-bold mb-6">{service.title}</h1>
              <p className="text-xl text-muted-foreground">{service.description}</p>
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
              <Details features={[
                {
                  title: "Professional Service",
                  description: "Expert team dedicated to your event's success"
                },
                {
                  title: "Customization",
                  description: "Tailored solutions to match your specific needs"
                },
                {
                  title: "Quality Guaranteed",
                  description: "High standards in every aspect of our service"
                }
              ]} />
            </Suspense>
          </section>

          {/* Gallery */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Our Work</h2>
            <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-lg" />}>
              <Gallery 
                images={[service.imageSrc]} 
                title={service.title} 
              />
            </Suspense>
          </section>
        </div>
      </div>
    </Suspense>
  )
}