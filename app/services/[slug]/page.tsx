import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import { getServiceBySlug } from "@/config/services";
import Gallery from "@/components/services/gallery";
import Details from "@/components/services/details";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServicePage(props: ServicePageProps) {
  const params = await props.params;
  try {
    const service = await getServiceBySlug(params.slug);

    if (!service) {
      return notFound();
    }

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="min-h-screen py-16">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h1 className="text-4xl font-bold mb-6">{service.title}</h1>
                <p className="text-xl text-muted-foreground">
                  {service.longDescription}
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={service.imageSrc}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Features */}
            <section>
              <h2 className="text-3xl font-bold mb-8">What We Offer</h2>
              <Details features={service.features} />
            </section>

            {/* Gallery */}
            <section className="mt-16">
              <h2 className="text-3xl font-bold mb-8">Our Work</h2>
              <Gallery images={service.gallery} title={service.title} />
            </section>
          </div>
        </div>
      </Suspense>
    );
  } catch (error) {
    return notFound();
  }
}
