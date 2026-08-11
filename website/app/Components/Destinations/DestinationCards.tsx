
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  IndianRupee,
} from "lucide-react";

type TouristSpot = {
  name: string;
  description: string;
  img: string;
};

type Destination = {
  name: string;
  km: string;
  price: string;
  img: string;
  spots: TouristSpot[];
};

const destinations: Destination[] = [
  {
    name: "Madurai",
    km: "220 km",
    price: "2499",
    img: "https://images.unsplash.com/photo-1572146462570-2129a547e6dd?q=80&w=735&auto=format&fit=crop",
    spots: [
      {
        name: "Meenakshi Amman Temple",
        description:
          "A historic Hindu temple dedicated to Meenakshi and Sundareshwarar, famous for its colorful gopurams, detailed sculptures, and magnificent architecture.",
        img: "https://images.unsplash.com/photo-1692173248120-59547c3d4653?w=800&auto=format&fit=crop&q=80",
      },
      {
        name: "Thirumalai Nayakkar Palace",
        description:
          "A magnificent 17th-century palace known for its huge pillars, grand courtyard, beautiful arches, and impressive Indo-Saracenic architecture.",
        img: "https://media.istockphoto.com/id/1366764347/photo/madurai-tamil-nadu-india-wide-view-of-an-ancient-thirumalai-nayak-palace-sculptures-and.webp?a=1&b=1&s=800&w=0&k=20&c=MS1hZYiaIpUJtpMzLl7BP06bDTPShZAu-IU3PM92ILc=",
      },
      {
        name: "Gandhi Memorial Museum",
        description:
          "A historic museum in Madurai that preserves photographs, documents, and important artifacts connected with Mahatma Gandhi and India's freedom movement.",
        img: "https://media.istockphoto.com/id/1407795903/photo/thirumalai-naicker-palace-in-the-state-of-tamil-nadu-in-india.webp?a=1&b=1&s=800&w=0&k=20&c=rbdggBWNMrxJafYJfCchd6Lm6UNsFWIyfnf7K363WBM=",
      },
      {
        name: "Alagar Koyil",
        description:
          "A beautiful Vishnu temple located in the scenic Alagar Hills, surrounded by green forests and peaceful natural scenery.",
        img: "https://media.istockphoto.com/id/1645978111/photo/a-scene-of-a-very-famous-temple-tower-view-of-adi-kumbeswarar-temple-and-one-among-travel.webp?a=1&b=1&s=800&w=0&k=20&c=8rIVNYvXs3Yb-LBrSJxYwQd7UCPepI6H7HrL2PdP3v4=",
      },
      {
        name: "Thirupparankundram Temple",
        description:
          "An ancient rock-cut temple dedicated to Lord Murugan and one of the important Arupadai Veedu pilgrimage sites in Tamil Nadu.",
        img: "https://media.istockphoto.com/id/1393587939/photo/temples-of-tamil-nadu.webp?a=1&b=1&s=800&w=0&k=20&c=0mw5AKdaMu3AM3CNrAjKPtQmjkBjHWNDTHvcfiTGpxQ=",
      },
    ],
  },

  {
    name: "Kanyakumari",
    km: "310 km",
    price: "3499",
    img: "https://images.unsplash.com/photo-1610902552120-c577dbde88a8?w=600&auto=format&fit=crop&q=60",
    spots: [
      {
        name: "Thiruvalluvar Statue",
        description:
          "A massive statue dedicated to Tamil poet and philosopher Thiruvalluvar, standing on a rocky island near the Vivekananda Rock Memorial.",
        img: "https://images.unsplash.com/photo-1736319286940-5379b582256b?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Vivekananda Rock Memorial",
        description:
          "A famous memorial located on a rocky island off the coast of Kanyakumari, associated with Swami Vivekananda and offering beautiful sea views.",
        img: "https://media.istockphoto.com/id/1301792905/photo/basava-statue-under-baldachin-at-sri-sangameshwar-temple-bagalkot-karnataka-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=ffXm57peqpFdkBcjPGPpzlh3bW0IL4kolY9DRmUwqIA=",
      },
      {
        name: "Kanyakumari Beach",
        description:
          "A popular coastal destination famous for spectacular sunrise and sunset views and the meeting of three major bodies of water.",
        img: "https://images.unsplash.com/photo-1728439910260-fab99499117a?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Bhagavathi Amman Temple",
        description:
          "An important coastal temple dedicated to Goddess Bhagavathi Amman and one of the major spiritual attractions of Kanyakumari.",
        img: "https://images.unsplash.com/photo-1573352763925-82bd5dfc31d1?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Sunset Point",
        description:
          "A popular location for watching the sun set over the sea, creating beautiful evening views along the Kanyakumari coastline.",
        img: "https://images.unsplash.com/photo-1589564974428-5766540caa67?w=600&auto=format&fit=crop&q=60",
      },
    ],
  },

  {
    name: "Coimbatore",
    km: "150 km",
    price: "1999",
    img: "https://media.istockphoto.com/id/1499375304/photo/lord-shiva-112-feet-statue-in-velliangiri-hills-during-sunrise.webp?a=1&b=1&s=612x612&w=0&k=20&c=f58T-1cqjRv3dMelOWGXvlLMVcf1Zr6g5rbv7a4EYnI=",
    spots: [
      {
        name: "Marudamalai Temple",
        description:
          "A popular hill temple dedicated to Lord Murugan, located on the western side of Coimbatore and surrounded by scenic hills.",
        img: "https://media.istockphoto.com/id/1150313896/photo/temple-india-marudhamalai-coimbatore-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=Z9pUdbRTf5xTblA6GEA_K8Y4Qk__gI4oVxE-JJ1FQxc=",
      },
      {
        name: "Isha Yoga Center",
        description:
          "A well-known spiritual and meditation center near the Velliangiri Mountains, famous for the large Adiyogi statue.",
        img: "https://media.istockphoto.com/id/1476782272/photo/adiyogi.jpg?s=612x612&w=0&k=20&c=xr4KBWzw_LuBWLGdmVuXtR7logz_HFaz_bn4E5lwydU=",
      },
      {
        name: "Gedee Car Museum",
        description:
          "A fascinating museum featuring vintage, classic, and rare automobiles, making it a popular attraction for automobile enthusiasts.",
        img: "https://media.istockphoto.com/id/2175236646/photo/rangpur-bangladesh-august-26-2024-a-historical-building-side-view-of-bangladesh-named-tajhat.webp?a=1&b=1&s=612x612&w=0&k=20&c=TMJs9tk-6co0A1adcgdgdYvRHpGU7ynG2YpfLtSNL9Q=",
      },
      {
        name: "VOC Park",
        description:
          "A family-friendly recreational park in Coimbatore with green spaces and entertainment areas.",
        img: "https://media.istockphoto.com/id/1202797282/photo/avenue-of-plane-tree-in-park.webp?a=1&b=1&s=612x612&w=0&k=20&c=E2bbR1AEruxG9HGgZ7v47wj_Ud6ZP-Y2V_bdDDFYbXE=",
      },
      {
        name: "Ukkadam Lake",
        description:
          "A peaceful urban lake that provides scenic views, greenery, and opportunities for bird watching and relaxation.",
        img: "https://media.istockphoto.com/id/2231611001/photo/aliyar-dam-a-popular-reservoir-near-pollachi-in-tamil-nadu-india-set-against-the-backdrop-of.jpg?s=612x612&w=0&k=20&c=p5En18WsWWJxftJa4MwWnt_sU51o5Kl1PzhWnw3gY7g=",
      },
    ],
  },

  {
    name: "Courtallam",
    km: "160 km",
    price: "1999",
    img: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=75",
    spots: [
      {
        name: "Courtallam Main Falls",
        description:
          "The most famous waterfall in Courtallam, surrounded by greenery and known as one of the region's major tourist attractions.",
        img: "https://media.istockphoto.com/id/2246633481/photo/hidden-waterfall-cascading-through-dense-forest.webp?a=1&b=1&s=612x612&w=0&k=20&c=talAhGSnMP4-TlWhLPq_xUKstw4XbpcdlMjIOmszUcw=",
      },
      {
        name: "Five Falls",
        description:
          "A spectacular waterfall where the water divides into five separate streams, making it one of Courtallam's most popular attractions.",
        img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Old Courtallam Falls",
        description:
          "A quieter waterfall surrounded by natural scenery, suitable for visitors looking for a peaceful experience.",
        img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Shenbaga Devi Falls",
        description:
          "A scenic waterfall located in the forested hills of Courtallam and reached through a natural trekking route.",
        img: "https://images.unsplash.com/photo-1546587348-d12660c30c50?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Palaruvi Falls",
        description:
          "A beautiful waterfall surrounded by dense greenery, popular with visitors looking for a refreshing nature experience.",
        img: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  {
    name: "Tiruchendur",
    km: "200 km",
    price: "2399",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=75",
    spots: [
      {
        name: "Tiruchendur Murugan Temple",
        description:
          "A famous seaside temple dedicated to Lord Murugan and one of the six important Murugan pilgrimage temples.",
        img: "https://media.istockphoto.com/id/1330483974/photo/landscape-view-of-indian-temple-which-situated-on-rock-hill-with-sky-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=oDly30Txr4egMN91sdPIHmht-XYLukrYa3NvFSOg1Ys=",
      },
      {
        name: "Tiruchendur Beach",
        description:
          "A beautiful beach next to the temple where visitors can enjoy sea views and the coastal atmosphere.",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Valli Cave",
        description:
          "A small rock-cut shrine associated with Goddess Valli and the legends surrounding Lord Murugan.",
        img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Manapadu Beach",
        description:
          "A scenic coastal village known for its beach, historic church, rocky coastline, and peaceful surroundings.",
        img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Kulasekarapattinam",
        description:
          "A coastal town famous for the Mutharamman Temple and its colorful annual Dasara celebrations.",
        img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  {
    name: "Trichy",
    km: "330 km",
    price: "3399",
    img: "https://media.istockphoto.com/id/1393633075/photo/kanyakumari-tamil-nadu.webp?a=1&b=1&s=612x612&w=0&k=20&c=QEEPQ4qraAfgGk6BUZ72bmok5-2tZ36kFSCoZ2DfKOQ=",
    spots: [
      {
        name: "Rockfort Temple",
        description:
          "A famous temple complex built on a massive rock formation and one of the best-known landmarks of Tiruchirappalli.",
        img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Sri Ranganathaswamy Temple",
        description:
          "A magnificent temple complex located on Srirangam island and one of the most important Vaishnavite pilgrimage centers in India.",
        img: "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Kallanai Dam",
        description:
          "An ancient Chola-era dam built across the Kaveri River and one of the oldest water-regulation structures still in use.",
        img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Samayapuram Mariamman Temple",
        description:
          "A major temple dedicated to Goddess Mariamman and an important spiritual destination near Trichy.",
        img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "St. Joseph's Church",
        description:
          "A historic church known for its distinctive architecture and religious significance in Tiruchirappalli.",
        img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  {
    name: "Thanjavur",
    km: "300 km",
    price: "3199",
    img: "https://images.unsplash.com/photo-1675677044118-3fd84f9deaf0?w=600&auto=format&fit=crop&q=60",
    spots: [
      {
        name: "Brihadeeswarar Temple",
        description:
          "A UNESCO World Heritage monument built during the Chola period and famous for its enormous vimana and magnificent stone architecture.",
        img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Thanjavur Palace",
        description:
          "A historic royal palace complex featuring courtyards, galleries, museums, and important artifacts from the Nayak and Maratha periods.",
        img: "https://media.istockphoto.com/id/1223785666/photo/old-maratha-palace-in-thanjavur-tamil-nadu-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=3axkDWdk7D-SyuoQM_HcjfqN3wx6arl_s61vMjpPSKA=",
      },
      {
        name: "Saraswathi Mahal Library",
        description:
          "A historic library containing rare manuscripts, palm-leaf documents, books, and important records from the region's royal history.",
        img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Gangaikonda Cholapuram",
        description:
          "A historic Chola capital famous for its magnificent temple and remarkable examples of Chola architecture.",
        img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Schwartz Church",
        description:
          "A historic church in Thanjavur associated with Christian missionary Christian Friedrich Schwartz and the city's colonial history.",
        img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  {
    name: "Rameswaram",
    km: "350 km",
    price: "3999",
    img: "https://images.unsplash.com/photo-1706932642959-97cdde19ef0b?w=600&auto=format&fit=crop&q=60",
    spots: [
      {
        name: "Ramanathaswamy Temple",
        description:
          "A famous pilgrimage temple known for its exceptionally long corridors, detailed stone pillars, and sacred water wells.",
        img: "https://images.unsplash.com/photo-1741798037832-6c0c86a6262a?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Pamban Bridge",
        description:
          "A famous bridge connecting mainland India with Rameswaram Island and offering spectacular views of the sea.",
        img: "https://images.unsplash.com/photo-1706932642959-97cdde19ef0b?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Dhanushkodi",
        description:
          "A remote coastal destination at the tip of Rameswaram Island, known for its dramatic beaches and historic ruins.",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Ariyaman Beach",
        description:
          "A peaceful beach destination with clear coastal scenery, suitable for relaxing away from busy tourist areas.",
        img: "https://images.unsplash.com/photo-1692700827093-f526f0b32923?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "APJ Abdul Kalam Memorial",
        description:
          "A memorial dedicated to former Indian President and scientist Dr. A.P.J. Abdul Kalam, showcasing his life and achievements.",
        img: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  {
    name: "Ooty",
    km: "270 km",
    price: "2899",
    img: "https://images.unsplash.com/photo-1660918738010-295b09857f93?q=80&w=702&auto=format&fit=crop",
    spots: [
      {
        name: "Ooty Lake",
        description:
          "A scenic artificial lake surrounded by greenery and eucalyptus trees, popular for boating and relaxing walks.",
        img: "https://images.unsplash.com/photo-1711553186754-0cfbdfe38b8d?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Doddabetta Peak",
        description:
          "The highest peak in the Nilgiri Hills, offering panoramic views of Ooty and the surrounding mountain landscape.",
        img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Botanical Garden",
        description:
          "A large landscaped garden containing a wide variety of plants, flowers, trees, and beautiful walking areas.",
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Rose Garden",
        description:
          "A beautiful terraced garden featuring a large collection of roses and colorful seasonal flowers.",
        img: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Pykara Lake",
        description:
          "A scenic lake surrounded by Nilgiri forests and hills, known for boating and the nearby Pykara waterfalls.",
        img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Nilgiri Mountain Railway",
        description:
          "A famous mountain railway offering a scenic journey through the Nilgiri Hills, tunnels, bridges, and lush valleys.",
        img: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  {
    name: "Tirupati",
    km: "450 km",
    price: "4799",
    img: "https://images.unsplash.com/photo-1733805569204-41768c7d8c0f?w=600&auto=format&fit=crop&q=60",
    spots: [
      {
        name: "Tirumala Venkateswara Temple",
        description:
          "One of India's most important pilgrimage destinations, dedicated to Lord Venkateswara and located on the Tirumala Hills.",
        img: "https://images.unsplash.com/photo-1733805569204-41768c7d8c0f?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Kapila Theertham",
        description:
          "A scenic sacred waterfall and temple located at the foot of the Tirumala Hills and dedicated to Lord Shiva.",
        img: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Sri Padmavathi Temple",
        description:
          "A major temple dedicated to Goddess Padmavathi, the consort of Lord Venkateswara, located in Tiruchanoor.",
        img: "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Silathoranam",
        description:
          "A natural rock arch located in the Tirumala Hills and considered an interesting geological attraction.",
        img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Akasa Ganga",
        description:
          "A sacred natural waterfall in the Tirumala Hills and an important religious attraction for pilgrims.",
        img: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  {
    name: "Munnar",
    km: "260 km",
    price: "2799",
    img: "https://images.unsplash.com/photo-1637066742971-726bee8d9f56?w=600&auto=format&fit=crop&q=60",
    spots: [
      {
        name: "Munnar Tea Gardens",
        description:
          "Beautiful rolling hills covered with green tea plantations, creating one of the most recognizable landscapes around Munnar.",
        img: "https://plus.unsplash.com/premium_photo-1697730334419-fba83fe143b7?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Eravikulam National Park",
        description:
          "A protected mountain park famous for the Nilgiri Tahr, grasslands, rolling hills, and seasonal Neelakurinji flowers.",
        img: "https://media.istockphoto.com/id/2222831805/photo/green-tea-tree-leaves-field-plant-in-camellia-sinensis-organic-farm-close-up-tree-tea.webp?a=1&b=1&s=612x612&w=0&k=20&c=WXTHH7J6h4LFSd-ALP0uyKqnCM5Aj0BMXtnWpKDAKL4=",
      },
      {
        name: "Mattupetty Dam",
        description:
          "A popular scenic destination surrounded by mountains, forests, and tea plantations, with boating available nearby.",
        img: "https://media.istockphoto.com/id/2222831805/photo/green-tea-tree-leaves-field-plant-in-camellia-sinensis-organic-farm-close-up-tree-tea.webp?a=1&b=1&s=612x612&w=0&k=20&c=WXTHH7J6h4LFSd-ALP0uyKqnCM5Aj0BMXtnWpKDAKL4=",
      },
      {
        name: "Echo Point",
        description:
          "A popular viewpoint where visitors can experience natural echoes across the surrounding mountain landscape.",
        img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Top Station",
        description:
          "A high-altitude viewpoint offering spectacular views of the Western Ghats and neighboring Tamil Nadu landscapes.",
        img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },

  {
    name: "Kodaikanal",
    km: "240 km",
    price: "2699",
    img: "https://images.unsplash.com/photo-1593692716621-1e228b0a9224?w=600&auto=format&fit=crop&q=60",
    spots: [
      {
        name: "Kodaikanal Lake",
        description:
          "A star-shaped artificial lake surrounded by green hills and one of the most popular attractions in Kodaikanal.",
        img: "https://images.unsplash.com/photo-1619020933389-e96f49742bce?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Coaker's Walk",
        description:
          "A scenic walking path along the mountain edge offering beautiful views of valleys, hills, and clouds.",
        img: "https://images.unsplash.com/photo-1692792284356-f80113facd09?w=600&auto=format&fit=crop&q=60",
      },
      {
        name: "Bryant Park",
        description:
          "A well-maintained botanical garden famous for colorful flowers, ornamental plants, trees, and landscaped pathways.",
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Pillar Rocks",
        description:
          "Three impressive rock formations standing high above the surrounding green valleys and frequently covered in mist.",
        img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=75",
      },
      {
        name: "Silver Cascade Falls",
        description:
          "A popular waterfall located along the Kodaikanal road, formed from the overflow of Kodaikanal Lake.",
        img: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=75",
      },
    ],
  },
];

export default function DestinationCards() {
  const [selectedCity, setSelectedCity] =
    useState<Destination | null>(null);

  const [slideIndex, setSlideIndex] = useState(0);

  const handleCityClick = (city: Destination) => {
    setSelectedCity(city);
    setSlideIndex(0);

    setTimeout(() => {
      document.getElementById("city-spots")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const nextSlide = () => {
    if (!selectedCity) return;

    setSlideIndex((current) =>
      current + 1 >= selectedCity.spots.length ? 0 : current + 1
    );
  };

  const previousSlide = () => {
    if (!selectedCity) return;

    setSlideIndex((current) =>
      current - 1 < 0
        ? selectedCity.spots.length - 1
        : current - 1
    );
  };

  return (
    <section className="w-full bg-gray-50 px-4 py-12 font-jakarta sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
            Popular Destinations
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Popular Taxi Destinations
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Choose your destination to view popular tourist places and cab
            fare details.
          </p>
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {destinations.map((d) => (
            <div
              key={d.name}
              className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Destination Image */}
              <div className="relative h-48 w-full overflow-hidden sm:h-52">
                <Image
                  src={d.img}
                  alt={`${d.name} taxi`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-4">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-800 shadow">
                    {d.km}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-5">
                <h3 className="text-xl font-bold text-gray-900">
                  {d.name}
                </h3>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin size={16} />
                    {d.km}
                  </span>

                  <span className="text-lg font-bold text-blue-700">
                    ₹{d.price}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCityClick(d)}
                  className="mt-5 w-full rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 active:scale-[0.98]"
                >
                  View Tourist Spots
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Selected City */}
        {selectedCity && (
          <div
            id="city-spots"
            className="mt-10 overflow-hidden rounded-2xl bg-white shadow-xl sm:mt-12 md:mt-14"
          >
            {/* Header */}
            <div className="bg-blue-700 px-5 py-7 text-white sm:px-8 sm:py-8 md:px-10">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-blue-100 sm:text-sm">
                <MapPin size={17} />
                Erode → {selectedCity.name}
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">
                Tourist Places in {selectedCity.name}
              </h2>

              <p className="mt-2 text-sm text-blue-100 sm:text-base">
                Explore popular tourist attractions with SBS Taxi.
              </p>
            </div>

            <div className="p-5 sm:p-7 md:p-10">

              {/* Fare Information */}
              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div className="rounded-xl bg-gray-50 p-5">
                  <div className="mb-2 flex items-center gap-2 text-gray-500">
                    <MapPin size={18} />
                    <p className="text-sm">Distance</p>
                  </div>

                  <p className="text-2xl font-bold text-gray-900">
                    {selectedCity.km}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-5">
                  <div className="mb-2 flex items-center gap-2 text-gray-500">
                    <IndianRupee size={18} />
                    <p className="text-sm">One Way Fare</p>
                  </div>

                  <p className="text-2xl font-bold text-blue-700">
                    ₹{selectedCity.price}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">Destination</p>

                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {selectedCity.name}
                  </p>
                </div>
              </div>

              {/* Tourist Spots Header */}
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Popular Tourist Spots
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Explore places to visit in {selectedCity.name}
                  </p>
                </div>

                {/* Desktop Slider Buttons */}
                <div className="hidden gap-2 sm:flex">
                  <button
                    type="button"
                    onClick={previousSlide}
                    aria-label="Previous tourist spot"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next tourist spot"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Slider */}
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${slideIndex * 100}%)`,
                  }}
                >
                  {selectedCity.spots.map((spot) => (
                    <div
                      key={spot.name}
                      className="w-full min-w-full shrink-0 px-0.5"
                    >
                      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                        {/* Spot Image */}
                        <div className="relative h-56 w-full sm:h-64 md:h-72">
                          <Image
                            src={spot.img}
                            alt={spot.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1000px"
                          />

                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 pt-20">
                            <h4 className="text-xl font-bold text-white sm:text-2xl">
                              {spot.name}
                            </h4>
                          </div>
                        </div>

                        {/* Spot Content */}
                        <div className="p-5 sm:p-6">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin
                              size={16}
                              className="text-blue-600"
                            />
                            {selectedCity.name}
                          </div>

                          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                            {spot.description}
                          </p>

                          <Link
                            href="/booking"
                            className="mt-5 block w-full rounded-lg bg-blue-700 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-800 active:scale-[0.98]"
                          >
                            Book Cab
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Slider Buttons */}
              <div className="mt-4 flex justify-center gap-3 sm:hidden">
                <button
                  type="button"
                  onClick={previousSlide}
                  aria-label="Previous tourist spot"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm transition active:scale-95"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next tourist spot"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm transition active:scale-95"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {selectedCity.spots.map((spot, index) => (
                  <button
                    type="button"
                    key={spot.name}
                    onClick={() => setSlideIndex(index)}
                    aria-label={`Go to ${spot.name}`}
                    className={`h-2 rounded-full transition-all ${
                      index === slideIndex
                        ? "w-7 bg-blue-700"
                        : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Booking CTA */}
              <div className="mt-8 flex flex-col gap-5 rounded-xl bg-gray-50 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 sm:text-xl">
                    Book a Cab to {selectedCity.name}
                  </h4>

                  <p className="mt-1 text-sm text-gray-600 sm:text-base">
                    Comfortable and reliable travel with SBS Taxi.
                  </p>
                </div>

                <Link
                  href="/booking"
                  className="w-full rounded-lg bg-blue-700 px-8 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-800 active:scale-[0.98] sm:w-auto"
                >
                  Book Now
                </Link>
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}
