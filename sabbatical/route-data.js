/* The one copy of the route. The map (index.html) and the overview (overview.html) both read it. */

/* ============================================================================
   THE ROUTE DATA
   ----------------------------------------------------------------------------
   The trip comes in two options that share everything up to Siem Reap:
     sharedRoute - what's done, where I am now, and the route on to Siem Reap
     endingA     - Option 1: Cambodia done early January, Malaysia and Singapore before the Thai islands
     endingB     - Option 2: Cambodia done mid-January, Malaysia and Singapore after the Thai islands
   The overview page shows one option at a time (overview.html?option=2 for Option 2).

   To move the trip forward: set status: "done" on the stop you've left,
   and status: "now" on the stop you're at. Stops without a status are still ahead.

   Each stop has:
     status   - "done" (been there), "now" (here now), or left out (still ahead)
     leg      - which section of the trip it belongs to (groups the sidebar)
     name     - what shows on the map
     coords   - [latitude, longitude]
     nights   - nights to sleep there (0 = pass through)
     overnightTravel - nights spent on a night bus or night train getting here
     tags     - what kind of things you can do there; these drive the "Show me" filter buttons
     score    - out of 7 (7 = a beat, don't miss it). Left out for pure transit stops.
     role     - "base" (sleep here, do things around it) or "transit" (just passing through)
     why      - why it's on the list
     do       - what to actually do there
     food     - what to eat
     stay     - which part of town to sleep in. pick: true marks the first choice.
     travel   - every realistic way of getting here from the stop before.
                pick: true marks the option to go for.
     mode     - how the LINE into this stop is drawn: ground | water | air
     months   - how your timing fits the weather
     maybe    - true = undecided. In-line maybes show what to do if you skip them;
                side-trip maybes (with spurFrom) hang off the main line.
     skip     - for in-line maybes: what happens to the route if you leave it out
     spurFrom - for side-trip maybes: the id of the stop it branches off
     cost     - for side-trip maybes: extra nights it adds
============================================================================ */

// The flight home. The map counts the nights left from today to this date.
const TRIP_END = "2027-02-26";

const sharedRoute = [
  /* ---------- Done ---------- */
  {
    id: "bkk1", status: "done", tags: ["city", "food", "party", "shopping", "history"], leg: "Thailand — North", name: "Bangkok", coords: [13.7563, 100.5018], nights: 0, mode: "air",
    why: "Where the trip started, and the best street food on the whole route.",
    do: "Chinatown food crawl, the temples, the canals.",
    food: "Boat noodles, pad krapow, som tam, mango sticky rice.",
    travel: [
      { how: "Direct flight from Copenhagen", time: "~11 h", note: "SAS into Suvarnabhumi.", pick: true }
    ],
    months: "—"
  },
  {
    id: "cnx", status: "done", tags: ["city", "food", "history", "shopping", "hiking", "tea"], leg: "Thailand — North", name: "Chiang Mai", coords: [18.7883, 98.9853], nights: 0, mode: "air",
    why: "The northern base, timed for the Yi Peng lantern festival.",
    do: "Yi Peng and Loy Krathong lanterns, the Old City temples, Doi Suthep, the Sunday Walking Street.",
    food: "Khao soi, sai ua sausage, the night-market stalls.",
    travel: [
      { how: "Flight from Bangkok", time: "~1 h 15", note: "", pick: true }
    ],
    months: "—"
  },
  {
    id: "chiangdao", status: "done", tags: ["hiking"], leg: "Thailand — North", name: "Chiang Dao", coords: [19.3667, 98.9667], nights: 0, mode: "ground",
    why: "A quiet mountain village under Doi Chiang Dao, north of Chiang Mai.",
    do: "The Chiang Dao cave, walks in the valley, the hot springs.",
    food: "Simple northern Thai at the guesthouses.",
    travel: [
      { how: "Bus or car from Chiang Mai", time: "~1.5 h", note: "", pick: true }
    ],
    months: "—"
  },
  {
    id: "cnx2", status: "now", tags: ["city", "food", "history", "shopping"], leg: "Thailand — North", name: "Chiang Mai, again", coords: [18.7883, 98.9853], nights: 0, mode: "ground",
    why: "Back in Chiang Mai before the flight to Laos.",
    do: "Whatever got missed the first time: a cooking class, Doi Suthep, the Nimman cafés and boutiques.",
    food: "One more khao soi before Laos.",
    travel: [
      { how: "Bus or car from Chiang Dao", time: "~1.5 h", note: "", pick: true }
    ],
    months: "—"
  },

  /* ---------- Next ---------- */
  {
    id: "lpq", tags: ["history", "swim", "food", "shopping"], leg: "Laos", name: "Luang Prabang", coords: [19.8867, 102.135], nights: 4, score: 7, mode: "air",
    why: "The most beautiful historical town on the whole route. Touristy but still completely itself.",
    do: "Swim at Kuang Si Falls, the monks' dawn alms round, Mount Phousi at sunset, the night market for textiles and clothes. Utopia bar for a social evening.",
    food: "Laap, Mekong river fish, Luang Prabang sausage, and very good baguettes.",
    stay: [
      { area: "The old-town peninsula", note: "Between the Mekong and the Nam Khan. Stay on the quieter Nam Khan side for river views and morning calm.", pick: true }
    ],
    travel: [
      { how: "Flight from Chiang Mai", time: "~1 h", note: "Lao Airlines flies direct. Get the Lao visa on arrival or the e-visa first (see the Visas page). The airport is 15 minutes from the old town.", pick: true }
    ],
    months: "Nov–Feb is the dry cool season and the best time to be here."
  },
  {
    id: "han", tags: ["city", "food", "history", "shopping", "party", "tea"], leg: "Vietnam", name: "Hanoi", coords: [21.0278, 105.8342], nights: 3, score: 5, role: "base", mode: "air",
    why: "The northern capital and street-food headquarters. Easy for meeting people solo.",
    do: "Walk the Old Quarter with no plan, the Temple of Literature, Hoan Kiem lake at dawn, beer on Ta Hien street. Tailors and local streetwear. Lotus tea.",
    food: "Bun cha, pho bo, banh cuon, egg coffee. Eat from plastic stools on the pavement.",
    stay: [
      { area: "Old Quarter, near Hoan Kiem lake", note: "The street-food heart of the city and the social hostels. Noisy, and the point.", pick: true },
      { area: "Tay Ho (West Lake)", note: "By the water, calmer, with cafés and good restaurants. Hanoi's Østerbro." },
      { area: "French Quarter", note: "Grand, leafy and nicer, a short walk south of the lake." }
    ],
    travel: [
      { how: "Flight from Luang Prabang", time: "~1 h", note: "Lao Airlines or Vietnam Airlines.", pick: true }
    ],
    months: "Nov–Dec is cool and dry. Air quality gets bad in winter, so check IQAir."
  },
  {
    id: "ninhbinh", tags: ["hiking", "history"], leg: "Vietnam", name: "Ninh Binh", coords: [20.2506, 105.9744], nights: 2, score: 6, maybe: true, spurFrom: "han", cost: 2, mode: "ground",
    why: "Limestone towers rising out of rice paddies, seen from a rowboat. The one northern side trip still worth a thought, because it's close to Hanoi.",
    do: "Row through the caves at Trang An or Tam Coc, cycle between the paddies and temples, climb the steps of Hang Mua for the view.",
    food: "Goat meat (the local speciality) and com chay, crispy rice.",
    stay: [
      { area: "Tam Coc village", note: "Among the paddies and karsts, with the social hostels and bike rental.", pick: true }
    ],
    travel: [
      { how: "Bus or limousine van from Hanoi", time: "~2 h", note: "Several a day. Book on 12Go or through your hostel.", pick: true },
      { how: "Train from Hanoi", time: "~2.5 h", note: "Ninh Binh is on the main north–south line, so the night train to Hue can leave from here." }
    ],
    months: "Dec is fine. Book a social hostel, because your evenings depend on it."
  },
  {
    id: "hue", tags: ["history"], leg: "Vietnam", name: "Hue", coords: [16.4637, 107.5909], nights: 1, role: "transit", mode: "air",
    why: "One night, then south along the coast. The walled Imperial Citadel fills the afternoon.",
    do: "The Imperial Citadel, and a royal tomb if there's time.",
    food: "Bun bo Hue, the city's spicy beef noodle soup.",
    stay: [
      { area: "South bank near the walking street", note: "By the Perfume River, walking distance to food and bars.", pick: true }
    ],
    travel: [
      { how: "Flight Hanoi → Hue", time: "~1 h 15", note: "Vietnam Airlines, Vietjet or Bamboo. The fastest way south.", pick: true },
      { how: "Night train from Hanoi", time: "~13 h", note: "You sleep on the way and save a hotel night. Book a soft-sleeper berth on 12Go." }
    ],
    months: "Hue is the wettest city in Vietnam Oct–Dec. Bring a rain jacket, and another reason to keep this to one night."
  },
  {
    id: "danang", tags: ["scooter"], leg: "Vietnam", name: "Da Nang", coords: [16.0544, 108.2022], nights: 0, role: "transit", mode: "ground",
    why: "Where the coastal train arrives, 45 minutes from Hoi An. The ride along the coast is the attraction.",
    do: "Walk off the platform and into a car to Hoi An.",
    food: "A banh mi at the station.",
    travel: [
      { how: "Train Hue → Da Nang", time: "~2.5 h", note: "Hugs the coast over the Hai Van Pass. Sit on the left heading south for the sea view.", pick: true },
      { how: "Hai Van Pass ride, pillion", time: "1 day", note: "Hue to Hoi An on the back of a guide's bike: Lap An lagoon, the pass summit, the Marble Mountains. Luggage goes by car. Book through your Hue hostel or a known operator." }
    ],
    months: "Any day without heavy rain."
  },
  {
    id: "hoian", tags: ["shopping", "food", "history", "swim"], leg: "Vietnam", name: "Hoi An", coords: [15.8801, 108.338], nights: 4, score: 6, mode: "ground",
    why: "Your best clothes stop in all of Southeast Asia, plus some of the best food in Vietnam and a beautiful old town.",
    do: "Get clothes made to measure (24–48 h, so order on day one and leave time for a fitting). The lantern-lit old town after dark, a cooking class, cycling through paddies to An Bang beach. My Son temple ruins as a half-day trip.",
    food: "Cao lau, white rose dumplings, com ga, banh mi from Phuong or Madam Khanh.",
    stay: [
      { area: "An Hoi islet or the old-town edge", note: "Across the river from the lanterns, walkable but quieter.", pick: true },
      { area: "Cam Thanh or the An Bang road", note: "Rice-paddy homestays between town and the beach, by bike." },
      { area: "An Bang beach", note: "By the water, with beach bars, 15 minutes by bike." }
    ],
    travel: [
      { how: "Car from Da Nang station", time: "~45 min", note: "Grab, or arranged by your hotel.", pick: true },
      { how: "End of the Hai Van ride", time: "—", note: "If you rode instead of taking the train, it drops you here." }
    ],
    months: "Dec–Jan is cooler with some rain, but workable. Cham Islands snorkelling is mostly off until March."
  },
  {
    id: "dalat", tags: ["scooter", "hiking", "tea"], leg: "Vietnam", name: "Da Lat", coords: [11.9404, 108.4583], nights: 3, score: 5, mode: "air",
    why: "Cool pine highlands, canyoning, and the start of the Easy Rider ride to the coast. The social scene is thin, so lean on group activities.",
    do: "Canyoning (abseiling down waterfalls, a group activity). An easy-rider day into the highlands. Bao Loc tea farms on the way to HCMC.",
    food: "Highland produce, artichoke tea, Da Lat pizza (banh trang nuong) at the night market.",
    stay: [
      { area: "Around Xuan Huong lake", note: "Central and walkable to the night market.", pick: true }
    ],
    travel: [
      { how: "Flight Da Nang → Da Lat", time: "~1 h 10", note: "Vietjet or Vietnam Airlines. 45 min to Da Nang airport from Hoi An.", pick: true },
      { how: "Sleeper bus from Hoi An", time: "~14 h", note: "Cheap and grim." }
    ],
    skip: "Fly Da Nang → Ho Chi Minh City directly (~1 h 20).",
    months: "Dec–Mar is the dry season here. Cold at night."
  },
  {
    id: "muine", tags: ["scooter", "swim"], leg: "Vietnam", name: "Mui Ne (Easy Rider)", coords: [10.9333, 108.2833], nights: 2, score: 6, mode: "ground",
    why: "The end of a two-day Easy Rider ride: pillion behind a local guide through the Central Highlands down to the coast. The two nights cover one on the road and one here.",
    do: "The ride itself: coffee farms, waterfalls, hill villages. Then the red and white sand dunes at sunrise and the fishing village.",
    food: "Seafood straight off the boats. This is where fish sauce is made.",
    stay: [
      { area: "Ham Tien, the beach strip", note: "Guesthouses on the sand, a short ride from the dunes.", pick: true }
    ],
    travel: [
      { how: "Easy Rider tour from Da Lat", time: "2 days", note: "Pillion behind a licensed guide, overnight on the way. Luggage goes by car. Book with a known operator and ask about the bikes.", pick: true },
      { how: "Bus from Da Lat", time: "~4 h", note: "If the weather or your back says no." }
    ],
    months: "December is dry and reliable here."
  },
  {
    id: "sgn", tags: ["city", "food", "party", "shopping", "history"], leg: "Vietnam", name: "Ho Chi Minh City", coords: [10.8231, 106.6297], nights: 1, score: 5, mode: "ground",
    why: "One night for the War Remnants Museum and a street-food evening, then a short flight to Cambodia. Loud and polluted, so keep it short.",
    do: "The War Remnants Museum (heavy and essential), the Cu Chi tunnels, a street-food tour by scooter (pillion), rooftop bars, Bui Vien for the party. Local fashion labels in Districts 1 and 3.",
    food: "Com tam (broken rice), banh xeo, oc (snail) restaurants, the best iced coffee in the country.",
    stay: [
      { area: "District 3", note: "Leafy and local: old villas, cafés, great street food, cool bars. The Malasaña pick.", pick: true },
      { area: "District 1, around Ben Thanh", note: "Walkable to everything. Sleep a few streets from Bui Vien, not on it." },
      { area: "Thao Dien (District 2)", note: "By the river, calmer, with cafés and expat restaurants. Pricier." }
    ],
    travel: [
      { how: "Bus or limousine van from Mui Ne", time: "~4–5 h", note: "Many a day. Book on 12Go.", pick: true },
      { how: "Train from Phan Thiet", time: "~4 h", note: "Calmer. Phan Thiet station is 30 min from Mui Ne." }
    ],
    months: "Dec–Apr is the southern dry season. Perfect timing."
  },
  {
    id: "pnh", tags: ["city", "history", "shopping", "party"], leg: "Cambodia", name: "Phnom Penh", coords: [11.5564, 104.9282], nights: 2, score: 4, mode: "ground",
    why: "Two nights: one heavy day of history, one lighter day of city. You can't understand Cambodia without it.",
    do: "Tuol Sleng (S-21) and the Killing Fields on one day. The Royal Palace, National Museum and Russian Market on the other. Riverside bars in the evening.",
    food: "Khmer food and a good bar scene along the river.",
    stay: [
      { area: "Tuol Tom Poung (Russian Market)", note: "Cafés, bars and good food around the market. The Malasaña pick.", pick: true },
      { area: "BKK1", note: "Leafy and nicer, with good restaurants." },
      { area: "Riverside", note: "On the water, with bars. A bit seedy at night." }
    ],
    travel: [
      { how: "Flight from Ho Chi Minh City", time: "~1 h", note: "Lands at the new Techo airport, about an hour south of the city.", pick: true },
      { how: "Bus from Ho Chi Minh City", time: "~6–7 h", note: "Giant Ibis or Kumho, border included. Close to the flight once you add airport time." }
    ],
    months: "Nov–Feb."
  },
  {
    id: "kampot", tags: ["scooter", "food", "swim"], leg: "Cambodia", name: "Kampot & Kep", coords: [10.55, 104.25], nights: 3, score: 5, maybe: true, spurFrom: "pnh", cost: 3, mode: "ground",
    why: "Your calm, food-focused Cambodia stop, with a great ride up Bokor mountain.",
    do: "Bokor mountain by tuk-tuk, tour or driver (no self-riding), a pepper-farm visit, kayaking the river at sunset, the Kep crab market.",
    food: "Kampot pepper crab at the Kep market, on a plastic chair.",
    stay: [
      { area: "Kampot riverside", note: "Guesthouses on the river with sunset decks and kayaks. The by-the-water pick.", pick: true },
      { area: "Kep, near the crab market", note: "Quieter and greener, for the seafood." }
    ],
    travel: [
      { how: "Taxi or minibus from Phnom Penh", time: "~3–4 h", note: "Go straight from the airport, then do Phnom Penh on the way back north.", pick: true }
    ],
    months: "Nov–Feb is dry and cool."
  },
  {
    id: "rep", tags: ["history", "party"], leg: "Cambodia", name: "Siem Reap & Angkor", coords: [13.3671, 103.8448], nights: 4, score: 7, mode: "ground",
    why: "Some of the greatest historical sites in Asia, and the clearest case on your trip of crowds being worth it.",
    do: "Sunrise at Angkor Wat, then Bayon and Ta Prohm early. 2–3 days of temples by bike or tuk-tuk. A day for Beng Mealea and Koh Ker, the jungle temples, where you'll be nearly alone. Pub Street at night.",
    food: "Fish amok, lok lak, and a good modern Khmer restaurant scene.",
    stay: [
      { area: "Wat Bo area, east of the river", note: "Quieter streets, cool cafés, a short walk to Pub Street.", pick: true }
    ],
    travel: [
      { how: "Bus from Phnom Penh", time: "~6 h", note: "Giant Ibis is comfortable and reliable.", pick: true },
      { how: "Flight", time: "~45 min", note: "To the new Siem Reap Angkor airport (SAI), about 50 min outside town." }
    ],
    months: "Nov–Feb is the best window: dry, cooler, and the moats hold water for reflections."
  }
];

const endingA = [
  {
    id: "sin", tags: ["city", "food"], leg: "Singapore & Malaysia", name: "Singapore", coords: [1.3521, 103.8198], nights: 2, score: 4, mode: "ground",
    why: "Hawker food, Gardens by the Bay and a clean, easy city. The best flight connections in the region.",
    do: "Hawker centres (Maxwell, Lau Pa Sat, Old Airport Road), Gardens by the Bay at night, Kampong Glam and Little India.",
    food: "Hainanese chicken rice, chilli crab, laksa, kaya toast.",
    stay: [
      { area: "Kampong Glam", note: "Haji Lane's boutiques and bars, Arab Street food. The Malasaña pick.", pick: true },
      { area: "Tiong Bahru", note: "Art-deco flats, cafés, a great hawker market. Calm, Østerbro-like." },
      { area: "Chinatown & Keong Saik", note: "Cocktail bars and Maxwell hawker centre." }
    ],
    travel: [
      { how: "Direct flight from Siem Reap", time: "~2 h", note: "Siem Reap's new airport is about 50 min out of town. Fill in the SG Arrival Card first.", pick: true }
    ],
    skip: "Fly Kuala Lumpur → Manila directly (~4 h).",
    months: "Any month. Same weather every day of the year."
  },
  {
    id: "kuching", tags: ["food", "history", "city"], leg: "Maybe — Borneo", name: "Kuching", coords: [1.5535, 110.3593], nights: 3, score: 5, maybe: true, spurFrom: "sin", cost: 3, mode: "air",
    why: "Borneo: a charming small city with real Dayak culture and great food, and the gateway to Bako. Weather dependent: Dec–Feb is its wettest stretch.",
    do: "The waterfront and old town, Sarawak Cultural Village, a longhouse visit, the museums.",
    food: "Sarawak laksa, kolo mee, midin fern.",
    stay: [
      { area: "The waterfront and old town", note: "Walkable, with the food courts and the river.", pick: true }
    ],
    travel: [
      { how: "Direct flight from Singapore", time: "~1.5 h", note: "Then fly Kuching → Kuala Lumpur to rejoin the line. Sarawak runs its own immigration check, even arriving from Malaysia.", pick: true }
    ],
    months: "Mar–Sep is best. Dec–Feb is the wettest stretch, so go only on a decent forecast."
  },
  {
    id: "bako", tags: ["hiking", "swim"], leg: "Maybe — Borneo", name: "Bako National Park", coords: [1.7167, 110.4667], nights: 2, score: 5, maybe: true, spurFrom: "kuching", cost: 2, mode: "water",
    why: "Easy coastal hiking with proboscis monkeys an hour from Kuching. The reason to go to Sarawak at all, alongside the food.",
    do: "The coastal trails, the sea stack at Telok Pandan Kecil, proboscis monkeys and bearded pigs at dusk.",
    food: "The park canteen. Bring snacks.",
    stay: [
      { area: "The park lodge", note: "Book ahead with Sarawak Forestry. Dusk and dawn are when the animals come out.", pick: true }
    ],
    travel: [
      { how: "Bus, then an open boat from Kuching", time: "~1.5 h", note: "Rough seas cancel the boat, which is what Dec–Feb brings. Check the sea forecast the day before.", pick: true }
    ],
    months: "Mar–Sep. In January or February, check the sea forecast the day before."
  },
  {
    id: "kul", tags: ["city", "food", "party", "shopping"], leg: "Singapore & Malaysia", name: "Kuala Lumpur", coords: [3.139, 101.6869], nights: 1, score: 4, role: "transit", mode: "ground",
    why: "One night to break the trip from Singapore up to the highlands.",
    do: "Jalan Alor food street, the Petronas Towers lit up, Batu Caves if you have a morning.",
    food: "Nasi lemak, banana leaf curry, satay, great Indian food.",
    stay: [
      { area: "Chinatown (Petaling Street)", note: "Old shophouses, Kwai Chai Hong, hidden bars and street food. The Malasaña pick.", pick: true },
      { area: "Bukit Bintang", note: "Next to Jalan Alor's food street, but mall-heavy." },
      { area: "Bangsar", note: "A local favourite: cafés, restaurants, a nice neighbourhood. Further out." }
    ],
    travel: [
      { how: "Bus or train from Singapore", time: "~5–6 h", note: "Comfortable coaches, many a day. Fill in the MDAC first.", pick: true },
      { how: "Flight from Kuching", time: "~2 h", note: "If you did Borneo." }
    ],
    months: "Humid and showery year-round."
  },
  {
    id: "cameron", tags: ["tea", "hiking"], leg: "Singapore & Malaysia", name: "Cameron Highlands", coords: [4.47, 101.38], nights: 3, score: 5, mode: "ground",
    why: "Your best tea stop: walk through the tea plantations in cool air, with jungle trails between.",
    do: "The BOH tea plantations (Sungai Palas), the Mossy Forest boardwalk, one of the numbered jungle trails.",
    food: "Tea and scones, oddly, and steamboat in the evening cold.",
    stay: [
      { area: "Tanah Rata", note: "The main village, with buses, food and trailheads.", pick: true }
    ],
    travel: [
      { how: "Bus from Kuala Lumpur", time: "~4 h", note: "Winding road up. Book on Easybook or 12Go.", pick: true }
    ],
    months: "Dec–Feb. Bring a fleece, it drops to 10°C at night."
  },
  {
    id: "penang", tags: ["food", "history", "city", "hiking"], leg: "Singapore & Malaysia", name: "George Town, Penang", coords: [5.4141, 100.3288], nights: 6, score: 7, mode: "water",
    why: "Street food on a par with anywhere in Southeast Asia, plus a beautiful historical old town. Finish Malaysia here, on the best food.",
    do: "Eat, then eat again. Street art and Chinese clan houses in the old town, a Peranakan mansion, Kek Lok Si temple, the hike up Penang Hill.",
    food: "Char kway teow, assam laksa, nasi kandar, cendol. Hawker centres: Gurney Drive, Chulia Street, New Lane.",
    stay: [
      { area: "Love Lane & Muntri Street", note: "Inside the UNESCO old town: heritage shophouses, cafés, bars, hawker food all round. The Vesterbro pick.", pick: true },
      { area: "Around Armenian Street", note: "Quieter, prettier heritage streets, a few minutes away." }
    ],
    travel: [
      { how: "Bus from Cameron Highlands", time: "~5 h", note: "Down the winding road to the coast.", pick: true }
    ],
    months: "Dec–Feb is the drier window on the west coast."
  },
  {
    id: "bkkmid", tags: ["food", "city"], leg: "Thailand — Andaman", name: "Bangkok (passing through)", coords: [13.7563, 100.5018], nights: 1, role: "transit", mode: "air",
    why: "One night back in Bangkok on the way south to the islands.",
    do: "A Chinatown food crawl, if there's energy for it.",
    food: "Whatever got missed the first time.",
    travel: [
      { how: "Direct flight from Penang", time: "~1.5 h", note: "AirAsia, several a day.", pick: true }
    ],
    months: "Nov–Feb, cool and dry."
  },
  {
    id: "khaosok", tags: ["hiking", "swim"], leg: "Thailand — Andaman", name: "Khao Sok", coords: [8.9167, 98.5333], nights: 3, score: 6, mode: "ground",
    why: "Rainforest older than the Amazon around an emerald lake. Your best hiking and swimming combination in southern Thailand.",
    do: "A night in a floating bungalow on Cheow Lan lake, kayaking between limestone towers, a jungle trek, swimming off the raft, a dawn wildlife boat.",
    food: "Home-style Thai cooked at the raft houses.",
    stay: [
      { area: "By the park entrance + one night on the lake", note: "Jungle bungalows near the trails, then a floating raft house on Cheow Lan.", pick: true }
    ],
    travel: [
      { how: "Flight Bangkok → Surat Thani, then van", time: "~1 h 10 + 2 h", note: "The closest airport to Khao Sok.", pick: true },
      { how: "Flight Bangkok → Krabi, then van", time: "~1 h 20 + 2.5 h", note: "More flights, a longer van ride." }
    ],
    months: "Nov–Feb. The lake is full after the rains and the trails are passable."
  },
  {
    id: "lanta", tags: ["diving", "swim", "party"], leg: "Thailand — Andaman", name: "Ko Lanta", coords: [7.6167, 99.05], nights: 6, role: "base", mode: "ground",
    why: "Your island base, and where you get your Open Water dive certificate. Calm, long beaches, sunset bars.",
    do: "The Open Water course (3–4 days, dive sites Ko Haa and Hin Daeng). The old town on the east coast, the quiet south end, sunset beach bars.",
    food: "Southern coconut curries, roti, fresh seafood grilled on the sand.",
    stay: [
      { area: "Long Beach (Phra Ae)", note: "Sunset bars, social, close to the dive shops at Saladan.", pick: true },
      { area: "Kantiang Bay", note: "In the south: beautiful, quiet, great for the downtime days." }
    ],
    travel: [
      { how: "Van + car ferry from Khao Sok", time: "~4–5 h", note: "Through tickets on 12Go.", pick: true }
    ],
    months: "Nov–Apr is the dry Andaman season. January is peak and perfect. Don't fly within 24 h of your last dive."
  },
  {
    id: "kojum", tags: ["swim"], leg: "Thailand — Andaman", name: "Ko Jum", coords: [7.8167, 99.0333], nights: 0, score: 4, maybe: true, spurFrom: "lanta", cost: 0, mode: "water",
    why: "A barely developed hammock island a short boat ride from Lanta. A day trip, so it costs no nights.",
    do: "Nothing, on purpose. Beach walks and near-zero crowds.",
    food: "Simple beach-shack seafood.",
    travel: [
      { how: "Boat from Ko Lanta", time: "~1 h", note: "There and back the same day.", pick: true }
    ],
    months: "Nov–Apr."
  },
  {
    id: "kradan", tags: ["swim"], leg: "Thailand — Andaman", name: "Ko Kradan", coords: [7.3167, 99.25], nights: 2, score: 5, mode: "water",
    why: "The clearest water around, with snorkelling straight off the beach. On the way, the Emerald Cave at Ko Muk: a swim through a pitch-dark sea tunnel into a hidden beach.",
    do: "Snorkel the reef off the east beach, walk to sunset beach, do nothing. Swim the Emerald Cave at low tide, early or late to beat the tour boats. Snorkel off Charlie Beach.",
    food: "A handful of beach restaurants. That's the entire island.",
    travel: [
      { how: "Speedboat from Ko Lanta via Ko Muk", time: "~1.5 h", note: "The island-hopping speedboats (Satun Pakbara, Tigerline) stop at Ngai, Muk and Kradan.", pick: true },
      { how: "Four-island day tour from Lanta", time: "1 day", note: "Sees Muk and Kradan without sleeping there." }
    ],
    months: "Nov–Apr. The boats stop running outside that."
  },
  {
    id: "lipe", tags: ["swim", "party"], leg: "Thailand — Andaman", name: "Ko Lipe", coords: [6.4889, 99.3025], nights: 3, score: 5, maybe: true, spurFrom: "kradan", cost: 3, mode: "water",
    why: "The clearest water in Thailand. In this option it isn't needed as a ferry link, so it's a third island that repeats Kradan.",
    do: "Snorkel the islands of Tarutao marine park by longtail. Sleep on Sunrise or Sunset Beach, away from the busy main beach.",
    food: "Walking Street seafood barbecue. Pick your fish and watch it grilled.",
    stay: [
      { area: "Near Walking Street", note: "Between Sunrise and Pattaya beaches: bars, food and the ferry.", pick: true }
    ],
    travel: [
      { how: "Speedboat from Ko Kradan", time: "~2–3 h", note: "Same island-hopping speedboat line.", pick: true }
    ],
    months: "Nov–Apr only. The island effectively shuts in low season."
  },
  {
    id: "kbv", tags: [], leg: "Thailand — Andaman", name: "Krabi or Trang (airport)", coords: [7.5087, 99.6166], nights: 0, role: "transit", mode: "air",
    why: "The airport for the flight to the Philippines. Trang is closest to Kradan; Krabi has more flights.",
    do: "Straight onto a van.",
    food: "—",
    travel: [
      { how: "Boat and van from Ko Kradan to Trang airport", time: "~2 h", note: "Your guesthouse sells through tickets.", pick: true },
      { how: "Boat and van to Krabi airport", time: "~4 h", note: "More international connections." }
    ],
    months: "—"
  },
  {
    id: "mnl1", tags: ["history"], leg: "Philippines", name: "Manila", coords: [14.5995, 120.9842], nights: 1, role: "transit", mode: "air",
    why: "One transit night on the way to Palawan.",
    do: "Intramuros, the old Spanish walled city, if you have an afternoon. Otherwise sleep near the airport.",
    food: "A proper Filipino meal: sisig, adobo, kare-kare.",
    stay: [
      { area: "Poblacion, Makati", note: "Manila's bar and food district. The Malasaña pick, if you have a night.", pick: true },
      { area: "Near the airport", note: "If you land late and fly early." }
    ],
    travel: [
      { how: "Flight via Bangkok or Kuala Lumpur", time: "~5–7 h incl. change", note: "Into Manila (NAIA). Fill in eTravel first, and carry your Manila → Bangkok ticket as proof of leaving.", pick: true },
      { how: "Straight to Palawan", time: "—", note: "Direct international flights to Puerto Princesa come and go. Check Skyscanner. If one exists, you skip this night." }
    ],
    months: "Jan–Apr is the dry season and outside the typhoon window."
  },
  {
    id: "portbarton", tags: ["swim"], leg: "Philippines", name: "Port Barton", coords: [10.45, 119.2333], nights: 4, score: 5, mode: "air",
    why: "The quiet Palawan stop. Where El Nido is commercialising, this is a sleepy bay with barely any development. A good place to slow down before the boat.",
    do: "Very little, deliberately. Island-hop to near-empty sandbars, snorkel with turtles, walk to the waterfalls.",
    food: "Simple beach-shack seafood, grilled that morning.",
    stay: [
      { area: "On the main beach", note: "Everything is walkable. The power can be patchy, so pack a power bank.", pick: true }
    ],
    travel: [
      { how: "Flight Manila → Puerto Princesa, then van", time: "~1 h 20 + 3.5 h", note: "Cebu Pacific or PAL, then a shared van north.", pick: true }
    ],
    months: "Jan–Apr. February is the sweet spot: dry, calm seas, before the Easter crowds."
  },
  {
    id: "elnido", tags: ["swim", "party"], leg: "Philippines", name: "El Nido", coords: [11.18, 119.416], nights: 2, score: 5, mode: "ground",
    why: "Stunning lagoons, plus your social and party base in Palawan. The town is getting busy, so spend the days on the water.",
    do: "One or two island-hopping tours (Tour A for the Big and Small Lagoons), kayak into the lagoons at opening time, Nacpan Beach, beach bars and parties.",
    food: "Good traveller restaurants and fresh grilled seafood.",
    stay: [
      { area: "Corong Corong", note: "Sunset beach 10 minutes from town: quieter, nicer, still close to the bars.", pick: true },
      { area: "El Nido town", note: "For the parties and walking home." },
      { area: "Lio", note: "A beautiful planned beach by the airport. Calmer, pricier." }
    ],
    travel: [
      { how: "Van from Port Barton", time: "~3 h", note: "Shared vans up the coast, several a day.", pick: true }
    ],
    months: "Jan–Apr. Go into the lagoons at first light."
  },
  {
    id: "tao", tags: ["swim"], leg: "Philippines", name: "Tao expedition", coords: [11.4833, 119.85], nights: 4, score: 7, mode: "water",
    why: "The best social experience and the best snorkelling of the whole trip. Five days on a small boat, camping on islands no day tour reaches.",
    do: "Snorkel empty reefs, sleep in beach huts, eat what the crew cooks, get to know about twenty strangers properly.",
    food: "Cooked on board from what they buy and catch. Consistently excellent.",
    travel: [
      { how: "Boat from El Nido to Coron", time: "5 days", note: "Book now, February sells out.", pick: true },
      { how: "Reverse direction, Coron to El Nido", time: "5 days", note: "Same trip. Pick whichever matches cheaper flights in and out." }
    ],
    months: "Jan–Apr for calm seas."
  },
  {
    id: "coron", tags: ["diving", "swim"], leg: "Philippines", name: "Coron", coords: [11.9983, 120.2042], nights: 3, score: 6, mode: "water",
    why: "Shallow WWII Japanese shipwrecks, the best place on your route to use your new dive certificate.",
    do: "Dive or snorkel the Lusong gunboat and Skeleton wreck, Kayangan Lake and Barracuda Lake at dawn before the boats. Skip the standard hopping tour.",
    food: "Decent seafood, calamansi juice.",
    stay: [
      { area: "Coron town, near the bay", note: "Close to the dive shops and the dawn boats.", pick: true }
    ],
    travel: [
      { how: "The Tao expedition ends here", time: "—", note: "", pick: true }
    ],
    months: "Jan–Apr. Dawn is the whole strategy in Coron. Don't fly within 24 h of your last dive."
  },
  {
    id: "mnl2", tags: [], leg: "Philippines", name: "Manila (connection)", coords: [14.52, 121.019], nights: 0, role: "transit", mode: "air",
    why: "Change planes for Bangkok.",
    do: "Nothing.",
    food: "—",
    travel: [
      { how: "Flight Coron (Busuanga) → Manila", time: "~1 h", note: "Cebu Pacific, PAL or AirSWIFT. Domestic flights get delayed often, so don't connect tightly.", pick: true }
    ],
    months: "—"
  },
  {
    id: "bkk2", tags: ["city", "food", "shopping"], leg: "Home", name: "Bangkok, last nights", coords: [13.69, 100.75], nights: 5, role: "transit", mode: "air",
    why: "A buffer before the flight home, in case a Philippine flight slips. And a last Bangkok food crawl, or Ayutthaya as a day trip.",
    do: "Whatever you missed the first time. Last-minute clothes shopping.",
    food: "Everything you'll miss.",
    stay: [
      { area: "Ari", note: "Easy last nights: cafés, food, boutiques for last-minute shopping.", pick: true },
      { area: "Talat Noi", note: "If you want the river and Chinatown one last time." }
    ],
    travel: [
      { how: "Flight Manila → Bangkok", time: "~3.5 h", note: "Direct with PAL, Thai, Cebu Pacific or AirAsia. Then home to Copenhagen on SAS.", pick: true }
    ],
    months: "—"
  }
];

const endingB = [
  {
    id: "bkkmid", tags: ["food", "city"], leg: "Thailand — Andaman", name: "Bangkok (passing through)", coords: [13.7563, 100.5018], nights: 1, role: "transit", mode: "air",
    why: "One night back in Bangkok on the way south to the islands.",
    do: "A Chinatown food crawl, if there's energy for it.",
    food: "Whatever got missed the first time.",
    travel: [
      { how: "Flight from Siem Reap", time: "~1 h", note: "Several a day. Siem Reap's new airport is about 50 min out of town.", pick: true }
    ],
    months: "Nov–Feb, cool and dry."
  },
  {
    id: "khaosok", tags: ["hiking", "swim"], leg: "Thailand — Andaman", name: "Khao Sok", coords: [8.9167, 98.5333], nights: 3, score: 6, mode: "ground",
    why: "Rainforest older than the Amazon around an emerald lake. Your best hiking and swimming combination in southern Thailand.",
    do: "A night in a floating bungalow on Cheow Lan lake, kayaking between limestone towers, a jungle trek, swimming off the raft, a dawn wildlife boat.",
    food: "Home-style Thai cooked at the raft houses.",
    stay: [
      { area: "By the park entrance + one night on the lake", note: "Jungle bungalows near the trails, then a floating raft house on Cheow Lan.", pick: true }
    ],
    travel: [
      { how: "Flight Bangkok → Surat Thani, then van", time: "~1 h 10 + 2 h", note: "The closest airport to Khao Sok.", pick: true },
      { how: "Flight Bangkok → Krabi, then van", time: "~1 h 20 + 2.5 h", note: "More flights, a longer van ride." }
    ],
    months: "Nov–Feb. The lake is full after the rains and the trails are passable."
  },
  {
    id: "lanta", tags: ["diving", "swim", "party"], leg: "Thailand — Andaman", name: "Ko Lanta", coords: [7.6167, 99.05], nights: 6, role: "base", mode: "ground",
    why: "Your island base, and where you get your Open Water dive certificate. Calm, long beaches, sunset bars.",
    do: "The Open Water course (3–4 days, dive sites Ko Haa and Hin Daeng). The old town on the east coast, the quiet south end, sunset beach bars.",
    food: "Southern coconut curries, roti, fresh seafood grilled on the sand.",
    stay: [
      { area: "Long Beach (Phra Ae)", note: "Sunset bars, social, close to the dive shops at Saladan.", pick: true },
      { area: "Kantiang Bay", note: "In the south: beautiful, quiet, great for the downtime days." }
    ],
    travel: [
      { how: "Van + car ferry from Khao Sok", time: "~4–5 h", note: "Through tickets on 12Go.", pick: true }
    ],
    months: "Nov–Apr is the dry Andaman season. January is peak and perfect. Don't fly within 24 h of your last dive."
  },
  {
    id: "kojum", tags: ["swim"], leg: "Thailand — Andaman", name: "Ko Jum", coords: [7.8167, 99.0333], nights: 0, score: 4, maybe: true, spurFrom: "lanta", cost: 0, mode: "water",
    why: "A barely developed hammock island a short boat ride from Lanta. A day trip, so it costs no nights.",
    do: "Nothing, on purpose. Beach walks and near-zero crowds.",
    food: "Simple beach-shack seafood.",
    travel: [
      { how: "Boat from Ko Lanta", time: "~1 h", note: "There and back the same day.", pick: true }
    ],
    months: "Nov–Apr."
  },
  {
    id: "kradan", tags: ["swim"], leg: "Thailand — Andaman", name: "Ko Kradan", coords: [7.3167, 99.25], nights: 2, score: 5, mode: "water",
    why: "The clearest water around, with snorkelling straight off the beach. On the way, the Emerald Cave at Ko Muk: a swim through a pitch-dark sea tunnel into a hidden beach.",
    do: "Snorkel the reef off the east beach, walk to sunset beach, do nothing. Swim the Emerald Cave at low tide, early or late to beat the tour boats. Snorkel off Charlie Beach.",
    food: "A handful of beach restaurants. That's the entire island.",
    travel: [
      { how: "Speedboat from Ko Lanta via Ko Muk", time: "~1.5 h", note: "The island-hopping speedboats (Satun Pakbara, Tigerline) stop at Ngai, Muk and Kradan.", pick: true },
      { how: "Four-island day tour from Lanta", time: "1 day", note: "Sees Muk and Kradan without sleeping there." }
    ],
    months: "Nov–Apr. The boats stop running outside that."
  },
  {
    id: "lipe", tags: ["swim", "party"], leg: "Thailand — Andaman", name: "Ko Lipe", coords: [6.4889, 99.3025], nights: 3, score: 5, mode: "water",
    why: "The best snorkelling in Thailand plus beach parties, and your ferry into Malaysia.",
    do: "Snorkel the islands of Tarutao marine park by longtail, Walking Street bars, beach parties, sunset at Sunset Beach.",
    food: "Walking Street seafood barbecue. Pick your fish and watch it grilled.",
    stay: [
      { area: "Near Walking Street", note: "Between Sunrise and Pattaya beaches: bars, food and the ferry.", pick: true }
    ],
    travel: [
      { how: "Speedboat from Ko Kradan", time: "~2–3 h", note: "Same island-hopping speedboat line.", pick: true }
    ],
    months: "Nov–Apr only. The island effectively shuts in low season."
  },
  {
    id: "langkawi", tags: ["swim"], leg: "Malaysia", name: "Langkawi", coords: [6.35, 99.8], nights: 1, role: "transit", mode: "water",
    why: "Your landing point in Malaysia. One night, then on to Penang.",
    do: "The cable car and sky bridge if you have the afternoon, mangrove kayaking, duty-free beer.",
    food: "Malay food at the night markets.",
    stay: [
      { area: "Pantai Cenang", note: "Beach bars and food, near the airport.", pick: true }
    ],
    travel: [
      { how: "International ferry from Ko Lipe", time: "~1.5 h", note: "Thai exit stamp on Lipe, Malaysian entry at Telaga or Kuah. Fill in the MDAC form online first. The ferry is seasonal, so confirm it runs.", pick: true }
    ],
    months: "Nov–Mar is dry on this coast."
  },
  {
    id: "penang", tags: ["food", "history", "city", "hiking"], leg: "Malaysia", name: "George Town, Penang", coords: [5.4141, 100.3288], nights: 4, score: 7, mode: "water",
    why: "Street food on a par with anywhere in Southeast Asia, plus a beautiful historical old town. Lunar New Year (~6 Feb) is spectacular here, if your dates line up.",
    do: "Eat, then eat again. Street art and Chinese clan houses in the old town, a Peranakan mansion, Kek Lok Si temple, the hike up Penang Hill.",
    food: "Char kway teow, assam laksa, nasi kandar, cendol. Hawker centres: Gurney Drive, Chulia Street, New Lane.",
    stay: [
      { area: "Love Lane & Muntri Street", note: "Inside the UNESCO old town: heritage shophouses, cafés, bars, hawker food all round. The Vesterbro pick.", pick: true },
      { area: "Around Armenian Street", note: "Quieter, prettier heritage streets, a few minutes away." }
    ],
    travel: [
      { how: "Ferry from Langkawi", time: "~3 h", note: "Langkawi Ferry Line. Can be rough.", pick: true },
      { how: "Flight", time: "~35 min", note: "AirAsia or Firefly." }
    ],
    months: "Dec–Feb is the drier window on the west coast."
  },
  {
    id: "cameron", tags: ["tea", "hiking"], leg: "Malaysia", name: "Cameron Highlands", coords: [4.47, 101.38], nights: 2, score: 5, mode: "ground",
    why: "Your best tea stop: walk through the tea plantations in cool air, with jungle trails between.",
    do: "The BOH tea plantations (Sungai Palas), the Mossy Forest boardwalk, one of the numbered jungle trails.",
    food: "Tea and scones, oddly, and steamboat in the evening cold.",
    stay: [
      { area: "Tanah Rata", note: "The main village, with buses, food and trailheads.", pick: true }
    ],
    travel: [
      { how: "Bus from Penang", time: "~4–5 h", note: "Winding road up. Book on Easybook or 12Go.", pick: true }
    ],
    months: "Dec–Feb. Bring a fleece, it drops to 10°C at night."
  },
  {
    id: "kul", tags: ["city", "food", "party", "shopping"], leg: "Malaysia", name: "Kuala Lumpur", coords: [3.139, 101.6869], nights: 1, score: 4, role: "transit", mode: "ground",
    why: "One night between the highlands and Singapore.",
    do: "Jalan Alor food street, the Petronas Towers lit up, Batu Caves if you have a morning.",
    food: "Nasi lemak, banana leaf curry, satay, great Indian food.",
    stay: [
      { area: "Chinatown (Petaling Street)", note: "Old shophouses, Kwai Chai Hong, hidden bars and street food. The Malasaña pick.", pick: true },
      { area: "Bukit Bintang", note: "Next to Jalan Alor's food street, but mall-heavy." },
      { area: "Bangsar", note: "A local favourite: cafés, restaurants, a nice neighbourhood. Further out." }
    ],
    travel: [
      { how: "Bus from Cameron Highlands", time: "~4 h", note: "", pick: true }
    ],
    months: "Humid and showery year-round."
  },
  {
    id: "kuching", tags: ["food", "history", "city"], leg: "Maybe — Borneo", name: "Kuching", coords: [1.5535, 110.3593], nights: 3, score: 5, maybe: true, spurFrom: "kul", cost: 3, mode: "air",
    why: "Borneo: a charming small city with real Dayak culture and great food, and the gateway to Bako. Weather dependent: Dec–Feb is its wettest stretch.",
    do: "The waterfront and old town, Sarawak Cultural Village, a longhouse visit, the museums.",
    food: "Sarawak laksa, kolo mee, midin fern.",
    stay: [
      { area: "The waterfront and old town", note: "Walkable, with the food courts and the river.", pick: true }
    ],
    travel: [
      { how: "Flight from Kuala Lumpur", time: "~2 h", note: "Then fly Kuching → Singapore direct. Only fits if something else drops: this stretch is full.", pick: true }
    ],
    months: "Mar–Sep is best. Dec–Feb is the wettest stretch, so go only on a decent forecast."
  },
  {
    id: "bako", tags: ["hiking", "swim"], leg: "Maybe — Borneo", name: "Bako National Park", coords: [1.7167, 110.4667], nights: 2, score: 5, maybe: true, spurFrom: "kuching", cost: 2, mode: "water",
    why: "Easy coastal hiking with proboscis monkeys an hour from Kuching. The reason to go to Sarawak at all, alongside the food.",
    do: "The coastal trails, the sea stack at Telok Pandan Kecil, proboscis monkeys and bearded pigs at dusk.",
    food: "The park canteen. Bring snacks.",
    stay: [
      { area: "The park lodge", note: "Book ahead with Sarawak Forestry. Dusk and dawn are when the animals come out.", pick: true }
    ],
    travel: [
      { how: "Bus, then an open boat from Kuching", time: "~1.5 h", note: "Rough seas cancel the boat, which is what Dec–Feb brings. Check the sea forecast the day before.", pick: true }
    ],
    months: "Mar–Sep. In January or February, check the sea forecast the day before."
  },
  {
    id: "sin", tags: ["city", "food"], leg: "Singapore", name: "Singapore", coords: [1.3521, 103.8198], nights: 2, score: 4, mode: "ground",
    why: "Hawker food, Gardens by the Bay, and the Lunar New Year decorations. A clean reset before the Philippines. Bars are very expensive.",
    do: "Hawker centres (Maxwell, Lau Pa Sat, Old Airport Road), Gardens by the Bay at night, Kampong Glam and Little India.",
    food: "Hainanese chicken rice, chilli crab, laksa, kaya toast.",
    stay: [
      { area: "Kampong Glam", note: "Haji Lane's boutiques and bars, Arab Street food. The Malasaña pick.", pick: true },
      { area: "Tiong Bahru", note: "Art-deco flats, cafés, a great hawker market. Calm, Østerbro-like." },
      { area: "Chinatown & Keong Saik", note: "Cocktail bars and Maxwell hawker centre." }
    ],
    travel: [
      { how: "Bus from KL", time: "~5–6 h", note: "Comfortable coaches, many a day. Fill in the SG Arrival Card first.", pick: true },
      { how: "Flight from KL", time: "~1 h", note: "Cheap, but the airport time makes it barely faster." }
    ],
    skip: "Fly Kuala Lumpur → Manila directly (~4 h).",
    months: "Any month. Same weather every day of the year."
  },
  {
    id: "mnl1", tags: ["history"], leg: "Philippines", name: "Manila", coords: [14.5995, 120.9842], nights: 1, role: "transit", mode: "air",
    why: "One transit night on the way to Palawan.",
    do: "Intramuros, the old Spanish walled city, if you have an afternoon. Otherwise sleep near the airport.",
    food: "A proper Filipino meal: sisig, adobo, kare-kare.",
    stay: [
      { area: "Poblacion, Makati", note: "Manila's bar and food district. The Malasaña pick, if you have a night.", pick: true },
      { area: "Near the airport", note: "If you land late and fly early." }
    ],
    travel: [
      { how: "Flight from Singapore", time: "~3.5 h", note: "Into Manila (NAIA). Fill in eTravel first, and carry your Manila → Bangkok ticket as proof of leaving.", pick: true },
      { how: "Straight to Palawan", time: "—", note: "Direct international flights to Puerto Princesa come and go. Check Skyscanner. If one exists, you skip this night." }
    ],
    months: "Jan–Apr is the dry season and outside the typhoon window."
  },
  {
    id: "elnido", tags: ["swim", "party"], leg: "Philippines", name: "El Nido", coords: [11.18, 119.416], nights: 1, score: 5, mode: "air",
    why: "Stunning lagoons, plus your social and party base in Palawan. The town is getting busy, so spend the days on the water.",
    do: "One or two island-hopping tours (Tour A for the Big and Small Lagoons), kayak into the lagoons at opening time, Nacpan Beach, beach bars and parties.",
    food: "Good traveller restaurants and fresh grilled seafood.",
    stay: [
      { area: "Corong Corong", note: "Sunset beach 10 minutes from town: quieter, nicer, still close to the bars.", pick: true },
      { area: "El Nido town", note: "For the parties and walking home." },
      { area: "Lio", note: "A beautiful planned beach by the airport. Calmer, pricier." }
    ],
    travel: [
      { how: "Flight Manila → El Nido", time: "~1 h 20", note: "AirSWIFT, direct to Lio airport. Pricier, but saves a whole day.", pick: true },
      { how: "Flight to Puerto Princesa + van", time: "~1 h 20 + 5–6 h", note: "Cebu Pacific or PAL. Much cheaper, long van ride." }
    ],
    months: "Jan–Apr. Go into the lagoons at first light."
  },
  {
    id: "portbarton", tags: ["swim"], leg: "Philippines", name: "Port Barton", coords: [10.45, 119.2333], nights: 4, score: 5, maybe: true, spurFrom: "elnido", cost: 4, mode: "ground",
    why: "The quiet Palawan stop: a sleepy bay with barely any development. Only fits in this option if something else drops.",
    do: "Very little, deliberately. Island-hop to near-empty sandbars, snorkel with turtles, walk to the waterfalls.",
    food: "Simple beach-shack seafood, grilled that morning.",
    travel: [
      { how: "Van from El Nido", time: "~3 h", note: "Or fly into Puerto Princesa and stop here on the way north.", pick: true }
    ],
    months: "Jan–Apr. February is the sweet spot."
  },
  {
    id: "tao", tags: ["swim"], leg: "Philippines", name: "Tao expedition", coords: [11.4833, 119.85], nights: 4, score: 7, mode: "water",
    why: "The best social experience and the best snorkelling of the whole trip. Five days on a small boat, camping on islands no day tour reaches.",
    do: "Snorkel empty reefs, sleep in beach huts, eat what the crew cooks, get to know about twenty strangers properly.",
    food: "Cooked on board from what they buy and catch. Consistently excellent.",
    travel: [
      { how: "Boat from El Nido to Coron", time: "5 days", note: "Book now, February sells out.", pick: true },
      { how: "Reverse direction, Coron to El Nido", time: "5 days", note: "Same trip. Pick whichever matches cheaper flights in and out." }
    ],
    months: "Jan–Apr for calm seas."
  },
  {
    id: "coron", tags: ["diving", "swim"], leg: "Philippines", name: "Coron", coords: [11.9983, 120.2042], nights: 2, score: 6, mode: "water",
    why: "Shallow WWII Japanese shipwrecks, the best place on your route to use your new dive certificate.",
    do: "Dive or snorkel the Lusong gunboat and Skeleton wreck, Kayangan Lake and Barracuda Lake at dawn before the boats. Skip the standard hopping tour.",
    food: "Decent seafood, calamansi juice.",
    stay: [
      { area: "Coron town, near the bay", note: "Close to the dive shops and the dawn boats.", pick: true }
    ],
    travel: [
      { how: "The Tao expedition ends here", time: "—", note: "", pick: true }
    ],
    months: "Jan–Apr. Dawn is the whole strategy in Coron. Don't fly within 24 h of your last dive."
  },
  {
    id: "mnl2", tags: [], leg: "Philippines", name: "Manila (connection)", coords: [14.52, 121.019], nights: 0, role: "transit", mode: "air",
    why: "Change planes for Bangkok.",
    do: "Nothing.",
    food: "—",
    travel: [
      { how: "Flight Coron (Busuanga) → Manila", time: "~1 h", note: "Cebu Pacific, PAL or AirSWIFT. Domestic flights get delayed often, so don't connect tightly.", pick: true }
    ],
    months: "—"
  },
  {
    id: "bkk2", tags: ["city", "food", "shopping"], leg: "Home", name: "Bangkok, last nights", coords: [13.69, 100.75], nights: 3, role: "transit", mode: "air",
    why: "A buffer before the flight home, in case a Philippine flight slips. And a last Bangkok food crawl, or Ayutthaya as a day trip.",
    do: "Whatever you missed the first time. Last-minute clothes shopping.",
    food: "Everything you'll miss.",
    stay: [
      { area: "Ari", note: "Easy last nights: cafés, food, boutiques for last-minute shopping.", pick: true },
      { area: "Talat Noi", note: "If you want the river and Chinatown one last time." }
    ],
    travel: [
      { how: "Flight Manila → Bangkok", time: "~3.5 h", note: "Direct with PAL, Thai, Cebu Pacific or AirAsia. Then home to Copenhagen on SAS.", pick: true }
    ],
    months: "—"
  }
];

// Which option to show: ?option=2 in the page address picks Option 2, anything else Option 1.
const ROUTE_OPTION = new URLSearchParams(location.search).get("option") === "2" ? 2 : 1;
const journey = sharedRoute.concat(ROUTE_OPTION === 2 ? endingB : endingA);

// The activity filters, in the order the buttons appear.
const ACTIVITIES = {
  diving: "Diving", swim: "Snorkel & swim", hiking: "Hiking", scooter: "Scooter rides",
  city: "City", food: "Food", history: "History", party: "Bars & parties",
  shopping: "Clothes", tea: "Tea"
};
