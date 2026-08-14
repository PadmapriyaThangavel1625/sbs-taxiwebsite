// =====================================================
// SBS TAXI CONFIGURATION
// =====================================================

export type DestinationSpot = {
  name: string;
  description: string;
  image: string;
};

export type Destination = {
  name: string;
  km: string;
  price: string;
  image: string;
  spots: DestinationSpot[];
};

// =====================================================
// DESTINATIONS
// =====================================================

export const destinations: Destination[] = [
  {
    name: "Madurai",
    km: "220 km",
    price: "2499",
    image:
      "https://images.unsplash.com/photo-1572146462570-2129a547e6dd?q=80&w=735&auto=format&fit=crop",

    spots: [
      {
        name: "Meenakshi Amman Temple",
        description:
          "A historic Hindu temple dedicated to Meenakshi and Sundareshwarar, famous for its colorful gopurams, detailed sculptures, and magnificent architecture.",
        image:
          "https://images.unsplash.com/photo-1692173248120-59547c3d4653?w=800&auto=format&fit=crop&q=80",
      },
      {
        name: "Thirumalai Nayakkar Palace",
        description:
          "A magnificent 17th-century palace known for its huge pillars, grand courtyard, beautiful arches, and impressive Indo-Saracenic architecture.",
        image:
          "https://media.istockphoto.com/id/1366764347/photo/madurai-tamil-nadu-india-wide-view-of-an-ancient-thirumalai-nayak-palace-sculptures-and.webp?a=1&b=1&s=800&w=0&k=20&c=MS1hZYiaIpUJtpMzLl7BP06bDTPShZAu-IU3PM92ILc=",
      },
      {
        name: "Gandhi Memorial Museum",
        description:
          "A historic museum in Madurai that preserves photographs, documents, and important artifacts connected with Mahatma Gandhi and India's freedom movement.",
        image:
          "https://media.istockphoto.com/id/1407795903/photo/thirumalai-naicker-palace-in-the-state-of-tamil-nadu-in-india.webp?a=1&b=1&s=800&w=0&k=20&c=rbdggBWNMrxJafYJfCchd6Lm6UNsFWIyfnf7K363WBM=",
      },
      {
        name: "Alagar Koyil",
        description:
          "A beautiful Vishnu temple located in the scenic Alagar Hills, surrounded by green forests and peaceful natural scenery.",
        image:
          "https://media.istockphoto.com/id/1645978111/photo/a-scene-of-a-very-famous-temple-tower-view-of-adi-kumbeswarar-temple-and-one-among-travel.webp?a=1&b=1&s=800&w=0&k=20&c=8rIVNYvXs3Yb-LBrSJxYwQd7UCPepI6H7HrL2PdP3v4=",
      },
      {
        name: "Thirupparankundram Temple",
        description:
          "An ancient rock-cut temple dedicated to Lord Murugan and one of the important Arupadai Veedu pilgrimage sites in Tamil Nadu.",
        image:
          "https://media.istockphoto.com/id/1393587939/photo/temples-of-tamil-nadu.webp?a=1&b=1&s=800&w=0&k=20&c=0mw5AKdaMu3AM3CNrAjKPtQmjkBjHWNDTHvcfiTGpxQ=",
      },
    ],
  },

  {
    name: "Kanyakumari",
    km: "310 km",
    price: "3499",
    image:
      "https://images.unsplash.com/photo-1610902552120-c577dbde88a8?w=600&auto=format&fit=crop&q=60",

    spots: [
      {
        name: "Thiruvalluvar Statue",
        description:
          "A massive statue dedicated to Tamil poet and philosopher Thiruvalluvar, standing on a rocky island near the Vivekananda Rock Memorial.",
        image:
          "https://images.unsplash.com/photo-1736319286940-5379b582256b?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Vivekananda Rock Memorial",
        description:
          "A famous memorial located on a rocky island off the coast of Kanyakumari, associated with Swami Vivekananda and offering beautiful sea views.",
        image:
          "https://media.istockphoto.com/id/1301792905/photo/basava-statue-under-baldachin-at-sri-sangameshwar-temple-bagalkot-karnataka-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=ffXm57peqpFdkBcjPGPpzlh3bW0IL4kolY9DRmUwqIA=",
      },
      {
        name: "Kanyakumari Beach",
        description:
          "A popular coastal destination famous for spectacular sunrise and sunset views and the meeting of three major bodies of water.",
        image:
          "https://images.unsplash.com/photo-1728439910260-fab99499117a?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Bhagavathi Amman Temple",
        description:
          "An important coastal temple dedicated to Goddess Bhagavathi Amman and one of the major spiritual attractions of Kanyakumari.",
        image:
          "https://images.unsplash.com/photo-1573352763925-82bd5dfc31d1?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Sunset Point",
        description:
          "A popular location for watching the sun set over the sea, creating beautiful evening views along the Kanyakumari coastline.",
        image:
          "https://images.unsplash.com/photo-1589564974428-5766540caa67?w=600&auto=format&fit=crop&q=60",
      },
    ],
  },

  {
    name: "Coimbatore",
    km: "150 km",
    price: "1999",
    image:
      "https://media.istockphoto.com/id/1499375304/photo/lord-shiva-112-feet-statue-in-velliangiri-hills-during-sunrise.webp?a=1&b=1&s=612x612&w=0&k=20&c=f58T-1cqjRv3dMelOWGXvlLMVcf1Zr6g5rbv7a4EYnI=",

    spots: [
      {
        name: "Marudamalai Temple",
        description:
          "A popular hill temple dedicated to Lord Murugan, located on the western side of Coimbatore and surrounded by scenic hills.",
        image:
          "https://media.istockphoto.com/id/1150313896/photo/temple-india-marudhamalai-coimbatore-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=Z9pUdbRTf5xTblA6GEA_K8Y4Qk__gI4oVxE-JJ1FQxc=",
      },
      {
        name: "Isha Yoga Center",
        description:
          "A well-known spiritual and meditation center near the Velliangiri Mountains, famous for the large Adiyogi statue.",
        image:
          "https://media.istockphoto.com/id/1476782272/photo/adiyogi.jpg?s=612x612&w=0&k=20&c=xr4KBWzw_LuBWLGdmVuXtR7logz_HFaz_bn4E5lwydU=",
      },
      {
        name: "Gedee Car Museum",
        description:
          "A fascinating museum featuring vintage, classic, and rare automobiles, making it a popular attraction for automobile enthusiasts.",
        image:
          "https://media.istockphoto.com/id/2175236646/photo/rangpur-bangladesh-august-26-2024-a-historical-building-side-view-of-bangladesh-named-tajhat.webp?a=1&b=1&s=612x612&w=0&k=20&c=TMJs9tk-6co0A1adcgdgdYvRHpGU7ynG2YpfLtSNL9Q=",
      },
      {
        name: "VOC Park",
        description:
          "A family-friendly recreational park in Coimbatore with green spaces and entertainment areas.",
        image:
          "https://media.istockphoto.com/id/1202797282/photo/avenue-of-plane-tree-in-park.webp?a=1&b=1&s=612x612&w=0&k=20&c=E2bbR1AEruxG9HGgZ7v47wj_Ud6ZP-Y2V_bdDDFYbXE=",
      },
      {
        name: "Ukkadam Lake",
        description:
          "A peaceful urban lake that provides scenic views, greenery, and opportunities for bird watching and relaxation.",
        image:
          "https://media.istockphoto.com/id/2231611001/photo/aliyar-dam-a-popular-reservoir-near-pollachi-in-tamil-nadu-india-set-against-the-backdrop-of.jpg?s=612x612&w=0&k=20&c=p5En18WsWWJxftJa4MwWnt_sU51o5Kl1PzhWnw3gY7g=",
      },
    ],
  },

  {
    name: "Courtallam",
    km: "160 km",
    price: "1999",
    image:
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=75",

    spots: [
      {
        name: "Courtallam Main Falls",
        description:
          "The most famous waterfall in Courtallam, surrounded by greenery and known as one of the region's major tourist attractions.",
        image:
          "https://media.istockphoto.com/id/2246633481/photo/hidden-waterfall-cascading-through-dense-forest.webp?a=1&b=1&s=612x612&w=0&k=20&c=talAhGSnMP4-TlWhLPq_xUKstw4XbpcdlMjIOmszUcw=",
      },
      {
        name: "Five Falls",
        description:
          "A spectacular waterfall where the water divides into five separate streams, making it one of Courtallam's most popular attractions.",
        image:
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Old Courtallam Falls",
        description:
          "A quieter waterfall surrounded by natural scenery, suitable for visitors looking for a peaceful experience.",
        image:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Shenbaga Devi Falls",
        description:
          "A scenic waterfall located in the forested hills of Courtallam and reached through a natural trekking route.",
        image:
          "https://images.unsplash.com/photo-1546587348-d12660c30c50?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Palaruvi Falls",
        description:
          "A beautiful waterfall surrounded by dense greenery, popular with visitors looking for a refreshing nature experience.",
        image:
          "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  {
    name: "Tiruchendur",
    km: "200 km",
    price: "2399",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=75",

    spots: [
      {
        name: "Tiruchendur Murugan Temple",
        description:
          "A famous seaside temple dedicated to Lord Murugan and one of the six important Murugan pilgrimage temples.",
        image:
          "https://media.istockphoto.com/id/1330483974/photo/landscape-view-of-indian-temple-which-situated-on-rock-hill-with-sky-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=oDly30Txr4egMN91sdPIHmht-XYLukrYa3NvFSOg1Ys=",
      },
      {
        name: "Tiruchendur Beach",
        description:
          "A beautiful beach next to the temple where visitors can enjoy sea views and the coastal atmosphere.",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Valli Cave",
        description:
          "A small rock-cut shrine associated with Goddess Valli and the legends surrounding Lord Murugan.",
        image:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Manapadu Beach",
        description:
          "A scenic coastal village known for its beach, historic church, rocky coastline, and peaceful surroundings.",
        image:
          "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Kulasekarapattinam",
        description:
          "A coastal town famous for the Mutharamman Temple and its colorful annual Dasara celebrations.",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  {
    name: "Trichy",
    km: "330 km",
    price: "3399",
    image:
      "https://media.istockphoto.com/id/1393633075/photo/kanyakumari-tamil-nadu.webp?a=1&b=1&s=612x612&w=0&k=20&c=QEEPQ4qraAfgGk6BUZ72bmok5-2tZ36kFSCoZ2DfKOQ=",

    spots: [
      {
        name: "Rockfort Temple",
        description:
          "A famous temple complex built on a massive rock formation and one of the best-known landmarks of Tiruchirappalli.",
        image:
          "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Sri Ranganathaswamy Temple",
        description:
          "A magnificent temple complex located on Srirangam island and one of the most important Vaishnavite pilgrimage centers in India.",
        image:
          "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Kallanai Dam",
        description:
          "An ancient Chola-era dam built across the Kaveri River and one of the oldest water-regulation structures still in use.",
        image:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Samayapuram Mariamman Temple",
        description:
          "A major temple dedicated to Goddess Mariamman and an important spiritual destination near Trichy.",
        image:
          "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "St. Joseph's Church",
        description:
          "A historic church known for its distinctive architecture and religious significance in Tiruchirappalli.",
        image:
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  {
    name: "Thanjavur",
    km: "300 km",
    price: "3199",
    image:
      "https://images.unsplash.com/photo-1675677044118-3fd84f9deaf0?w=600&auto=format&fit=crop&q=60",

    spots: [
      {
        name: "Brihadeeswarar Temple",
        description:
          "A UNESCO World Heritage monument built during the Chola period and famous for its enormous vimana and magnificent stone architecture.",
        image:
          "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Thanjavur Palace",
        description:
          "A historic royal palace complex featuring courtyards, galleries, museums, and important artifacts from the Nayak and Maratha periods.",
        image:
          "https://media.istockphoto.com/id/1223785666/photo/old-maratha-palace-in-thanjavur-tamil-nadu-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=3axkDWdk7D-SyuoQM_HcjfqN3wx6arl_s61vMjpPSKA=",
      },
      {
        name: "Saraswathi Mahal Library",
        description:
          "A historic library containing rare manuscripts, palm-leaf documents, books, and important records from the region's royal history.",
        image:
          "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Gangaikonda Cholapuram",
        description:
          "A historic Chola capital famous for its magnificent temple and remarkable examples of Chola architecture.",
        image:
          "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Schwartz Church",
        description:
          "A historic church in Thanjavur associated with Christian missionary Christian Friedrich Schwartz and the city's colonial history.",
        image:
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  {
    name: "Rameswaram",
    km: "350 km",
    price: "3999",
    image:
      "https://images.unsplash.com/photo-1706932642959-97cdde19ef0b?w=600&auto=format&fit=crop&q=60",

    spots: [
      {
        name: "Ramanathaswamy Temple",
        description:
          "A famous pilgrimage temple known for its exceptionally long corridors, detailed stone pillars, and sacred water wells.",
        image:
          "https://images.unsplash.com/photo-1741798037832-6c0c86a6262a?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Pamban Bridge",
        description:
          "A famous bridge connecting mainland India with Rameswaram Island and offering spectacular views of the sea.",
        image:
          "https://images.unsplash.com/photo-1706932642959-97cdde19ef0b?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Dhanushkodi",
        description:
          "A remote coastal destination at the tip of Rameswaram Island, known for its dramatic beaches and historic ruins.",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Ariyaman Beach",
        description:
          "A peaceful beach destination with clear coastal scenery, suitable for relaxing away from busy tourist areas.",
        image:
          "https://images.unsplash.com/photo-1692700827093-f526f0b32923?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "APJ Abdul Kalam Memorial",
        description:
          "A memorial dedicated to former Indian President and scientist Dr. A.P.J. Abdul Kalam, showcasing his life and achievements.",
        image:
          "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  {
    name: "Ooty",
    km: "270 km",
    price: "2899",
    image:
      "https://images.unsplash.com/photo-1660918738010-295b09857f93?q=80&w=702&auto=format&fit=crop",

    spots: [
      {
        name: "Ooty Lake",
        description:
          "A scenic artificial lake surrounded by greenery and eucalyptus trees, popular for boating and relaxing walks.",
        image:
          "https://images.unsplash.com/photo-1711553186754-0cfbdfe38b8d?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Doddabetta Peak",
        description:
          "The highest peak in the Nilgiri Hills, offering panoramic views of Ooty and the surrounding mountain landscape.",
        image:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Botanical Garden",
        description:
          "A large landscaped garden containing a wide variety of plants, flowers, trees, and beautiful walking areas.",
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Rose Garden",
        description:
          "A beautiful terraced garden featuring a large collection of roses and colorful seasonal flowers.",
        image:
          "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Pykara Lake",
        description:
          "A scenic lake surrounded by Nilgiri forests and hills, known for boating and the nearby Pykara waterfalls.",
        image:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Nilgiri Mountain Railway",
        description:
          "A famous mountain railway offering a scenic journey through the Nilgiri Hills, tunnels, bridges, and lush valleys.",
        image:
          "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  {
    name: "Tirupati",
    km: "450 km",
    price: "4799",
    image:
      "https://images.unsplash.com/photo-1733805569204-41768c7d8c0f?w=600&auto=format&fit=crop&q=60",

    spots: [
      {
        name: "Tirumala Venkateswara Temple",
        description:
          "One of India's most important pilgrimage destinations, dedicated to Lord Venkateswara and located on the Tirumala Hills.",
        image:
          "https://images.unsplash.com/photo-1733805569204-41768c7d8c0f?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Kapila Theertham",
        description:
          "A scenic sacred waterfall and temple located at the foot of the Tirumala Hills and dedicated to Lord Shiva.",
        image:
          "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Sri Padmavathi Temple",
        description:
          "A major temple dedicated to Goddess Padmavathi, the consort of Lord Venkateswara, located in Tiruchanoor.",
        image:
          "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Silathoranam",
        description:
          "A natural rock arch located in the Tirumala Hills and considered an interesting geological attraction.",
        image:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Akasa Ganga",
        description:
          "A sacred natural waterfall in the Tirumala Hills and an important religious attraction for pilgrims.",
        image:
          "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  {
    name: "Munnar",
    km: "260 km",
    price: "2799",
    image:
      "https://images.unsplash.com/photo-1637066742971-726bee8d9f56?w=600&auto=format&fit=crop&q=60",

    spots: [
      {
        name: "Munnar Tea Gardens",
        description:
          "Beautiful rolling hills covered with green tea plantations, creating one of the most recognizable landscapes around Munnar.",
        image:
          "https://plus.unsplash.com/premium_photo-1697730334419-fba83fe143b7?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Eravikulam National Park",
        description:
          "A protected mountain park famous for the Nilgiri Tahr, grasslands, rolling hills, and seasonal Neelakurinji flowers.",
        image:
          "https://media.istockphoto.com/id/2222831805/photo/green-tea-tree-leaves-field-plant-in-camellia-sinensis-organic-farm-close-up-tree-tea.webp?a=1&b=1&s=612x612&w=0&k=20&c=WXTHH7J6h4LFSd-ALP0uyKqnCM5Aj0BMXtnWpKDAKL4=",
      },
      {
        name: "Mattupetty Dam",
        description:
          "A popular scenic destination surrounded by mountains, forests, and tea plantations, with boating available nearby.",
        image:
          "https://media.istockphoto.com/id/2222831805/photo/green-tea-tree-leaves-field-plant-in-camellia-sinensis-organic-farm-close-up-tree-tea.webp?a=1&b=1&s=612x612&w=0&k=20&c=WXTHH7J6h4LFSd-ALP0uyKqnCM5Aj0BMXtnWpKDAKL4=",
      },
      {
        name: "Echo Point",
        description:
          "A popular viewpoint where visitors can experience natural echoes across the surrounding mountain landscape.",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Top Station",
        description:
          "A high-altitude viewpoint offering spectacular views of the Western Ghats and neighboring Tamil Nadu landscapes.",
        image:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  {
    name: "Kodaikanal",
    km: "240 km",
    price: "2699",
    image:
      "https://images.unsplash.com/photo-1593692716621-1e228b0a9224?w=600&auto=format&fit=crop&q=60",

    spots: [
      {
        name: "Kodaikanal Lake",
        description:
          "A star-shaped artificial lake surrounded by green hills and one of the most popular attractions in Kodaikanal.",
        image:
          "https://images.unsplash.com/photo-1619020933389-e96f49742bce?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Coaker's Walk",
        description:
          "A scenic walking path along the mountain edge offering beautiful views of valleys, hills, and clouds.",
        image:
          "https://images.unsplash.com/photo-1692792284356-f80113facd09?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Bryant Park",
        description:
          "A well-maintained botanical garden famous for colorful flowers, ornamental plants, trees, and landscaped pathways.",
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Pillar Rocks",
        description:
          "Three impressive rock formations standing high above the surrounding green valleys and frequently covered in mist.",
        image:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Silver Cascade Falls",
        description:
          "A popular waterfall located along the Kodaikanal road, formed from the overflow of Kodaikanal Lake.",
        image:
          "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },
];

// =====================================================
// SBS TAXI CONFIG
// =====================================================

export const SBS_TAXI_CONFIG = {
  // =====================================================
  // COMPANY
  // =====================================================

  company: {
    name: "SBS Taxi",
    tagline: "One Brand. One Fare. One Trusted Service.",
    description:
      "SBS Taxi provides reliable, comfortable and affordable taxi services for local, outstation, airport and corporate travel.",
    established: "2016",
  },

  // =====================================================
  // STORY
  // =====================================================

  story: {
    image: "/images/offers.webp",
    imageAlt: "SBS Taxi Drivers Team",
  },

  // =====================================================
  // IMAGES
  // =====================================================

  images: {
    logo: "/images/logo.png",
    logoWhite: "/images/logo-white.png",
    favicon: "/images/favicon.png",
    flag: "/images/flag.png",

    navbarLogo: "/images/logo.png",
    navbarFlag: "/images/flag.png",

    footerLogo: "/images/logo.png",
    footerFlag: "/images/flag.png",
    madeInIndia: "/images/made-in-india.png",

    hero: "/images/car5.png",

    mini: "/vehicle/mini.png",
    sedan: "/vehicle/sedan.png",
    van: "/vehicle/van.png",
    suv: "/vehicle/suv.png",
    muv: "/vehicle/muv.png",
    muvPlus: "/vehicle/muv-plus.png",

    about: "/images/aboutus.webp",
    service: "/images/service.webp",
    fleet: "/images/fleet.webp",
    destination: "/images/destination.webp",
    offers: "/images/offers.webp",
    airport: "/images/airport.webp",
    corporate: "/images/corporate.webp",
  },

  // =====================================================
  // NAVBAR
  // =====================================================

  navbar: {
    links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Fleet", href: "/fleet" },
      { name: "Pricing", href: "/pricing" },
      { name: "Destinations", href: "/destinations" },
      { name: "Offers", href: "/offers" },
      { name: "Contact Us", href: "/contacts" },
    ],

    booking: {
      name: "Book a Ride",
      href: "/booking",
    },
  },

  // =====================================================
  // CONTACT
  // =====================================================

  contact: {
    customerCare: "+91 98435 44844",
    alternatePhone: "+91 81440 65688",

    email: "info@sbstaxi.in",
    hrEmail: "hr@sbstechnologies.in",

    phoneHref: "tel:+919843544844",
    alternatePhoneHref: "tel:+918144065688",

    emailHref: "mailto:info@sbstaxi.in",
    hrEmailHref: "mailto:hr@sbstechnologies.in",
  },

  // =====================================================
  // ADDRESS
  // =====================================================

  address: {
    line1: "1/166 Vallalar Street",
    line2: "Municipal Colony Road",
    city: "Erode",
    state: "Tamil Nadu",
    country: "India",
    pincode: "638004",

    full:
      "1/166 Vallalar Street, Municipal Colony Road, Erode, Tamil Nadu - 638004",
  },

  // =====================================================
  // BUSINESS HOURS
  // =====================================================

  businessHours: {
    days: "Monday - Sunday",
    time: "24/7",
  },

  // =====================================================
  // VEHICLES
  // =====================================================

  vehicles: {
    mini: {
      name: "SBS MINI",
      type: "Hatchback",

      cars: [
        "Maruti Suzuki Baleno",
        "Toyota Glanza",
        "Maruti Suzuki Wagon R",
      ],

      description:
        "Maruti Suzuki Baleno, Toyota Glanza, Wagon R",

      seats: 4,
      luggage: 2,

      price: "12",
      rate: "₹12 / km",

      image: "/vehicle/mini.png",
    },

    sedan: {
      name: "SBS SEDAN",
      type: "Sedan",

      cars: [
        "Maruti Suzuki Dzire",
        "Hyundai Aura",
        "Tata Xpres-T Electric Taxi",
      ],

      description:
        "Maruti Suzuki Dzire, Hyundai Aura, Tata Xpres-T Electric Taxi",

      seats: 4,
      luggage: 3,

      price: "12.50",
      rate: "₹12.50 / km",

      image: "/vehicle/sedan.png",
    },

    van: {
      name: "SBS VAN",
      type: "Van",

      cars: ["Maruti Suzuki Eeco"],

      description: "Maruti Suzuki Eeco",

      seats: 6,
      luggage: 4,

      price: "14",
      rate: "₹14 / km",

      image: "/vehicle/van.png",
    },

    suv: {
      name: "SBS SUV",
      type: "SUV",

      cars: [
        "Mahindra Xylo",
        "Chevrolet Tavera",
      ],

      description:
        "Mahindra Xylo, Chevrolet Tavera",

      seats: 6,
      luggage: 4,

      price: "17",
      rate: "₹17 / km",

      image: "/vehicle/suv.png",
    },

    muv: {
      name: "SBS MUV",
      type: "MUV",

      cars: [
        "Maruti Suzuki Ertiga",
        "Kia Carens",
      ],

      description:
        "Maruti Suzuki Ertiga, Kia Carens",

      seats: 7,
      luggage: 5,

      price: "18",
      rate: "₹18 / km",

      image: "/vehicle/muv.png",
    },

    muvPlus: {
      name: "SBS MUV+",
      type: "Innova",

      cars: ["Toyota Innova"],

      description: "Toyota Innova",

      seats: 7,
      luggage: 5,

      price: "19",
      rate: "₹19 / km",

      image: "/vehicle/muv-plus.png",
    },
  },

  // =====================================================
  // DESTINATIONS
  // =====================================================

  destinations,

  // =====================================================
  // FOOTER
  // =====================================================

  footer: {
    description:
      "Comfortable rides, professional drivers, and transparent fares for every journey. Travel with confidence wherever the road takes you.",

    serviceLinks: [
      {
        name: "Local Taxi",
        href: "/services",
      },
      {
        name: "Airport Taxi",
        href: "/services",
      },
      {
        name: "Outstation Taxi",
        href: "/services",
      },
      {
        name: "Corporate Taxi",
        href: "/services",
      },
      {
        name: "Temple Trips",
        href: "/services",
      },
    ],

    exploreLinks: [
      {
        name: "Home",
        href: "/",
      },
      {
        name: "About Us",
        href: "/about",
      },
      {
        name: "Services",
        href: "/services",
      },
      {
        name: "Our Fleet",
        href: "/fleet",
      },
      {
        name: "Pricing",
        href: "/pricing",
      },
      {
        name: "Destinations",
        href: "/destinations",
      },
      {
        name: "Offers",
        href: "/offers",
      },
      {
        name: "Contact Us",
        href: "/contacts",
      },
    ],

    trust: {
      safe: {
        title: "Safe & Reliable",
        description: "Trusted taxi service",
      },

      available: {
        title: "Available 24/7",
        description: "Book your ride anytime",
      },
    },

    socialLinks: [
      {
        label: "Facebook",
        href: "#",
        mark: "f",
      },
      {
        label: "Instagram",
        href: "#",
        mark: "◎",
      },
      {
        label: "LinkedIn",
        href: "#",
        mark: "in",
      },
      {
        label: "YouTube",
        href: "#",
        mark: "▶",
      },
      {
        label: "Twitter",
        href: "#",
        mark: "𝕏",
      },
    ],

    copyright: "SBS Taxi. All Rights Reserved.",

    madeInIndia: "Made in India",

    privacy: {
      name: "Privacy Policy",
      href: "/privacy-policy",
    },

    terms: {
      name: "Terms & Conditions",
      href: "/terms-and-conditions",
    },

    poweredBy: {
      label: "Powered by",
      name: "SBS Technologies",
      href: "https://sbstechnologies.in/",
    },
  },

  // =====================================================
  // SOCIAL
  // =====================================================

  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "#",
    twitter: "#",
  },

  // =====================================================
  // MAP
  // =====================================================

  map: {
    embedUrl:
      "https://www.google.com/maps?q=SBS%20Taxi%2C%201%2F166%20Vallalar%20Street%2C%20Erode%2C%20Tamil%20Nadu%20638004&output=embed",
  },

  // =====================================================
  // BOOKING
  // =====================================================

  booking: {
    name: "Book a Ride",
    href: "/booking",

    tripTypes: [
      "One Way",
      "Round Trip",
      "Multi Day",
    ],

    paymentMethods: [
      "Cash",
      "UPI",
      "Card",
    ],
  },
};