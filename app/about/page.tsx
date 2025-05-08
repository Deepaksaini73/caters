import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, CheckCircle, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Mahakal Caters</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Creating unforgettable events with passion, creativity, and attention to detail since 2010.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Mahakal Caters was founded in 2010 with a simple mission: to transform ordinary events into
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
                src="/placeholder.svg?height=1000&width=800&text=Our+Team"
                alt="Mahakal Caters Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              At Mahakal Caters, our work is guided by a set of core values that define who we are and how we approach
              every event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                  <p className="text-muted-foreground">
                    We strive for excellence in everything we do, from the smallest detail to the overall event
                    experience.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
                  <p className="text-muted-foreground">
                    We work closely with our clients, understanding their vision and bringing it to life through
                    collaborative planning.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    We constantly explore new ideas, trends, and technologies to create unique and memorable events.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Our talented team of professionals is dedicated to making your event perfect in every way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Founder & Creative Director",
                image: "/placeholder.svg?height=400&width=400&text=Rajesh",
              },
              {
                name: "Priya Sharma",
                role: "Event Manager",
                image: "/placeholder.svg?height=400&width=400&text=Priya",
              },
              {
                name: "Vikram Singh",
                role: "Lead Photographer",
                image: "/placeholder.svg?height=400&width=400&text=Vikram",
              },
              {
                name: "Ananya Patel",
                role: "Decoration Specialist",
                image: "/placeholder.svg?height=400&width=400&text=Ananya",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Dream Event?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Let our experienced team help you plan and execute the perfect event that reflects your style and vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/quote">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
