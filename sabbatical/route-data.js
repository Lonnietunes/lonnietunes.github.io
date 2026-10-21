/* Shared by the map (index.html) and the overview (overview.html). Edit the trip here. */

/* ============================================================================
   THE ROUTE DATA
   ----------------------------------------------------------------------------
   Every stop, in travel order. To change the trip, edit this list. The map,
   the sidebar and the night totals all rebuild themselves from it.

   Each stop has:
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

const journey = [

  /* ========================= THAILAND — NORTH ========================= */
  {
    id: "bkk1", tags: ["city", "food", "party", "shopping", "history"], leg: "Thailand — North", name: "Bangkok", coords: [13.7563, 100.5018], nights: 4, score: 6, mode: "air",
    why: "Where you land, and the best street food on the whole route. Food, nightlife, shopping and history in one city.",
    do: "Night food crawl through Chinatown (Yaowarat) and Bang Rak, the Grand Palace and Wat Pho, a longtail boat down the canals, a rooftop bar, a night out in Thonglor. Chatuchak weekend market and the small boutiques in Ari for clothes.",
    food: "Boat noodles, pad krapow, som tam, khao man gai, mango sticky rice.",
    stay: [
      { area: "Talat Noi & Charoen Krung", note: "Old riverside Chinatown: street art, galleries, cool little bars, and Yaowarat's street food a short walk away. Bangkok's Vesterbro, on the water.", pick: true },
      { area: "Ari", note: "Leafy and local, full of cafés, small boutiques and great cheap food, on the BTS line. The Malasaña pick." },
      { area: "Thonglor & Ekkamai", note: "For nightlife: the best bars and clubs, but pricier and more polished." }
    ],
    travel: [
      { how: "Direct flight from Copenhagen", time: "~11 h", note: "SAS. Lands at Suvarnabhumi (BKK). Take the Airport Rail Link into town.", pick: true }
    ],
    months: "Nov–Feb is the cool dry season, the best window of the year."
  },
  {
    id: "sukhothai", tags: ["history"], leg: "Thailand — North", name: "Sukhothai", coords: [17.0176, 99.7036], nights: 2, score: 5, mode: "ground",
    why: "The ruined capital of the first Thai kingdom. More beautiful and much calmer than Ayutthaya, and it sits on the way north, so it costs almost nothing.",
    do: "Rent a bike and cycle the historical park: lotus ponds, giant seated Buddhas, temple ruins. Stay for sunset at Wat Mahathat.",
    food: "Sukhothai noodles (sweet-sour pork noodle soup) at the market by the park.",
    stay: [
      { area: "Old Sukhothai, next to the park", note: "Quiet guesthouses a bike ride from the ruins. Skip the new town 12 km away.", pick: true }
    ],
    travel: [
      { how: "Bus from Bangkok", time: "~6–7 h", note: "From Mo Chit bus terminal. Book on 12Go.", pick: true },
      { how: "Train + local bus", time: "~7 h", note: "Train to Phitsanulok, then a 1 h bus. Comfier, more faff." },
      { how: "Flight", time: "~1 h 15", note: "Bangkok Airways to Sukhothai airport. Pricey, few flights a day." }
    ],
    months: "Nov–Feb. Sukhothai also holds its own Loy Krathong light show on the same night as Yi Peng, so you choose one or the other."
  },
  {
    id: "cnx", tags: ["city", "food", "history", "shopping", "hiking", "tea"], leg: "Thailand — North", name: "Chiang Mai", coords: [18.7883, 98.9853], nights: 6, score: 7, role: "base", mode: "ground",
    why: "Your northern base, and the Yi Peng lantern festival (around 24 Nov, confirm the date) makes it a beat. Without the festival it's a 6.",
    do: "Yi Peng and Loy Krathong lanterns. Old City temples, Doi Suthep, a cooking class, a day trek on Doi Inthanon. Sunday Walking Street and the Nimman boutiques for clothes. Northern tea houses.",
    food: "Khao soi (curry noodles) is the reason to be here. Also sai ua sausage, khan tok dinners, and the night-market stalls.",
    stay: [
      { area: "Old City, east side near Tha Phae Gate", note: "Walkable to the temples, the Sunday Walking Street and the Yi Peng action. Plenty of social hostels.", pick: true },
      { area: "Nimman", note: "Chiang Mai's cool quarter: cafés, cocktail bars, boutiques, a university crowd. The Malasaña pick." },
      { area: "Wat Ket, by the Ping River", note: "Calm riverside streets with old teak houses and good restaurants. The by-the-water pick." }
    ],
    travel: [
      { how: "Bus from Sukhothai", time: "~5 h", note: "Green Bus, several a day.", pick: true }
    ],
    months: "Nov–Feb is peak: cool, dry, clear. Book festival-night beds now, as prices jump."
  },
  {
    id: "pai", tags: ["party", "hiking", "swim"], leg: "Thailand — North", name: "Pai", coords: [19.3583, 98.4400], nights: 3, score: 5, mode: "ground",
    why: "A mountain town where you keep running into the same people. Your best backpacker bars and parties in the north.",
    do: "Pai Canyon at sunset, hot springs, waterfalls, the bamboo bridge. A driver or a tour for the scenic loops (you're not licensed to ride yourself). Bars and parties at night.",
    food: "A café and night-market scene far bigger than the town.",
    stay: [
      { area: "Near Walking Street", note: "For the bars and meeting people.", pick: true },
      { area: "Across the river", note: "Bungalows with a view and quiet nights, 10 minutes' walk from town." }
    ],
    travel: [
      { how: "Minibus from Chiang Mai", time: "~3 h", note: "762 curves. Take a motion-sickness tablet. Prestige or Aya.", pick: true }
    ],
    months: "Nov–Feb. Mornings are cold, so bring a warm layer."
  },
  {
    id: "maesalong", tags: ["tea"], leg: "Thailand — North", name: "Doi Mae Salong", coords: [20.1667, 99.6236], nights: 1, score: 4, maybe: true, mode: "ground",
    why: "A Yunnanese hill village surrounded by tea plantations. Your best tea in Thailand: oolong, tasted where it's grown.",
    do: "Tea tastings at the family plantations, the morning market, the viewpoint at the hilltop pagoda.",
    food: "Yunnanese noodles and braised pork leg, with tea.",
    travel: [
      { how: "Minibus to Chiang Mai, then bus", time: "~7 h total", note: "Pai → Chiang Mai, then a Chiang Rai bus to Mae Chan and a songthaew uphill. A long day.", pick: true },
      { how: "Private driver from Pai", time: "~5 h", note: "Book through your guesthouse. Costs more, saves hours." }
    ],
    skip: "Go Pai → Chiang Mai → Chiang Rai by bus in one long day.",
    months: "Nov–Feb is clear. Cold at night."
  },
  {
    id: "cei", tags: ["history"], leg: "Thailand — North", name: "Chiang Rai", coords: [19.9105, 99.8406], nights: 1, role: "transit", mode: "ground",
    why: "A staging post. Sleep here to reach the border and the slow boat the next morning.",
    do: "The White Temple (Wat Rong Khun) and the Blue Temple fill the afternoon.",
    food: "Northern Thai food and a good night bazaar.",
    travel: [
      { how: "Songthaew + bus from Mae Salong", time: "~1.5 h", note: "Down to Mae Chan, then a bus.", pick: true },
      { how: "Bus from Chiang Mai", time: "~3 h", note: "If you skip Mae Salong." }
    ],
    months: "Nov–Feb."
  },
  {
    id: "huayxai", tags: [], leg: "Laos", name: "Huay Xai (border)", coords: [20.2763, 100.4127], nights: 0, role: "transit", mode: "ground",
    why: "Cross the Friendship Bridge into Laos and get your visa on arrival. The slow boat leaves from here.",
    do: "Border formalities, then the pier. Bring US dollars in cash for the visa (see the Visas page).",
    food: "Grab baguette sandwiches for the boat.",
    travel: [
      { how: "Early bus to Chiang Khong, then the bridge", time: "~2.5 h", note: "Take the 6 am bus from Chiang Rai to catch the boat at about 11 am.", pick: true },
      { how: "Slow-boat package with pickup", time: "~3 h", note: "Shompoo, Nagi of Mekong and others collect you in Chiang Rai and handle the border. Check current operators." },
      { how: "Sleep in Huay Xai the night before", time: "—", note: "The calmer option if you want a slow morning." }
    ],
    months: "Nov–Feb."
  },

  /* ============================== LAOS ============================== */
  {
    id: "pakbeng", tags: ["party"], leg: "Laos", name: "Mekong slow boat (Pakbeng)", coords: [19.8940, 101.1340], nights: 1, score: 6, mode: "water",
    why: "Two days down the Mekong with everyone else heading the same way. The transport is the social activity: beers on deck, then the same people in Pakbeng that night.",
    do: "Sit on the boat, watch the river, meet people. Overnight in Pakbeng, then day two to Luang Prabang.",
    food: "Simple guesthouse Lao food in Pakbeng. Bring snacks and drinks for the boat.",
    travel: [
      { how: "Public slow boat", time: "2 days", note: "Cheapest and most social. Buy the ticket at the Huay Xai pier, or through your guesthouse the day before.", pick: true },
      { how: "Mid-range boat", time: "2 days", note: "Shompoo, Nagi of Mekong: smaller group, real seats, lunch included. Still social. Check current names." },
      { how: "Luxury boat", time: "2 days", note: "Luang Say, with its own lodge. Older, quieter crowd. Not for you." }
    ],
    months: "Nov–Feb. The river is high after the rains and the air is clear."
  },
  {
    id: "lpq", tags: ["history", "swim", "food", "shopping"], leg: "Laos", name: "Luang Prabang", coords: [19.8867, 102.1350], nights: 4, score: 7, mode: "water",
    why: "The most beautiful historical town on your whole route. Touristy but still completely itself.",
    do: "Swim at Kuang Si Falls, the monks' dawn alms round, Mount Phousi at sunset, the night market for textiles and clothes. Utopia bar for a social evening.",
    food: "Laap, Mekong river fish, Luang Prabang sausage, and very good baguettes.",
    stay: [
      { area: "The old-town peninsula", note: "Between the Mekong and the Nam Khan. Stay on the quieter Nam Khan side for river views and morning calm.", pick: true }
    ],
    travel: [
      { how: "Day two of the slow boat", time: "~8 h", note: "Lands you right in town.", pick: true }
    ],
    months: "Nov–Feb is the dry cool season and the best time to be here."
  },

  /* ============================= VIETNAM ============================= */
  {
    id: "han", tags: ["city", "food", "history", "shopping", "party", "tea"], leg: "Vietnam", name: "Hanoi", coords: [21.0278, 105.8342], nights: 3, score: 5, role: "base", mode: "air",
    why: "The northern capital, street-food headquarters, and your base for Ha Giang. Easy for meeting people solo.",
    do: "Walk the Old Quarter with no plan, the Temple of Literature, Hoan Kiem lake at dawn, beer on Ta Hien street. Tailors and local streetwear. Lotus tea.",
    food: "Bun cha, pho bo, banh cuon, egg coffee. Eat from plastic stools on the pavement.",
    stay: [
      { area: "Old Quarter, near Hoan Kiem lake", note: "The street-food heart of the city and the social hostels. Noisy, and the point.", pick: true },
      { area: "Tay Ho (West Lake)", note: "By the water, calmer, with cafés and good restaurants. Hanoi's Østerbro." },
      { area: "French Quarter", note: "Grand, leafy and nicer, a short walk south of the lake." }
    ],
    travel: [
      { how: "Flight from Luang Prabang", time: "~1 h", note: "Lao Airlines or Vietnam Airlines. The overland alternative is a 24 h bus.", pick: true }
    ],
    months: "Nov–Dec is cool and dry. Air quality gets bad in winter, so check IQAir."
  },
  {
    id: "hagiang", tags: ["scooter", "party"], leg: "Vietnam", name: "Ha Giang Loop", coords: [23.0500, 105.1500], nights: 4, overnightTravel: 1, score: 6, mode: "ground",
    why: "Vietnam's best scooter ride, through the most dramatic mountains in the country. Ride on the back with an easy-rider driver, which is legal for you and keeps your insurance valid.",
    do: "A 3–4 day group loop: Quan Ba, Yen Minh, Dong Van, the Ma Pi Leng pass. Homestays every night with group dinners, rice wine and karaoke.",
    food: "Thang co (horse stew, if brave), buckwheat cakes, grilled corn on the roadside, lots of rice wine.",
    travel: [
      { how: "Sleeper bus from Hanoi", time: "~6–7 h", note: "Most loop tours include the bus. Night bus there, start riding next morning.", pick: true },
      { how: "Back: sleeper bus to Ninh Binh", time: "~8 h", note: "Some companies run direct, which saves going back through Hanoi. Otherwise bus to Hanoi then on." }
    ],
    months: "Mid-December: dry, but cold (around 5–15°C) with some foggy mornings. Bring a proper warm layer and gloves, or rent them in Ha Giang."
  },
  {
    id: "ninhbinh", tags: ["hiking", "history"], leg: "Vietnam", name: "Ninh Binh", coords: [20.2506, 105.9744], nights: 3, score: 6, mode: "ground",
    why: "Limestone towers rising out of rice paddies, seen from a rowboat. Ha Long Bay on land, and better.",
    do: "Row through the caves at Trang An or Tam Coc, cycle between the paddies and temples, climb the steps of Hang Mua for the view.",
    food: "Goat meat (the local speciality) and com chay, crispy rice.",
    stay: [
      { area: "Tam Coc village", note: "Among the paddies and karsts, with the social hostels and bike rental.", pick: true }
    ],
    travel: [
      { how: "Sleeper bus from Ha Giang", time: "~8 h", note: "If your loop company runs it.", pick: true },
      { how: "From Hanoi by train or bus", time: "~2 h", note: "If you went back to Hanoi first." }
    ],
    months: "Dec is fine. Book a social hostel, because your evenings depend on it."
  },
  {
    id: "puluong", tags: ["hiking"], leg: "Vietnam", name: "Pu Luong", coords: [20.4500, 105.2000], nights: 2, score: 4, maybe: true, mode: "ground",
    why: "Terraced valleys and stilt-house homestays: what Mai Chau used to be before the tour buses. Your best hiking in northern Vietnam.",
    do: "Walk between villages through the rice terraces, bamboo water wheels, a waterfall swim if it's warm enough. Stay in a stilt-house retreat.",
    food: "Homestay cooking: sticky rice in bamboo, grilled river fish, smoked pork.",
    stay: [
      { area: "A stilt-house retreat in the valley", note: "Pick one with a view over the terraces.", pick: true }
    ],
    travel: [
      { how: "Car or limousine van from Ninh Binh", time: "~3 h", note: "Your hostel or the Pu Luong retreat can arrange it.", pick: true }
    ],
    skip: "Take the night train straight from Ninh Binh to Hue. Ninh Binh is on the same line.",
    months: "Dec: dry but cool and sometimes misty. The rice terraces are bare after harvest, so it's green hills rather than golden rice."
  },
  {
    id: "hue", tags: ["history"], leg: "Vietnam", name: "Hue", coords: [16.4637, 107.5909], nights: 1, overnightTravel: 1, role: "transit", mode: "ground",
    why: "One night to start the Hai Van ride. The walled Imperial Citadel fills the afternoon.",
    do: "The Imperial Citadel, and a royal tomb if there's time.",
    food: "Bun bo Hue, the city's spicy beef noodle soup.",
    stay: [
      { area: "South bank near the walking street", note: "By the Perfume River, walking distance to food and bars.", pick: true }
    ],
    travel: [
      { how: "Night train from Thanh Hoa", time: "~10 h", note: "From Pu Luong, drive about 3 h to Thanh Hoa station first. Book a soft-sleeper berth on the Vietnam Railways site or 12Go.", pick: true },
      { how: "Night train from Ninh Binh", time: "~11 h", note: "If you skip Pu Luong." },
      { how: "Flight Hanoi → Hue", time: "~1 h 15", note: "Fastest, but you lose the train night and have to go back to Hanoi." }
    ],
    months: "Hue is the wettest city in Vietnam Oct–Dec. Bring a rain jacket, and another reason to keep this to one night."
  },
  {
    id: "haivan", tags: ["scooter"], leg: "Vietnam", name: "Hai Van Pass ride", coords: [16.1906, 108.1298], nights: 0, score: 6, mode: "ground",
    why: "The classic central-Vietnam scooter ride over the coastal pass. It replaces the train: same coastline, on a bike, with a driver.",
    do: "A full day riding pillion from Hue to Hoi An: Lap An lagoon, a beach stop, the pass summit, the Marble Mountains. Your bag goes ahead by car.",
    food: "Lagoon oysters at Lap An, a roadside banh mi.",
    travel: [
      { how: "Easy-rider tour, Hue → Hoi An", time: "1 day", note: "Book through your Hue hostel or a known operator. Includes luggage transfer.", pick: true },
      { how: "Train Hue → Da Nang", time: "~2.5 h", note: "The fallback if it's pouring. Sit on the left heading south for the sea view." }
    ],
    months: "Any day without heavy rain. Fog can hide the summit, but the lagoon and beaches still make it worth it."
  },
  {
    id: "hoian", tags: ["shopping", "food", "history", "swim"], leg: "Vietnam", name: "Hoi An", coords: [15.8801, 108.3380], nights: 4, score: 6, mode: "ground",
    why: "Your best clothes stop in all of Southeast Asia, plus some of the best food in Vietnam and a beautiful old town.",
    do: "Get clothes made to measure (24–48 h, so order on day one and leave time for a fitting). The lantern-lit old town after dark, a cooking class, cycling through paddies to An Bang beach. My Son temple ruins as a half-day trip.",
    food: "Cao lau, white rose dumplings, com ga, banh mi from Phuong or Madam Khanh.",
    stay: [
      { area: "An Hoi islet or the old-town edge", note: "Across the river from the lanterns, walkable but quieter.", pick: true },
      { area: "Cam Thanh or the An Bang road", note: "Rice-paddy homestays between town and the beach, by bike." },
      { area: "An Bang beach", note: "By the water, with beach bars, 15 minutes by bike." }
    ],
    travel: [
      { how: "End of the Hai Van ride", time: "—", note: "The ride drops you here.", pick: true }
    ],
    months: "Dec–Jan is cooler with some rain, but workable. Cham Islands snorkelling is mostly off until March."
  },
  {
    id: "dalat", tags: ["scooter", "hiking", "tea"], leg: "Vietnam", name: "Da Lat", coords: [11.9404, 108.4583], nights: 3, score: 4, maybe: true, mode: "air",
    why: "Cool highlands, canyoning, coffee farms, and Bao Loc's tea plantations on the road down to Saigon. Ride with an easy rider. The social scene is thin, so lean on group activities.",
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
    id: "sgn", tags: ["city", "food", "party", "shopping", "history"], leg: "Vietnam", name: "Ho Chi Minh City", coords: [10.8231, 106.6297], nights: 3, score: 5, mode: "ground",
    why: "The strongest food, bars and clothes in Vietnam. Loud and polluted, so keep it short.",
    do: "The War Remnants Museum (heavy and essential), the Cu Chi tunnels, a street-food tour by scooter (pillion), rooftop bars, Bui Vien for the party. Local fashion labels in Districts 1 and 3.",
    food: "Com tam (broken rice), banh xeo, oc (snail) restaurants, the best iced coffee in the country.",
    stay: [
      { area: "District 3", note: "Leafy and local: old villas, cafés, great street food, cool bars. The Malasaña pick.", pick: true },
      { area: "District 1, around Ben Thanh", note: "Walkable to everything. Sleep a few streets from Bui Vien, not on it." },
      { area: "Thao Dien (District 2)", note: "By the river, calmer, with cafés and expat restaurants. Pricier." }
    ],
    travel: [
      { how: "Bus or limousine van from Da Lat", time: "~7 h", note: "Via Bao Loc for the tea farms.", pick: true },
      { how: "Flight Da Lat → HCMC", time: "~50 min", note: "If you'd rather not sit on a bus." },
      { how: "Flight Da Nang → HCMC", time: "~1 h 20", note: "If you skip Da Lat." }
    ],
    months: "Dec–Apr is the southern dry season. Perfect timing."
  },
  {
    id: "cantho", tags: ["food"], leg: "Vietnam", name: "Can Tho (Mekong Delta)", coords: [10.0452, 105.7469], nights: 1, score: 4, maybe: true, mode: "ground",
    why: "A break on the way to the border, for the dawn floating market.",
    do: "The Cai Rang floating market at dawn (go before the tour boats), cycling the small islands.",
    food: "River fish, tropical fruit, hu tieu noodle soup.",
    stay: [
      { area: "Ninh Kieu riverside", note: "Right on the water, close to the boats for the floating market.", pick: true }
    ],
    travel: [
      { how: "Bus from HCMC", time: "~3.5 h", note: "Phuong Trang (FUTA) buses run all day.", pick: true }
    ],
    skip: "Take the direct bus HCMC → Ha Tien (~8 h).",
    months: "Dec–Apr is the dry season."
  },
  {
    id: "hatien", tags: [], leg: "Vietnam", name: "Ha Tien (border)", coords: [10.3833, 104.4833], nights: 0, role: "transit", mode: "ground",
    why: "The quiet border crossing (Xa Xia to Prek Chak) straight into Kampot and Kep. Saves a day of going back through Phnom Penh.",
    do: "Cross the border. The Cambodian e-visa isn't accepted here, so get the visa on arrival with US dollars in cash.",
    food: "—",
    travel: [
      { how: "Bus from Can Tho", time: "~4 h", note: "", pick: true },
      { how: "Direct bus from HCMC", time: "~8 h", note: "If you skip Can Tho." },
      { how: "Through minibus to Kampot or Kep", time: "+ ~2 h", note: "Agencies in Ha Tien sell a ticket that takes you across the border and on. Easiest." }
    ],
    months: "Any."
  },

  /* ============================= CAMBODIA ============================= */
  {
    id: "kampot", tags: ["scooter", "food", "swim"], leg: "Cambodia", name: "Kampot & Kep", coords: [10.5500, 104.2500], nights: 3, score: 5, mode: "ground",
    why: "Your calm, food-focused Cambodia stop, with a great ride up Bokor mountain.",
    do: "Bokor mountain by tuk-tuk, tour or driver (no self-riding), a pepper-farm visit, kayaking the river at sunset, the Kep crab market.",
    food: "Kampot pepper crab at the Kep market, on a plastic chair.",
    stay: [
      { area: "Kampot riverside", note: "Guesthouses on the river with sunset decks and kayaks. The by-the-water pick.", pick: true },
      { area: "Kep, near the crab market", note: "Quieter and greener, for the seafood." }
    ],
    travel: [
      { how: "Minibus from Ha Tien", time: "~2 h + border", note: "Through ticket from Ha Tien. Have dollars ready for the visa.", pick: true }
    ],
    months: "Nov–Feb is dry and cool."
  },
  {
    id: "pnh", tags: ["city", "history", "shopping", "party"], leg: "Cambodia", name: "Phnom Penh", coords: [11.5564, 104.9282], nights: 1, score: 4, role: "transit", mode: "ground",
    why: "One sobering day, because you can't understand the country without it. Plus the Russian Market for clothes.",
    do: "Tuol Sleng (S-21) and the Killing Fields in one morning, then stop. The Russian Market for factory-overrun clothes. The riverside bars in the evening.",
    food: "Khmer food and a good bar scene along the river.",
    stay: [
      { area: "Tuol Tom Poung (Russian Market)", note: "Cafés, bars and good food around the market. The Malasaña pick.", pick: true },
      { area: "BKK1", note: "Leafy and nicer, with good restaurants." },
      { area: "Riverside", note: "On the water, with bars. A bit seedy at night." }
    ],
    travel: [
      { how: "Bus from Kampot", time: "~3–4 h", note: "Giant Ibis or a minivan.", pick: true }
    ],
    months: "Nov–Feb."
  },
  {
    id: "rep", tags: ["history", "party"], leg: "Cambodia", name: "Siem Reap & Angkor", coords: [13.3671, 103.8448], nights: 5, score: 7, mode: "ground",
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
  },

  /* ======================= THAILAND — ANDAMAN ======================= */
  {
    id: "kbv", tags: [], leg: "Thailand — Andaman", name: "Krabi (airport)", coords: [8.0863, 98.9063], nights: 0, role: "transit", mode: "air",
    why: "The airport and van hub for the Andaman coast.",
    do: "Straight onto a van.",
    food: "—",
    travel: [
      { how: "Fly Siem Reap → Bangkok → Krabi", time: "~5 h incl. change", note: "Bangkok Airways or Thai AirAsia to Bangkok, then on to Krabi. Book as one ticket if you can.", pick: true },
      { how: "Fly to Surat Thani instead", time: "similar", note: "Closer to Khao Sok (~2 h by van). Then go Khao Sok → Lanta." },
      { how: "Overland via Bangkok", time: "2+ days", note: "Thai–Cambodian land borders have been closed or restricted since the 2025 conflict. Check before trying." }
    ],
    months: "—"
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
      { how: "Van from Krabi", time: "~2.5 h", note: "Book on 12Go or at the airport.", pick: true },
      { how: "Van from Surat Thani", time: "~2 h", note: "If you flew into Surat Thani." }
    ],
    months: "Nov–Feb. The lake is full after the rains and the trails are passable."
  },
  {
    id: "lanta", tags: ["diving", "swim", "party"], leg: "Thailand — Andaman", name: "Ko Lanta", coords: [7.6167, 99.0500], nights: 5, role: "base", mode: "ground",
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
    id: "komuk", tags: ["swim"], leg: "Thailand — Andaman", name: "Ko Muk", coords: [7.3750, 99.3000], nights: 1, score: 5, mode: "water",
    why: "The Emerald Cave: you swim through a pitch-dark sea tunnel into a hidden beach ringed by cliffs. One of the most memorable swims of the trip.",
    do: "Swim the Emerald Cave at low tide, early or late to beat the tour boats. Snorkel off Charlie Beach.",
    food: "Simple beach restaurants.",
    stay: [
      { area: "Charlie Beach", note: "Sunset side, and a short walk to the Emerald Cave boats.", pick: true }
    ],
    travel: [
      { how: "Speedboat from Ko Lanta", time: "~1 h", note: "The island-hopping speedboats (Satun Pakbara, Tigerline) stop at Ngai, Muk, Kradan and on to Lipe.", pick: true }
    ],
    months: "Nov–Apr."
  },
  {
    id: "kradan", tags: ["swim"], leg: "Thailand — Andaman", name: "Ko Kradan", coords: [7.3167, 99.2500], nights: 1, score: 5, mode: "water",
    why: "The clearest water around, with snorkelling straight off the beach. Pure swimming and snorkelling.",
    do: "Snorkel the reef off the east beach, walk to sunset beach, do nothing.",
    food: "A handful of beach restaurants. That's the entire island.",
    travel: [
      { how: "Longtail from Ko Muk", time: "~20 min", note: "Your guesthouse arranges it.", pick: true }
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

  /* ============================= MALAYSIA ============================= */
  {
    id: "langkawi", tags: ["swim"], leg: "Malaysia", name: "Langkawi", coords: [6.3500, 99.8000], nights: 1, role: "transit", mode: "water",
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
    id: "penang", tags: ["food", "history", "city", "hiking"], leg: "Malaysia", name: "George Town, Penang", coords: [5.4141, 100.3288], nights: 5, score: 7, mode: "water",
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
    id: "cameron", tags: ["tea", "hiking"], leg: "Malaysia", name: "Cameron Highlands", coords: [4.4700, 101.3800], nights: 2, score: 5, mode: "ground",
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
    id: "kul", tags: ["city", "food", "party", "shopping"], leg: "Malaysia", name: "Kuala Lumpur", coords: [3.1390, 101.6869], nights: 2, score: 4, role: "transit", mode: "ground",
    why: "The hub you fly on from, and a good food stop for two days.",
    do: "Batu Caves, the Petronas Towers at night, Chinatown and Jalan Alor food street, a rooftop bar. If Thaipusam (late Jan, confirm the date) lines up, go: a million pilgrims at Batu Caves.",
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
    id: "sin", tags: ["city", "food"], leg: "Singapore", name: "Singapore", coords: [1.3521, 103.8198], nights: 2, score: 4, maybe: true, mode: "ground",
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

  /* =========================== PHILIPPINES =========================== */
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
      { how: "Flight from KL", time: "~4 h", note: "If you skip Singapore." },
      { how: "Fly into Clark instead", time: "similar", note: "Smaller airport 2 h north of Manila, often cheaper from Singapore. Handy if you take the Banaue bus." },
      { how: "Straight to Palawan", time: "—", note: "Direct international flights to Puerto Princesa come and go. Check Skyscanner. If one exists, you skip this night." }
    ],
    months: "Jan–Apr is the dry season and outside the typhoon window."
  },
  {
    id: "elnido", tags: ["swim", "party"], leg: "Philippines", name: "El Nido", coords: [11.1800, 119.4160], nights: 3, score: 5, mode: "air",
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
    id: "tao", tags: ["swim"], leg: "Philippines", name: "Tao expedition", coords: [11.4833, 119.8500], nights: 4, score: 7, mode: "water",
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
    id: "mnl2", tags: [], leg: "Philippines", name: "Manila (connection)", coords: [14.5200, 121.0190], nights: 0, role: "transit", mode: "air",
    why: "Change planes for Bangkok.",
    do: "Nothing.",
    food: "—",
    travel: [
      { how: "Flight Coron (Busuanga) → Manila", time: "~1 h", note: "Cebu Pacific, PAL or AirSWIFT. Domestic flights get delayed often, so don't connect tightly.", pick: true }
    ],
    months: "—"
  },
  {
    id: "bkk2", tags: ["city", "food", "shopping"], leg: "Home", name: "Bangkok, last nights", coords: [13.69, 100.75], nights: 2, role: "transit", mode: "air",
    why: "A buffer before the flight home, in case a Philippine flight slips. And a last Bangkok food crawl.",
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
  },

  /* ============ MAYBE — BANAUE & BATAD (side trip from Manila) ============ */
  {
    id: "banaue", tags: ["hiking"], leg: "Maybe — Northern Philippines", name: "Banaue & Batad", coords: [16.9200, 121.0900], nights: 3, maybe: true, spurFrom: "mnl1", cost: 5, score: 5, mode: "ground",
    why: "Your best hiking in the Philippines: 2,000-year-old Ifugao rice terraces, still farmed. This is the 9-hour night bus, there and back.",
    do: "Hike from Banaue to the Batad amphitheatre terraces, sleep in Batad, walk down to Tappiya Falls for a swim.",
    food: "Mountain cooking: pinikpikan, heirloom rice, strong local coffee.",
    stay: [
      { area: "A Batad homestay", note: "Sleep inside the amphitheatre terraces.", pick: true }
    ],
    travel: [
      { how: "Night bus from Manila", time: "~9–10 h", note: "Coda Lines or Ohayami. This costs a night on the bus.", pick: true },
      { how: "Back: night bus to Manila", time: "~9–10 h", note: "Another night on the bus. Then fly on to Palawan." }
    ],
    months: "Dec–Apr is dry. February is good."
  }
];

// The activity filters, in the order the buttons appear.
const ACTIVITIES = {
  diving: "Diving", swim: "Snorkel & swim", hiking: "Hiking", scooter: "Scooter rides",
  city: "City", food: "Food", history: "History", party: "Bars & parties",
  shopping: "Clothes", tea: "Tea"
};
