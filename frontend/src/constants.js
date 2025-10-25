const mockCarbonEntries = [
  {
    id: 1,
    items: [
      { name: "Quinoa Bowl", carbon: 2.1 },
      { name: "Grilled Chicken", carbon: 3.2 },
      { name: "Avocado", carbon: 0.8 },
    ],
    totalCarbon: 6.1,
    date: "2024-08-31",
    time: "12:30 PM",
    image: "/api/placeholder/150/150",
    tips: ["Great low-carbon choice!", "Try adding more vegetables next time"],
  },
  {
    id: 2,
    items: [
      { name: "Burger", carbon: 8.5 },
      { name: "French Fries", carbon: 2.3 },
    ],
    totalCarbon: 10.8,
    date: "2024-08-30",
    time: "7:45 PM",
    image: "/api/placeholder/150/150",
    tips: [
      "Consider plant-based alternatives",
      "Reduce portion size to lower impact",
    ],
  },
  {
    id: 3,
    items: [
      { name: "Oatmeal", carbon: 0.5 },
      { name: "Berries", carbon: 0.3 },
      { name: "Almond Milk", carbon: 0.4 },
    ],
    totalCarbon: 1.2,
    date: "2024-08-30",
    time: "8:15 AM",
    image: "/api/placeholder/150/150",
    tips: [
      "Excellent sustainable breakfast!",
      "Perfect carbon-conscious start to the day",
    ],
  },
];

const mockWeeklyData = [
  { day: "Mon", carbon: 12.5, entries: 3 },
  { day: "Tue", carbon: 8.2, entries: 2 },
  { day: "Wed", carbon: 15.1, entries: 4 },
  { day: "Thu", carbon: 6.8, entries: 2 },
  { day: "Fri", carbon: 11.3, entries: 3 },
  { day: "Sat", carbon: 9.7, entries: 3 },
  { day: "Sun", carbon: 7.2, entries: 2 },
];

const mockLeaderboard = [
  {
    rank: 1,
    name: "Emma Wilson",
    carbonSaved: 89.2,
    avatar: "🌟",
    isCurrentUser: false,
  },
  {
    rank: 2,
    name: "David Kim",
    carbonSaved: 76.5,
    avatar: "🌿",
    isCurrentUser: false,
  },
  {
    rank: 3,
    name: "Alex Green",
    carbonSaved: 65.3,
    avatar: "🌱",
    isCurrentUser: true,
  },
  {
    rank: 4,
    name: "Sarah Johnson",
    carbonSaved: 58.9,
    avatar: "🍃",
    isCurrentUser: false,
  },
  {
    rank: 5,
    name: "Mike Chen",
    carbonSaved: 52.1,
    avatar: "🌳",
    isCurrentUser: false,
  },
];

export { mockCarbonEntries, mockLeaderboard, mockWeeklyData };
