export interface ServiceDetail {
  slug: string
  title: string
  description: string
  longDescription: string
  icon: string
  imageSrc: string
  gallery: string[]
  features: {
    title: string
    description: string
  }[]
}

export async function getServiceBySlug(slug: string): Promise<ServiceDetail | null> {
  const services: ServiceDetail[] = [
    {
      slug: "wedding-decoration",
      title: "Wedding Decoration",
      description: "Transform your wedding venue into a magical space",
      longDescription: "We create enchanting wedding environments with elegant floral arrangements, sophisticated lighting, and personalized thematic elements that reflect your unique love story.",
      icon: "Heart",
      imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868099/photo-1689699790566-34411f85dd72_ih4wyn.jpg",
      gallery: [
        "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868099/photo-1689699790566-34411f85dd72_ih4wyn.jpg",
        "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868185/photo-1683422074015-aafc41ef1b36_sfxqxl.jpg",
        "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868295/468690978_594200526471916_230415010275403789_n_-_Copy_cohqfa.jpg"
      ],
      features: [
        { title: "Custom Themed Decor", description: "Personalized decoration schemes that match your wedding style" },
        { title: "Floral Arrangements", description: "Fresh and artificial flower arrangements for all spaces" },
        { title: "Lighting Design", description: "Ambient lighting to create the perfect atmosphere" }
      ]
    },
    {
      slug: "birthday-party",
      title: "Birthday Celebrations",
      description: "Celebrate birthdays with style and fun",
      longDescription: "From kid-friendly cartoon themes to elegant adult parties, we offer full-service birthday planning with decorations, activities, and entertainment tailored to your needs.",
      icon: "Cake",
      imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg",
      gallery: [
        "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg"
      ],
      features: [
        { title: "Themed Decor", description: "From superheroes to elegant themes, we set the mood" },
        { title: "Games & Entertainment", description: "Fun activities for kids and adults alike" },
        { title: "Custom Cakes", description: "Delicious cakes designed to match your party theme" }
      ]
    },
    {
      slug: "photography",
      title: "Photography & Videography",
      description: "Capture moments that last a lifetime",
      longDescription: "Our team of skilled photographers and videographers use the latest equipment and creative direction to document your special occasions in stunning detail.",
      icon: "Camera",
      imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746869621/OIP_hwsei2.jpg",
      gallery: [],
      features: [
        { title: "Professional Photography", description: "Event, portrait, and candid photography" },
        { title: "Cinematic Videography", description: "Cinematic wedding and event films" },
        { title: "Drone Coverage", description: "Bird's-eye views for a dramatic touch" }
      ]
    },
    {
      slug: "entertainment",
      title: "Music & Entertainment",
      description: "Keep the party alive with great music",
      longDescription: "We offer live bands, professional DJs, and performers to set the mood and keep your guests entertained at weddings, parties, or corporate events.",
      icon: "MusicNote",
      imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746869703/OIP_yqds6e.jpg",
      gallery: [],
      features: [
        { title: "Live Music", description: "Talented bands and solo performers" },
        { title: "DJ Services", description: "Professional DJs with top-notch sound systems" },
        { title: "Dance & Stage Acts", description: "Engaging acts and shows for all audiences" }
      ]
    },
    {
      slug: "catering",
      title: "Catering Services",
      description: "Delicious food for every occasion",
      longDescription: "Our catering team crafts custom menus for every event, from traditional buffets to gourmet fine dining, ensuring delicious options for every guest.",
      icon: "Utensils",
      imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746869751/catering-food-wedding-event-table-84491977_e78fxg.jpg",
      gallery: [],
      features: [
        { title: "Custom Menus", description: "Curated food options to match your theme" },
        { title: "Buffet & Plated Service", description: "Serving styles to suit your event needs" },
        { title: "Dietary Accommodations", description: "Vegan, gluten-free, and allergy-friendly options" }
      ]
    },
    {
      slug: "corporate",
      title: "Corporate Events",
      description: "Professional event solutions for businesses",
      longDescription: "From conferences to team-building retreats, we provide streamlined planning and execution with modern setups, engaging sessions, and full hospitality services.",
      icon: "Briefcase",
      imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746869829/OIP_kkqudp.jpg",
      gallery: [],
      features: [
        { title: "Event Planning", description: "Complete coordination from agenda to execution" },
        { title: "AV & Presentation Setup", description: "Professional audio-visual systems for smooth events" },
        { title: "Hospitality Services", description: "Food, beverages, and guest coordination" }
      ]
    },

    // 🔽 New Services Below (You can replace placeholders as needed)
    {
      slug: "event-planning",
      title: "Event Planning",
      description: "End-to-end planning for any occasion",
      longDescription: "We manage every detail of your event—from concept to execution—ensuring a seamless and unforgettable experience.",
      icon: "CalendarCheck",
      imageSrc: "https://via.placeholder.com/600x400?text=Event+Planning",
      gallery: [],
      features: [
        { title: "Venue & Vendor Management", description: "Handling all bookings and logistics" },
        { title: "Timeline Coordination", description: "On-time execution of all event phases" },
        { title: "Budget Management", description: "Efficient planning within your budget" }
      ]
    },
    {
      slug: "traditional-wedding",
      title: "Traditional Wedding (Eru Iyawo)",
      description: "Celebrate rich cultural wedding customs",
      longDescription: "We organize culturally authentic traditional weddings, with specialized attire, rituals, and decoration to honor your heritage.",
      icon: "Users",
      imageSrc: "https://via.placeholder.com/600x400?text=Traditional+Wedding",
      gallery: [],
      features: [
        { title: "Cultural Setup", description: "Stage, costumes, and rituals" },
        { title: "Gift Packaging", description: "Presentation of traditional items and souvenirs" },
        { title: "Coordination", description: "Complete program management" }
      ]
    },
    {
      slug: "balloon-decoration",
      title: "Balloon Decoration",
      description: "Fun and vibrant balloon setups",
      longDescription: "Add a festive touch with custom balloon arches, walls, and sculptures perfect for birthdays, baby showers, and more.",
      icon: "Smile",
      imageSrc: "https://via.placeholder.com/600x400?text=Balloon+Decor",
      gallery: [],
      features: [
        { title: "Themed Balloons", description: "Cartoon, elegant, or abstract" },
        { title: "Creative Installations", description: "Walls, pillars, entryways" },
        { title: "Photo Zones", description: "Balloon backdrops for pictures" }
      ]
    },
    {
      slug: "tent-entry",
      title: "Tent, Entry & Lighting",
      description: "Grand entries and tents for your events",
      longDescription: "We provide luxury tents, elegant entryways, and decorative lighting for every celebration.",
      icon: "Tent",
      imageSrc: "https://via.placeholder.com/600x400?text=Tent+Entry",
      gallery: [],
      features: [
        { title: "Entry Gate Decor", description: "Stunning welcome arches" },
        { title: "Thematic Tenting", description: "Custom-built themed tent arrangements" },
        { title: "Decorative Lighting", description: "Lighting that enhances your ambiance" }
      ]
    },
    {
      slug: "haldi-mehendi",
      title: "Haldi & Mehendi Ceremony",
      description: "Traditional pre-wedding events",
      longDescription: "Celebrate these cherished rituals with vibrant decor, live artists, and a joyful ambiance.",
      icon: "Leaf",
      imageSrc: "https://via.placeholder.com/600x400?text=Haldi+Mehendi",
      gallery: [],
      features: [
        { title: "Floral Decor", description: "Turmeric/yellow & green themes" },
        { title: "Live Artists", description: "Mehendi artists and performers" },
        { title: "Traditional Music", description: "Dhol, folk songs and more" }
      ]
    },
    {
      slug: "vendor-sourcing",
      title: "Vendor Sourcing",
      description: "Find the perfect vendor for your event",
      longDescription: "We bring you the best vendors for decor, catering, sound, photography and more—all vetted and reliable.",
      icon: "Search",
      imageSrc: "https://via.placeholder.com/600x400?text=Vendor+Sourcing",
      gallery: [],
      features: [
        { title: "Trusted Network", description: "Top-rated professionals only" },
        { title: "Cost-Efficiency", description: "Best value for your budget" },
        { title: "Coordination", description: "We liaise so you don’t have to" }
      ]
    },
    {
      slug: "bridal-shower",
      title: "Bridal Shower",
      description: "Elegant pre-wedding party",
      longDescription: "Celebrate the bride-to-be with a themed bridal shower, custom decor, games, and photo ops.",
      icon: "Heart",
      imageSrc: "https://via.placeholder.com/600x400?text=Bridal+Shower",
      gallery: [],
      features: []
    },
    {
      slug: "baby-shower",
      title: "Baby Shower",
      description: "Adorable celebrations for moms-to-be",
      longDescription: "From games to cakes and decorations, we make baby showers special for the growing family.",
      icon: "Baby",
      imageSrc: "https://via.placeholder.com/600x400?text=Baby+Shower",
      gallery: [],
      features: []
    },
    {
      slug: "kiddies-party",
      title: "Kiddies Party",
      description: "Fun-filled parties for kids",
      longDescription: "Cartoon characters, clowns, magicians, and themed decor for unforgettable children's parties.",
      icon: "Smile",
      imageSrc: "https://via.placeholder.com/600x400?text=Kids+Party",
      gallery: [],
      features: []
    },
    {
      slug: "anniversary",
      title: "Anniversary Celebration",
      description: "Celebrate your love story",
      longDescription: "From golden jubilees to first-year anniversaries, we create romantic and elegant anniversary setups.",
      icon: "CalendarHeart",
      imageSrc: "https://via.placeholder.com/600x400?text=Anniversary",
      gallery: [],
      features: []
    },
    {
      slug: "vip-services",
      title: "VIP Management & Treatment",
      description: "Exclusive hospitality for elite guests",
      longDescription: "Red carpet entries, lounge zones, butler service and more for a premium guest experience.",
      icon: "Crown",
      imageSrc: "https://via.placeholder.com/600x400?text=VIP+Services",
      gallery: [],
      features: []
    },
    {
      slug: "festive-decor",
      title: "Festive & Christmas Decoration",
      description: "Joyful, festive setup for holidays",
      longDescription: "From Christmas trees to Diwali lights, we add sparkle to every celebration.",
      icon: "Sparkles",
      imageSrc: "https://via.placeholder.com/600x400?text=Festive+Decor",
      gallery: [],
      features: []
    }
  ];

  await new Promise(resolve => setTimeout(resolve, 300));
  return services.find(service => service.slug === slug) || null;
}
