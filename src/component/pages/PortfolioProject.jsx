import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'
import { projects } from '@/data/projects'
import ReactIcon from '@/components/icons/react-icon'
import Footer from '@/component/layout/footer'
import Header from '@/component/layout/header'
import { animate, stagger } from 'animejs'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Composant de Carrousel pour les outils (Iframe)
function ToolsCarousel({ language }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const tools = [
    {
      name: "ShaderGradient",
      url: "https://shadergradient.co/customize?animate=on&axesHelper=off&brightness=1.2&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%23ff5005&color2=%23dbba95&color3=%23d0bce1&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=-1.4&positionY=0&positionZ=0&range=disabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=plane&uAmplitude=1&uDensity=1.3&uFrequency=5.5&uSpeed=0.4&uStrength=4&uTime=0&wireframe=false"
    },
    {
      name: "Anime.js",
      url: "https://animejs.com/"
    },
    {
      name: "Space Type Generator",
      url: "https://spacetypegenerator.com/snap"
    }
  ]

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % tools.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + tools.length) % tools.length)

  return (
    <div className="relative w-full aspect-video group">
      <div className="w-full h-full rounded-3xl overflow-hidden bg-white/5 border border-white/10 relative">
        {tools.map((tool, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <iframe 
              src={tool.url} 
              className="w-full h-full border-none bg-black"
              title={tool.name}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
            {/* Overlay discret pour indiquer l'outil */}
            <div className="absolute bottom-6 left-6 z-20 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <span className="text-xs font-mono tracking-widest uppercase text-white/80">
                Tool {index + 1}: {tool.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Boutons de navigation */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-30 flex justify-between px-4 pointer-events-none">
        <button 
          onClick={prevSlide}
          className="pointer-events-auto bg-black/50 hover:bg-white text-white hover:text-black p-3 rounded-full backdrop-blur-md transition-all duration-300 border border-white/10"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={nextSlide}
          className="pointer-events-auto bg-black/50 hover:bg-white text-white hover:text-black p-3 rounded-full backdrop-blur-md transition-all duration-300 border border-white/10"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
        {tools.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 transition-all duration-500 rounded-full ${
              index === currentIndex ? 'bg-white w-12' : 'bg-white/20 w-4'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function PortfolioProject() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const project = projects.find(p => p.slug === 'portfolio')
  
  // Refs pour les éléments animés
  const headerRef = useRef(null)
  const metaRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!project) {
      navigate('/')
    }
  }, [project, navigate])

  useEffect(() => {
    const observerOptions = { threshold: 0.1 }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === headerRef.current) {
            animate('.fade-up-header', {
              translateY: [30, 0],
              opacity: [0, 1],
              delay: stagger(100),
              easing: 'easeOutExpo',
              duration: 1000
            })
          }
          if (entry.target === metaRef.current) {
            animate('.fade-up-meta', {
              translateY: [20, 0],
              opacity: [0, 1],
              delay: stagger(100),
              easing: 'easeOutExpo',
              duration: 800
            })
          }
          if (entry.target === contentRef.current) {
            animate('.fade-up-content', {
              translateY: [40, 0],
              opacity: [0, 1],
              delay: stagger(200),
              easing: 'easeOutExpo',
              duration: 1200
            })
          }
        }
      });
    }, observerOptions)

    if (headerRef.current) observer.observe(headerRef.current)
    if (metaRef.current) observer.observe(metaRef.current)
    if (contentRef.current) observer.observe(contentRef.current)

    return () => observer.disconnect()
  }, [])

  if (!project) return null

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
      {/* Header standard */}
      <Header />

      <main className="pt-48 pb-32">
        {/* Project Hero Header */}
        <section ref={headerRef} className="max-w-7xl mx-auto px-4 md:px-12 mb-32">
          <h2 className="fade-up-header opacity-0 text-sm font-mono text-gray-500 uppercase tracking-[0.3em] mb-8">
            {language === 'fr' ? 'Présentation du Projet' : 'Project Overview'}
          </h2>
          <h1 className="fade-up-header opacity-0 text-5xl md:text-[10rem] font-light tracking-tighter leading-[0.9] mb-12">
            Personal <br /> Portfolio
          </h1>
          <p className="fade-up-header opacity-0 text-xl md:text-3xl font-light text-gray-400 max-w-3xl leading-relaxed">
            {language === 'fr' 
              ? "Une expérience immersive conçue pour présenter mon travail à travers une interface minimaliste et performante."
              : "An immersive experience designed to showcase my work through a minimalist and high-performance interface."}
          </p>
        </section>

        {/* Meta Information Grid */}
        <section ref={metaRef} className="max-w-7xl mx-auto px-4 md:px-12 mb-48 border-t border-white/10 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="fade-up-meta opacity-0">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-4">Year</h3>
              <p className="text-lg font-light">2025</p>
            </div>
            <div className="fade-up-meta opacity-0">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-4">Role</h3>
              <p className="text-lg font-light">Design & Development</p>
            </div>
            <div className="fade-up-meta opacity-0">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-4">Technologies</h3>
              <div className="text-lg font-light space-y-1">
                <p>React / Vite</p>
                <p>Tailwind CSS</p>
                <p>Anime.js</p>
              </div>
            </div>
            <div className="fade-up-meta opacity-0">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-4">Links</h3>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="block text-lg font-light hover:underline decoration-1 underline-offset-4">
                GitHub Repository
              </a>
            </div>
          </div>
        </section>

        {/* Detailed Content Sections */}
        <section ref={contentRef} className="max-w-7xl mx-auto px-4 md:px-12 space-y-48">
          
          {/* Section: Context */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <h2 className="fade-up-content opacity-0 text-sm font-mono text-gray-500 uppercase tracking-[0.3em]">
                Context
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="fade-up-content opacity-0 text-2xl md:text-4xl font-light leading-tight text-gray-200">
                {language === 'fr'
                  ? "L'objectif était de créer un espace numérique qui ne soit pas seulement un CV, mais une démonstration directe de mes capacités techniques et esthétiques."
                  : "The objective was to create a digital space that is not just a resume, but a direct demonstration of my technical and aesthetic capabilities."}
              </p>
              <div className="fade-up-content opacity-0 mt-12 space-y-6 text-gray-400 text-lg font-light leading-relaxed">
                <p>
                  {language === 'fr'
                    ? "Inspiré par le design suisse et le minimalisme contemporain, ce portfolio privilégie la clarté et le mouvement. Chaque interaction a été pensée pour être fluide, sans jamais distraire du contenu principal."
                    : "Inspired by Swiss design and contemporary minimalism, this portfolio prioritizes clarity and movement. Every interaction was designed to be fluid, without ever distracting from the main content."}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION CARROUSEL D'OUTILS (IFRAMES) */}
          <div className="fade-up-content opacity-0 space-y-12">
            <h3 className="text-sm font-mono text-gray-500 uppercase tracking-[0.3em]">
              {language === 'fr' ? 'Outils et Technologies Interactifs' : 'Tools & Interactive Technologies'}
            </h3>
            <ToolsCarousel language={language} />
          </div>

          {/* Section: Implementation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <h2 className="fade-up-content opacity-0 text-sm font-mono text-gray-500 uppercase tracking-[0.3em]">
                Implementation
              </h2>
            </div>
            <div className="md:col-span-8 space-y-16">
              <div className="fade-up-content opacity-0">
                <h3 className="text-xl font-medium mb-4">Architecture</h3>
                <p className="text-gray-400 text-lg font-light leading-relaxed">
                  {language === 'fr'
                    ? "Construit avec React et Vite pour une réactivité instantanée. La gestion des états et des langues est centralisée pour assurer une cohérence parfaite sur l'ensemble du site."
                    : "Built with React and Vite for instant responsiveness. State and language management are centralized to ensure perfect consistency across the entire site."}
                </p>
              </div>
              <div className="fade-up-content opacity-0">
                <h3 className="text-xl font-medium mb-4">Motion Design</h3>
                <p className="text-gray-400 text-lg font-light leading-relaxed">
                  {language === 'fr'
                    ? "Utilisation d'Anime.js pour les micro-interactions et de shaders GLSL via Three.js pour les arrière-plans génératifs. Le but était de créer un sentiment de profondeur et de vie."
                    : "Using Anime.js for micro-interactions and GLSL shaders via Three.js for generative backgrounds. The goal was to create a sense of depth and life."}
                </p>
              </div>
            </div>
          </div>

          {/* Credits Section */}
          <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between gap-12">
            <div className="fade-up-content opacity-0">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-4">Design & Dev</h3>
              <p className="text-lg font-light">William Peynichou</p>
            </div>
            <div className="fade-up-content opacity-0">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-4">Typography</h3>
              <p className="text-lg font-light">Inter / Mono</p>
            </div>
            <div className="fade-up-content opacity-0">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-4">Inspiration</h3>
              <p className="text-lg font-light">Jon Howell / Minimalist Design</p>
            </div>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  )
}

export default PortfolioProject
