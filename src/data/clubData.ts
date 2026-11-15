export interface Player {
  id: string;
  number: number;
  name: string;
  fullName: string;
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
  positionShort: 'GK' | 'DF' | 'MF' | 'FW';
  nationality: string;
  flag: string;
  age: number;
  height: string;
  appearances: number;
  goals: number;
  assists: number;
  cleanSheets?: number;
  rating: number;
  marketValue: string;
  isCaptain?: boolean;
  isStarPlayer?: boolean;
  bio: string;
  photoUrl?: string;
}

export interface Match {
  id: string;
  competition: string;
  competitionBadge: string;
  date: string;
  time: string;
  stadium: string;
  isHome: boolean;
  opponent: string;
  opponentBadge: string;
  opponentAbbr: string;
  status: 'upcoming' | 'completed' | 'live';
  homeScore?: number;
  awayScore?: number;
  scorers?: string[];
  attendance?: string;
  matchday?: number;
}

export interface TableRow {
  position: number;
  team: string;
  teamAbbr: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
  isSimolat?: boolean;
}

export interface ShopItem {
  id: string;
  name: string;
  category: 'kits' | 'training' | 'accessories' | 'equipment';
  price: number;
  image: string;
  badge?: string;
  description: string;
  sizes?: string[];
  customizable?: boolean;
}

export interface Trophy {
  id: string;
  title: string;
  years: string[];
  count: number;
  description: string;
  iconName: string;
}

export const CLUB_INFO = {
  name: 'Simolat Sporting FC',
  shortName: 'Simolat FC',
  nickname: 'The Lions of Simolat',
  motto: 'Pride, Passion & Glory',
  founded: '1994',
  stadium: 'St. Simolat Arena',
  capacity: '48,500',
  city: 'Victoria Island, Lagos',
  president: 'Chief Dr. S. O. Atundaolu',
  manager: 'Coach Simeon Atundaolu',
  crestImage: '/src/assets/images/simolat_club_crest_1791890598527.jpg',
  stadiumImage: '/src/assets/images/hero_stadium_match_1791890599427.jpg',
  starPlayerImage: '/src/assets/images/star_player_action_1791890600226.jpg',
  kitImage: '/src/assets/images/club_kit_home_1791890599264.jpg',
};

export const NEXT_MATCH: Match = {
  id: 'match-next',
  competition: 'Premier Super League',
  competitionBadge: '🏆',
  date: 'Saturday, Oct 18, 2026',
  time: '17:30 UTC',
  stadium: 'St. Simolat Arena',
  isHome: true,
  opponent: 'Zenith Rovers',
  opponentBadge: '🦅',
  opponentAbbr: 'ZNR',
  status: 'upcoming',
  attendance: '48,500 Expected',
  matchday: 21,
};

export const RECENT_RESULTS: Match[] = [
  {
    id: 'res-1',
    competition: 'Premier Super League',
    competitionBadge: '🏆',
    date: 'Oct 11, 2026',
    time: '16:00 UTC',
    stadium: 'St. Simolat Arena',
    isHome: true,
    opponent: 'Coastal Dynamos',
    opponentBadge: '🌊',
    opponentAbbr: 'CDY',
    status: 'completed',
    homeScore: 3,
    awayScore: 1,
    scorers: ['K. Mensah 14\', 58\', 82\' (SIM)', 'T. Bello 44\' (CDY)'],
    attendance: '47,820',
  },
  {
    id: 'res-2',
    competition: 'Continental Champions Cup',
    competitionBadge: '⭐',
    date: 'Oct 4, 2026',
    time: '19:45 UTC',
    stadium: 'Highland Arena',
    isHome: false,
    opponent: 'Highland United',
    opponentBadge: '⚔️',
    opponentAbbr: 'HLU',
    status: 'completed',
    homeScore: 0,
    awayScore: 2,
    scorers: ['S. Adeleke 33\' (SIM)', 'J. Vane 77\' (SIM)'],
    attendance: '38,150',
  },
  {
    id: 'res-3',
    competition: 'Premier Super League',
    competitionBadge: '🏆',
    date: 'Sep 27, 2026',
    time: '15:00 UTC',
    stadium: 'St. Simolat Arena',
    isHome: true,
    opponent: 'Metro Athletic',
    opponentBadge: '⚡',
    opponentAbbr: 'MAT',
    status: 'completed',
    homeScore: 2,
    awayScore: 2,
    scorers: ['V. Amadi 19\' (SIM)', 'K. Mensah 64\' (SIM)', 'A. Gomez 41\', 89\' (MAT)'],
    attendance: '48,100',
  },
  {
    id: 'res-4',
    competition: 'FA Super Cup Semi-Final',
    competitionBadge: '🛡️',
    date: 'Sep 20, 2026',
    time: '17:00 UTC',
    stadium: 'Vanguard Grounds',
    isHome: false,
    opponent: 'Vanguard FC',
    opponentBadge: '🛡️',
    opponentAbbr: 'VAN',
    status: 'completed',
    homeScore: 1,
    awayScore: 4,
    scorers: ['K. Mensah 8\', 49\' (SIM)', 'G. Rocha 27\' (SIM)', 'M. Silva 72\' (SIM)', 'E. Cole 80\' (VAN)'],
    attendance: '32,400',
  },
];

export const UPCOMING_FIXTURES: Match[] = [
  NEXT_MATCH,
  {
    id: 'fix-2',
    competition: 'Premier Super League',
    competitionBadge: '🏆',
    date: 'Saturday, Oct 25, 2026',
    time: '16:00 UTC',
    stadium: 'Crown National Ground',
    isHome: false,
    opponent: 'Crown City FC',
    opponentBadge: '👑',
    opponentAbbr: 'CCF',
    status: 'upcoming',
    matchday: 22,
  },
  {
    id: 'fix-3',
    competition: 'Continental Champions Cup',
    competitionBadge: '⭐',
    date: 'Tuesday, Nov 3, 2026',
    time: '20:00 UTC',
    stadium: 'St. Simolat Arena',
    isHome: true,
    opponent: 'Porto Atlantic',
    opponentBadge: '⚓',
    opponentAbbr: 'POA',
    status: 'upcoming',
    matchday: 4,
  },
  {
    id: 'fix-4',
    competition: 'Premier Super League',
    competitionBadge: '🏆',
    date: 'Sunday, Nov 8, 2026',
    time: '15:30 UTC',
    stadium: 'St. Simolat Arena',
    isHome: true,
    opponent: 'Apex Rangers',
    opponentBadge: '🏔️',
    opponentAbbr: 'APX',
    status: 'upcoming',
    matchday: 23,
  },
];

export const LEAGUE_STANDINGS: TableRow[] = [
  { position: 1, team: 'Simolat Sporting FC', teamAbbr: 'SIM', played: 20, won: 15, drawn: 4, lost: 1, gf: 46, ga: 14, gd: 32, points: 49, form: ['W', 'W', 'D', 'W', 'W'], isSimolat: true },
  { position: 2, team: 'Zenith Rovers', teamAbbr: 'ZNR', played: 20, won: 14, drawn: 4, lost: 2, gf: 41, ga: 18, gd: 23, points: 46, form: ['W', 'W', 'W', 'D', 'W'] },
  { position: 3, team: 'Crown City FC', teamAbbr: 'CCF', played: 20, won: 12, drawn: 5, lost: 3, gf: 38, ga: 19, gd: 19, points: 41, form: ['W', 'D', 'W', 'L', 'W'] },
  { position: 4, team: 'Metro Athletic', teamAbbr: 'MAT', played: 20, won: 11, drawn: 6, lost: 3, gf: 35, ga: 22, gd: 13, points: 39, form: ['D', 'W', 'D', 'W', 'D'] },
  { position: 5, team: 'Coastal Dynamos', teamAbbr: 'CDY', played: 20, won: 10, drawn: 4, lost: 6, gf: 32, ga: 25, gd: 7, points: 34, form: ['L', 'W', 'L', 'W', 'W'] },
  { position: 6, team: 'Highland United', teamAbbr: 'HLU', played: 20, won: 9, drawn: 5, lost: 6, gf: 29, ga: 24, gd: 5, points: 32, form: ['L', 'D', 'W', 'W', 'L'] },
  { position: 7, team: 'Vanguard FC', teamAbbr: 'VAN', played: 20, won: 7, drawn: 6, lost: 7, gf: 27, ga: 29, gd: -2, points: 27, form: ['L', 'W', 'D', 'L', 'D'] },
  { position: 8, team: 'Apex Rangers', teamAbbr: 'APX', played: 20, won: 6, drawn: 5, lost: 9, gf: 23, ga: 31, gd: -8, points: 23, form: ['D', 'L', 'L', 'W', 'L'] },
  { position: 9, team: 'Victoria United', teamAbbr: 'VIC', played: 20, won: 4, drawn: 5, lost: 11, gf: 19, ga: 37, gd: -18, points: 17, form: ['L', 'L', 'D', 'L', 'L'] },
  { position: 10, team: 'Harbor City FC', teamAbbr: 'HBC', played: 20, won: 3, drawn: 4, lost: 13, gf: 16, ga: 45, gd: -29, points: 13, form: ['L', 'L', 'L', 'D', 'L'] },
];

export const SQUAD_PLAYERS: Player[] = [
  // Goalkeepers
  {
    id: 'p-1',
    number: 1,
    name: 'David Olatunji',
    fullName: 'David Babatunde Olatunji',
    position: 'Goalkeeper',
    positionShort: 'GK',
    nationality: 'Nigeria',
    flag: '🇳🇬',
    age: 28,
    height: '1.93m',
    appearances: 19,
    goals: 0,
    assists: 1,
    cleanSheets: 11,
    rating: 8.4,
    marketValue: '€18M',
    bio: 'Renowned for world-class reflex saves and command of his penalty box. 11 clean sheets in 19 appearances this campaign.',
  },
  {
    id: 'p-12',
    number: 12,
    name: 'Samuel Eze',
    fullName: 'Samuel Chukwu Eze',
    position: 'Goalkeeper',
    positionShort: 'GK',
    nationality: 'Nigeria',
    flag: '🇳🇬',
    age: 22,
    height: '1.90m',
    appearances: 3,
    goals: 0,
    assists: 0,
    cleanSheets: 2,
    rating: 7.6,
    marketValue: '€4M',
    bio: 'Simolat Academy graduate with exceptional footwork and shot-stopping ability in cup ties.',
  },
  // Defenders
  {
    id: 'p-4',
    number: 4,
    name: 'Marcus Sterling',
    fullName: 'Marcus John Sterling',
    position: 'Defender',
    positionShort: 'DF',
    nationality: 'England',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    age: 27,
    height: '1.89m',
    appearances: 20,
    goals: 3,
    assists: 2,
    rating: 8.7,
    marketValue: '€28M',
    isCaptain: true,
    bio: 'Club captain and rock of the backline. Supreme aerial dominance and composure under pressure.',
  },
  {
    id: 'p-5',
    number: 5,
    name: 'Kingsley Okafor',
    fullName: 'Kingsley Chinedu Okafor',
    position: 'Defender',
    positionShort: 'DF',
    nationality: 'Nigeria',
    flag: '🇳🇬',
    age: 25,
    height: '1.87m',
    appearances: 19,
    goals: 2,
    assists: 1,
    rating: 8.3,
    marketValue: '€22M',
    bio: 'Tenacious tackler with rapid recovery pace. Combines brilliantly with Sterling at center back.',
  },
  {
    id: 'p-3',
    number: 3,
    name: 'Lucas Hernandez',
    fullName: 'Lucas Gabriel Hernandez',
    position: 'Defender',
    positionShort: 'DF',
    nationality: 'France',
    flag: '🇫🇷',
    age: 26,
    height: '1.82m',
    appearances: 18,
    goals: 1,
    assists: 6,
    rating: 8.2,
    marketValue: '€24M',
    bio: 'Dynamic left wing-back capable of pinpoint crosses and tireless overlaps throughout the 90 minutes.',
  },
  {
    id: 'p-2',
    number: 2,
    name: 'Tariq Al-Hassan',
    fullName: 'Tariq Kweku Al-Hassan',
    position: 'Defender',
    positionShort: 'DF',
    nationality: 'Ghana',
    flag: '🇬🇭',
    age: 24,
    height: '1.80m',
    appearances: 19,
    goals: 1,
    assists: 5,
    rating: 8.1,
    marketValue: '€19M',
    bio: 'Explosive right full-back who combines defensive resilience with lightning transitions down the flank.',
  },
  {
    id: 'p-15',
    number: 15,
    name: 'Carlos Mendes',
    fullName: 'Carlos Alberto Mendes',
    position: 'Defender',
    positionShort: 'DF',
    nationality: 'Portugal',
    flag: '🇵🇹',
    age: 23,
    height: '1.86m',
    appearances: 10,
    goals: 0,
    assists: 1,
    rating: 7.7,
    marketValue: '€12M',
    bio: 'Versatile defensive stalwart capable of slotting in at center-back or shielding the defensive midfield.',
  },
  // Midfielders
  {
    id: 'p-6',
    number: 6,
    name: 'Mateo Silva',
    fullName: 'Mateo Vinicius Silva',
    position: 'Midfielder',
    positionShort: 'MF',
    nationality: 'Brazil',
    flag: '🇧🇷',
    age: 29,
    height: '1.84m',
    appearances: 20,
    goals: 2,
    assists: 4,
    rating: 8.5,
    marketValue: '€26M',
    bio: 'The defensive engine. Intercepts passes, breaks down counterattacks, and sets tempo with 92% pass accuracy.',
  },
  {
    id: 'p-8',
    number: 8,
    name: 'Simeon Adeleke',
    fullName: 'Simeon "Sim" Oluwaseun Adeleke',
    position: 'Midfielder',
    positionShort: 'MF',
    nationality: 'Nigeria',
    flag: '🇳🇬',
    age: 23,
    height: '1.81m',
    appearances: 20,
    goals: 8,
    assists: 9,
    rating: 8.9,
    marketValue: '€42M',
    isStarPlayer: true,
    bio: 'Simolat academy legend and creative talisman. Blessed with sublime vision, curling free kicks, and midfield magic.',
  },
  {
    id: 'p-10',
    number: 10,
    name: 'Julian Vane',
    fullName: 'Julian Rodrigo Vane',
    position: 'Midfielder',
    positionShort: 'MF',
    nationality: 'Spain',
    flag: '🇪🇸',
    age: 25,
    height: '1.78m',
    appearances: 18,
    goals: 6,
    assists: 11,
    rating: 8.8,
    marketValue: '€35M',
    bio: 'Maestro number 10. League assist leader with an innate ability to thread defense-splitting through balls.',
  },
  {
    id: 'p-17',
    number: 17,
    name: 'Ibrahim Touré',
    fullName: 'Ibrahim Cheick Touré',
    position: 'Midfielder',
    positionShort: 'MF',
    nationality: 'Ivory Coast',
    flag: '🇨🇮',
    age: 22,
    height: '1.85m',
    appearances: 14,
    goals: 3,
    assists: 3,
    rating: 7.9,
    marketValue: '€15M',
    bio: 'Powerhouse box-to-box midfielder with thunderous long-range shooting capabilities.',
  },
  // Forwards
  {
    id: 'p-14',
    number: 14,
    name: 'Kwame Mensah',
    fullName: 'Kwame Kofi Mensah',
    position: 'Forward',
    positionShort: 'FW',
    nationality: 'Ghana',
    flag: '🇬🇭',
    age: 26,
    height: '1.86m',
    appearances: 20,
    goals: 19,
    assists: 5,
    rating: 9.1,
    marketValue: '€55M',
    isStarPlayer: true,
    photoUrl: '/src/assets/images/star_player_action_1791890600226.jpg',
    bio: 'Lethal top goalscorer of the league with 19 goals in 20 matches. Clinical finishing with both feet and devastating pace.',
  },
  {
    id: 'p-7',
    number: 7,
    name: 'Victor Amadi',
    fullName: 'Victor Chukwudi Amadi',
    position: 'Forward',
    positionShort: 'FW',
    nationality: 'Nigeria',
    flag: '🇳🇬',
    age: 22,
    height: '1.77m',
    appearances: 19,
    goals: 9,
    assists: 8,
    rating: 8.6,
    marketValue: '€32M',
    bio: 'Electrifying right-winger whose stepovers and burst of acceleration leave defenders helpless.',
  },
  {
    id: 'p-11',
    number: 11,
    name: 'Gabriel Rocha',
    fullName: 'Gabriel Felipe Rocha',
    position: 'Forward',
    positionShort: 'FW',
    nationality: 'Colombia',
    flag: '🇨🇴',
    age: 24,
    height: '1.79m',
    appearances: 18,
    goals: 7,
    assists: 7,
    rating: 8.4,
    marketValue: '€27M',
    bio: 'Direct, sharp left-winger who cuts inside onto his favored right foot with devastating curl.',
  },
  {
    id: 'p-9',
    number: 9,
    name: 'Emmanuel Balogun',
    fullName: 'Emmanuel Folarin Balogun',
    position: 'Forward',
    positionShort: 'FW',
    nationality: 'Nigeria',
    flag: '🇳🇬',
    age: 21,
    height: '1.83m',
    appearances: 12,
    goals: 5,
    assists: 2,
    rating: 7.9,
    marketValue: '€14M',
    bio: 'Rising academy sensation. High pressing forward with an instinctive predator instinct in the box.',
  },
];

export const TECHNICAL_STAFF = [
  { role: 'Head Coach', name: 'Coach Simeon Atundaolu', exp: 'Simolat Sporting FC Manager', nationality: 'Nigeria' },
  { role: 'Assistant Coach', name: 'Lars Lindholm', exp: 'Tactical & Set-Piece Specialist', nationality: 'Sweden' },
  { role: 'Goalkeeping Coach', name: 'Emanuel Santos', exp: 'Former International Goalkeeper', nationality: 'Portugal' },
  { role: 'Head of Sports Science', name: 'Dr. Elena Rossi', exp: 'Sports Biomechanics & Fitness', nationality: 'Italy' },
];

export const CLUB_HONORS: Trophy[] = [
  {
    id: 'trophy-1',
    title: 'Premier Super League Champions',
    years: ['2018', '2020', '2023', '2025'],
    count: 4,
    description: 'The pinnacle of domestic excellence, conquered 4 times with historic unbeaten runs.',
    iconName: 'Trophy',
  },
  {
    id: 'trophy-2',
    title: 'Continental Champions Cup',
    years: ['2021', '2025'],
    count: 2,
    description: 'Crown of the continent, lifting the gold trophy in high-voltage final victories.',
    iconName: 'Shield',
  },
  {
    id: 'trophy-3',
    title: 'National FA Super Cup',
    years: ['2019', '2022', '2024'],
    count: 3,
    description: 'The national knockout competition won through sheer determination and clutch goals.',
    iconName: 'Award',
  },
  {
    id: 'trophy-4',
    title: 'Super League Golden Treble',
    years: ['2025'],
    count: 1,
    description: 'Historic clean sweep of League, Cup, and Continental glory in a magical season.',
    iconName: 'Crown',
  },
];

export const CLUB_SHOP_ITEMS: ShopItem[] = [
  {
    id: 'kit-home',
    name: '2026/27 Official Home Jersey',
    category: 'kits',
    price: 85,
    image: '/src/assets/images/club_kit_home_1791890599264.jpg',
    badge: 'Matchday Official',
    description: 'Official royal blue kit with gold metallic piping, aeroready ventilation, and high-definition silicone Simolat crest.',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    customizable: true,
  },
  {
    id: 'kit-away',
    name: '2026/27 Sovereign Away Jersey',
    category: 'kits',
    price: 85,
    image: '/src/assets/images/club_kit_home_1791890599264.jpg',
    badge: 'Popular',
    description: 'Stunning sovereign gold shirt with deep navy collar and sleeve accents. Sleek athletic cut.',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    customizable: true,
  },
  {
    id: 'kit-third',
    name: '2026/27 Obsidian Third Jersey',
    category: 'kits',
    price: 89,
    image: '/src/assets/images/club_kit_home_1791890599264.jpg',
    badge: 'Limited Edition',
    description: 'Stealth black with reflective gold heraldic crest and lion watermark across the chest.',
    sizes: ['S', 'M', 'L', 'XL'],
    customizable: true,
  },
  {
    id: 'gear-tracksuit',
    name: 'Simolat Elite Training Tracksuit',
    category: 'training',
    price: 95,
    image: '/src/assets/images/club_kit_home_1791890599264.jpg',
    badge: 'Pro Line',
    description: 'Weather-resistant zip jacket and tapered training pants worn by first team coaching staff.',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },
  {
    id: 'acc-ball',
    name: 'Simolat Lion Match Football (Size 5)',
    category: 'equipment',
    price: 42,
    image: '/src/assets/images/simolat_club_crest_1791890598527.jpg',
    badge: 'FIFA Quality Pro',
    description: 'Thermally bonded seamless surface with official club heraldic crest and textured grip panels.',
  },
  {
    id: 'acc-scarf',
    name: 'Simolat "Pride & Passion" Jacquard Scarf',
    category: 'accessories',
    price: 24,
    image: '/src/assets/images/simolat_club_crest_1791890598527.jpg',
    badge: 'Fan Favorite',
    description: 'Traditional double-knit heavy acrylic supporter scarf with gold tassels and club chant script.',
  },
];

export const STADIUM_STANDS = [
  {
    id: 'north',
    name: 'North Stand (The Lions Den)',
    atmosphere: 'Ultras & Chanting Section - Loudest Match Experience',
    price: 35,
    gate: 'Gates 1 - 4',
    available: 142,
    color: '#3B82F6',
  },
  {
    id: 'kings',
    name: 'King\'s Terrace (South Stand)',
    atmosphere: 'Central Mid-Pitch View & Panoramic Atmosphere',
    price: 55,
    gate: 'Gates 9 - 14',
    available: 88,
    color: '#F59E0B',
  },
  {
    id: 'family',
    name: 'East Family Pavilion',
    atmosphere: 'Family-friendly seating, concession zones, mascot greetings',
    price: 40,
    gate: 'Gates 5 - 8',
    available: 110,
    color: '#10B981',
  },
  {
    id: 'vip',
    name: 'Executive West Club & VIP Lounge',
    atmosphere: 'Padded leather seats, champagne hospitality, player tunnel pass',
    price: 135,
    gate: 'VIP Grand Entrance',
    available: 24,
    color: '#D97706',
  },
];

export const CLUB_NEWS = [
  {
    id: 'news-1',
    title: 'Mensah Sensational Hat-Trick Fires Lions to Crucial 3-1 Triumph',
    date: 'October 12, 2026',
    category: 'Match Report',
    summary: 'Kwame Mensah took his league tally to 19 goals with a masterclass display against Coastal Dynamos in front of 47,820 roaring fans.',
    readTime: '3 min read',
    image: '/src/assets/images/star_player_action_1791890600226.jpg',
  },
  {
    id: 'news-2',
    title: 'Coach Simeon: "Our Energy and Tactical Discipline Define Simolat Spirit"',
    date: 'October 10, 2026',
    category: 'Interview',
    summary: 'The gaffer addresses the media ahead of this weekend\'s heavyweight title showdown against Zenith Rovers at St. Simolat Arena.',
    readTime: '4 min read',
    image: '/src/assets/images/hero_stadium_match_1791890599427.jpg',
  },
  {
    id: 'news-3',
    title: 'Simolat Youth Academy Announces Nationwide Talent Trials for U-17 & U-19',
    date: 'October 05, 2026',
    category: 'Academy',
    summary: 'Registration opens for promising footballers to train under Simolat Sporting FC elite coaching methodology.',
    readTime: '2 min read',
    image: '/src/assets/images/club_kit_home_1791890599264.jpg',
  },
];
