import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  ExternalLink, 
  Menu, 
  X, 
  Home, 
  Users, 
  Award, 
  Filter, 
  MessageSquare, 
  Calendar, 
  ArrowUpRight, 
  ShieldCheck, 
  Building2,
  ThumbsUp,
  Clock3
} from 'lucide-react';

// Property interface
interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  badge: 'Dla 1 osoby' | 'Dla pary' | 'Dla rodziny';
  type: 'pokoj' | 'dom';
  locationTag: 'Vlijmen' | 'Wijk en Aalburg';
  details: string[];
  images: string[];
  whatsappMessage: string;
}

// Properties array built exactly from user specifications
const PROPERTIES_DATA: Property[] = [
  {
    id: '1',
    title: 'Przytulny Pokój w Vlijmen (przy rzece Maas)',
    location: 'Vlijmen, Holandia, 5251PS • Nad rzeką Maas',
    price: '800€/miesiąc',
    badge: 'Dla 1 osoby',
    type: 'pokoj',
    locationTag: 'Vlijmen',
    details: [
      'Lokalizacja: piętro, komfortowy dom dzielony z 3 innymi pokojami',
      'Dostęp do 2 nowoczesnych łazienek, 2 pralek oraz 2 profesjonalnych suszarek',
      'W pełni umeblowany, świeżo odmalowany i gotowy do natychmiastowego zamieszkania',
      'Pełna możliwość meldunku oraz akceptacja zwierząt domowych',
      'Prywatny parking przeznaczony wyłącznie dla mieszkańców',
      'Malownicze położenie bezpośrednio nad piękną rzeką Maas'
    ],
    images: [
      'https://i.ibb.co/Z56sjPZ/693193402-122174536988745402-1124531587338895123-n.jpg',
      'https://i.ibb.co/27f4HjCb/696392160-122174537144745402-1601573533107116794-n.jpg',
      'https://i.ibb.co/DgMx3bFD/692617923-122174537084745402-7825885940490305278-n.jpg',
      'https://i.ibb.co/Sw5HmnJK/690852952-122174536952745402-5302897202419658099-n.jpg',
      'https://i.ibb.co/B5vB8mSq/692825455-122174537132745402-3013484265911457340-n.jpg',
      'https://i.ibb.co/LXxCSckg/692996026-122174537180745402-4644031422890302172-n.jpg',
      'https://i.ibb.co/Q3Nrn2ZZ/696372702-122174537120745402-7505068179598895934-n.jpg',
      'https://i.ibb.co/rKXhm5KV/696350339-122174537042745402-5960275980705498624-n.jpg',
      'https://i.ibb.co/W4pqBSkv/695261482-122174536970745402-5211986314975425452-n.jpg',
      'https://i.ibb.co/6JXpQtxr/692477273-122174537162745402-7806474877672428098-n.jpg',
      'https://i.ibb.co/k2GH76z2/694749465-122174537192745402-8073714001093103588-n.jpg'
    ],
    whatsappMessage: 'Dzień dobry, piszę w sprawie oferty: Pokój w Vlijmen za 800€/miesiąc. Interesuje mnie wynajem i spotkanie w celu obejrzenia pokoju.'
  },
  {
    id: '2',
    title: 'Komfortowy Pokój w Wijk en Aalburg (przy rzece Maas)',
    location: 'Wijk en Aalburg, Holandia • Nad rzeką Maas',
    price: '600€/miesiąc',
    badge: 'Dla pary',
    type: 'pokoj',
    locationTag: 'Wijk en Aalburg',
    details: [
      'Lokalizacja: parter, dom z 4 przestronnymi pokojami na piętrze',
      'Klimatyczne, komfortowo urządzone wnętrza na parterze',
      'Dostęp do 2 wspólnych łazienek, 2 pralek oraz 2 profesjonalnych suszarek',
      'W pełni umeblowany, profesjonalnie odmalowany, gotowy do wprowadzenia',
      'Pewna możliwość meldunku na terenie Holandii oraz posiadania zwierząt',
      'Szybki i wygodny prywatny parking przy budynku',
      'Atrakcyjne sąsiedztwo natury bezpośrednio nad rzeką Maas'
    ],
    images: [
      'https://i.ibb.co/rKXhm5KV/696350339-122174537042745402-5960275980705498624-n.jpg',
      'https://i.ibb.co/6JXpQtxr/692477273-122174537162745402-7806474877672428098-n.jpg',
      'https://i.ibb.co/W4pqBSkv/695261482-122174536970745402-5211986314975425452-n.jpg',
      'https://i.ibb.co/Q3Nrn2ZZ/696372702-122174537120745402-7505068179598895934-n.jpg',
      'https://i.ibb.co/ynjmnfzV/692067799-122174535620745402-3501731330292584255-n.jpg',
      'https://i.ibb.co/0pCNFYyB/692824599-122174535644745402-7770527746579369398-n.jpg',
      'https://i.ibb.co/NQx3xWQ/691075444-122174535794745402-752147996453102425-n.jpg',
      'https://i.ibb.co/KcfBtfYt/692856335-122174535728745402-3187533253751674494-n.jpg',
      'https://i.ibb.co/Cp5DFTwK/697197929-122174535686745402-799491291013303766-n.jpg',
      'https://i.ibb.co/xtcj1Zmv/695990111-122174535632745402-6061246845227560678-n.jpg'
    ],
    whatsappMessage: 'Dzień dobry, piszę w sprawie oferty: Pokój w Wijk en Aalburg za 600€/miesiąc. Chcę ustalić szczegóły i zapytać o wolny termin.'
  },
  {
    id: '3',
    title: 'Ekskluzywny Domek w pierwszej linii brzegowej',
    location: 'Nad brzegiem rzeki Maas, Holandia • Luksusowa strefa',
    price: '1700€/miesiąc + media',
    badge: 'Dla rodziny',
    type: 'dom',
    locationTag: 'Vlijmen', // Centered in the general river area
    details: [
      'Dwie osobne sypialnie (duża sypialnia główna oraz mniejszy pokój dziecięcy/gościnny)',
      'Przestronna kuchnia z wyznaczonym optymalnym miejscem na stół jadalniany',
      'Piękny, otwarty salon oświetlony naturalnym światłem z widokiem bezpośrednio na rzekę',
      'Komfortowa łazienka wyposażona w prysznic oraz relaksującą wannę',
      'Oddzielne, wysoce funkcjonalne pomieszczenie gospodarcze/schowek',
      'Wbudowana klimatyzacja z funkcją grzania i chłodzenia, dom w połowie umeblowany',
      'Fascynująca możliwość bezpośredniego wodowania łódki – idealna propozycja dla pasjonatów wędkarstwa',
      'Młody, bezpieczny plac zabaw zlokalizowany bezpośrednio przed domem',
      'Darmowy dedykowany parking dla samochodów mieszkańców',
      'Akceptacja zwierząt domowych (psy i koty są mile widziane)',
      'Wymagana kaucja zwrotna w wysokości 1-miesięcznego czynszu oraz jednorazowe koszty pośredniczące (równowartość 1 czynszu)',
      'Profesjonalny proces – aktywnie pomagamy w uzyskaniu państwowego dofinansowania do mieszkania (huurtoeslag)',
      'Bezpieczna i prosta umowa najmu bez zbędnego rygoru i wymogu stałego kontraktu o pracę'
    ],
    images: [
      'https://i.ibb.co/xtXc5hyS/687679049-122174065448745402-8925801754916666838-n.jpg',
      'https://i.ibb.co/wrzWwSMv/687030760-122174065550745402-5867217053830144772-n.jpg',
      'https://i.ibb.co/Ndnv2j9Q/686912957-122174065250745402-6051859995890343468-n.jpg',
      'https://i.ibb.co/8Lz4G104/689865854-122174065568745402-7118098547666226357-n.jpg',
      'https://i.ibb.co/TDxdG2Kr/688836623-122174065340745402-8914256483344264559-n.jpg',
      'https://i.ibb.co/1Y8n2Bz6/689398968-122174065508745402-8500340613078118593-n.jpg',
      'https://i.ibb.co/ZvMdcbH/690832849-122174065262745402-4942177590842974745-n.jpg',
      'https://i.ibb.co/kVxg4wsv/689482459-122174065388745402-6880193423706372148-n.jpg',
      'https://i.ibb.co/WvwLcHFf/687856793-122174065526745402-5057373141977372340-n.jpg',
      'https://i.ibb.co/YT8wRRn9/688845548-12217406418745402-2749057847031494799-n.jpg', // safe fix for slightly malformed links
      'https://i.ibb.co/p6LGZ204/687479831-122174065460745402-4916092269307486798-n.jpg',
      'https://i.ibb.co/6SXNVBc/688186105-122174065430745402-1638065674723089762-n.jpg',
      'https://i.ibb.co/k29Cjcm0/687668797-122174065226745402-349016259671803893-n.jpg',
      'https://i.ibb.co/QFMyPm6W/686964461-122174065604745402-3350255368297466555-n.jpg'
    ],
    whatsappMessage: 'Dzień dobry, piszę w sprawie oferty: Ekskluzywny Domek w pierwszej linii brzegowej za 1700€/miesiąc. Chcę zapytać o warunki najmu i spotkanie.'
  }
];

// Reusable Multi-Image Carousel Component with pause-on-hover & auto-play
interface CarouselProps {
  images: string[];
  autoplayInterval?: number;
  onImageClick: (index: number) => void;
}

function ImageCarousel({ images, autoplayInterval = 4000, onImageClick }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const key = useMemoKey(index);

  const nextImage = useCallback(() => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevImage = useCallback(() => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    if (!isPaused) {
      timer.current = setInterval(nextImage, autoplayInterval);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [isPaused, nextImage, autoplayInterval]);

  return (
    <div 
      className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-950 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Active slide layout */}
      <div 
        className="w-full h-full bg-cover bg-center transition-all duration-700 ease-out cursor-zoom-in"
        style={{ backgroundImage: `url(${images[index]})` }}
        onClick={() => onImageClick(index)}
      />

      {/* Floating photo index helper */}
      <span className="absolute bottom-4 left-4 z-10 px-3 py-1 bg-black/75 backdrop-blur-md rounded-full text-[11px] font-mono font-medium text-gold border border-gold/10">
        {index + 1} / {images.length} pokój
      </span>

      {/* Navigation arrows (fade-in on hover) */}
      <button 
        onClick={(e) => { e.stopPropagation(); prevImage(); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 hover:bg-gold/95 hover:text-black text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-105"
        style={{ contentVisibility: 'auto' }}
        aria-label="Poprzednie zdjęcie"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); nextImage(); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 hover:bg-gold/95 hover:text-black text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-105"
        style={{ contentVisibility: 'auto' }}
        aria-label="Następne zdjęcie"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slider dots indicators in gold */}
      <div className="absolute bottom-4 right-4 z-10 flex gap-1.5 bg-black/40 backdrop-blur-sm p-1.5 rounded-full">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setIndex(i); }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === index ? 'bg-gold w-3' : 'bg-neutral-500 hover:bg-neutral-300'}`}
            aria-label={`Zdjęcie numer ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Custom hook to trigger static memo keys safely
function useMemoKey(val: any) {
  const [key, setKey] = useState(0);
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [val]);
  return key;
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<'wszystkie' | 'pokoj' | 'dom'>('wszystkie');
  const [locationFilter, setLocationFilter] = useState<'wszystkie' | 'Vlijmen' | 'Wijk en Aalburg'>('wszystkie');
  const [expandedProps, setExpandedProps] = useState<Record<string, boolean>>({});
  
  // Lightbox Modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxProperty, setLightboxProperty] = useState<Property | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Form submission state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    property: 'Ogólne zapytanie',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filter listings based on hooks
  const filteredProperties = PROPERTIES_DATA.filter((prop) => {
    const matchesType = typeFilter === 'wszystkie' || prop.type === typeFilter;
    const matchesLoc = locationFilter === 'wszystkie' || prop.locationTag === locationFilter;
    return matchesType && matchesLoc;
  });

  // Track window scroll positioning to apply glass backdrop navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver effect to trigger fade-in animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [filteredProperties, typeFilter, locationFilter]); // Re-observe when items refresh

  const handleLightboxOpen = (property: Property, index: number) => {
    setLightboxProperty(property);
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextLightboxImage = () => {
    if (!lightboxProperty) return;
    setLightboxIndex((prev) => (prev === lightboxProperty.images.length - 1 ? 0 : prev + 1));
  };

  const prevLightboxImage = () => {
    if (!lightboxProperty) return;
    setLightboxIndex((prev) => (prev === 0 ? lightboxProperty.images.length - 1 : prev - 1));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    setIsSubmitting(true);
    // Simulate beautiful server response after 1.5 seconds
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="font-sans antialiased text-gray-200 bg-[#060606] min-h-screen selection:bg-gold selection:text-black">
      
      {/* 1. STICKY NAVIGATION BAR */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-glass shadow-xl py-3 border-b border-gold/10' : 'bg-transparent py-6 border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between font-display">
            
            {/* Logo area with classic wide-tracking elite styling */}
            <a href="#" className="flex flex-col group py-1">
              <span className="text-2xl font-serif font-light tracking-[0.25em] text-white group-hover:text-gold transition-colors duration-300">
                HERBOT
              </span>
              <span className="text-[9px] tracking-[0.18em] font-medium text-gold/80 group-hover:text-white transition-colors duration-300 uppercase mt-1">
                Wynajem Nieruchomości • Holandia
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-10 font-normal">
              <a href="#oferty" className="text-gray-300 hover:text-gold tracking-[0.15em] transition-colors duration-300 text-xs uppercase font-medium">Oferty</a>
              <a href="#o-nas" className="text-gray-300 hover:text-gold tracking-[0.15em] transition-colors duration-300 text-xs uppercase font-medium">O nas</a>
              <a href="#jak-dziala" className="text-gray-300 hover:text-gold tracking-[0.15em] transition-colors duration-300 text-xs uppercase font-medium">Jak to działa?</a>
              <a href="#kontakt" className="text-gray-300 hover:text-gold tracking-[0.15em] transition-colors duration-300 text-xs uppercase font-medium">Kontakt</a>
            </nav>

            {/* CTA Buttons in Navbar (WhatsApp) */}
            <div className="hidden md:flex items-center">
              <a 
                href="https://wa.me/31612368084" 
                target="_blank" 
                rel="noreferrer noopener"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-gold via-gold-light to-gold-dark hover:brightness-110 hover:scale-[1.02] text-black font-semibold text-xs tracking-wider rounded-lg shadow-lg shadow-gold/5 transition-all duration-300 uppercase"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-black/10" />
                <span>+31 6 12368084</span>
              </a>
            </div>

            {/* Mobile menu trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 text-gray-300 hover:text-gold focus:outline-none transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 border border-gold/20 p-1 rounded-sm" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Sidebar Slide-down */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-[#0e0e0e]/95 backdrop-blur-xl border-b border-gold/10 transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
          <div className="px-4 py-6 space-y-4 flex flex-col justify-center items-center text-center">
            <a 
              href="#oferty" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg text-gray-300 hover:text-gold transition-all block w-full py-2 font-display uppercase font-semibold"
            >
              Oferty
            </a>
            <a 
              href="#o-nas" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg text-gray-300 hover:text-gold transition-all block w-full py-2 font-display uppercase font-semibold"
            >
              O nas
            </a>
            <a 
              href="#jak-dziala" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg text-gray-300 hover:text-gold transition-all block w-full py-2 font-display uppercase font-semibold"
            >
              Jak to działa?
            </a>
            <a 
              href="#kontakt" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg text-gray-300 hover:text-gold transition-all block w-full py-2 font-display uppercase font-semibold"
            >
              Kontakt
            </a>
            <div className="pt-4 border-t border-gray-800 w-full max-w-xs">
              <a 
                href="https://wa.me/31612368084" 
                target="_blank" 
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2.5 w-full py-3 bg-gradient-to-r from-gold to-gold-dark text-black font-bold rounded-full hover:scale-105 transition-all text-sm uppercase tracking-wider shadow-lg shadow-gold/10"
              >
                <MessageSquare className="w-4 h-4" />
                <span>+31 6 12368084</span>
              </a>
            </div>
          </div>
        </div>
      </header>


      {/* 2. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 px-4 bg-[#050505]">
        
        {/* Background Image with Premium Dark Overlay & Lighting */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.ibb.co/S4svrMFB/Professional-architectural-photoshoot-of-a-202605300951.jpg" 
            alt="Herbot Premium Architecture" 
            className="w-full h-full object-cover opacity-50 filter brightness-75 contrast-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-[#050505]/65" />
        </div>

        {/* Luxury Gold and Dark Art Deco Geometric Background Shapes */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          {/* Glowing Radial Backgrounds */}
          <div className="absolute top-[18%] left-[15%] w-[55vw] h-[55vw] rounded-full bg-radial from-gold-dark/20 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[10%] right-[5%] w-[45vw] h-[45vw] rounded-full bg-radial from-gold-light/10 to-transparent blur-3xl" />
          
          {/* CSS Geometric Grid & Lines */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(ellipse at center, rgba(238, 208, 117, 0.08) 0%, transparent 80%), linear-gradient(rgba(238, 208, 117, 0.012) 1px, transparent 1px) `,
            backgroundSize: `100% 100%, 54px 54px`
          }} />
          
          {/* Diagonal Line Accents representing high Architectural Craft */}
          <div className="absolute top-0 right-0 w-[50vw] h-[100vh] border-l border-gold/5 -skew-x-12 transform origin-top-right" />
          <div className="absolute bottom-0 left-0 w-[35vw] h-[80vh] border-r border-gold/5 skew-x-12 transform origin-bottom-left" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 py-20">
          
          {/* Premium Luxury Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7.5xl font-serif font-light tracking-wide text-white mb-8 leading-[1.12]">
            Odkryj nową definicję <br />
            <span className="gold-shine-text font-serif font-semibold italic">
              komfortu w Holandii
            </span>
          </h1>

          {/* Subheadline and Subtitle */}
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Prestiżowy wynajem w pełni wyposażonych pokoi oraz domów nad rzeką Maas we Vlijmen i Wijk en Aalburg.
            Gwarantowana zgodność prawna, meldunek w gminie, brak rygoru zatrudnienia oraz bezpieczne wsparcie biura <span className="text-white font-medium border-b border-gold/30">Herbot</span>.
          </p>

          {/* Two Interactive CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 max-w-md mx-auto sm:max-w-none">
            <a 
              href="#oferty" 
              className="w-full sm:w-auto px-10 py-4.5 bg-gradient-to-r from-gold via-gold-light to-gold-dark text-black font-extrabold uppercase text-xs tracking-wider rounded-lg shadow-xl shadow-gold/5 hover:brightness-105 hover:scale-[1.02] transform transition-all duration-300"
            >
              Eksploruj Rezydencje
            </a>
            <a 
              href="https://wa.me/31612368084" 
              target="_blank" 
              rel="noreferrer noopener"
              className="w-full sm:w-auto px-10 py-4.5 bg-neutral-950/40 border border-gold/25 text-gold hover:bg-gold hover:text-black font-extrabold uppercase text-xs tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4 fill-transparent hover:fill-current" />
              <span>Konsultacja WhatsApp</span>
            </a>
          </div>


        </div>

        {/* Diagonal Wave Border Separation */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>


      {/* 3. ABOUT SECTION */}
      <section id="o-nas" className="py-24 bg-[#080808] relative scroll-mt-20 gold-backlight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Description Column */}
            <div className="lg:col-span-7 reveal-on-scroll">
              <div className="border-l border-gold pl-6 mb-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-medium font-mono">Kim Jesteśmy</span>
                <h2 className="text-3xl sm:text-5xl font-serif font-light text-white mt-1.5 tracking-tight leading-tight">
                  Herbot Wynajem <span className="font-serif font-semibold italic text-gold-light">Nieruchomości</span>
                </h2>
              </div>
              
              <div className="text-gray-300 space-y-6 text-sm sm:text-base leading-relaxed font-light mt-10">
                <p>
                  Jesteśmy dynamicznie rozwijającym się partnerem premium na rynku mieszkaniowym w Holandii. 
                  Specjalizujemy się w wynajmie gruntownie odnowionych, w pełni umeblowanych i wyposażonych 
                  pokoi dla singli, par oraz rodzin, a także luksusowych domów jednorodzinnych położonych w malowniczej strefie 
                  bezpośrednio nad brzegiem rzeki Maas w okolicach <span className="text-white font-medium">Vlijmen</span> oraz <span className="text-white font-medium">Wijk en Aalburg</span>.
                </p>
                <p>
                  Rozumiemy wyzwania, z jakimi wiąże się poszukiwanie stabilnego lokum za granicą. 
                  Dlatego eliminujemy bariery: <span className="text-gold font-medium">gwarantujemy możliwość legalnego meldunku</span> w holenderskiej gminie od pierwszego dnia, 
                  akceptujemy obecność zwierząt domowych, a nasze umowy sporządzamy bez rygorystycznego wymogu stałego kontraktu o pracę.
                </p>
                <p>
                  Naszym najemcom zapewniamy profesjonalne wsparcie merytoryczne i organizacyjne, pomagając między innymi w łatwym 
                  uzyskaniu dofinansowania państwowego do czynszu (<span className="text-white font-medium">huurtoeslag</span>). 
                  Wybierając markę Herbot, zyskujesz pewność, uczciwość oraz wysoki standard opieki rezydenckiej Euro Port.
                </p>
              </div>

              {/* Three Elegant Stat Cards Container */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12">
                <div className="p-6 bg-[#0c0c0c] border border-neutral-900 hover:border-gold/20 rounded-lg transition-all duration-300">
                  <div className="p-2.5 bg-gold/10 inline-block rounded text-gold mb-4">
                    <Users className="w-5 h-5 font-light" />
                  </div>
                  <div className="text-2xl font-light text-white font-display tracking-tight">100%</div>
                  <div className="text-[10px] uppercase tracking-wider text-gold font-medium mt-1.5 font-mono">Pełne Zaufanie</div>
                  <p className="text-[11px] text-gray-500 mt-2 font-light leading-relaxed">Setki zadowolonych Polaków i obcokrajowców</p>
                </div>

                <div className="p-6 bg-[#0c0c0c] border border-neutral-900 hover:border-gold/20 rounded-lg transition-all duration-300">
                  <div className="p-2.5 bg-gold/10 inline-block rounded text-gold mb-4">
                    <Home className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-light text-white font-display tracking-tight">Premium</div>
                  <div className="text-[10px] uppercase tracking-wider text-gold font-medium mt-1.5 font-mono">Standard Lokali</div>
                  <p className="text-[11px] text-gray-500 mt-2 font-light leading-relaxed">Własne, profesjonalnie odrestaurowane zasoby</p>
                </div>

                <div className="p-6 bg-[#0c0c0c] border border-neutral-900 hover:border-gold/20 rounded-lg transition-all duration-300">
                  <div className="p-2.5 bg-gold/10 inline-block rounded text-gold mb-4">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-light text-white font-display tracking-tight">Kompleksowa</div>
                  <div className="text-[10px] uppercase tracking-wider text-gold font-medium mt-1.5 font-mono">Obsługa Prawna</div>
                  <p className="text-[11px] text-gray-500 mt-2 font-light leading-relaxed">Znajomość procedur rynkowych i pomoc w meldunku</p>
                </div>
              </div>
            </div>

            {/* Right Dedicated Concierge panel */}
            <div className="lg:col-span-5 reveal-on-scroll">
              <div className="bg-neutral-950 p-6 sm:p-8 rounded-lg border border-gold/15 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl" />
                
                <span className="text-[10px] font-mono font-medium text-gold uppercase tracking-[0.2em] block mb-2">Concierge & Wsparcie</span>
                <h3 className="text-xl font-display font-light text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                  <Clock className="text-gold w-4 h-4" />
                  Obsługa Rezydentów
                </h3>
                
                <p className="text-xs text-gray-400 mb-6 leading-relaxed font-light">
                  Nasze biuro obsługi klienta we Vlijmen jest do Twojej ciągłej dyspozycji przez 7 dni w tygodniu. Skontaktuj się w celu rezerwacji prezentacji.
                </p>

                {/* Elegant Minimal Hours Grid */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-900">
                    <span className="font-light text-sm text-gray-300">Poniedziałek – Piątek</span>
                    <span className="text-gold font-mono font-bold bg-neutral-900 px-3 py-1 rounded text-xs border border-neutral-850">09:00 – 20:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-900">
                    <span className="font-light text-sm text-gray-300">Sobota</span>
                    <span className="text-gold font-mono font-bold bg-neutral-900 px-3 py-1 rounded text-xs border border-neutral-850">09:00 – 20:30</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-light text-sm text-gray-300">Niedziela</span>
                    <span className="text-gold font-mono font-bold bg-neutral-900 px-3 py-1 rounded text-xs border border-neutral-850">09:00 – 20:00</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-900 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded bg-gold/10 flex items-center justify-center text-gold">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-gray-500 font-mono">Status biura</div>
                      <div className="text-xs font-medium text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Online & Rezerwacje
                      </div>
                    </div>
                  </div>
                  <a 
                    href="#kontakt" 
                    className="text-[10px] text-gold hover:text-white flex items-center gap-1 font-bold group uppercase tracking-widest transition-colors duration-300"
                  >
                    <span>Skonsultuj</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* 4. PROPERTY LISTINGS SECTION ("Nasze Oferty") */}
      <section id="oferty" className="py-24 bg-[#050505] relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header area with luxury thin design */}
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-medium font-mono">Wyselekcjonowane Nieruchomości</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-white mt-2 mb-4 tracking-tight leading-tight">
              Nasze Rezydencje <span className="font-serif font-semibold italic text-gold-light">& Pokoje</span>
            </h2>
            <p className="text-sm text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
              Przeglądaj unikalne oferty zakwaterowania w Holandii bezpośrednio przy dolinie rzeki Maas. 
              Pełny meldunek gminny, wysoki standard wykończenia i przyjazne procedury.
            </p>
          </div>

          {/* Interactive filter toolbar */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-[#0d0d0d] border border-neutral-900/80 rounded-lg mb-12 max-w-4xl mx-auto reveal-on-scroll">
            
            <div className="flex items-center gap-2.5">
              <Filter className="w-4 h-4 text-gold" style={{ contentVisibility: 'auto' }} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono">Filtr Kolekcji</span>
            </div>

            {/* Filters layout */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              
              {/* Type Category Filter */}
              <div className="flex p-0.5 bg-black/60 rounded-md border border-neutral-900">
                <button
                  onClick={() => setTypeFilter('wszystkie')}
                  className={`px-3 py-1.5 rounded-sm text-[10px] font-semibold uppercase tracking-widest transition-all ${typeFilter === 'wszystkie' ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}
                >
                  Wszystkie
                </button>
                <button
                  onClick={() => setTypeFilter('pokoj')}
                  className={`px-3 py-1.5 rounded-sm text-[10px] font-semibold uppercase tracking-widest transition-all ${typeFilter === 'pokoj' ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}
                >
                  Pokoje
                </button>
                <button
                  onClick={() => setTypeFilter('dom')}
                  className={`px-3 py-1.5 rounded-sm text-[10px] font-semibold uppercase tracking-widest transition-all ${typeFilter === 'dom' ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}
                >
                  Domy
                </button>
              </div>

              {/* Location Tag Filter */}
              <div className="flex p-0.5 bg-black/60 rounded-md border border-neutral-900">
                <button
                  onClick={() => setLocationFilter('wszystkie')}
                  className={`px-3 py-1.5 rounded-sm text-[10px] font-semibold uppercase tracking-widest transition-all ${locationFilter === 'wszystkie' ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}
                >
                  Cała Holandia
                </button>
                <button
                  onClick={() => setLocationFilter('Vlijmen')}
                  className={`px-3 py-1.5 rounded-sm text-[10px] font-semibold uppercase tracking-widest transition-all ${locationFilter === 'Vlijmen' ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}
                >
                  Vlijmen
                </button>
                <button
                  onClick={() => setLocationFilter('Wijk en Aalburg')}
                  className={`px-3 py-1.5 rounded-sm text-[10px] font-semibold uppercase tracking-widest transition-all ${locationFilter === 'Wijk en Aalburg' ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}
                >
                  Wijk en Aalburg
                </button>
              </div>

            </div>
          </div>

          {/* Properties listings grid rendering */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((prop) => (
                <div 
                  key={prop.id}
                  className="bg-neutral-950 overflow-hidden rounded-lg border border-neutral-900/80 group shadow-2xl hover:border-gold/30 hover:shadow-[0_0_50px_-12px_rgba(238,208,117,0.1)] transition-all duration-500 flex flex-col h-full relative"
                >
                  {/* Premium Tag for Luxury look */}
                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                    <span className="text-[9px] uppercase font-mono tracking-[0.2em] font-medium text-gold bg-black/85 border border-gold/20 px-2.5 py-1 rounded">
                      {prop.badge}
                    </span>
                  </div>

                  {/* Embedded Custom JS Image Carousel with arrow elements */}
                  <ImageCarousel 
                    images={prop.images} 
                    onImageClick={(index) => handleLightboxOpen(prop, index)} 
                  />

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-gold-light font-bold">
                        {prop.type === 'dom' ? 'Cały Dom Premium' : 'Apartament Wspólny'}
                      </span>
                      <span className="text-base font-light font-serif text-white border-b border-gold/20 pb-0.5 tracking-wide">
                        {prop.price}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-light text-white mb-2.5 leading-snug tracking-wide group-hover:text-gold transition-colors duration-300">
                      {prop.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 font-mono font-medium">
                      <MapPin className="stroke-gold w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{prop.location}</span>
                    </div>

                    {/* Specifications checklist in Polish */}
                    <ul className="space-y-3.5 mb-5 text-xs text-gray-300 flex-grow font-light">
                      {prop.details.slice(0, expandedProps[prop.id] ? prop.details.length : 6).map((detail, index) => (
                        <li key={index} className="flex items-start gap-2.5 leading-relaxed">
                          <Check className="stroke-gold w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {prop.details.length > 6 && (
                      <button 
                        onClick={() => setExpandedProps(prev => ({ ...prev, [prop.id]: !prev[prop.id] }))}
                        className="text-[10px] text-gold hover:text-white mb-6 uppercase tracking-widest font-mono font-medium flex items-center gap-1.5 transition-colors duration-300 cursor-pointer self-start"
                      >
                        {expandedProps[prop.id] ? '▲ Ukryj szczegóły' : `▼ Zobacz wszystkie udogodnienia (+${prop.details.length - 6})`}
                      </button>
                    )}

                    {/* Pre-formatted WhatsApp CTA and contact links */}
                    <div className="pt-5 border-t border-neutral-900 space-y-3">
                      <a 
                        href={`https://wa.me/31612368084?text=${encodeURIComponent(prop.whatsappMessage)}`} 
                        target="_blank" 
                        rel="noreferrer noopener"
                        className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-gradient-to-r from-gold via-gold-light to-gold-dark hover:brightness-105 text-black font-extrabold uppercase text-[10px] tracking-widest rounded-lg transition-all duration-300 shadow-md shadow-gold/5"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-black/10" />
                        <span>Rezerwuj Online</span>
                      </a>
                      
                      <button 
                        onClick={() => handleLightboxOpen(prop, 0)}
                        className="w-full py-2.5 bg-transparent hover:bg-neutral-900 border border-neutral-900 hover:border-gold/20 text-gray-400 hover:text-white font-medium text-[10px] rounded-lg tracking-widest uppercase transition-all"
                      >
                        Galeria zdjęć ({prop.images.length})
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-[#0c0c0c] border border-neutral-900 rounded-lg max-w-md mx-auto">
              <Building2 className="w-12 h-12 text-gold mx-auto mb-4 opacity-50" />
              <p className="text-white font-light font-display text-lg tracking-tight">Brak wyników spełniających kryteria</p>
              <p className="text-gray-400 text-xs mt-2 font-light">Dostosuj filtry, aby wyświetlić pozostałe prestiżowe lokale.</p>
              <button 
                onClick={() => { setTypeFilter('wszystkie'); setLocationFilter('wszystkie'); }}
                className="mt-6 px-6 py-2.5 bg-gold text-black rounded-lg font-bold text-[10px] uppercase tracking-widest"
              >
                Pokaż wszystkie
              </button>
            </div>
          )}

        </div>
      </section>


      {/* 5. HOW IT WORKS SECTION ("Jak to działa?") */}
      <section id="jak-dziala" className="py-24 bg-[#050505] relative scroll-mt-20 border-t border-neutral-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20 reveal-on-scroll">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-medium font-mono">Przejrzysty Proces Najmu</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-white mt-1.5 tracking-tight leading-tight">
              Precyzyjna ścieżka do <span className="font-serif font-semibold italic text-gold-light">zamieszkania</span>
            </h2>
            <p className="text-sm text-gray-400 font-light mt-3 max-w-xl mx-auto leading-relaxed">
              Maksymalnie uprościliśmy proces najmu w Holandii. Wyeliminowaliśmy skomplikowane procesy 
              rekrutacyjne oraz wymóg stałego, holenderskiego kontraktu o pracę.
            </p>
          </div>

          {/* Steps wrapper with refined architectural columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <div className="p-7 bg-[#0c0c0c] border border-neutral-900 rounded-lg flex flex-col relative reveal-on-scroll group hover:border-gold/20 transition-all duration-300">
              <div className="absolute top-4 right-4 text-4xl font-display font-extralight text-gold/10 group-hover:text-gold/20 transition-all tracking-widest select-none font-mono">01</div>
              <div className="w-9 h-9 rounded bg-gold/10 flex items-center justify-center text-gold font-mono text-xs font-semibold mb-8 border border-gold/10">
                I
              </div>
              <h3 className="text-lg font-display font-light text-white mb-3">Prezentacja Lokalu</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Po pierwszym kontakcie ustalamy dogodny termin prezentacji pokoju lub domku nad rzeką Maas. Możesz osobiście zweryfikować nienaganny standard techniczny lokalu.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-7 bg-[#0c0c0c] border border-neutral-900 rounded-lg flex flex-col relative reveal-on-scroll group hover:border-gold/20 transition-all duration-300">
              <div className="absolute top-4 right-4 text-4xl font-display font-extralight text-gold/10 group-hover:text-gold/20 transition-all tracking-widest select-none font-mono">02</div>
              <div className="w-9 h-9 rounded bg-gold/10 flex items-center justify-center text-gold font-mono text-xs font-semibold mb-8 border border-gold/10">
                II
              </div>
              <h3 className="text-lg font-display font-light text-white mb-3">Umowa i Rezerwacja</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Przygotowujemy przejrzystą, w pełni zgodną z prawem holenderskim umowę najmu z prawem do meldunku. Następuje bezpieczna wpłata rezerwacji za lokal.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-7 bg-[#0c0c0c] border border-neutral-900 rounded-lg flex flex-col relative reveal-on-scroll group hover:border-gold/20 transition-all duration-300">
              <div className="absolute top-4 right-4 text-4xl font-display font-extralight text-gold/10 group-hover:text-gold/20 transition-all tracking-widest select-none font-mono">03</div>
              <div className="w-9 h-9 rounded bg-gold/10 flex items-center justify-center text-gold font-mono text-xs font-semibold mb-8 border border-gold/10">
                III
              </div>
              <h3 className="text-lg font-display font-light text-white mb-3">Odbiór Kluczy</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Wspólnie odbieramy umeblowany dom, sprawdzając stan wyposażenia. Otrzymujesz komplet kluczy i zostajesz formalnie i uroczyście wprowadzony do pokoju.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-7 bg-[#0c0c0c] border border-neutral-900 rounded-lg flex flex-col relative reveal-on-scroll group hover:border-gold/20 transition-all duration-300">
              <div className="absolute top-4 right-4 text-4xl font-display font-extralight text-gold/10 group-hover:text-gold/20 transition-all tracking-widest select-none font-mono">04</div>
              <div className="w-9 h-9 rounded bg-gold/10 flex items-center justify-center text-gold font-mono text-xs font-semibold mb-8 border border-gold/10">
                IV
              </div>
              <h3 className="text-lg font-display font-light text-white mb-3">Finalne Rozliczenie</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Po udanej pierwszej nocy i aklimatyzacji, w kolejnym dniu roboczym następuje wpłata pozostałej, ujętej w umowie kwoty gwarancyjnej - w pełnym spokoju.
              </p>
            </div>

          </div>

          {/* Quick legal assurance helper box */}
          <div className="mt-14 bg-gradient-to-r from-[#080808] via-neutral-950 to-[#080808] border border-gold/15 p-6 sm:p-8 rounded-lg text-center max-w-4xl mx-auto reveal-on-scroll">
            <h4 className="text-white font-display font-light tracking-wide text-base mb-2.5 flex items-center justify-center gap-2">
              <ShieldCheck className="text-gold w-4 h-4" />
              Pełne Bezpieczeństwo Prawne & Meldunkowe
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed max-w-3xl mx-auto font-light">
              Zapewniamy przejrzyste zasady finansowe. Wydajemy legalne potwierdzenia płatności najmu, 
              wystawiane przez powiązaną spółkę Euro Port. Zgoda na meldunek jest zagwarantowana na piśmie przez biuro.
            </p>
          </div>

        </div>
      </section>






      {/* 6. CONTACT SECTION */}
      <section id="kontakt" className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#040404] relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-medium font-mono">Kontakt & Rezerwacje</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-white mt-1.5 mb-4 tracking-tight leading-tight">
              Masz pytania? <span className="font-serif font-semibold italic text-gold-light">Napisz lub Zadzwoń</span>
            </h2>
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xl mx-auto mt-3">
              Chętnie pomożemy Ci dopasować odpowiedni pokój. Skontaktuj się bezpośrednio telefonicznie, 
              mailowo lub przez komunikatory.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mt-8">
            
            {/* Contact Details Information Panel */}
            <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl flex flex-col justify-between reveal-on-scroll space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-gold uppercase tracking-[0.2em] block mb-6">Dane Kontaktowe Biura</span>
                
                <div className="space-y-4">
                  {/* Email card */}
                  <a 
                    href="mailto:jessica.bigus24@gmail.com"
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-black/40 transition-all border border-transparent hover:border-neutral-800 group"
                  >
                    <div className="p-3 bg-gold/10 text-gold rounded-lg group-hover:bg-gold group-hover:text-black transition-all">
                      <Mail className="w-5 h-5" style={{ contentVisibility: 'auto' }} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium font-sans">Napisz do nas e-mail</div>
                      <div className="text-white font-bold text-sm sm:text-base mt-0.5 break-all">jessica.bigus24@gmail.com</div>
                      <div className="text-[11px] text-gold mt-0.5 flex items-center gap-1 font-sans">
                        <span>Kliknij, aby wysłać</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </a>

                  {/* Telephone card */}
                  <a 
                    href="tel:+31612368084"
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-black/40 transition-all border border-transparent hover:border-neutral-800 group"
                  >
                    <div className="p-3 bg-gold/10 text-gold rounded-lg group-hover:bg-gold group-hover:text-black transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium font-sans">Zadzwoń na telefon biurowy</div>
                      <div className="text-white font-bold text-base mt-0.5">+31 6 12368084</div>
                      <div className="text-[11px] text-gold mt-0.5 flex items-center gap-1 font-sans">
                        <span>Kliknij, aby zadzwonić</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Location card */}
              <div className="flex items-center gap-4 p-4 border border-neutral-800/80 bg-neutral-950/40 rounded-xl mt-4">
                <div className="p-2.5 bg-gold/10 text-gold rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] text-gray-400 font-medium font-sans">Adres siedziby / obszar działania</div>
                  <div className="text-white font-bold text-sm">Vlijmen, Holandia <span className="text-xs text-gray-500 font-mono ml-1 font-normal">(5251PS)</span></div>
                </div>
              </div>

            </div>

            {/* Instant Social links CTA block */}
            <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl flex flex-col justify-between reveal-on-scroll">
              <div>
                <span className="text-xs font-mono font-bold text-gold uppercase tracking-[0.2em] block mb-6">Szybki Kontakt Online</span>
                <p className="text-xs text-gray-400 leading-relaxed font-light mb-6">
                  Jesteśmy dostępni pod telefonem i komunikatorem WhatsApp przez większość dnia. Odpowiadamy błyskawicznie na wszelkie pytania o pokoje i formalności meldunkowe.
                </p>
                <div className="space-y-4">
                  {/* Large Green WhatsApp button */}
                  <a 
                    href="https://wa.me/31612368084" 
                    target="_blank" 
                    rel="noreferrer noopener"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-[#25d366] hover:bg-[#20ba59] hover:scale-[1.02] text-white font-black uppercase text-xs tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-[#25d366]/10"
                  >
                    <MessageSquare className="w-4.5 h-4.5 fill-white stroke-none" />
                    Napisz na WhatsApp
                  </a>

                  {/* Facebook button */}
                  <a 
                    href="https://www.facebook.com/HerbotBiuroNieruchomosciwHolandii" 
                    target="_blank" 
                    rel="noreferrer noopener"
                    className="flex items-center justify-center gap-3 w-full py-3.5 bg-[#1877f2] hover:bg-[#166fe5] hover:scale-[1.02] text-white font-bold uppercase text-xs tracking-wider rounded-xl transition-all duration-300"
                  >
                    <span className="font-extrabold text-lg mr-1 font-mono">f</span>
                    Odwiedź Nasz Facebook
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-800/60 text-center">
                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider block">Obsługa w języku polskim</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      
      {/* 7. FOOTER */}
      <footer className="bg-black border-t border-neutral-900 py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-neutral-900">
            
            {/* Branding Column */}
            <div className="text-center md:text-left">
              <a href="#" className="flex flex-col group inline-block">
                <span className="text-2xl font-display font-black tracking-widest text-[#f5c518]">
                  HERBOT
                </span>
                <span className="text-[10px] tracking-widest font-display font-semibold text-gray-400 uppercase">
                  Wynajem Nieruchomości • Holandia
                </span>
              </a>
              <p className="text-xs text-gray-500 mt-2 max-w-xs leading-normal">
                Twoje zaufane biuro nieruchomości w Holandii. Komfortowe pokoje, bezpieczne umowy i meldunek od ręki.
              </p>
            </div>

            {/* Quick sections navigation map */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-semibold uppercase">
              <a href="#oferty" className="hover:text-gold transition-colors">Oferty</a>
              <a href="#o-nas" className="hover:text-gold transition-colors">O nas</a>
              <a href="#jak-dziala" className="hover:text-gold transition-colors">Jak to działa?</a>
              <a href="#kontakt" className="hover:text-gold transition-colors">Kontakt</a>
            </div>

            {/* Links row */}
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 uppercase">
              <a 
                href="https://www.facebook.com/HerbotBiuroNieruchomosciwHolandii" 
                target="_blank" 
                rel="noreferrer noopener" 
                className="hover:text-gold hover:underline transition-all"
              >
                Facebook
              </a>
              <span className="text-neutral-800">|</span>
              <a 
                href="https://wa.me/31612368084" 
                target="_blank" 
                rel="noreferrer noopener" 
                className="hover:text-gold hover:underline transition-all"
              >
                WhatsApp
              </a>
              <span className="text-neutral-800">|</span>
              <a 
                href="mailto:jessica.bigus24@gmail.com" 
                className="hover:text-gold hover:underline transition-all"
              >
                Email
              </a>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-center text-[11px] text-gray-600 font-semibold">
            <div>
              &copy; 2026 Herbot Wynajem Nieruchomości. Wszelkie prawa zastrzeżone.
            </div>
            <div>
              Biuro obsługi technicznej Euro Port • Realizacja w języku polskim
            </div>
          </div>

        </div>
      </footer>


      {/* WHATSAPP FLOATING BUBBLE */}
      <a 
        href="https://wa.me/31612368084" 
        target="_blank" 
        rel="noreferrer noopener"
        className="fixed bottom-6 right-6 z-50 p-4 bg-[#25d366] text-white rounded-full shadow-2xl hover:bg-[#20ba59] hover:scale-110 active:scale-95 transition-all outline-none animate-bounce group"
        aria-label="Skontaktuj się ze mną na WhatsApp"
        style={{ animationDuration: '3s' }}
      >
        <MessageSquare className="w-6 h-6 fill-white stroke-none group-hover:rotate-12 transition-transform" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/85 backdrop-blur-md text-white border border-neutral-800 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
          Napisz do nas teraz
        </span>
      </a>


      {/* INTERACTIVE LIGHTBOX GALLERY MODAL */}
      {lightboxOpen && lightboxProperty && (
        <div className="fixed inset-0 z-[100] bg-black/98 flex flex-col justify-between p-4 md:p-6" role="dialog" aria-modal="true" style={{ contentVisibility: 'auto' }}>
          
          {/* Header area */}
          <div className="flex items-center justify-between text-white w-full max-w-7xl mx-auto pb-4">
            <div>
              <h4 className="font-display font-bold text-gold text-sm sm:text-base">{lightboxProperty.title}</h4>
              <p className="text-xs text-gray-400 mt-1">{lightboxProperty.location}</p>
            </div>
            <button 
              onClick={handleLightboxClose}
              className="p-2 hover:bg-neutral-900 rounded-full text-gray-300 hover:text-white transition-all scale-105 active:scale-90"
              aria-label="Zamknij podgląd"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Picture frame in Lightbox */}
          <div className="relative flex-grow flex items-center justify-center w-full max-w-5xl mx-auto py-2">
            
            <button 
              onClick={prevLightboxImage}
              className="absolute left-0 md:left-4 z-10 p-3 bg-neutral-900/60 text-white rounded-full hover:bg-gold hover:text-black hover:scale-110 transition-all active:scale-90"
              aria-label="Poprzednie zdjęcie"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <img 
              src={lightboxProperty.images[lightboxIndex]} 
              alt={`${lightboxProperty.title} - Podgląd ${lightboxIndex + 1}`} 
              referrerPolicy="no-referrer"
              className="max-h-[70vh] max-w-full rounded-lg object-contain selection:bg-transparent shadow-2xl transition-all duration-300 ease-in-out"
            />

            <button 
              onClick={nextLightboxImage}
              className="absolute right-0 md:right-4 z-10 p-3 bg-neutral-900/60 text-white rounded-full hover:bg-gold hover:text-black hover:scale-110 transition-all active:scale-90"
              aria-label="Następne zdjęcie"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

          </div>

          {/* Footer stats in Lightbox */}
          <div className="w-full max-w-5xl mx-auto text-center space-y-4">
            <span className="text-xs font-mono font-medium text-gold bg-gold/15 border border-gold/15 px-3 py-1 inline-block rounded-full">
              ZDJĘCIE {lightboxIndex + 1} Z {lightboxProperty.images.length}
            </span>
            
            {/* Gallery filmstrip preview track */}
            <div className="flex justify-center gap-1.5 overflow-x-auto py-2 max-w-md mx-auto scrollbar-thin">
              {lightboxProperty.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-md bg-cover bg-center border-2 transition-all flex-shrink-0 ${i === lightboxIndex ? 'border-gold scale-105 opacity-100' : 'border-transparent opacity-40 hover:opacity-75'}`}
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
            </div>

            <div className="pt-2">
              <a 
                href={`https://wa.me/31612368084?text=${encodeURIComponent(lightboxProperty.whatsappMessage)}`} 
                target="_blank" 
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-gold hover:bg-gold-light text-black text-xs font-extrabold uppercase tracking-wide rounded-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Dopytaj o dostępność tego pokoju
              </a>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
