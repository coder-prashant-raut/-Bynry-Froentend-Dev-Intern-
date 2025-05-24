const STORAGE_KEY = 'profiles';

const mockProfiles = [
  {
    id: 1,
    name: 'John Doe',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    description: 'Regular customer from New York',
    address: '123 Main St, New York, NY',
    lat: '40.7128',
    lng: '-74.0060',
  },
  {
    id: 2,
    name: 'Jane Smith',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    description: 'Loyal customer, loves discounts',
    address: '456 Park Ave, New York, NY',
    lat: '40.7648',
    lng: '-73.9730',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    description: 'Frequent buyer from California',
    address: '789 Sunset Blvd, Los Angeles, CA',
    lat: '34.0522',
    lng: '-118.2437',
  },
  {
    id: 4,
    name: 'Emily Davis',
    photo: 'https://randomuser.me/api/portraits/women/4.jpg',
    description: 'New customer interested in electronics',
    address: '321 Broadway, San Francisco, CA',
    lat: '37.7749',
    lng: '-122.4194',
  },
  {
    id: 5,
    name: 'David Wilson',
    photo: 'https://randomuser.me/api/portraits/men/5.jpg',
    description: 'VIP customer from Texas',
    address: '654 Elm St, Dallas, TX',
    lat: '32.7767',
    lng: '-96.7970',
  },
  {
    id: 6,
    name: 'Olivia Martinez',
    photo: 'https://randomuser.me/api/portraits/women/6.jpg',
    description: 'Interested in fashion and accessories',
    address: '987 Market St, Miami, FL',
    lat: '25.7617',
    lng: '-80.1918',
  },
  {
    id: 7,
    name: 'James Brown',
    photo: 'https://randomuser.me/api/portraits/men/7.jpg',
    description: 'Business customer from Chicago',
    address: '159 Lake Shore Dr, Chicago, IL',
    lat: '41.8781',
    lng: '-87.6298',
  },
  {
    id: 8,
    name: 'Sophia Garcia',
    photo: 'https://randomuser.me/api/portraits/women/8.jpg',
    description: 'Student customer from Boston',
    address: '753 Beacon St, Boston, MA',
    lat: '42.3601',
    lng: '-71.0589',
  },
  {
    id: 9,
    name: 'William Lee',
    photo: 'https://randomuser.me/api/portraits/men/9.jpg',
    description: 'Interested in tech gadgets',
    address: '852 King St, Seattle, WA',
    lat: '47.6062',
    lng: '-122.3321',
  },
  {
    id: 10,
    name: 'Ava Thompson',
    photo: 'https://randomuser.me/api/portraits/women/10.jpg',
    description: 'Frequent buyer of home decor',
    address: '147 Queen St, Toronto, ON',
    lat: '43.6532',
    lng: '-79.3832',
  },
];

export const saveProfiles = (profiles) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
};

export const loadProfiles = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  } else {
    // Agar localStorage mein data nahi hai, toh mock data save karke return karo
    saveProfiles(mockProfiles);
    return mockProfiles;
  }
};
