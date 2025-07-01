"use client"
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabaseClient";
import Gallery from "@/components/services/gallery";
import Details from "@/components/services/details";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

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
      <div className="relative min-h-screen py-16 md:py-24 overflow-hidden">
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 blur-2xl z-0"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Section */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div>
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {service.title}
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {service.long_description}
              </motion.p>
            </div>
            <motion.div
              className="relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <motion.div
                animate={{ scale: [1, 1.04, 1], y: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <Image
                  src={service.image_src}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Features */}
          <section>
            <motion.h2
              className="text-3xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              What We Offer
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.13 } },
                hidden: {},
              }}
            >
              {service.features.map((feature, idx) => (
                <motion.div
                  key={feature.id}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.96 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Gallery */}
          <section className="mt-16">
            <motion.h2
              className="text-3xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Our Work
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.13 } },
                hidden: {},
              }}
            >
              <Gallery
                media={service.gallery.map(item => ({
                  type: item.image_url.endsWith('.mp4') ? 'video' : 'image',
                  url: item.image_url
                }))}
                title={service.title}
              />
            </motion.div>
          </section>
        </div>
      </div>
    </Suspense>
  );
}