const generateMockBookings = () => {
  const sources = ["mmt", "goibibo", "mybus", "personal"];
  const sourceNames = {
    mmt: "MakeMyTrip",
    goibibo: "Goibibo",
    mybus: "MyBus",
    personal: "Personal Booking",
  };

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Vadodara",
    "Coimbatore",
  ];

  const names = [
    "Rahul Sharma",
    "Priya Patel",
    "Amit Singh",
    "Neha Gupta",
    "Vikram Kumar",
    "Anjali Jain",
    "Rohit Mehta",
    "Kavya Reddy",
    "Arjun Nair",
    "Pooja Agarwal",
    "Sanjay Malhotra",
    "Deepika Rao",
    "Karan Kapoor",
    "Shreya Iyer",
    "Manish Joshi",
    "Ritu Bansal",
    "Aarav Pandey",
    "Nisha Sinha",
    "Varun Chopra",
    "Meera Desai",
    "Aditya Saxena",
    "Tanya Verma",
    "Rajesh Kumar",
    "Sonali Bhatt",
    "Nikhil Tiwari",
    "Ishita Khanna",
    "Gaurav Mishra",
    "Pallavi Shukla",
    "Akash Dubey",
    "Riya Goyal",
    "Suresh Yadav",
    "Swati Trivedi",
    "Abhishek Arora",
    "Nikita Jain",
    "Vishal Shah",
    "Ananya Dixit",
    "Mohit Garg",
    "Shilpa Tyagi",
    "Kunal Bhatia",
    "Aditi Agrawal",
    "Raghav Soni",
    "Kritika Joshi",
    "Ankit Sharma",
    "Divya Mittal",
    "Harsh Gupta",
  ];

  const statuses = ["confirmed", "pending", "cancelled"];
  const bookings = [];
  const usedNames = new Set();

  // Helper function to get weighted source
  const getWeightedSource = () => {
    const rand = Math.random();
    if (rand < 0.35) return "mmt"; // 35%
    if (rand < 0.6) return "goibibo"; // 25%
    if (rand < 0.8) return "mybus"; // 20%
    return "personal"; // 20%
  };

  // Helper function to get weighted status
  const getWeightedStatus = () => {
    const rand = Math.random();
    if (rand < 0.75) return "confirmed"; // 75%
    if (rand < 0.9) return "pending"; // 15%
    return "cancelled"; // 10%
  };

  // Generate booking ID with source prefix
  const generateBookingId = (index, source) => {
    const prefixes = {
      mmt: "MMT",
      goibibo: "GIB",
      mybus: "MBS",
      personal: "PER",
    };
    return `${prefixes[source]}${String(index).padStart(4, "0")}`;
  };

  for (let i = 1; i <= 75; i++) {
    // Generate date (weighted toward recent dates)
    const daysBack =
      Math.random() < 0.4
        ? Math.floor(Math.random() * 7) // 40% in last 7 days
        : Math.floor(Math.random() * 30); // 60% in last 30 days

    const date = new Date();
    date.setDate(date.getDate() - daysBack);

    // Generate realistic time distribution
    let hour;
    const timeRand = Math.random();
    if (timeRand < 0.3) {
      hour = Math.floor(Math.random() * 4) + 6; // 6-9 AM (30%)
    } else if (timeRand < 0.5) {
      hour = Math.floor(Math.random() * 4) + 18; // 6-9 PM (20%)
    } else if (timeRand < 0.7) {
      hour = Math.floor(Math.random() * 8) + 10; // 10 AM-6 PM (20%)
    } else {
      hour = Math.floor(Math.random() * 24); // Any time (30%)
    }

    const minute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
    date.setHours(hour, minute, 0, 0);

    // Get unique passenger name
    let passengerName;
    do {
      passengerName = names[Math.floor(Math.random() * names.length)];
    } while (usedNames.has(passengerName) && usedNames.size < names.length);
    usedNames.add(passengerName);

    // Generate origin and destination
    const origin = cities[Math.floor(Math.random() * cities.length)];
    let destination;
    do {
      destination = cities[Math.floor(Math.random() * cities.length)];
    } while (destination === origin);

    // Generate booking details
    const source = getWeightedSource();
    const status = getWeightedStatus();
    const seats = Math.random() < 0.6 ? 1 : Math.floor(Math.random() * 3) + 2; // 60% single seat

    // Calculate realistic fare based on route and source
    const metros = [
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Chennai",
      "Kolkata",
      "Hyderabad",
    ];
    const isMetroRoute =
      metros.includes(origin) && metros.includes(destination);
    const isMetroConnection =
      metros.includes(origin) || metros.includes(destination);

    let baseFare;
    if (isMetroRoute) {
      baseFare = 800 + Math.floor(Math.random() * 600); // 800-1400
    } else if (isMetroConnection) {
      baseFare = 500 + Math.floor(Math.random() * 400); // 500-900
    } else {
      baseFare = 300 + Math.floor(Math.random() * 300); // 300-600
    }

    // Source-based pricing
    const sourceMultiplier = {
      mmt: 1.1,
      goibibo: 1.05,
      mybus: 0.95,
      personal: 0.9,
    };

    // Time-based pricing
    const timeMultiplier =
      (hour >= 6 && hour <= 9) || (hour >= 18 && hour <= 21) ? 1.15 : 1.0;

    const farePerSeat =
      Math.round((baseFare * sourceMultiplier[source] * timeMultiplier) / 50) *
      50;
    const totalFare = farePerSeat * seats;

    // Apply cancellation adjustment (80% refund for cancelled)
    const finalFare =
      status === "cancelled" ? Math.round(totalFare * 0.8) : totalFare;

    const booking = {
      id: generateBookingId(i, source),
      passengerName: passengerName,
      source: source,
      sourceName: sourceNames[source],
      origin: origin,
      destination: destination,
      date: date.toISOString().split("T")[0],
      time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}`,
      timestamp: date.getTime(),
      seats: seats,
      fare: finalFare,
      status: status,
      raw: `Booking data from ${sourceNames[source]} - Route: ${origin} to ${destination}`,
      // Additional fields for enhanced details
      phoneNumber: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      busNumber: `${
        ["KA", "MH", "DL", "TN", "GJ"][Math.floor(Math.random() * 5)]
      }-${Math.floor(Math.random() * 90) + 10}-${
        Math.floor(Math.random() * 9000) + 1000
      }`,
      seatNumbers: Array.from(
        { length: seats },
        (_, j) => Math.floor(Math.random() * 40) + 1
      )
        .sort((a, b) => a - b)
        .join(", "),
    };

    bookings.push(booking);
  }

  // Sort by timestamp (most recent first)
  return bookings.sort((a, b) => b.timestamp - a.timestamp);
};

export default generateMockBookings;