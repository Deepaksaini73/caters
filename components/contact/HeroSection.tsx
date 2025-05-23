export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            Have questions or ready to start planning your event? Get in touch with our team.
          </p>
        </div>
      </div>
    </section>
  )
}