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
  // Simulating database fetch with sample data
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
        "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868295/468690978_594200526471916_230415010275403789_n_-_Copy_cohqfa.jpg",
      ],
      features: [
        {
          title: "Custom Themed Decor",
          description: "Personalized decoration schemes that match your wedding style"
        },
        {
          title: "Floral Arrangements",
          description: "Fresh and artificial flower arrangements for all spaces"
        },
        {
          title: "Lighting Design",
          description: "Ambient lighting to create the perfect atmosphere"
        }
      ]
    },
    // Add more services here
    {
    slug: "birthday-party",
    title: "Birthday Celebrations",
    description: "Celebrate birthdays with style and fun",
    longDescription: "From kid-friendly cartoon themes to elegant adult parties, we offer full-service birthday planning with decorations, activities, and entertainment tailored to your needs.",
    icon: "Cake",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg",
    gallery: [
      "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg",
      "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868174/images-25-YNqBNaxZJoIQQx1B_xwgugi.jpg",
      "https://th.bing.com/th/id/OIP.ANRKP8Ulq-EpUKSJ3RzSdwHaFj?cb=iwp1&rs=1&pid=ImgDetMain"
    ],
    features: [
      {
        title: "Themed Decor",
        description: "From superheroes to elegant themes, we set the mood"
      },
      {
        title: "Games & Entertainment",
        description: "Fun activities for kids and adults alike"
      },
      {
        title: "Custom Cakes",
        description: "Delicious cakes designed to match your party theme"
      }
    ]
  },
  {
    slug: "photography",
    title: "Photography & Videography",
    description: "Capture moments that last a lifetime",
    longDescription: "Our team of skilled photographers and videographers use the latest equipment and creative direction to document your special occasions in stunning detail.",
    icon: "Camera",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746869621/OIP_hwsei2.jpg",
    gallery: [
      "https://th.bing.com/th/id/OIP.2RH7N4DWrVmMMeTzVaP61gHaE7?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/OIP.yzRUEbh5vpvob3LjQTxzMwHaEK?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/OIP.6hBYfSMu8_X6v-JF6eaqxgHaE8?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/OIP.dvxUdaYZiJXBgRQb8qM5JgHaFj?rs=1&pid=ImgDetMain"
    ],
    features: [
      {
        title: "Professional Photography",
        description: "Event, portrait, and candid photography"
      },
      {
        title: "Cinematic Videography",
        description: "Cinematic wedding and event films"
      },
      {
        title: "Drone Coverage",
        description: "Bird's-eye views for a dramatic touch"
      }
    ]
  },
  {
    slug: "entertainment",
    title: "Music & Entertainment",
    description: "Keep the party alive with great music",
    longDescription: "We offer live bands, professional DJs, and performers to set the mood and keep your guests entertained at weddings, parties, or corporate events.",
    icon: "MusicNote",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746869703/OIP_yqds6e.jpg",
    gallery: [
      "https://th.bing.com/th/id/OIP.YXYB_GqMKAA1MCUP_Yzt1QHaE8?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/OIP.vWvP7qG7lDUeVaPuAA-lZQHaLH?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/OIP.qzS7o2Ax91E-A8CU1UZmngHaFj?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/OIP.iNSVXqld7ZkK9IPSHdI0fgHaE8?rs=1&pid=ImgDetMain"
    ],
    features: [
      {
        title: "Live Music",
        description: "Talented bands and solo performers"
      },
      {
        title: "DJ Services",
        description: "Professional DJs with top-notch sound systems"
      },
      {
        title: "Dance & Stage Acts",
        description: "Engaging acts and shows for all audiences"
      }
    ]
  },
  {
    slug: "catering",
    title: "Catering Services",
    description: "Delicious food for every occasion",
    longDescription: "Our catering team crafts custom menus for every event, from traditional buffets to gourmet fine dining, ensuring delicious options for every guest.",
    icon: "Utensils",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746869751/catering-food-wedding-event-table-84491977_e78fxg.jpg",
    gallery: [
      "https://th.bing.com/th/id/OIP.nGdZ-rCFiINShT6Zd6cwLwHaE8?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/OIP.VqDLCLf66VvHEM0mDa_UkwHaE7?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/OIP.MgO-6GM-45o5MQEGa2cKfgHaFj?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/OIP.Z7s7jxThG8GEs0OSNDe3lQHaEK?rs=1&pid=ImgDetMain"
    ],
    features: [
      {
        title: "Custom Menus",
        description: "Curated food options to match your theme"
      },
      {
        title: "Buffet & Plated Service",
        description: "Serving styles to suit your event needs"
      },
      {
        title: "Dietary Accommodations",
        description: "Vegan, gluten-free, and allergy-friendly options"
      }
    ]
  },
  {
    slug: "corporate",
    title: "Corporate Events",
    description: "Professional event solutions for businesses",
    longDescription: "From conferences to team-building retreats, we provide streamlined planning and execution with modern setups, engaging sessions, and full hospitality services.",
    icon: "Briefcase",
    imageSrc: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746869829/OIP_kkqudp.jpg",
    gallery: [
      "https://th.bing.com/th/id/OIP.0_6T9gX4FsRh2OBpFg6glgHaFj?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/OIP.rZTGEByvDTzBygVqY_0f9gHaE8?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/OIP.km8P-E2FJ0_MvQxZ08O4egHaFj?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/OIP.E5TA2OfuHd5ynKHdR7RZnAHaFj?rs=1&pid=ImgDetMain"
    ],
    features: [
      {
        title: "Event Planning",
        description: "Complete coordination from agenda to execution"
      },
      {
        title: "AV & Presentation Setup",
        description: "Professional audio-visual systems for smooth events"
      },
      {
        title: "Hospitality Services",
        description: "Food, beverages, and guest coordination"
      }
    ]
  }
  ]

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return services.find(service => service.slug === slug) || null
}