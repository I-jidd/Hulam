/* ============================================
   HULAM - Shared Data
   ============================================ */

const CATEGORIES = ['All', 'Tech', 'Outdoors', 'Tools', 'Books'];

const ALL_ITEMS = [
  {
    id: 1, category: 'Tech', title: 'HD Projector',
    pricePerDay: 150, deposit: 500,
    location: 'USC Main', distance: '3 mins away', rating: 5.0,
    image: 'https://images.unsplash.com/photo-1535016120720-40c746a6580c?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'High definition projector, perfect for movie nights or presentations. Includes HDMI cable and remote.'
  },
  {
    id: 2, category: 'Outdoors', title: 'Camping Tent',
    pricePerDay: 200, deposit: 1000,
    location: 'Talamban', distance: '5 mins away', rating: 5.0,
    image: 'https://images.unsplash.com/photo-1504280650530-9b45df5a5c69?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'Good for 4 persons. Easy to set up and highly durable. Waterproof with full rainfly.'
  },
  {
    id: 3, category: 'Tools', title: 'Sewing Machine',
    pricePerDay: 100, deposit: 800,
    location: 'Lahug', distance: '15 mins away', rating: 4.8,
    image: 'https://images.unsplash.com/photo-1594956106602-d9646bb6f780?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'Portable sewing machine for quick fixes and design projects. Comes with assorted threads and needles.'
  },
  {
    id: 4, category: 'Tools', title: 'Power Drill Set',
    pricePerDay: 150, deposit: 800,
    location: 'Cebu City', distance: '10 mins away', rating: 5.0,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'Complete set with various bits. Great for DIY dorm projects. Battery fully charged.'
  },
  {
    id: 5, category: 'Tech', title: 'Sony A6400 Camera',
    pricePerDay: 400, deposit: 2000,
    location: 'IT Park', distance: '12 mins away', rating: 4.9,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'Mirrorless camera ideal for video projects and photography. Includes 18-55mm kit lens and two batteries.'
  },
  {
    id: 6, category: 'Books', title: 'Physics 101 Textbook',
    pricePerDay: 20, deposit: 300,
    location: 'USC Main', distance: '1 min away', rating: 4.5,
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'Required textbook for Physics 101. Clean pages with no markings. Includes practice problem sets.'
  },
  {
    id: 7, category: 'Tech', title: 'Scientific Calculator',
    pricePerDay: 50, deposit: 500,
    location: 'Talamban', distance: '8 mins away', rating: 5.0,
    image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'Casio FX-991EX. Essential for engineering midterms and board exams. Batteries included.'
  }
];

const FEATURES = [
  {
    icon: 'wallet', color: 'text-[#1a5b6e]', bg: 'bg-[#1a5b6e]/5',
    title: 'Save Money',
    desc: 'Access tools, electronics, and gear without paying the full purchase price.'
  },
  {
    icon: 'globe', color: 'text-blue-500', bg: 'bg-blue-50',
    title: 'Reduce Waste',
    desc: 'Promote sustainability by maximizing the lifecycle of existing items.'
  },
  {
    icon: 'shield', color: 'text-[#9cd353]', bg: 'bg-[#9cd353]/10',
    title: 'Secure & Trusted',
    desc: 'Our community system ensures safe transactions and verified profiles.'
  }
];

/**
 * Get a single item by ID
 */
function getItemById(id) {
  return ALL_ITEMS.find(item => item.id === parseInt(id));
}
