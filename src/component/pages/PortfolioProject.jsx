import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'
import { projects } from '@/data/projects'
import ReactIcon from '@/components/icons/react-icon'
import Footer from '@/component/layout/footer'

function PortfolioProject() {
  const { language } = useLanguage()
  const navigate = useNavigate()

  const project = projects.find(p => p.slug === 'portfolio')

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
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-sm font-mono text-gray-500 hover:text-white transition-colors">
            ← {language === 'fr' ? 'Retour' : 'Back'}
          </Link>
        </div>

        <div className="mb-16">
          <h1 className="text-4xl md:text-8xl font-light tracking-tight mb-6">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl">
            {project.type}
          </p>
        </div>

        <div className="w-full md:w-1/2 mx-auto aspect-video rounded-lg overflow-hidden bg-gray-900 mb-20">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
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
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white hover:underline decoration-1 underline-offset-4">
                  <ReactIcon className="w-5 h-5" />
                  GitHub Repository
                </a>
              </div>
            )}
          </div>

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
      </div>
      <Footer />
    </div>
  )
}

export default PortfolioProject
