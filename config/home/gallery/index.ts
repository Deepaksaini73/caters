export interface GalleryImage {
  id: number
  src: string
  alt: string
  category: 'wedding' | 'birthday' | 'cultural'
}

export const weddingGallery: GalleryImage[] = [
  {
    id: 101,
    src: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868099/photo-1689699790566-34411f85dd72_ih4wyn.jpg",
    alt: "Elegant Wedding Decoration",
    category: "wedding"
  },
  {
    id: 102,
    src: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868185/photo-1683422074015-aafc41ef1b36_sfxqxl.jpg",
    alt: "Elegant Wedding Decoration",
    category: "wedding"
  },
  {
    id: 103,
    src: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868295/468690978_594200526471916_230415010275403789_n_-_Copy_cohqfa.jpg",
    alt: "Elegant Wedding Decoration",
    category: "wedding"
  },
  {
    id: 104,
    src: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868188/photo-1505422548980-e486ef4fe816_navpg9.jpg",
    alt: "Elegant Wedding Decoration",
    category: "wedding"
  },
  {
    id: 105,
    src: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868297/468754791_18282961123246344_3374150638349514664_n_k65h7k.jpg",
    alt: "Elegant Wedding Decoration",
    category: "wedding"
  },
  {
    id: 106,
    src: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868300/470901954_1669008840664704_2010089188097694699_n_r5gf5n.jpg",
    alt: "Elegant Wedding Decoration",
    category: "wedding"
  },
  {
    id: 107,
    src: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868298/470900518_569714945954171_5688066198757273920_n_-_Copy_sbjxpw.jpg",
    alt: "Elegant Wedding Decoration",
    category: "wedding"
  },
  // Add more wedding images...
]

export const birthdayGallery: GalleryImage[] = [
  {
    id: 201,
    src: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868120/img_20241119_153522_981-m2W8rxvovNUyKy9O_ctqhtp.jpg",
    alt: "Elegant Wedding Decoration",
    category: "wedding"
  },
  {
    id: 202,
    src: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868174/images-25-YNqBNaxZJoIQQx1B_xwgugi.jpg",
    alt: "Elegant Wedding Decoration",
    category: "wedding"
  },
  {
    id: 203,
    src: "https://th.bing.com/th/id/OIP.ANRKP8Ulq-EpUKSJ3RzSdwHaFj?cb=iwp1&rs=1&pid=ImgDetMain",
    alt: "Elegant Wedding Decoration",
    category: "wedding"
  },
  // Add more birthday images...
]

export const culturalGallery: GalleryImage[] = [
  {
    id: 301,
    src: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868301/486680276_664838982598904_2924070647771731240_n_u2z0xa.jpg",
    alt: "Elegant Wedding Decoration",
    category: "wedding"
  },
  {
    id: 302,
    src: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868302/490074739_1384841782651914_5900445992152863027_n_fdvmst.jpg",
    alt: "Elegant Wedding Decoration",
    category: "wedding"
  },
  {
    id: 303,
    src: "https://res.cloudinary.com/dpt4bhayi/image/upload/v1746868300/470934042_1980915122408787_2763198094640704282_n_suvsk5.jpg",
    alt: "Elegant Wedding Decoration",
    category: "wedding"
  },
  {
    id: 304,
    src: "https://th.bing.com/th/id/OIP.FoI65NTt9NJJWdv7BgEg6QHaLG?cb=iwp1&rs=1&pid=ImgDetMain",
    alt: "Elegant Wedding Decoration",
    category: "wedding"
  },
  // Add more cultural images...
]