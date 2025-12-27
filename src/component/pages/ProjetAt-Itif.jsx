import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { projects } from '@/data/projects'
import ReactIcon from '@/components/icons/react-icon'
import Footer from '@/component/layout/footer'

function GalleryCarousel({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [images.length])

  if (!images || images.length === 0) return null

  return (
    <div className="relative w-full md:w-1/2 mx-auto aspect-video group">
      <div className="w-full h-full rounded-lg overflow-hidden bg-gray-900 border border-white/10 relative">
        {images.map((img, index) => (
           <img 
             key={index}
             src={img} 
             alt={`${title} screenshot ${index + 1}`}
             className={`absolute inset-0 w-full h-full object-contain bg-black/50 transition-opacity duration-700 ease-in-out ${
               index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
             }`}
           />
        ))}
      </div>
      
      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function ProjetAtItif() {
  const { language } = useLanguage()
  const navigate = useNavigate()

  const project = projects.find(p => p.slug === 'at-itif')

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!project) {
      navigate('/')
    }
  }, [project, navigate])

  if (!project) return null

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Header / Back Button */}
        <div className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm font-mono text-gray-500 hover:text-white transition-colors"
          >
            ← {language === 'fr' ? 'Retour' : 'Back'}
          </Link>
        </div>

        {/* Title Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-8xl font-light tracking-tight mb-6">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl">
            {project.type}
          </p>
        </div>

        {/* Main Image (Login Screen) */}
        <div className="w-full md:w-1/2 mx-auto aspect-video rounded-lg overflow-hidden bg-gray-900 mb-20">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-contain bg-black"
          />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          
          {/* Metadata Column */}
          <div className="md:col-span-4 space-y-8">
            <div>
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                {language === 'fr' ? 'Année' : 'Year'}
              </h3>
              <p className="text-lg">{project.year}</p>
            </div>

            <div>
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.githubLink && (
              <div>
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                  Code
                </h3>
                <a 
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:underline decoration-1 underline-offset-4"
                >
                  <ReactIcon className="w-5 h-5" />
                  GitHub Repository
                </a>
              </div>
            )}
          </div>

          {/* Description Column */}
          <div className="md:col-span-8">
            <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
              {language === 'fr' ? 'À propos' : 'About'}
            </h3>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-gray-300 leading-relaxed text-xl font-light">
                {project.description?.[language] || project.description?.['en']}
              </p>
            </div>
          </div>
        </div>

        {/* N8N Special Section */}
        {project.n8nImage && (
          <div className="mb-24">
            <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8">
              {language === 'fr' ? 'Architecture IA & Automation' : 'AI & Automation Architecture'}
            </h3>
            <div className="w-full md:w-1/2 mx-auto rounded-lg overflow-hidden bg-gray-900 border border-white/10 p-4">
               <img 
                 src={project.n8nImage} 
                 alt="n8n workflow" 
                 className="w-full h-auto object-contain"
               />
               <p className="text-sm text-gray-500 mt-4 text-center font-mono">
                 {language === 'fr' ? 'Workflow n8n avec Gemini et outils personnalisés' : 'n8n Workflow powered by Gemini and custom tools'}
               </p>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <p className="text-gray-300 leading-relaxed text-lg font-light text-justify">
                {language === 'fr' 
                  ? "Au cœur du système, un agent autonome orchestré par n8n agit comme un véritable coach sportif intelligent. Connecté directement au modèle de langage Gemini, cet agent ne se contente pas de réponses génériques : il interroge en temps réel la base de données pour contextualiser chaque réponse selon le profil précis de l'utilisateur (poids actuel, objectif cible, historique). En croisant ces données avec les performances importées via l'API Strava, l'IA est capable de générer des plans d'entraînement dynamiques, réalistes et spécifiquement adaptés à la progression physique de chacun."
                  : "At the core of the system, an autonomous agent orchestrated by n8n acts as a truly intelligent sports coach. Directly connected to the Gemini language model, this agent goes beyond generic responses: it queries the database in real-time to contextualize every answer based on the user's specific profile (current weight, target goal, history). By cross-referencing this data with performance metrics imported via the Strava API, the AI can generate dynamic, realistic training plans specifically adapted to each individual's physical progress."}
              </p>
            </div>
          </div>
        )}

        {/* Gallery Carousel */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="space-y-12">
            <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              {language === 'fr' ? 'Galerie' : 'Gallery'}
            </h3>
            <GalleryCarousel images={project.gallery} title={project.title} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default ProjetAtItif
