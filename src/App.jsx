import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MapPin,
  CalendarDays,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

const romanticIcon = L.divIcon({
  className: "romantic-marker",
  html: `<div class="marker-glow"><div class="marker-heart">✦</div></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const trips = [
  {
    id: 1,
    title: "Hangzhou, China",
    date: "2026-05-09",
    address: "XiHu, Hangzhou",
    position: [30.255222, 120.163722],
    memory: "Sunset, walking by the lake, and a quiet moment we will remember.",
    photos: [
      "/images/2026-xihu-hangzhou-01.jpeg",
      "/images/2026-xihu-hangzhou-02.jpeg",
      "/images/2026-xihu-hangzhou-03.jpeg",
      "/images/2026-xihu-hangzhou-04.jpeg",
      "/images/2026-xihu-hangzhou-05.jpeg",
    ],
  },
  {
    id: 2,
    title: "Guangzhou, China",
    date: "2026-04-23 – 2026-04-28",
    address: "Canton, Guangzhou",
    position: [23.100556, 113.353611],
    memory:
      "Canton Fair, a little drunk, and an important decision we made together.",
    photos: [
      "/images/2026-cantonfair-01.jpeg",
      "/images/2026-cantonfair-02.jpeg",
    ],
  },
  {
    id: 3,
    title: "Hangzhou, China",
    date: "2026-05-01",
    address: "Hangzhou, Zhejiang",
    position: [30.271, 120.161],
    memory: "Stand-up comedy, laughter, and a night to remember.",
    photos: [
      "/images/2026-hangzhou-01.jpeg",
      "/images/2026-hangzhou-02.jpeg",
    ],
  },
  {
    id: 4,
    title: "Anji, China",
    date: "2026-05-01 – 2026-05-03",
    address: "Anji, Zhejiang",
    position: [30.635, 119.709],
    memory:
      "Three meals a day. We climbed a mountain at dawn and drank alcohol at the summit. Sunset. Riding a bike at midnight.",
    photos: [
      "/images/2026-anji-1-01.jpeg",
      "/images/2026-anji-1-02.jpeg",
      "/images/2026-anji-1-03.jpeg",
      "/images/2026-anji-1-04.jpeg",
      "/images/2026-anji-1-05.jpeg",
      "/images/2026-anji-1-06.jpeg",
      "/images/2026-anji-1-07.jpeg",
      "/images/2026-anji-1-08.jpeg",
      "/images/2026-anji-1-09.jpeg",
      "/images/2026-anji-1-10.jpeg",
      "/images/2026-anji-1-11.jpeg",
      "/images/2026-anji-1-12.jpeg",
      "/images/2026-anji-1-13.jpeg",
    ],
  },
  {
    id: 5,
    title: "Anji, China",
    date: "2026-05-16 – 2026-05-17",
    address: "Anji, Zhejiang",
    position: [30.569531, 119.535782],
    memory: "Holding hands, confessing love, and being in love.",
    photos: [
      "/images/2026-anji-2-01.jpeg",
      "/images/2026-anji-2-02.jpeg",
      "/images/2026-anji-2-03.jpeg",
      "/images/2026-anji-2-04.jpeg",
    ],
  },
];

export default function App() {
  const [showFilmIntro, setShowFilmIntro] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFilmIntro(false);
    }, 43000);

    return () => clearTimeout(timer);
  }, []);

  if (showFilmIntro) {
    return (
      <div className="film-intro-screen">
        <iframe
          src="/film/index.html"
          title="A Quiet Film for Maggie"
          className="film-intro-frame"
        />

        <button
          className="film-skip-button"
          onClick={() => setShowFilmIntro(false)}
        >
          Enter Our Journey
        </button>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-card"
        >
          <div className="eyebrow">
            <Heart size={16} />
            A private map of us
          </div>

          <h1>Our Journey Around the World</h1>

          <p>
            A soft, romantic travel memory map for the places we have been, the
            days we want to remember, and the little stories that belong only to
            us.
          </p>

          <div className="hero-actions">
            <a href="#map" className="hero-button">
              Enter Our Map
            </a>

            <button
              className="hero-button secondary-button"
              onClick={() => setShowFilmIntro(true)}
            >
              Replay the Film
            </button>
          </div>
        </motion.div>
      </section>

      <section id="map" className="map-section">
        <div className="section-title">
          <p>Travel Memory Map</p>
          <h2>Every light marks a moment</h2>
        </div>

        <div className="map-frame">
          <MapContainer
            center={[25, 10]}
            zoom={2}
            minZoom={2}
            scrollWheelZoom={true}
            className="memory-map"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {trips.map((trip) => (
              <Marker
                key={trip.id}
                position={trip.position}
                icon={romanticIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedTrip(trip);
                    setCurrentPhotoIndex(0);
                  },
                }}
              />
            ))}
          </MapContainer>
        </div>
      </section>

      <AnimatePresence>
        {selectedTrip && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="memory-card"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.35 }}
            >
              <button
                className="close-button"
                onClick={() => setSelectedTrip(null)}
              >
                <X size={20} />
              </button>

              <div className="photo-slider">
                <img
                  src={selectedTrip.photos[currentPhotoIndex]}
                  alt={`${selectedTrip.title} ${currentPhotoIndex + 1}`}
                  className="photo-main"
                />

                {selectedTrip.photos.length > 1 && (
                  <>
                    <button
                      className="slider-button slider-button-left"
                      onClick={() =>
                        setCurrentPhotoIndex((prev) =>
                          prev === 0 ? selectedTrip.photos.length - 1 : prev - 1
                        )
                      }
                    >
                      <ChevronLeft size={22} />
                    </button>

                    <button
                      className="slider-button slider-button-right"
                      onClick={() =>
                        setCurrentPhotoIndex((prev) =>
                          prev === selectedTrip.photos.length - 1 ? 0 : prev + 1
                        )
                      }
                    >
                      <ChevronRight size={22} />
                    </button>

                    <div className="photo-counter">
                      {currentPhotoIndex + 1} / {selectedTrip.photos.length}
                    </div>
                  </>
                )}
              </div>

              <div className="memory-content">
                <h3>{selectedTrip.title}</h3>

                <div className="memory-meta">
                  <span>
                    <CalendarDays size={16} />
                    {selectedTrip.date}
                  </span>
                  <span>
                    <MapPin size={16} />
                    {selectedTrip.address}
                  </span>
                </div>

                <p>{selectedTrip.memory}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}