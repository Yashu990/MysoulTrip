// Static data for MySoulTrip — "Hidden Soul of Uttarakhand" home page.
// Images map to the real photos in client/public/images.

export const destinations = [
  { id: 'dwarahat', name: 'Dwarahat', tagline: 'Spiritual energy & ancient temples', image: '/images/IMG_9817.jpg' },
  { id: 'almora', name: 'Almora', tagline: 'Heritage, Culture & Himalayan Views', image: '/images/IMG_0313.jpg' },
  { id: 'jageshwar', name: 'Jageshwar', tagline: 'Ancient Temples & Spiritual Vibes', image: '/images/IMG_9170.jpg' },
  { id: 'binsar', name: 'Binsar', tagline: 'Wildlife, Forests & Panoramic Views', image: '/images/IMG_9808.jpg' },
  { id: 'patal-bhuvaneshwar', name: 'Patal Bhuvaneshwar', tagline: 'Caves, Legends & Natural Wonders', image: '/images/IMG_9846.jpg' },
  { id: 'masi', name: 'Masi', tagline: 'A peaceful Himalayan village retreat', image: '/images/IMG_9807.jpg' },
]

export const experiences = [
  { id: 'babaji-cave', title: 'Babaji Cave Pilgrimage', desc: 'A spiritual journey to the revered Babaji Cave', image: '/images/IMG_9850.jpg', icon: 'temple' },
  { id: 'dunagiri-trail', title: 'Dunagiri Spiritual Trail', desc: 'Walk the paths of ancient sages', image: '/images/IMG_9820.jpg', icon: 'mountain' },
  { id: 'pandavkholi-trek', title: 'Pandavkholi Trek', desc: 'Trek to the cave where the Pandavas meditated', image: '/images/IMG_9807.jpg', icon: 'hiking' },
  { id: 'binsar-retreat', title: 'Binsar Forest Retreat', desc: 'Stay close to nature in serene forests', image: '/images/IMG_9810.jpg', icon: 'tree' },
  { id: 'kumaon-village', title: 'Kumaon Village Experience', desc: 'Live like a local, eat like a local, feel like home', image: '/images/IMG_9817.jpg', icon: 'home' },
]

export const groupTours = [
  { id: 'dunagiri-babaji', day: '25', month: 'MAY', title: 'Dunagiri & Babaji Cave Pilgrimage', duration: '7 Days / 6 Nights', seats: '12 Seats Left', price: 16999, image: '/images/IMG_9846.jpg' },
  { id: 'dwarahat-jageshwar', day: '08', month: 'JUN', title: 'Dwarahat & Jageshwar Spiritual Trail', duration: '6 Days / 5 Nights', seats: '10 Seats Left', price: 14499, image: '/images/IMG_9170.jpg' },
  { id: 'binsar-wildlife', day: '22', month: 'JUN', title: 'Binsar Nature & Wildlife Retreat', duration: '5 Days / 4 Nights', seats: '8 Seats Left', price: 13999, image: '/images/IMG_9820.jpg' },
  { id: 'pandavkholi-adventure', day: '06', month: 'JUL', title: 'Pandavkholi Trek Adventure', duration: '4 Days / 4 Nights', seats: '6 Seats Left', price: 9999, image: '/images/IMG_9808.jpg' },
]

export const blogs = [
  { id: 'almora-hidden', title: 'Hidden Places Near Almora You Must Visit', date: 'May 12, 2024', image: '/images/IMG_0313.jpg' },
  { id: 'dwarahat-different', title: 'Why Dwarahat is Different from Other Hill Stations', date: 'May 05, 2024', image: '/images/IMG_9810.jpg' },
  { id: 'binsar-best-time', title: 'Best Time to Visit Binsar Wildlife Sanctuary', date: 'Apr 28, 2024', image: '/images/IMG_9808.jpg' },
]

export const review = {
  name: 'Ananya Sharma',
  city: 'Mumbai',
  rating: 5,
  text: 'One of the most peaceful and soulful trips of my life. Highly recommended!',
  thumb: '/images/IMG_9807.jpg',
}

export const instagram = [
  '/images/IMG_9170.jpg',
  '/images/IMG_9276.jpg',
  '/images/IMG_9810.jpg',
  '/images/IMG_9820.jpg',
  '/images/IMG_9846.jpg',
  '/images/IMG_0313.jpg',
]

export const homePayload = {
  destinations,
  experiences,
  groupTours,
  blogs,
  review,
  instagram,
}
