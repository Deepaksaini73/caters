"use client"
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabaseClient";
import Gallery from "@/components/services/gallery";
import Details from "@/components/services/details";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  long_description: string;
  icon: string;
  image_src: string;
  features: {
    id: string;
    title: string;
    description: string;
  }[];
  gallery: {
    id: number;
    image_url: string;
  }[];
}

async function getServiceDetails(slug: string): Promise<ServiceDetail | null> {
  const supabase = createClient();

  try {
    const { data: service, error: serviceError } = await supabase
      .from('services')
      .select(`
        *,
        features:service_features(
          id,
          title,
          description
        ),
        gallery:service_gallery(
          id,
          image_url
        )
      `)
      .eq('slug', slug)
      .single();

    if (serviceError) throw serviceError;
    if (!service) return null;

    return {
      id: service.id,
      slug: service.slug,
      title: service.title,
      description: service.description,
      long_description: service.long_description,
      icon: service.icon,
      image_src: service.image_src,
      features: service.features || [],
      gallery: service.gallery || []
    };
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchService() {
      try {
        const data = await getServiceDetails(resolvedParams.slug);
        if (!data) {
          redirect('/');
        }
        setService(data);
      } catch (error) {
        console.error('Error:', error);
        redirect('/');
      } finally {
        setLoading(false);
      }
    }

    fetchService();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!service) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h1 className="text-4xl font-bold mb-6">{service.title}</h1>
              <p className="text-xl text-muted-foreground">
                {service.long_description}
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={service.image_src}
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
            <Gallery
              media={service.gallery.map(item => ({
                type: item.image_url.endsWith('.mp4') ? 'video' : 'image',
                url: item.image_url
              }))}
              title={service.title}
            />
          </section>
        </div>
      </div>
    </Suspense>
  );
}