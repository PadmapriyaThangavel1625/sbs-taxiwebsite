import Image from "next/image";

const destinations = [
  {
    name: "Madurai",
    km: "220 km",
    price: "2499",
    img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220",
  },
  {
    name: "Kanyakumari",
    km: "310 km",
    price: "3499",
    img: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33",
  },
  {
    name: "Coimbatore",
    km: "150 km",
    price: "1999",
    img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b",
  },
  {
    name: "Courtallam",
    km: "160 km",
    price: "1999",
    img: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
  },
  {
    name: "Tiruchendur",
    km: "200 km",
    price: "2399",
    img: "https://images.unsplash.com/photo-1548013146-72479768bada",
  },
  {
    name: "Trichy",
    km: "330 km",
    price: "3399",
    img: "https://images.unsplash.com/photo-1590766940559-9f4c8e7e8e7c",
  },
  {
    name: "Thanjavur",
    km: "300 km",
    price: "3199",
    img: "https://images.unsplash.com/photo-1587135941948-670b381f08ce",
  },
  {
    name: "Rameswaram",
    km: "350 km",
    price: "3999",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  {
    name: "Ooty",
    km: "270 km",
    price: "2899",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    name: "Tirupati",
    km: "450 km",
    price: "4799",
    img: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16",
  },
  {
    name: "Munnar",
    km: "260 km",
    price: "2799",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    name: "Kodaikanal",
    km: "240 km",
    price: "2699",
    img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
  },
];

export default function DestinationCards() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {destinations.map((d) => (
          <div
            key={d.name}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <div className="relative h-56">
              <Image
                src={d.img}
                alt={d.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900">
                {d.name}
              </h3>

              <div className="flex items-center justify-between mt-3">
                <span className="text-gray-500">{d.km}</span>

                <span className="text-lg font-bold text-blue-700">
                  ₹{d.price}
                </span>
              </div>

              <button className="w-full mt-5 bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}