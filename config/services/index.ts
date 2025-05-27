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
      slug: "home-decoration",
      title: "Home Decoration",
      description: "Transform your wedding venue into a magical space",
      longDescription:
        "We create enchanting wedding environments with elegant floral arrangements, sophisticated lighting, and personalized thematic elements that reflect your unique love story.",
      icon: "Heart",
      imageSrc:
        "https://res.cloudinary.com/dhi5df340/image/upload/v1748161338/WhatsApp_Image_2025-05-25_at_13.46.28_30b95184_tniajj.jpg",
      gallery: [
        "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868099/photo-1689699790566-34411f85dd72_ih4wyn.jpg",
        "https://res.cloudinary.com/dhi5df340/image/upload/v1748162806/WhatsApp_Image_2025-05-25_at_14.17.04_67490ec3_gqyxue.jpg",
        "https://res.cloudinary.com/dhi5df340/video/upload/v1748162464/WhatsApp_Video_2025-05-25_at_13.21.19_0a75884a_ljtq9s.mp4",
      ],
      features: [
        {
          title: "Custom Themed Decor",
          description: "Personalized decoration schemes that match your wedding style",
        },
        {
          title: "Floral Arrangements",
          description: "Fresh and artificial flower arrangements for all spaces",
        },
        {
          title: "Lighting Design",
          description: "Ambient lighting to create the perfect atmosphere",
        },
      ],
    },
    {
      slug: "birthday-party",
      title: "Birthday Celebrations",
      description: "Celebrate birthdays with style and fun",
      longDescription:
        "From kid-friendly cartoon themes to elegant adult parties, we offer full-service birthday planning with decorations, activities, and entertainment tailored to your needs.",
      icon: "Cake",
      imageSrc:
        "https://res.cloudinary.com/dhi5df340/image/upload/v1748161911/WhatsApp_Image_2025-05-25_at_13.31.21_76abf78c_lbdapw.jpg",
      gallery: [
        "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg",
        "https://res.cloudinary.com/dhi5df340/image/upload/v1748163430/WhatsApp_Image_2025-05-25_at_13.31.14_995a4cf2_xmigp9.jpg",
        "https://res.cloudinary.com/dhi5df340/image/upload/v1748163445/WhatsApp_Image_2025-05-25_at_13.31.16_a9ba50ba_jjgunt.jpg",
      ],
      features: [
        {
          title: "Themed Decor",
          description: "From superheroes to elegant themes, we set the mood",
        },
        {
          title: "Games & Entertainment",
          description: "Fun activities for kids and adults alike",
        },
        {
          title: "Custom Cakes",
          description: "Delicious cakes designed to match your party theme",
        },
      ],
    },
    {
      slug: "photography",
      title: "Photography & Videography",
      description: "Capture moments that last a lifetime",
      longDescription:
        "Our team of skilled photographers and videographers use the latest equipment and creative direction to document your special occasions in stunning detail.",
      icon: "Camera",
      imageSrc:
        "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746869621/OIP_hwsei2.jpg",
      gallery: [],
      features: [
        {
          title: "Professional Photography",
          description: "Event, portrait, and candid photography",
        },
        {
          title: "Cinematic Videography",
          description: "Cinematic wedding and event films",
        },
        {
          title: "Drone Coverage",
          description: "Bird's-eye views for a dramatic touch",
        },
      ],
    },
    {
      slug: "dj",
      title: "DJ & Floor system",
      description: "Keep the party alive with great music",
      longDescription:
        "We offer live bands, professional DJs, and performers to set the mood and keep your guests entertained at weddings, parties, or corporate events.",
      icon: "MusicNote",
      imageSrc:
        "https://res.cloudinary.com/dhi5df340/image/upload/v1748162076/maxresdefault_bwgjki.jpg",
      gallery: [],
      features: [
        {
          title: "Live Music",
          description: "Talented bands and solo performers",
        },
        {
          title: "DJ Services",
          description: "Professional DJs with top-notch sound systems",
        },
        {
          title: "Dance & Stage Acts",
          description: "Engaging acts and shows for all audiences",
        },
      ],
    },
    {
      slug: "catering",
      title: "Catering Services",
      description: "Delicious food for every occasion",
      longDescription:
        "Our catering team crafts custom menus for every event, from traditional buffets to gourmet fine dining, ensuring delicious options for every guest.",
      icon: "Utensils",
      imageSrc:
        "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746869751/catering-food-wedding-event-table-84491977_e78fxg.jpg",
      gallery: [],
      features: [
        {
          title: "Custom Menus",
          description: "Curated food options to match your theme",
        },
        {
          title: "Buffet & Plated Service",
          description: "Serving styles to suit your event needs",
        },
        {
          title: "Dietary Accommodations",
          description: "Vegan, gluten-free, and allergy-friendly options",
        },
      ],
    },
    {
      slug: "stages",
      title: "Stages",
      description: "Celebrate rich cultural wedding customs",
      longDescription:
        "We organize culturally authentic traditional weddings, with specialized attire, rituals, and decoration to honor your heritage.",
      icon: "Users",
      imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748162466/WhatsApp_Image_2025-05-25_at_14.10.03_e1117e86_ikvbog.jpg",
      gallery: [],
      features: [
        {
          title: "Cultural Setup",
          description: "Stage, costumes, and rituals",
        },
        {
          title: "Gift Packaging",
          description: "Presentation of traditional items and souvenirs",
        },
        {
          title: "Coordination",
          description: "Complete program management",
        },
      ],
    },
    {
      slug: "balloon-decoration",
      title: "Balloon Decoration",
      description: "Fun and vibrant balloon setups",
      longDescription:
        "Add a festive touch with custom balloon arches, walls, and sculptures perfect for birthdays, baby showers, and more.",
      icon: "Smile",
      imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748160800/WhatsApp_Image_2025-05-25_at_13.31.23_ad8922fb_a3vgpf.jpg",
      gallery: [],
      features: [
        {
          title: "Themed Balloons",
          description: "Cartoon, elegant, or abstract",
        },
        {
          title: "Creative Installations",
          description: "Walls, pillars, entryways",
        },
        {
          title: "Photo Zones",
          description: "Balloon backdrops for pictures",
        },
      ],
    },
    {
      slug: "tent",
      title: "Tent",
      description: "Grand entries and tents for your events",
      longDescription:
        "We provide luxury tents, elegant entryways, and decorative lighting for every celebration.",
      icon: "Tent",
      imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748162806/WhatsApp_Image_2025-05-25_at_14.17.04_67490ec3_gqyxue.jpg",
      gallery: [],
      features: [
        {
          title: "Entry Gate Decor",
          description: "Stunning welcome arches",
        },
        {
          title: "Thematic Tenting",
          description: "Custom-built themed tent arrangements",
        },
        {
          title: "Decorative Lighting",
          description: "Lighting that enhances your ambiance",
        },
      ],
    },
    {
      slug: "haldi-mehendi",
      title: "Haldi & Mehendi Ceremony",
      description: "Traditional pre-wedding events",
      longDescription:
        "Celebrate these cherished rituals with vibrant decor, live artists, and a joyful ambiance.",
      icon: "Leaf",
      imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748162623/WhatsApp_Image_2025-05-25_at_14.13.41_836154a3_qw5qix.jpg",
      gallery: [
        "https://res.cloudinary.com/dhi5df340/image/upload/v1748162915/WhatsApp_Image_2025-05-25_at_14.13.50_cedc4c95_f3juev.jpg",
        "https://res.cloudinary.com/dhi5df340/image/upload/v1748162924/WhatsApp_Image_2025-05-25_at_14.13.49_5ddd10e4_yc5jnd.jpg",
        "/images/entry/3.jpg"
      ],
      features: [
        {
          title: "Floral Decor",
          description: "Turmeric/yellow & green themes",
        },
        {
          title: "Live Artists",
          description: "Mehendi artists and performers",
        },
        {
          title: "Traditional Music",
          description: "Dhol, folk songs and more",
        },
      ],
    },
    {
      slug: "entry",
      title: "Grand Entry Concepts",
      description: "Make every entrance unforgettable",
      longDescription: "Set the tone for your celebration with dramatic, luxurious, and creatively themed entry concepts—designed to leave a lasting impression on your guests.",
      icon: "EntryIcon",
      imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748162998/WhatsApp_Image_2025-05-25_at_14.20.27_71d618cd_xx45oj.jpg",
      gallery: [
        "/images/entry/1.jpg",
        "/images/entry/2.jpg",
        "/images/entry/3.jpg"
      ],
      features: [
        { title: "Mirror Entry", description: "A majestic 6x24 ft mirror aisle with CO2 jets and traditional varmala setup, enhanced by 10 cold pyros for a breathtaking effect." },
        { title: "Balloon Entry", description: "Whimsical balloon bunches filled with helium float along your path, with 10 cold pyros enhancing the celebration." },
        { title: "Balloon Blast Entry", description: "A joyful burst of balloons marks your arrival, symbolizing celebration and surprise." },
        { title: "Dry Ice Fog Entry", description: "Make a grand entrance amidst a mystical fog that evokes elegance and wonder." },
        { title: "Padmawat Entry", description: "Inspired by royal tales, walk in like royalty through a regal and culturally rich setup." },
        { title: "Mirror Panel Entry", description: "Reflect brilliance with a mirrored path and sleek panels that shimmer with every step." }
      ]
    },


    {
      slug: "anniversary-celebrations",
      title: "Anniversary Celebrations",
      description: "Celebrate years of love and memories",
      longDescription: "Whether it’s your first or fiftieth anniversary, we craft intimate, romantic settings with thoughtful decor and charming moments to honor your journey together.",
      icon: "AnniversaryIcon",
      imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748162948/WhatsApp_Image_2025-05-25_at_14.19.37_5e6cedc4_kwazdr.jpg",
      gallery: [
        "/images/anniversary/1.jpg",
        "/images/anniversary/2.jpg",
        "/images/anniversary/3.jpg"
      ],
      features: [
        { title: "Theme-Based Decor", description: "Romantic setups tailored to your story" },
        { title: "Customized Cake & Gifts", description: "Celebrate with curated mementos and delicious desserts" },
        { title: "Live Performances", description: "Musical or poetic tributes to your love" }
      ]
    },
    {
      slug: "vip-services",
      title: "VIP Services",
      description: "Luxury experience for your special guests",
      longDescription: "We offer top-tier services including red carpet welcome, private lounges, and personal concierge for your VIP attendees to ensure unmatched comfort and exclusivity.",
      icon: "VipIcon",
      imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748163085/WhatsApp_Image_2025-05-25_at_14.21.47_1953eebb_y17vby.jpg",
      gallery: [
        "/images/vip/1.jpg",
        "/images/vip/2.jpg"
      ],
      features: [
        { title: "Red Carpet Entry", description: "Premium welcome experience with style and glamour" },
        { title: "Private Lounge", description: "Luxurious rest zones for VIPs with refreshments" },
        { title: "Dedicated Staff", description: "Butlers, attendants, and personal coordination" }
      ]
    },
    {
      slug: "room-decor",
      title: "Room Decoration",
      description: "Create a magical personal space",
      longDescription: "We transform rooms for special moments—be it bridal suites, surprise proposals, or honeymoon nights—with flowers, candles, drapes, and dreamy lighting.",
      icon: "RoomDecorIcon",
      imageSrc: "https://res.cloudinary.com/dhi5df340/image/upload/v1748163347/WhatsApp_Image_2025-05-25_at_14.26.15_4647b769_j2lbqd.jpg",
      gallery: [
        "https://res.cloudinary.com/dhi5df340/image/upload/v1748163347/WhatsApp_Image_2025-05-25_at_14.26.15_4647b769_j2lbqd.jpgg",
        "/images/room-decor/2.jpg"
      ],
      features: [
        { title: "Romantic Themes", description: "Rose petals, candles, fairy lights and more" },
        { title: "Occasion-based Setups", description: "Birthday surprises, wedding nights, proposals" },
        { title: "Custom Messages & Photos", description: "Personalized décor with your memories" }
      ]
    }

  ];

  await new Promise(resolve => setTimeout(resolve, 300));
  return services.find(service => service.slug === slug) || null;
}
