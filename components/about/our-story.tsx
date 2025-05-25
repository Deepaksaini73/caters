import Image from "next/image"

export default function OurStory() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Mahakal Events was founded in 2020 with a simple mission: to transform ordinary events into
              extraordinary experiences. What started as a small family business specializing in wedding decorations
              has grown into a full-service event planning and decoration company.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Over the years, we've expanded our services to include professional photography, videography, and
              comprehensive event management. Our team has grown from just 3 dedicated individuals to over 25 creative
              professionals who are passionate about bringing your vision to life.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, we're proud to be one of the leading event planning companies in the region, known for our
              innovative designs, attention to detail, and exceptional customer service.
            </p>
          </div>
          <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dhi5df340/image/upload/v1748163163/WhatsApp_Image_2025-05-25_at_13.44.03_2791ce40_v2wmgs.jpg"
              alt="Mahakal Events Team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}