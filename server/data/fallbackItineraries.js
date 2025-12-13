// data/fallbackItineraries.js

const fallbackDestinations = {
    // ==================== NORTH INDIA ====================
    'delhi': {
        destination: 'Delhi',
        state: 'Delhi',
        overview: 'Delhi, India\'s capital, is a vibrant mix of ancient history and modernity with Mughal architecture, British-era buildings, and bustling markets.',
        bestTime: 'October to March (15-25°C) - Pleasant weather for sightseeing',
        places: ['Red Fort', 'Qutub Minar', 'India Gate', 'Lotus Temple', 'Humayun\'s Tomb', 'Chandni Chowk', 'Akshardham Temple'],
        hotels: [
            {name: 'Budget Hotel, Paharganj', priceRange: '₹800-1500', rating: 3.9},
            {name: 'Mid-range Hotel, Karol Bagh', priceRange: '₹2000-3500', rating: 4.2},
            {name: 'Luxury Hotel, Connaught Place', priceRange: '₹4000-7000', rating: 4.5}
        ],
        food: ['Butter Chicken', 'Chole Bhature', 'Paranthe Wali Gali', 'Kebabs', 'Aloo Tikki'],
        transport: [
            {type: 'Metro', cost: '₹10-60 per trip'},
            {type: 'Auto Rickshaw', cost: '₹30-50 per km'},
            {type: 'Taxi', cost: '₹12-15 per km'}
        ],
        reach: 'Well connected by flights (IGI Airport), trains (New Delhi, Old Delhi stations), and buses',
        estimatedCost: '₹6000-9000 for 3 days (budget), ₹10000-15000 (mid-range), ₹15000+ (luxury)',
        weather: 'Extreme summers (April-June: 25-45°C), Pleasant winters (Nov-Feb: 8-22°C), Monsoon: July-Sept',
        safety: 'Be cautious in crowded areas. Use registered taxis. Emergency: 112',
        carry: ['Comfortable shoes', 'Water bottle', 'ID proof', 'Sunscreen (summer)', 'Light woolens (winter)'],
        documents: ['Government ID', 'Hotel booking', 'Travel tickets']
    },

    'jaipur': {
        destination: 'Jaipur',
        state: 'Rajasthan',
        overview: 'Jaipur, the Pink City, is Rajasthan\'s capital with magnificent forts, palaces, and rich Rajput heritage.',
        bestTime: 'October to March (15-25°C) - Best for sightseeing',
        places: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Jantar Mantar', 'Nahargarh Fort', 'Albert Hall Museum', 'Jaipur Zoo'],
        hotels: [
            {name: 'Heritage Haveli', priceRange: '₹1500-2500', rating: 4.1},
            {name: 'Palace Hotel', priceRange: '₹3000-5000', rating: 4.4},
            {name: 'Luxury Resort', priceRange: '₹6000-10000', rating: 4.6}
        ],
        food: ['Dal Baati Churma', 'Laal Maas', 'Ghewar', 'Pyaaz Kachori', 'Mohan Thaal'],
        transport: [
            {type: 'Auto Rickshaw', cost: '₹30-50 per km'},
            {type: 'Taxi', cost: '₹12-15 per km'},
            {type: 'City Bus', cost: '₹20-50 per trip'}
        ],
        reach: 'Flight to Jaipur International, train to Jaipur Junction, buses from major cities',
        estimatedCost: '₹7000-10000 for 3 days',
        weather: 'Desert climate. Summer: 25-40°C, Winter: 8-22°C',
        safety: 'Bargain at markets. Drink bottled water.',
        carry: ['Hat/Sunglasses', 'Comfortable shoes', 'Light woolens (winter)'],
        documents: ['ID Proof', 'Hotel booking', 'Monument tickets']
    },

    'agra': {
        destination: 'Agra',
        state: 'Uttar Pradesh',
        overview: 'Home to the iconic Taj Mahal, Agra is a UNESCO World Heritage city with Mughal architectural marvels.',
        bestTime: 'October to March (15-25°C) - Pleasant weather',
        places: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh', 'Itimad-ud-Daulah', 'Agra Heritage Walk'],
        hotels: [
            {name: 'Budget Hotel near Taj', priceRange: '₹1000-2000', rating: 4.0},
            {name: 'Mid-range Hotel', priceRange: '₹2500-4000', rating: 4.3},
            {name: 'Luxury Hotel', priceRange: '₹5000-8000', rating: 4.5}
        ],
        food: ['Petha (sweet)', 'Mughlai Cuisine', 'Bedai with Jalebi', 'Tandoori Chicken', 'Kulcha'],
        transport: [
            {type: 'Auto Rickshaw', cost: '₹25-40 per km'},
            {type: 'Taxi', cost: '₹10-15 per km'},
            {type: 'Tonga Ride', cost: '₹200-500 per hour'}
        ],
        reach: 'Train to Agra Cantt, flight to Delhi (200km away), buses from Delhi',
        estimatedCost: '₹5000-8000 for 2 days',
        weather: 'Summer: 25-45°C, Winter: 5-22°C',
        safety: 'Taj Mahal closed on Fridays. Early morning visits recommended.',
        carry: ['Camera', 'Comfortable shoes', 'Water bottle'],
        documents: ['ID Proof', 'Taj Mahal tickets']
    },

    'manali': {
        destination: 'Manali',
        state: 'Himachal Pradesh',
        overview: 'Himalayan hill station with snow-capped peaks, adventure sports, and serene landscapes.',
        bestTime: 'March-June (10-25°C), September-December for snow views',
        places: ['Hadimba Temple', 'Solang Valley', 'Rohtang Pass', 'Old Manali', 'Jogini Falls', 'Manu Temple', 'Vashisht Hot Springs'],
        hotels: [
            {name: 'Mountain Resort', priceRange: '₹1500-3000', rating: 4.2},
            {name: 'Riverside Cottage', priceRange: '₹2500-4500', rating: 4.4},
            {name: 'Luxury Stay', priceRange: '₹5000-8000', rating: 4.5}
        ],
        food: ['Siddu', 'Thenthuk', 'Babru', 'Tibetan Momos', 'Trout Fish', 'Aktori'],
        transport: [
            {type: 'Local Taxi', cost: '₹12-15 per km'},
            {type: 'Day Cab', cost: '₹2000-3000 per day'},
            {type: 'HRTC Buses', cost: '₹50-200 per trip'}
        ],
        reach: 'Overnight bus from Delhi (12-14 hrs), flight to Bhuntar (50km)',
        estimatedCost: '₹6000-10000 for 3 days',
        weather: 'Winter: -4 to 8°C (snow), Summer: 10-25°C',
        safety: 'Altitude acclimatization important. Adventure sports with certified operators.',
        carry: ['Woolens', 'Thermals', 'Good shoes', 'Medicines'],
        documents: ['ID Proof', 'Medical insurance', 'Hotel bookings']
    },

    'shimla': {
        destination: 'Shimla',
        state: 'Himachal Pradesh',
        overview: 'Queen of Hills with colonial charm, scenic views, and pleasant climate.',
        bestTime: 'March to June (15-25°C), September-November for clear views',
        places: ['The Ridge', 'Mall Road', 'Jakhu Temple', 'Kufri', 'Shimla State Museum', 'Christ Church', 'Tara Devi Temple'],
        hotels: [
            {name: 'Hotel Combermere', priceRange: '₹1500-3000', rating: 4.2},
            {name: 'Clarkes Hotel', priceRange: '₹2500-4500', rating: 4.3},
            {name: 'Wildflower Hall', priceRange: '₹8000-15000', rating: 4.7}
        ],
        food: ['Siddu', 'Babru', 'Chana Madra', 'Aktori', 'Dham'],
        transport: [
            {type: 'Toy Train', cost: '₹200-500 per person'},
            {type: 'Local Taxi', cost: '₹12-15 per km'},
            {type: 'HRTC Bus', cost: '₹50-200 per trip'}
        ],
        reach: 'Kalka-Shimla Toy Train, flight to Chandigarh (120km), buses from Delhi',
        estimatedCost: '₹5000-8000 for 3 days',
        weather: 'Summer: 15-25°C, Winter: -4 to 8°C with snow',
        safety: 'Walk carefully on steep roads. Toy train bookings in advance.',
        carry: ['Woolens (Oct-Mar)', 'Comfortable shoes', 'Sunglasses'],
        documents: ['Government ID', 'Hotel bookings', 'Travel tickets']
    },

    // ==================== SOUTH INDIA ====================
    'goa': {
        destination: 'Goa',
        state: 'Goa',
        overview: 'India\'s beach paradise with Portuguese heritage, stunning beaches, and vibrant nightlife.',
        bestTime: 'November to February (21-32°C) - Perfect beach weather',
        places: ['Calangute Beach', 'Baga Beach', 'Fort Aguada', 'Basilica of Bom Jesus', 'Anjuna Flea Market', 'Dudhsagar Falls', 'Spice Plantations'],
        hotels: [
            {name: 'Beachside Resort', priceRange: '₹2000-4000', rating: 4.3},
            {name: 'Budget Guesthouse', priceRange: '₹800-1500', rating: 4.0},
            {name: 'Luxury Resort', priceRange: '₹5000-8000', rating: 4.5}
        ],
        food: ['Fish Curry Rice', 'Pork Vindaloo', 'Chicken Xacuti', 'Bebinca', 'Feni'],
        transport: [
            {type: 'Bike Rental', cost: '₹300-500 per day'},
            {type: 'Taxi', cost: '₹15-20 per km'},
            {type: 'Local Bus', cost: '₹20-100 per trip'}
        ],
        reach: 'Direct flights to Goa International, trains via Konkan Railway, overnight buses',
        estimatedCost: '₹8000-12000 for 4 days',
        weather: 'Tropical. Winter: 20-32°C, Summer: 25-35°C, Monsoon: Heavy rain',
        safety: 'Swim in designated areas. Keep valuables secure on beaches.',
        carry: ['Swimwear', 'Sunscreen SPF 50+', 'Light clothes', 'Mosquito repellent'],
        documents: ['ID Proof', 'Hotel booking', 'Travel tickets']
    },

    'kerala': {
        destination: 'Kerala',
        state: 'Kerala',
        overview: 'God\'s Own Country with backwaters, beaches, hill stations, and rich cultural heritage.',
        bestTime: 'September to March (22-32°C) - Pleasant weather',
        places: ['Alleppey Backwaters', 'Munnar Tea Gardens', 'Kochi Fort', 'Kovalam Beach', 'Thekkady Wildlife', 'Varkala Beach', 'Wayanad'],
        hotels: [
            {name: 'Houseboat, Alleppey', priceRange: '₹4000-8000 per day', rating: 4.4},
            {name: 'Hill Resort, Munnar', priceRange: '₹2500-5000', rating: 4.3},
            {name: 'Beach Resort, Kovalam', priceRange: '₹3000-6000', rating: 4.5}
        ],
        food: ['Appam with Stew', 'Puttu with Kadala', 'Karimeen Pollichathu', 'Sadya', 'Banana Chips'],
        transport: [
            {type: 'Houseboat', cost: '₹4000-8000 per day'},
            {type: 'Taxi', cost: '₹12-15 per km'},
            {type: 'Local Bus', cost: '₹20-100 per trip'}
        ],
        reach: 'Flights to Kochi, Thiruvananthapuram, or Kozhikode. Trains to major stations',
        estimatedCost: '₹10000-15000 for 5 days',
        weather: 'Tropical. Monsoon: June-August, Winter: 22-32°C',
        safety: 'Monsoon season can have heavy rains. Check weather before backwater trips.',
        carry: ['Light cotton clothes', 'Raincoat (monsoon)', 'Sunscreen', 'Mosquito repellent'],
        documents: ['ID Proof', 'Hotel/boat bookings']
    },

    'bangalore': {
        destination: 'Bangalore',
        state: 'Karnataka',
        overview: 'Garden City and India\'s IT capital with pleasant climate, parks, and vibrant nightlife.',
        bestTime: 'September to February (15-28°C) - Pleasant weather',
        places: ['Lalbagh Botanical Garden', 'Cubbon Park', 'Bangalore Palace', 'ISKCON Temple', 'Bannerghatta Park', 'UB City', 'Commercial Street'],
        hotels: [
            {name: 'Budget Hotel, MG Road', priceRange: '₹1500-2500', rating: 4.0},
            {name: 'Business Hotel', priceRange: '₹3000-5000', rating: 4.3},
            {name: 'Luxury Hotel', priceRange: '₹5000-8000', rating: 4.6}
        ],
        food: ['Masala Dosa', 'Bisi Bele Bath', 'Ragi Mudde', 'Filter Coffee', 'Mysore Pak'],
        transport: [
            {type: 'Metro', cost: '₹10-60 per trip'},
            {type: 'Auto Rickshaw', cost: '₹30-50 per km'},
            {type: 'Taxi', cost: '₹12-15 per km'}
        ],
        reach: 'Flights to Kempegowda Airport, trains to Bangalore City, buses from all cities',
        estimatedCost: '₹7000-10000 for 3 days',
        weather: 'Pleasant year-round. Summer: 20-35°C, Winter: 15-28°C',
        safety: 'Generally safe. Traffic can be heavy during peak hours.',
        carry: ['Light clothes', 'Umbrella', 'Comfortable shoes'],
        documents: ['ID Proof', 'Hotel booking']
    },

    'chennai': {
        destination: 'Chennai',
        state: 'Tamil Nadu',
        overview: 'Cultural capital of Tamil Nadu with beaches, temples, and delicious South Indian cuisine.',
        bestTime: 'November to February (20-30°C) - Pleasant weather',
        places: ['Marina Beach', 'Kapaleeshwarar Temple', 'Fort St. George', 'Santhome Cathedral', 'Valluvar Kottam', 'Guindy National Park', 'Mahabalipuram'],
        hotels: [
            {name: 'Beachside Hotel', priceRange: '₹1500-3000', rating: 4.1},
            {name: 'Mid-range Hotel', priceRange: '₹2500-4000', rating: 4.3},
            {name: 'Luxury Hotel', priceRange: '₹4000-7000', rating: 4.5}
        ],
        food: ['Idli Sambar', 'Dosa', 'Chettinad Chicken', 'Filter Coffee', 'Pongal'],
        transport: [
            {type: 'Metro', cost: '₹10-50 per trip'},
            {type: 'Auto Rickshaw', cost: '₹25-40 per km'},
            {type: 'Taxi', cost: '₹10-14 per km'}
        ],
        reach: 'Flights to Chennai International, trains to Chennai Central, buses',
        estimatedCost: '₹6000-9000 for 3 days',
        weather: 'Hot and humid. Summer: 25-40°C, Winter: 20-30°C',
        safety: 'Be cautious at beaches. Drink bottled water.',
        carry: ['Cotton clothes', 'Sunscreen', 'Hat', 'Water bottle'],
        documents: ['ID Proof', 'Hotel booking']
    },

    'hyderabad': {
        destination: 'Hyderabad',
        state: 'Telangana',
        overview: 'City of Pearls and Biryani with historic monuments and modern IT hubs.',
        bestTime: 'October to March (15-30°C) - Pleasant weather',
        places: ['Charminar', 'Golconda Fort', 'Hussain Sagar Lake', 'Ramoji Film City', 'Salar Jung Museum', 'Birla Mandir', 'Qutub Shahi Tombs'],
        hotels: [
            {name: 'Budget Hotel near Charminar', priceRange: '₹1200-2000', rating: 4.0},
            {name: 'Mid-range Hotel', priceRange: '₹2500-4000', rating: 4.2},
            {name: 'Luxury Hotel', priceRange: '₹4000-7000', rating: 4.5}
        ],
        food: ['Hyderabadi Biryani', 'Haleem', 'Double Ka Meetha', 'Irani Chai', 'Mirchi Ka Salan'],
        transport: [
            {type: 'Metro', cost: '₹10-60 per trip'},
            {type: 'Auto Rickshaw', cost: '₹25-40 per km'},
            {type: 'Taxi', cost: '₹10-15 per km'}
        ],
        reach: 'Flights to Hyderabad International, trains to Secunderabad/Hyderabad, buses',
        estimatedCost: '₹6000-9000 for 3 days',
        weather: 'Summer: 25-40°C, Winter: 15-30°C',
        safety: 'Be cautious in crowded markets. Bargain at shopping areas.',
        carry: ['Light cotton clothes', 'Sunglasses', 'Water bottle'],
        documents: ['ID Proof', 'Hotel booking']
    },

    // ==================== EAST INDIA ====================
    'darjeeling': {
        destination: 'Darjeeling',
        state: 'West Bengal',
        overview: 'Queen of the Himalayas with tea gardens, toy train, and stunning mountain views.',
        bestTime: 'March to May (10-20°C), October-November for clear views',
        places: ['Tiger Hill', 'Darjeeling Himalayan Railway', 'Batasia Loop', 'Peace Pagoda', 'Padmaja Naidu Zoo', 'Tea Gardens', 'Observatory Hill'],
        hotels: [
            {name: 'Heritage Hotel', priceRange: '₹2000-3500', rating: 4.2},
            {name: 'Hill Resort', priceRange: '₹3000-5000', rating: 4.4},
            {name: 'Luxury Stay', priceRange: '₹5000-8000', rating: 4.6}
        ],
        food: ['Momos', 'Thukpa', 'Darjeeling Tea', 'Churpee', 'Alu Dum'],
        transport: [
            {type: 'Toy Train', cost: '₹300-800 per person'},
            {type: 'Local Taxi', cost: '₹15-20 per km'},
            {type: 'Shared Jeep', cost: '₹100-300 per person'}
        ],
        reach: 'Flight to Bagdogra (70km), train to New Jalpaiguri, toy train from Kurseong',
        estimatedCost: '₹8000-12000 for 4 days',
        weather: 'Cold climate. Summer: 10-20°C, Winter: 2-7°C',
        safety: 'Altitude sickness possible. Carry woolens. Toy train bookings in advance.',
        carry: ['Woolens', 'Good shoes', 'Sunglasses', 'Medicines'],
        documents: ['ID Proof', 'Hotel booking', 'Toy train tickets']
    },

    'kolkata': {
        destination: 'Kolkata',
        state: 'West Bengal',
        overview: 'City of Joy with colonial architecture, cultural heritage, and delicious Bengali cuisine.',
        bestTime: 'October to March (15-30°C) - Pleasant weather',
        places: ['Victoria Memorial', 'Howrah Bridge', 'Dakshineswar Temple', 'Indian Museum', 'Science City', 'Park Street', 'Kalighat Temple'],
        hotels: [
            {name: 'Budget Hotel, Sudder Street', priceRange: '₹1000-2000', rating: 3.9},
            {name: 'Heritage Hotel', priceRange: '₹2500-4000', rating: 4.3},
            {name: 'Luxury Hotel', priceRange: '₹4000-7000', rating: 4.5}
        ],
        food: ['Macher Jhol', 'Rosogolla', 'Kathi Rolls', 'Mishti Doi', 'Puchka'],
        transport: [
            {type: 'Metro', cost: '₹5-25 per trip'},
            {type: 'Yellow Taxi', cost: '₹25-40 per km'},
            {type: 'Tram', cost: '₹10-20 per trip'}
        ],
        reach: 'Flights to Kolkata International, trains to Howrah/Sealdah, buses',
        estimatedCost: '₹6000-9000 for 3 days',
        weather: 'Hot and humid. Summer: 25-40°C, Winter: 12-30°C',
        safety: 'Be cautious in crowded areas. Use registered taxis.',
        carry: ['Light cotton clothes', 'Umbrella', 'Water bottle'],
        documents: ['ID Proof', 'Hotel booking']
    },

    // ==================== WEST INDIA ====================
    'mumbai': {
        destination: 'Mumbai',
        state: 'Maharashtra',
        overview: 'Financial capital with Bollywood, beaches, historic sites, and vibrant street food.',
        bestTime: 'November to February (20-30°C) - Pleasant weather',
        places: ['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Juhu Beach', 'Siddhivinayak Temple', 'Colaba Causeway', 'Haji Ali Dargah'],
        hotels: [
            {name: 'Budget Hotel, Colaba', priceRange: '₹1500-2500', rating: 4.0},
            {name: 'Mid-range Hotel', priceRange: '₹3000-5000', rating: 4.3},
            {name: 'Luxury Hotel', priceRange: '₹5000-8000', rating: 4.6}
        ],
        food: ['Vada Pav', 'Pav Bhaji', 'Bhel Puri', 'Seafood', 'Misal Pav'],
        transport: [
            {type: 'Local Train', cost: '₹5-50 per trip'},
            {type: 'Auto Rickshaw', cost: '₹25-40 per km'},
            {type: 'Taxi', cost: '₹15-20 per km'}
        ],
        reach: 'Flights to Mumbai International, trains to CST/Churchgate, buses',
        estimatedCost: '₹8000-12000 for 3 days',
        weather: 'Hot and humid. Monsoon: June-September with heavy rain',
        safety: 'Be cautious in crowded trains. Keep valuables secure.',
        carry: ['Light clothes', 'Umbrella (monsoon)', 'Comfortable shoes'],
        documents: ['ID Proof', 'Hotel booking']
    },

    'ahmedabad': {
        destination: 'Ahmedabad',
        state: 'Gujarat',
        overview: 'Manchester of India with textile heritage, historic monuments, and vegetarian cuisine.',
        bestTime: 'November to February (15-30°C) - Pleasant weather',
        places: ['Sabarmati Ashram', 'Adalaj Stepwell', 'Sidi Saiyyed Mosque', 'Kankaria Lake', 'Science City', 'Auto World Museum', 'Law Garden'],
        hotels: [
            {name: 'Budget Hotel', priceRange: '₹1200-2000', rating: 4.0},
            {name: 'Mid-range Hotel', priceRange: '₹2500-4000', rating: 4.2},
            {name: 'Luxury Hotel', priceRange: '₹4000-7000', rating: 4.5}
        ],
        food: ['Dhokla', 'Khandvi', 'Fafda', 'Gujarati Thali', 'Jalebi'],
        transport: [
            {type: 'Auto Rickshaw', cost: '₹25-40 per km'},
            {type: 'BRTS Bus', cost: '₹10-30 per trip'},
            {type: 'Taxi', cost: '₹10-15 per km'}
        ],
        reach: 'Flights to Ahmedabad Airport, trains to Ahmedabad Junction, buses',
        estimatedCost: '₹5000-8000 for 3 days',
        weather: 'Extreme summers (25-45°C), Pleasant winters (10-30°C)',
        safety: 'Vegetarian city. Alcohol restrictions apply.',
        carry: ['Cotton clothes (summer)', 'Light woolens (winter)', 'Sunscreen'],
        documents: ['ID Proof', 'Hotel booking']
    },

    // ==================== NORTHEAST INDIA ====================
    'guwahati': {
        destination: 'Guwahati',
        state: 'Assam',
        overview: 'Gateway to Northeast India with ancient temples, tea gardens, and Brahmaputra River.',
        bestTime: 'October to March (15-25°C) - Pleasant weather',
        places: ['Kamakhya Temple', 'Umananda Island', 'Assam State Museum', 'Navy Island', 'Pobitora Wildlife', 'Saraighat Bridge', 'Fancy Bazar'],
        hotels: [
            {name: 'Budget Hotel', priceRange: '₹1000-2000', rating: 4.0},
            {name: 'Mid-range Hotel', priceRange: '₹2500-4000', rating: 4.2},
            {name: 'Luxury Hotel', priceRange: '₹4000-7000', rating: 4.5}
        ],
        food: ['Assamese Thali', 'Fish Tenga', 'Pitha', 'Tea', 'Aloo Pitika'],
        transport: [
            {type: 'Auto Rickshaw', cost: '₹20-35 per km'},
            {type: 'Taxi', cost: '₹10-15 per km'},
            {type: 'City Bus', cost: '₹10-30 per trip'}
        ],
        reach: 'Flights to Lokpriya Gopinath Airport, trains to Guwahati Station, buses',
        estimatedCost: '₹6000-9000 for 3 days',
        weather: 'Humid subtropical. Monsoon: Heavy rain June-September',
        safety: 'Respect local customs. Carry rain gear in monsoon.',
        carry: ['Light cotton clothes', 'Raincoat', 'Mosquito repellent'],
        documents: ['ID Proof', 'Hotel booking', 'Inner Line Permit if traveling further']
    },

    // Add more destinations as needed...
    'amritsar': {
        destination: 'Amritsar',
        state: 'Punjab',
        overview: 'Spiritual capital of Sikhism with the Golden Temple and rich Punjabi culture.',
        bestTime: 'October to March (10-25°C) - Pleasant weather',
        places: ['Golden Temple', 'Jallianwala Bagh', 'Wagah Border', 'Partition Museum', 'Durgiana Temple', 'Gobindgarh Fort'],
        hotels: [
            {name: 'Budget Hotel near Temple', priceRange: '₹800-1500', rating: 4.1},
            {name: 'Mid-range Hotel', priceRange: '₹2000-3500', rating: 4.3},
            {name: 'Luxury Hotel', priceRange: '₹4000-6000', rating: 4.5}
        ],
        food: ['Langar (community meal)', 'Amritsari Kulcha', 'Chole Bhature', 'Lassi', 'Makki di Roti with Sarson da Saag'],
        transport: [
            {type: 'Auto Rickshaw', cost: '₹20-35 per km'},
            {type: 'Taxi', cost: '₹10-14 per km'},
            {type: 'City Bus', cost: '₹10-30 per trip'}
        ],
        reach: 'Flights to Amritsar Airport, trains to Amritsar Junction, buses',
        estimatedCost: '₹5000-8000 for 2 days',
        weather: 'Extreme summers (15-45°C), Cold winters (4-20°C)',
        safety: 'Respect temple rules (head cover, no shoes). Wagah Border ceremony timing varies.',
        carry: ['Head scarf for temples', 'Comfortable shoes', 'Water bottle'],
        documents: ['ID Proof', 'Hotel booking']
    }
};

// State-wise mapping for broader searches
const stateDestinations = {
    'himachal pradesh': ['manali', 'shimla', 'dharamshala', 'kasol', 'kullu'],
    'rajasthan': ['jaipur', 'udaipur', 'jodhpur', 'jaisalmer', 'pushkar'],
    'goa': ['goa'],
    'kerala': ['kerala', 'kochi', 'munnar', 'alleppey'],
    'tamil nadu': ['chennai', 'madurai', 'coimbatore', 'kanyakumari'],
    'karnataka': ['bangalore', 'mysore', 'coorg', 'hampi'],
    'maharashtra': ['mumbai', 'pune', 'mahabaleshwar', 'lonavala'],
    'uttarakhand': ['rishikesh', 'haridwar', 'nainital', 'mussoorie'],
    'uttar pradesh': ['agra', 'varanasi', 'lucknow', 'ayodhya'],
    'west bengal': ['kolkata', 'darjeeling', 'sunderbans', 'kalimpong'],
    'gujarat': ['ahmedabad', 'vadodara', 'surat', 'dwarka'],
    'punjab': ['amritsar', 'chandigarh', 'ludhiana'],
    'assam': ['guwahati', 'kaziranga', 'majuli'],
    'sikkim': ['gangtok', 'pelling', 'lachung'],
    // Add more states...
};

module.exports = {
    fallbackDestinations,
    stateDestinations
};