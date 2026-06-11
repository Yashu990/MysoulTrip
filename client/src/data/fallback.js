// Fallback data so the UI renders even when the API server is offline.
// Mirrors server/data.js — "Hidden Soul of Uttarakhand" home page.
export const fallbackData = {
  destinations: [
    { id: 'dwarahat', name: 'Dwarahat', tagline: 'Spiritual energy & ancient temples', image: '/images/IMG_9817.jpg' },
    { id: 'almora', name: 'Almora', tagline: 'Heritage, Culture & Himalayan Views', image: '/images/IMG_0313.jpg' },
    { id: 'jageshwar', name: 'Jageshwar', tagline: 'Ancient Temples & Spiritual Vibes', image: '/images/IMG_9170.jpg' },
    { id: 'binsar', name: 'Binsar', tagline: 'Wildlife, Forests & Panoramic Views', image: '/images/IMG_9808.jpg' },
    { id: 'patal-bhuvaneshwar', name: 'Patal Bhuvaneshwar', tagline: 'Caves, Legends & Natural Wonders', image: '/images/IMG_9846.jpg' },
    { id: 'masi', name: 'Masi', tagline: 'A peaceful Himalayan village retreat', image: '/images/IMG_9807.jpg' },
  ],
  experiences: [
    { id: 'babaji-cave', title: 'Babaji Cave Pilgrimage', desc: 'A spiritual journey to the revered Babaji Cave', image: '/images/IMG_9850.jpg', icon: 'temple' },
    { id: 'dunagiri-trail', title: 'Dunagiri Spiritual Trail', desc: 'Walk the paths of ancient sages', image: '/images/IMG_9820.jpg', icon: 'mountain' },
    { id: 'pandavkholi-trek', title: 'Pandavkholi Trek', desc: 'Trek to the cave where the Pandavas meditated', image: '/images/IMG_9807.jpg', icon: 'hiking' },
    { id: 'binsar-retreat', title: 'Binsar Forest Retreat', desc: 'Stay close to nature in serene forests', image: '/images/IMG_9810.jpg', icon: 'tree' },
    { id: 'kumaon-village', title: 'Kumaon Village Experience', desc: 'Live like a local, eat like a local, feel like home', image: '/images/IMG_9817.jpg', icon: 'home' },
  ],
  groupTours: [
    { id: 'dunagiri-babaji', day: '25', month: 'MAY', title: 'Dunagiri & Babaji Cave Pilgrimage', duration: '7 Days / 6 Nights', seats: '12 Seats Left', price: 16999, image: '/images/IMG_9846.jpg' },
    { id: 'dwarahat-jageshwar', day: '08', month: 'JUN', title: 'Dwarahat & Jageshwar Spiritual Trail', duration: '6 Days / 5 Nights', seats: '10 Seats Left', price: 14499, image: '/images/IMG_9170.jpg' },
    { id: 'binsar-wildlife', day: '22', month: 'JUN', title: 'Binsar Nature & Wildlife Retreat', duration: '5 Days / 4 Nights', seats: '8 Seats Left', price: 13999, image: '/images/IMG_9820.jpg' },
    { id: 'pandavkholi-adventure', day: '06', month: 'JUL', title: 'Pandavkholi Trek Adventure', duration: '4 Days / 4 Nights', seats: '6 Seats Left', price: 9999, image: '/images/IMG_9808.jpg' },
  ],
  blogs: [
    { id: 'hidden-himalayan-villages', title: "7 Hidden Himalayan Villages You Haven't Heard Of - Yet", date: 'Jun 6, 2026', image: '/images/blog/hidden-himalayan-villages.jpg' },
    { id: 'slow-travel-2026', title: 'Slow Travel: Why 2026 Is the Year to Unplug in the Hills', date: 'Jun 2, 2026', image: '/images/blog/slow-travel-2026.jpg' },
    { id: 'babaji-cave-guide', title: "A Beginner's Guide to the Babaji Cave Pilgrimage", date: 'May 28, 2026', image: '/images/blog/babaji-cave-guide.jpg' },
  ],
  review: {
    name: 'Ananya Sharma',
    city: 'Mumbai',
    rating: 5,
    text: 'One of the most peaceful and soulful trips of my life. Highly recommended!',
    thumb: '/images/IMG_9807.jpg',
  },
  reviews: [
    {
      name: 'Ananya Sharma',
      city: 'Mumbai',
      rating: 5,
      text: 'One of the most peaceful and soulful trips of my life. The local guides knew every hidden trail, and Jageshwar at sunrise was unforgettable.',
      trip: 'Spiritual Trail · 6 Days',
    },
    {
      name: 'Rohan Mehta',
      city: 'Bengaluru',
      rating: 5,
      text: 'Everything was handled end-to-end — stays, food, transport. We just travelled and soaked it in. The Binsar forest retreat was pure magic.',
      trip: 'Binsar Nature Retreat',
    },
    {
      name: 'Priya Nair',
      city: 'Delhi',
      rating: 5,
      text: 'Offbeat villages, warm homestays and zero crowds. MySoulTrip showed us the Kumaon that tourists never see. Booking again next year!',
      trip: 'Kumaon Village Experience',
    },
    {
      name: 'Arjun Kapoor',
      city: 'Pune',
      rating: 5,
      text: 'The Pandavkholi trek was challenging and rewarding. Safety, planning and the team’s knowledge were genuinely top-class.',
      trip: 'Pandavkholi Trek',
    },
  ],
  instagram: [
    '/images/IMG_9170.jpg',
    '/images/IMG_9276.jpg',
    '/images/IMG_9810.jpg',
    '/images/IMG_9820.jpg',
    '/images/IMG_9846.jpg',
    '/images/IMG_0313.jpg',
  ],
}
