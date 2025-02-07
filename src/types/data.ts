export interface ImageData {
  id: number;
  url: string;
  title?: string;
  subtitle?: string;
  alt: string;
}

export const data: ImageData[] = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dhkig0hkl/image/upload/v1738905534/girl-5623231_mpmoxn.jpg",
    title: "Adopt. Love. Grow Together.",
    subtitle: "Find your virtual best friend today and make a difference!",
    alt: "Img1",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dhkig0hkl/image/upload/v1738905534/dog-7092595_qnkcpa.jpg",
    title: "Every Pet Deserves a Loving Home.",
    subtitle: "Open your heart and home to a furry friend in need.",
    alt: "Img2",
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/dhkig0hkl/image/upload/v1738905534/pets-3715733_gfdsxt.jpg",
    title: "Rescue. Love. Repeat.",
    subtitle: "Transform a life—adopt a pet today and gain a forever friend.",
    alt: "Img3",
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/dhkig0hkl/image/upload/v1738907652/dog-4398803_aa6k0q.jpg",
    title: "Bringing Joy, One Adoption at a Time.",
    subtitle: "Your next best friend is waiting for you—let’s make it happen!",
    alt: "Img4",
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/dhkig0hkl/image/upload/v1738907925/dog-2606759_pblq2q.jpg",
    title: "A Paw in Need, A Hand to Lead.",
    subtitle:
      "Give them a second chance, and they’ll give you a lifetime of love.",
    alt: "Img5",
  },
];
